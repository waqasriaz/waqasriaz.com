interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "violet" | "green" | "blue" | "amber";
}

const colorClasses = {
  violet: "from-[#5b21b6] to-[#7c3aed]",
  green: "from-emerald-500 to-emerald-600",
  blue: "from-blue-500 to-blue-600",
  amber: "from-amber-500 to-amber-600",
};

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  color = "violet",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend.isPositive ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}% from last week
            </p>
          )}
        </div>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center text-white`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
