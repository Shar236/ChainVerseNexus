
import { NFTBuyCard } from "@/components/ui/nft-buy-card";

// Sample NFT data - in a real app this would come from an API
const DEMO_NFTS = [
  {
    id: "1",
    name: "Nebula Dreamer #042",
    creator: "CosmicArtLabs",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=2574&auto=format&fit=crop",
    price: 0.85,
    likes: 142
  },
  {
    id: "2",
    name: "Quantum Fragment #36",
    creator: "DigitalEther",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    price: 1.2,
    likes: 89
  },
  {
    id: "3",
    name: "Synthwave Sunset",
    creator: "NeonWave",
    image: "https://images.unsplash.com/photo-1608501078713-8e445a709b39?q=80&w=2670&auto=format&fit=crop",
    price: 2.4,
    likes: 215
  },
  {
    id: "4",
    name: "Cybernetic Vision #7",
    creator: "FutureScapes",
    image: "https://th.bing.com/th/id/OIP.8ujP8kkC4QG_JXFZTA8T7wHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    price: 1.85,
    likes: 176
  }
];

export function FeaturedNFTs() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Featured NFTs</h2>
        <a 
          href="/nft-gallery" 
          className="text-primary text-sm hover:underline"
        >
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DEMO_NFTS.map((nft) => (
          <NFTBuyCard
            key={nft.id}
            nft={nft}
          />
        ))}
      </div>
    </div>
  );
}
