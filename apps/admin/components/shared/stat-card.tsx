import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  trend?: { value: number; label: string };
  accentColor?: "blue" | "brass" | "green" | "purple";
  className?: string;
}

const accentMap = {
  blue: {
    icon: "bg-[#1E6FA8]/15 text-[#2A8FD4]",
    glow: "before:from-[#1E6FA8]/8",
    value: "text-[#2A8FD4]",
  },
  brass: {
    icon: "bg-[#B08D57]/15 text-[#C9A46E]",
    glow: "before:from-[#B08D57]/8",
    value: "text-[#C9A46E]",
  },
  green: {
    icon: "bg-green-500/10 text-green-400",
    glow: "before:from-green-500/8",
    value: "text-green-400",
  },
  purple: {
    icon: "bg-purple-500/10 text-purple-400",
    glow: "before:from-purple-500/8",
    value: "text-purple-400",
  },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  accentColor = "blue",
  className,
}: StatCardProps) {
  const accent = accentMap[accentColor];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-[#2C333C] bg-[#1C2025] p-5 transition-all duration-200 hover:border-[#3C434C] hover:-translate-y-0.5 hover:shadow-lg",
        className
      )}
    >
      {/* Glow orb */}
      <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#B08D57]/6 to-transparent blur-xl pointer-events-none" />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-widest text-[#8B919A] uppercase mb-3">
            {label}
          </p>
          <p className={cn("text-3xl font-light font-serif tracking-tight", accent.value)}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.value > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span className={cn("text-xs", trend.value > 0 ? "text-green-400" : "text-red-400")}>
                {trend.value > 0 ? "+" : ""}{trend.value}
              </span>
              <span className="text-xs text-[#555D67]">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", accent.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
