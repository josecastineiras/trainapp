"use client"

import { useSessions } from "@/lib/sessions-context"
import { getSkillAverages } from "@/lib/mock-data"

export function SkillsChart() {
  const { sessions } = useSessions()
  const skillAverages = getSkillAverages(sessions)

  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
      <h3 className="font-semibold text-foreground mb-4">Habilidades</h3>
      <div className="space-y-3">
        {skillAverages.map(({ skill, average }) => (
          <SkillBar key={skill} skill={skill} rating={average} />
        ))}
      </div>
    </div>
  )
}

function SkillBar({ skill, rating }: { skill: string; rating: number }) {
  const percentage = (rating / 5) * 100

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground">{skill}</span>
        <span className="text-muted-foreground font-medium">{rating}/5</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
