import { useEffect, useState } from "react";
import axios from "axios";
import { ChainCard } from "@/components/ui/chain-card";

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

const useChainOverview = (): ChainData[] => {
  const [chains, setChains] = useState<ChainData[]>([]);

  const COINS = [
    { id: "ethereum", displayName: "Ethereum", color: "#627EEA", llamaId: "ethereum" },
    { id: "solana", displayName: "Solana", color: "#14F195", llamaId: "solana" },
    { id: "matic-network", displayName: "Polygon", color: "#8247E5", llamaId: "polygon" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // CoinGecko Data
        const coinGeckoRes = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: COINS.map((c) => c.id).join(","),
              order: "market_cap_desc"
            }
          }
        );

        // DefiLlama Data
        const llamaRes = await axios.get("https://api.llama.fi/chains");
        const llamaData = llamaRes.data;

        const formatted = coinGeckoRes.data.map((coin: any): ChainData => {
          const meta = COINS.find((c) => c.id === coin.id)!;
          const tvlInfo = llamaData.find((d: any) =>
            d.name.toLowerCase().includes(meta.llamaId)
          );

          return {
            id: coin.id,
            name: meta.displayName,
            icon: coin.image,
            color: meta.color,
            stats: [
              { label: "Price", value: `$${coin.current_price.toLocaleString()}` },
              { label: "24h Change", value: `${coin.price_change_percentage_24h?.toFixed(2)}%` },
              { label: "Market Cap", value: `$${(coin.market_cap / 1e9).toFixed(1)}B` },
              { label: "TVL", value: tvlInfo ? `$${(tvlInfo.tvl / 1e9).toFixed(2)}B` : "N/A" }
            ]
          };
        });

        setChains(formatted);
      } catch (err) {
        console.error("Error loading chain data", err);
      }
    };

    fetchData();
  }, []);

  return chains;
};

export function ChainOverview() {
  const chains = useChainOverview();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Chain Overview</h2>
        <a href="/chains" className="text-primary text-sm hover:underline">
          View All Chains
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
  );
}
