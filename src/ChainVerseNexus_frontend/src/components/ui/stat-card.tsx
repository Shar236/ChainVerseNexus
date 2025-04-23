import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js registration
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Interface for props
interface StatCardProps {
  title: string;
  value?: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  data?: { date: string; price: number }[];
  icon: LucideIcon;
  className?: string;
  chartType?: "line" | "bar"; // Allow 'line' or 'bar' chart types
}

// StatCard Component
export function StatCard({
  title,
  value,
  trend,
  data,
  icon: Icon,
  className,
  chartType = "line", // Default to 'line'
}: StatCardProps) {
  const [liveData, setLiveData] = useState(data || []);

  useEffect(() => {
    if (!data) return; // Skip if no initial data

    // Fetch live mock data
    const fetchLiveData = async () => {
      try {
        const newData = Array.from({ length: 10 }, (_, i) => ({
          date: new Date(Date.now() - (9 - i) * 86400000).toISOString().split("T")[0],
          price: Math.random() * 100 + 50,
        }));
        setLiveData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 2000);
    return () => clearInterval(interval); // Cleanup interval
  }, [data]);

  const chartData = liveData && {
    labels: liveData.map((item) => item.date),
    datasets: [
      {
        label: "Price",
        data: liveData.map((item) => item.price),
        borderColor: "rgba(34, 211, 238, 1)",
        backgroundColor: "rgba(34, 211, 238, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#cbd5e1",
      },
    },
    scales: {
      x: { display: true, title: { display: true, text: "Date" } },
      y: { display: true, title: { display: true, text: "Price ($)" }, beginAtZero: false },
    },
    elements: {
      line: {
        borderWidth: 3,
        tension: 0.4,
      },
      point: {
        radius: 3, // Make points visible for better clarity
      },
    },
  };

  return (
    <Card className={cn("overflow-hidden glassmorphism hover-scale", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {liveData.length > 0 ? (
          <div className="h-40 px-1 pt-1 rounded-md bg-gradient-to-br from-[#0f172a] to-[#1e293b] shadow-inner">
            <Line data={chartData} options={options} />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {trend && (
              <p
                className={cn(
                  "text-xs mt-1",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}