interface CategoryBadgeProps {
  name: string;
  color: string;
  size?: "sm" | "md";
}

export default function CategoryBadge({
  name,
  color,
  size = "sm",
}: CategoryBadgeProps) {
  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
    >
      {name}
    </span>
  );
}
