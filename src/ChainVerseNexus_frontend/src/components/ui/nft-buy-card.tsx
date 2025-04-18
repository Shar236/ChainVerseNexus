
import { CardGlow } from "@/components/ui/card-glow";
import { cn } from "@/lib/utils";
import { Heart, Bitcoin, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

interface NFT {
  id: string;
  name: string;
  creator: string;
  image: string;
  price: number;
  likes: number;
}

interface NFTBuyCardProps {
  nft: NFT;
  className?: string;
}

export function NFTBuyCard({ nft, className }: NFTBuyCardProps) {
  const { address, buyNFT, boughtNFTs } = useWallet();
  
  const isOwned = boughtNFTs.some(item => item.id === nft.id);

  const handleBuy = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (isOwned) {
      toast.info(`You already own "${nft.name}"`);
      return;
    }
    
    await buyNFT(nft);
  };

  return (
    <CardGlow
      className={cn("w-full max-w-sm", className)}
      glowClassName="bg-gradient-to-r from-purple-500 to-blue-500"
    >
      <div className="relative overflow-hidden rounded-xl glassmorphism border-none">
        <div className="aspect-square w-full overflow-hidden rounded-t-xl">
          <img
            src={nft.image}
            alt={nft.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold truncate">{nft.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <Heart className="h-4 w-4 mr-1" />
              <span>{nft.likes}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-3">By {nft.creator}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Bitcoin className="h-4 w-4 mr-1 text-blue-400" />
              <span className="font-medium">{nft.price} ETH</span>
            </div>
            {isOwned ? (
              <Button size="sm" variant="outline" className="px-3 py-1" disabled>
                Owned
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="px-3 py-1 flex items-center gap-1"
                onClick={handleBuy}
                disabled={!address}
              >
                <ShoppingCart className="h-3 w-3" />
                Buy Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </CardGlow>
  );
}
