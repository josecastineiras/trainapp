"use client"

import { useSessions } from "@/lib/sessions-context"
import { useAuth } from "@/lib/auth-context"
import { getTotalTrainingTime } from "@/lib/mock-data"
import { mockAchievements } from "@/lib/mock-data"
import { Clock, Calendar, Trophy, TrendingUp } from "lucide-react"

export function StatsOverview() {
  const { sessions } = useSessions()
  const { user } = useAuth()

  const totalMinutes = getTotalTrainingTime(sessions)
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60
  const unlockedAchievements = mockAchievements.filter((a) => a.unlockedAt).length

  const levelColors = {
    principiante: "bg-chart-2 text-chart-2-foreground",
    intermedio: "bg-chart-1 text-primary-foreground",
    avanzado: "bg-chart-4 text-accent-foreground",
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        icon={<Clock className="w-4 h-4" />}
        label="Tiempo total"
        value={`${totalHours}h ${remainingMinutes}m`}
        color="bg-chart-1/10 text-chart-1"
      />
      <StatCard
        icon={<Calendar className="w-4 h-4" />}
        label="Sesiones"
        value={sessions.length.toString()}
        color="bg-chart-2/10 text-chart-2"
      />
      <StatCard
        icon={<Trophy className="w-4 h-4" />}
        label="Logros"
        value={`${unlockedAchievements}/${mockAchievements.length}`}
        color="bg-chart-4/10 text-chart-4"
      />
      <StatCard
        icon={<TrendingUp className="w-4 h-4" />}
        label="Nivel"
        value={user?.level || "---"}
        color="bg-chart-3/10 text-chart-3"
        capitalize
      />
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
  capitalize = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
  capitalize?: boolean
}) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className={`text-lg font-bold text-foreground ${capitalize ? "capitalize" : ""}`}>
        {value}
      </p>
    </div>
  )
}
