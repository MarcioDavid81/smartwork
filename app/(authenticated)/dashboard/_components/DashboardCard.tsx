import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DashboardCard({ title, value, icon, variant }: {
  title: string;
  value: string | number;
  icon: JSX.Element;
  variant?: "default" | "danger";
}) {
  return (
    <Card className={cn(
      "flex items-center gap-4 p-4 shadow-sm border-l-4",
      variant === "danger" ? "border-red-500 bg-red-50" : "border-[#78b49a]"
    )}>
      <div className="p-2 rounded-full bg-[#78b49a]/10 text-[#78b49a]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </Card>
  );
}