import { cn } from "@/lib/utils"

interface CircularProgressProps {
  /** 0–100 */
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  color?: string
  label?: React.ReactNode
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 10,
  className,
  color = "hsl(var(--primary))",
  label,
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label ?? <span className="text-2xl font-bold">{Math.round(clamped)}%</span>}
      </div>
    </div>
  )
}
