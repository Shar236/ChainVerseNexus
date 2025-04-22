import { useState } from "react";
import { CardGlow } from "@/components/ui/card-glow";
import { cn } from "@/lib/utils";
import { Bitcoin, Tag, CheckCircle } from "lucide-react";
import { FaHeart } from "react-icons/fa";
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

interface NFTSellCardProps {
  nft: NFT;
  className?: string;
}

export function NFTSellCard({ nft, className }: NFTSellCardProps) {
  const { address, sellNFT, boughtNFTs } = useWallet();
  const [isListed, setIsListed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(nft.likes);

  const isOwned = boughtNFTs.some(item => item.id === nft.id);

  const handleSell = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!isOwned) {
      toast.info(`You don't own "${nft.name}" to sell`);
      return;
    }

    try {
      await sellNFT(nft);
      toast.success(`Successfully listed "${nft.name}" for sale!`);
      setIsListed(true);
    } catch (error) {
      toast.error("Failed to list NFT for sale");
      console.error("Sell error:", error);
    }
  };

  const toggleLike = () => {
    setLiked(prev => !prev);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <CardGlow
      className={cn("w-full max-w-sm", className)}
      glowClassName="bg-gradient-to-r from-green-400 to-yellow-400"
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
            <div
              className="flex items-center text-muted-foreground text-sm cursor-pointer"
              onClick={toggleLike}
            >
              <FaHeart
                className={`h-4 w-4 mr-1 transition-all duration-200 ${
                  liked ? "text-red-500 scale-110" : "text-gray-400"
                }`}
              />
              <span>{likes}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-3">Owned by You</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Bitcoin className="h-4 w-4 mr-1 text-green-500" />
              <span className="font-medium">{nft.price} NFT</span>
            </div>

            {isOwned ? (
              isListed ? (
                <Button
                  size="sm"
                  disabled
                  className="px-3 py-1 flex items-center gap-1 bg-green-500 text-white cursor-default"
                >
                  <CheckCircle className="h-3 w-3" />
                  Listed
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="px-3 py-1 flex items-center gap-1"
                  onClick={handleSell}
                >
                  <Tag className="h-3 w-3" />
                  Sell Now
                </Button>
              )
            ) : (
              <Button size="sm" variant="outline" className="px-3 py-1" disabled>
                Not Owned
              </Button>
            )}
          </div>
        </div>
      </div>
    </CardGlow>
  );
}
