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
    </div>
  );
};

export default ChainExplorer;
