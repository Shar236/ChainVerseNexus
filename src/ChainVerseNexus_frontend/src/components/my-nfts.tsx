
import { useWallet } from "@/contexts/WalletContext";
import { NFTCard } from "@/components/ui/nft-card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function MyNFTs() {
  const { address, boughtNFTs, connectWallet } = useWallet();

  if (!address) {
    return (
      <div className="bg-muted/30 rounded-lg p-10 flex flex-col items-center justify-center text-center">
        <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Connect your wallet</h3>
        <p className="text-muted-foreground mb-4">
          You need to connect your wallet to see your purchased NFTs
        </p>
        <Button onClick={connectWallet}>Connect Wallet</Button>
      </div>
    );
  }

  if (boughtNFTs.length === 0) {
    return (
      <div className="bg-muted/30 rounded-lg p-10 text-center">
        <h3 className="text-xl font-semibold mb-2">No NFTs purchased yet</h3>
        <p className="text-muted-foreground">
          Your purchased NFTs will appear here. Start collecting!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">My NFT Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {boughtNFTs.map((nft) => (
          <NFTCard
            key={nft.id}
            name={nft.name}
            creator={nft.creator}
            image={nft.image}
            price={nft.price}
            likes={nft.likes}
          />
        ))}
      </div>
    </div>
  );
}
