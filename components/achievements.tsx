"use client"

import { mockAchievements } from "@/lib/mock-data"
import { Trophy, Flame, Target, Clock, Star, Lock } from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy,
  flame: Flame,
  target: Target,
  clock: Clock,
  star: Star,
}

export function Achievements() {
  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
      <h3 className="font-semibold text-foreground mb-4">Logros</h3>
      <div className="grid grid-cols-3 gap-3">
        {mockAchievements.map((achievement) => {
          const Icon = iconMap[achievement.icon] || Trophy
          const isUnlocked = !!achievement.unlockedAt

          return (
            <div
              key={achievement.id}
              className={`flex flex-col items-center text-center p-3 rounded-xl transition-all ${
                isUnlocked
                  ? "bg-accent/20"
                  : "bg-muted/50 opacity-50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  isUnlocked ? "bg-accent" : "bg-muted"
                }`}
              >
                {isUnlocked ? (
                  <Icon className="w-6 h-6 text-accent-foreground" />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <p className="text-xs font-medium text-foreground leading-tight">
                {achievement.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
