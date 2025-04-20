import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { ChainCard } from "@/components/ui/chain-card";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type ChainStat = {
  label: string;
  value: string;
};

type ChainData = {
  id: string;
  name: string;
  icon: string;
  color: string;
  stats: ChainStat[];
};

const useCryptoData = (): ChainData[] => {
  const [data, setData] = useState<ChainData[]>([]);

  const COINS = [
    { id: "ethereum", color: "#627EEA" },
    { id: "solana", color: "#14F195" },
    { id: "polygon", color: "#8247E5" },
    { id: "avalanche-2", color: "#E84142" },
    { id: "binancecoin", color: "#F0B90B" },
    { id: "cardano", color: "#0033AD" }
  ];

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: COINS.map((c) => c.id).join(","),
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false
            }
          }
        );

        const formatted = response.data.map((coin: any): ChainData => {
          const color = COINS.find((c) => c.id === coin.id)?.color || "#ccc";

          return {
            id: coin.id,
            name: coin.name,
            icon: coin.image,
            color,
            stats: [
              { label: "Price", value: `$${coin.current_price.toLocaleString()}` },
              { label: "24h Change", value: `${coin.price_change_percentage_24h?.toFixed(2)}%` },
              { label: "Market Cap", value: `$${(coin.market_cap / 1e9).toFixed(1)}B` },
              { label: "TVL", value: "N/A" }
            ]
          };
        });

        setData(formatted);
      } catch (error) {
        console.error("Failed to fetch crypto data", error);
      }
    };

    fetchCryptoData();
  }, []);

  return data;
};

const ChainExplorer: React.FC = () => {
  const chains = useCryptoData();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Chain Explorer</h1>
            <p className="text-muted-foreground">
              Explore and compare blockchain networks across the omnichain ecosystem
            </p>
          </div>

          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search chains..."
                    className="pl-9 bg-muted/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chains.map((chain) => (
              <ChainCard
                key={chain.id}
                name={chain.name}
                icon={chain.icon}
                color={chain.color}
                stats={chain.stats}
              />
            ))}
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

export default ChainExplorer;
