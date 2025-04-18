
import { Navbar } from "@/components/navbar";
import { NFTBuyCard } from "@/components/ui/nft-buy-card";
import { Button } from "@/components/ui/button";
import { Filter, Grid, LayoutGrid } from "lucide-react";
import { MyNFTs } from "@/components/my-nfts";

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
            
            <div className="flex justify-center mt-10">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gradient-to-r from-[#1c1e2b] via-[#232640] to-[#1f2235] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           
            <div>
              <h2 className="text-3xl font-bold mb-4 ml-6 text-purple-400">ChainVerse Nexus</h2>
              <p className="text-sm ml-6 text-gray-300">
              Explore the future of blockchain with our seamless NFT and blockchain platform.
              </p>
            </div>

           
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
                <li><a href="./nft-gallery" className="hover:text-white transition">NFT Gallery</a></li>
                <li><a href="./chains" className="hover:text-white transition">Chain Explorer</a></li>
                <li><a href="#" className="hover:text-white transition">Market Insights</a></li>
              </ul>
            </div>

            
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

           
            <div>
              <h3 className="text-lg font-semibold mb-3">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-white">
                  <i className="fab fa-discord"></i>
                </a>
                <a href="https://github.com/Piyush01-672" className="hover:text-white">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="hover:text-white">
                  <i className="fab fa-telegram-plane"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            © 2025 ChainVerse Nexus. Built with 💜 for the blockchain future.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NFTGallery;
