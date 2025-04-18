import { Button } from "@/components/ui/button";
import { Wallet, LogOut, Loader2, ArrowRightLeft } from "lucide-react";
import { useWallet, shortenAddress } from "@/contexts/WalletContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardGlow } from "@/components/ui/card-glow";
import { formatEther } from "ethers";

export function WalletButton() {
  const { 
    address, 
    connectWallet, 
    disconnectWallet, 
    isConnecting, 
    chainId, 
    balance,
    switchAccount 
  } = useWallet();

  const getNetworkName = (id: number | null) => {
    if (!id) return "Unknown";
    
    switch (id) {
      case 1: return "Ethereum";
      case 11155111: return "Sepolia";
      case 137: return "Polygon";
      case 80001: return "Mumbai";
      case 42161: return "Arbitrum";
      case 10: return "Optimism";
      case 56: return "BSC";
      case 43114: return "Avalanche";
      case 1337: return "Ganache";
      case 31337: return "Hardhat";
      default: return `Chain ID: ${id}`;
    }
  };

  const formatBalance = (balanceWei: string) => {
    try {
      return parseFloat(formatEther(balanceWei)).toFixed(4);
    } catch (error) {
      return "0.0000";
    }
  };

  if (!address) {
    return (
      <Button 
        size="sm" 
        className="gap-2" 
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Wallet className="h-4 w-4" />
        )}
        <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CardGlow className="rounded-md" glowClassName="from-green-400 to-emerald-600">
            <div className="flex items-center gap-2 px-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>{shortenAddress(address)}</span>
            </div>
          </CardGlow>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Wallet Connected</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between">
          <span>Address:</span>
          <span className="text-xs opacity-70">{shortenAddress(address, 6)}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between">
          <span>Balance:</span>
          <span className="text-xs opacity-70">{formatBalance(balance)} ETH</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between">
          <span>Network:</span>
          <span className="text-xs opacity-70">{getNetworkName(chainId)}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={switchAccount}
        >
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          Switch Account
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-500 focus:text-red-500 cursor-pointer"
          onClick={disconnectWallet}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
