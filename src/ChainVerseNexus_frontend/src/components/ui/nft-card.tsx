import { CardGlow } from "@/components/ui/card-glow";
import { cn } from "@/lib/utils";
import { Heart, Bitcoin } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

interface NFTCardProps {
  id: string;
  name: string;
  creator: string;
  image: string;
  price: number;
  likes: number;
  mode: string;
  className?: string;
  onSell?: () => Promise<void>;
}

export function NFTCard({
  id,
  name,
  creator,
  image,
  price,
  likes,
  mode,
  className,
  onSell,
}: NFTCardProps) {
  const { sellNFT } = useWallet();

  const handleSell = async () => {
    try {
      await sellNFT({ id, name, creator, image, price, likes });
      toast.success(`"${name}" listed for sale`);
    } catch (error) {
      toast.error("Failed to list NFT for sale");
      console.error("Sell error:", error);
    }
  };

  return (
    <CardGlow
      className={cn("w-full max-w-sm", className)}
      glowClassName="bg-gradient-to-r from-purple-500 to-blue-500"
    >
      <div className="relative overflow-hidden rounded-xl glassmorphism border-none">
        <div className="aspect-square w-full overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold truncate">{name}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <Heart className="h-4 w-4 mr-1" />
              <span>{likes}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-3">By {creator}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Bitcoin className="h-4 w-4 mr-1 text-blue-400" />
              <span className="font-medium">{price} NFT</span>
            </div>
            {mode === "sell" ? (
              <button
                onClick={handleSell}
                className="px-3 py-1 text-xs rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Sell Now
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </CardGlow>
  );
}