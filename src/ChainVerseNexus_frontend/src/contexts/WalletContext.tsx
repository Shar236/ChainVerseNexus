import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

interface NFT {
  id: string;
  name: string;
  creator: string;
  image: string;
  price: number;
  likes: number;
}

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendTransaction: (to: string, amount: string) => Promise<void>;
  balance: string;
  boughtNFTs: NFT[];
  buyNFT: (nft: NFT) => Promise<void>;
  sellNFT: (nft: Partial<NFT>) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | null>(null);

// Internet Identity provider URL (official)
const II_URL = "https://identity.ic0.app";

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState("0");
  const [boughtNFTs, setBoughtNFTs] = useState<NFT[]>([]);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [agent, setAgent] = useState<HttpAgent | null>(null);

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      if (await client.isAuthenticated()) {
        handleAuthenticated(client);
      }
    });
  }, []);

  const handleAuthenticated = async (client: AuthClient) => {
    const identity = client.getIdentity();
    const principal = identity.getPrincipal();
    const principalId = principal.toText();
    setAddress(principalId);

    const agent = new HttpAgent({ identity });
    setAgent(agent);

    const savedNFTs = localStorage.getItem(`boughtNFTs_${principalId}`);
    if (savedNFTs) {
      setBoughtNFTs(JSON.parse(savedNFTs));
    }
  };

  const connectWallet = async () => {
    if (!authClient) {
      toast.error("Authentication client not initialized");
      return;
    }

    try {
      setIsConnecting(true);
      await authClient.login({
        identityProvider: II_URL,
        onSuccess: async () => {
          await handleAuthenticated(authClient);
          toast.success("ICP Wallet connected");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          toast.error("Failed to connect wallet");
        },
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Could not connect to your wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (authClient) {
      await authClient.logout();
    }
    setAddress(null);
    setAgent(null);
    setBoughtNFTs([]);
    toast.info("Your wallet has been disconnected");
  };

  const sendTransaction = async (to: string, amount: string) => {
    if (!address || !agent) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      toast.info("Transaction feature coming soon!");
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed. Please try again.");
    }
  };

  const buyNFT = async (nft: NFT) => {
    if (!address || !agent) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      toast.info(`Purchasing ${nft.name}...`);

      setBoughtNFTs((prev) => {
        const updated = prev.some((item) => item.id === nft.id)
          ? prev
          : [...prev, nft];

        localStorage.setItem(
          `boughtNFTs_${address}`,
          JSON.stringify(updated)
        );
        return updated;
      });

      toast.success(`Successfully purchased ${nft.name}!`);
    } catch (error) {
      console.error("Purchase failed:", error);
      toast.error("NFT purchase failed. Please try again.");
    }
  };

  const sellNFT = async (nft: Partial<NFT>) => {
    if (!address || !agent) {
      toast.error("Please connect your wallet first");
      return;
    }

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success(`${nft.name} is now listed for sale.`);
        setBoughtNFTs((prev) => {
          const updated = prev.filter((item) => item.id !== nft.id);
          localStorage.setItem(`boughtNFTs_${address}`, JSON.stringify(updated));
          return updated;
        });
        resolve();
      }, 1000);
    });
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnecting,
        connectWallet,
        disconnectWallet,
        sendTransaction,
        balance,
        boughtNFTs,
        buyNFT,
        sellNFT,
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

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  if (address.length <= chars * 2) return address;
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
}
