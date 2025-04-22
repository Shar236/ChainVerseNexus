
import { Navbar } from "@/components/navbar";
import { NFTBuyCard } from "@/components/ui/nft-buy-card";
import { Button } from "@/components/ui/button";
import { Filter, Grid, LayoutGrid } from "lucide-react";
import { MyNFTs } from "@/components/my-nfts";
import Footer from "@/components/Footer";

// Expanded NFT gallery data
const GALLERY_NFTS = [
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
  },
  {
    id: "5",
    name: "Digital Genesis",
    creator: "VirtualOrigins",
    image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&auto=format&fit=crop",
    price: 3.2,
    likes: 324
  },
  {
    id: "6",
    name: "Pixel Reality",
    creator: "BitArtist",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&auto=format&fit=crop",
    price: 1.45,
    likes: 112
  },
  {
    id: "7",
    name: "Ethereal Construct",
    creator: "DreamArchitect",
    image: "https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=800&auto=format&fit=crop",
    price: 2.75,
    likes: 189
  },
  {
    id: "8",
    name: "Digital Cosmos #28",
    creator: "SpaceVisions",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&auto=format&fit=crop",
    price: 1.05,
    likes: 97
  }
];

const NFTGallery = () => {
  return (
    
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="space-y-10">
          {/* My NFTs Section */}
          <MyNFTs />
          
          {/* Available NFTs Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight">Available NFTs</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
                <div className="flex items-center rounded-md border">
                  <Button variant="ghost" size="icon" className="rounded-r-none">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-l-none">
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {GALLERY_NFTS.map((nft) => (
                <NFTBuyCard key={nft.id} nft={nft} />
              ))}
            </div>
          </div>
        </div>
      </main>
        <Footer />
    </div>
  );
};

export default NFTGallery;