
import { StatCard } from "@/components/ui/stat-card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export function OverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Volume"
        value="$4.2M"
        icon={DollarSign}
        trend={{ value: 12.5, isPositive: true }}
      />
      <StatCard
        title="Active Users"
        value="18.6K"
        icon={Users}
        trend={{ value: 8.2, isPositive: true }}
      />
      <StatCard
        title="Transactions"
        value="32.4K"
        icon={Activity}
        trend={{ value: 3.1, isPositive: true }}
      />
      <StatCard
        title="Avg. Gas Fee"
        value="0.0042 ETH"
        icon={CreditCard}
        trend={{ value: 5.4, isPositive: false }}
      />
    </div>
  );
}
