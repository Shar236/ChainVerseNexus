import { Button } from "@/components/ui/button";
import { useWallet, shortenAddress } from "@/contexts/WalletContext";
import { Loader2 } from "lucide-react";

export function WalletButton() {
  const { address, isConnecting, connectWallet, disconnectWallet } =
    useWallet();

  if (isConnecting) {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (address) {
    return (
      <Button variant="outline" title={address} onClick={disconnectWallet}>
        {shortenAddress(address)}
      </Button>
    );
  }

  return <Button onClick={connectWallet}>Connect ICP Wallet</Button>;
}

