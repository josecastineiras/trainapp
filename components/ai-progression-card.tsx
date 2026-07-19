"use client"

import { TrendingUp, Sparkles, ArrowRight } from "lucide-react"
import { getProgressionSuggestion } from "@/lib/ai-insights"

interface AIProgressionCardProps {
  studentId: string
  onApplyToRoutine: () => void
}

export function AIProgressionCard({ studentId, onApplyToRoutine }: AIProgressionCardProps) {
  const s = getProgressionSuggestion(studentId)

  return (
    <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground text-sm">Sugerencia de progresion IA</h3>
      </div>

      {s.stalledWeeks > 0 ? (
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground">
            <TrendingUp className="w-3 h-3" />
            Meseta de {s.stalledWeeks} semanas
          </span>
          <span className="text-xs text-muted-foreground">en {s.skill}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-chart-1/15 text-chart-1">
            <TrendingUp className="w-3 h-3" />
            Progresion saludable
          </span>
          <span className="text-xs text-muted-foreground">en {s.skill}</span>
        </div>
      )}

      <p className="text-sm text-foreground leading-relaxed">{s.insight}</p>

      <div className="mt-3 rounded-lg bg-card border border-border p-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          Variante sugerida
        </p>
        <p className="text-sm text-foreground">{s.variant}</p>
        <p className="text-xs text-primary mt-2">Esperado: {s.expectedGain}</p>
      </div>

      <button
        onClick={onApplyToRoutine}
        className="mt-3 w-full flex items-center justify-center gap-2 bg-primary/10 text-primary font-medium py-2.5 px-4 rounded-xl transition-all hover:bg-primary/15 text-sm"
      >
        Aplicar en una rutina
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
