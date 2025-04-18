
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BrowserProvider, Eip1193Provider, parseEther } from "ethers";
import { toast } from "sonner";

interface NFT {
  id: string;
  name: string;
  creator: string;
  image: string;
  price: number;
  likes: number;
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider & {
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
    };
  }
}

interface WalletContextType {
  address: string | null;
  provider: BrowserProvider | null;
  chainId: number | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendTransaction: (to: string, amount: string) => Promise<void>;
  balance: string;
  boughtNFTs: NFT[];
  buyNFT: (nft: NFT) => Promise<void>;
  switchAccount: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState("0");
  const [boughtNFTs, setBoughtNFTs] = useState<NFT[]>([]);

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      connectWallet();
    }
    
    // Load bought NFTs from localStorage
    const savedNFTs = localStorage.getItem(`boughtNFTs_${address}`);
    if (savedNFTs) {
      setBoughtNFTs(JSON.parse(savedNFTs));
    }
  }, []);

  // Save bought NFTs to localStorage when they change
  useEffect(() => {
    if (address && boughtNFTs.length > 0) {
      localStorage.setItem(`boughtNFTs_${address}`, JSON.stringify(boughtNFTs));
    }
  }, [boughtNFTs, address]);

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== address) {
        setAddress(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        
        // Load bought NFTs for the new account
        const savedNFTs = localStorage.getItem(`boughtNFTs_${accounts[0]}`);
        if (savedNFTs) {
          setBoughtNFTs(JSON.parse(savedNFTs));
        } else {
          setBoughtNFTs([]);
        }
      }
    };

    const handleChainChanged = (chainIdHex: string) => {
      setChainId(parseInt(chainIdHex, 16));
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [address]);

  const updateBalance = async () => {
    if (provider && address) {
      try {
        const balance = await provider.getBalance(address);
        setBalance(balance.toString());
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  // Update balance when address changes
  useEffect(() => {
    updateBalance();
  }, [address, provider]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Wallet not found. Please install MetaMask or another Ethereum wallet");
      return;
    }

    try {
      setIsConnecting(true);
      const ethersProvider = new BrowserProvider(window.ethereum);
      const accounts = await ethersProvider.send("eth_requestAccounts", []);
      const network = await ethersProvider.getNetwork();
      
      setProvider(ethersProvider);
      setAddress(accounts[0]);
      setChainId(Number(network.chainId));
      
      localStorage.setItem("walletAddress", accounts[0]);
      
      toast.success(`Wallet connected: ${shortenAddress(accounts[0])}`);
      
      // Fetch initial balance
      updateBalance();
      
      // Load bought NFTs for this account
      const savedNFTs = localStorage.getItem(`boughtNFTs_${accounts[0]}`);
      if (savedNFTs) {
        setBoughtNFTs(JSON.parse(savedNFTs));
      } else {
        setBoughtNFTs([]);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Could not connect to your wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const sendTransaction = async (to: string, amount: string) => {
    if (!provider || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: to,
        value: parseEther(amount)
      });

      toast.info("Transaction sent! Waiting for confirmation...");
      
      await tx.wait();
      
      toast.success("Transaction confirmed!");
      
      // Update balance after transaction
      updateBalance();
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed. Please try again.");
    }
  };

  const buyNFT = async (nft: NFT) => {
    if (!provider || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      // Simulate sending a transaction to the NFT creator's address
      const creatorAddress = "0x000000000000000000000000000000000000dEaD"; // Example dead address
      const amount = nft.price.toString();
      
      toast.info(`Purchasing ${nft.name}...`);
      
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: creatorAddress,
        value: parseEther(amount)
      });

      toast.info("Transaction sent! Waiting for confirmation...");
      
      await tx.wait();
      
      // Add the NFT to the bought list
      setBoughtNFTs(prev => {
        // Check if NFT is already in the list
        if (prev.some(item => item.id === nft.id)) {
          return prev;
        }
        return [...prev, nft];
      });
      
      toast.success(`Successfully purchased ${nft.name}!`);
      
      // Update balance after purchase
      updateBalance();
    } catch (error) {
      console.error("Purchase failed:", error);
      toast.error("NFT purchase failed. Please try again.");
    }
  };

  const switchAccount = async () => {
    if (!window.ethereum) {
      toast.error("Wallet not found. Please install MetaMask");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }]
      });
      
      // The handleAccountsChanged listener will handle the account change
      toast.info("Please select an account in your wallet");
    } catch (error) {
      console.error("Error switching account:", error);
      toast.error("Could not switch accounts");
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setProvider(null);
    setChainId(null);
    setBoughtNFTs([]);
    localStorage.removeItem("walletAddress");
    toast.info("Your wallet has been disconnected");
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        provider,
        chainId,
        isConnecting,
        connectWallet,
        disconnectWallet,
        sendTransaction,
        balance,
        boughtNFTs,
        buyNFT,
        switchAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  
  return context;
}

// Utility function to shorten address for display
export function shortenAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
}
