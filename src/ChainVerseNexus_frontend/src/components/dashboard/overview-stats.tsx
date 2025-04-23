import { StatCard } from "@/components/ui/stat-card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export function OverviewStats() {
  return (
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 h-full w-full max-w-full mx-auto">
  {/* NFT Price Trend - Full Width */}
  <div className="md:col-span-2 lg:col-span-4">
    <StatCard
      title="NFT Price Trend"
      icon={Activity}
      data={[
        { date: "Apr 1", price: 0.0035 },
        { date: "Apr 2", price: 0.0037 },
        { date: "Apr 3", price: 0.0039 },
        { date: "Apr 4", price: 0.004 },
        { date: "Apr 5", price: 0.0042 },
        { date: "Apr 6", price: 0.0044 },
      ]}
      chartType="line"
      value="+12.5%"
      trend={{ value: 12.5, isPositive: true }}
    />
  </div>
</div>

  );
}
