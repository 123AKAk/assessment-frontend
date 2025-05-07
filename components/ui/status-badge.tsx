import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: "active" | "inactive";
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "active"
          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        className
      )}
    >
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );
}