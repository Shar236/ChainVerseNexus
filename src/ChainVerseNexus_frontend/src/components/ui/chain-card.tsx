
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChainCardProps {
  name: string;
  icon: string;
  stats: {
    label: string;
    value: string | number;
  }[];
  color: string;
  className?: string;
}

export function ChainCard({ name, icon, stats, color, className }: ChainCardProps) {
  return (
    <Card className={cn("overflow-hidden glassmorphism hover-scale", className)}>
      <div 
        className="h-2" 
        style={{ backgroundColor: color }}
      />
      <CardHeader className="flex flex-row items-center space-x-3 pb-2">
        <img src={icon} alt={name} className="h-8 w-8" />
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className="font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
