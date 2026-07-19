"use client"

import { useState } from "react"
import { X, Sparkles, Loader2, Check, Pencil, ShieldCheck, RefreshCw, Send } from "lucide-react"
import { getTrainingTypeInfo, getSportConfig, type SportId } from "@/lib/types"
import {
  generateWeeklyRoutine,
  type GeneratedRoutine,
  type RoutineGoalInput,
} from "@/lib/ai-insights"

interface AIRoutineGeneratorProps {
  studentId: string
  studentName: string
  sport: SportId
  onClose: () => void
}

type Stage = "config" | "thinking" | "review" | "approved"

export function AIRoutineGenerator({ studentId, studentName, sport, onClose }: AIRoutineGeneratorProps) {
  const sportConfig = getSportConfig(sport)
  const [stage, setStage] = useState<Stage>("config")
  const [routine, setRoutine] = useState<GeneratedRoutine | null>(null)

  const [objetivo, setObjetivo] = useState("Mejorar consistencia de fondo")
  const [enfoque, setEnfoque] = useState(sportConfig.skills[0])
  const [diasPorSemana, setDiasPorSemana] = useState(4)
  const [considerarLesiones, setConsiderarLesiones] = useState(true)

  function handleGenerate() {
    const input: RoutineGoalInput = { objetivo, enfoque, diasPorSemana, considerarLesiones }
    setStage("thinking")
    // Simulacion del procesamiento de la agente TIA (mockup, sin llamada real)
    setTimeout(() => {
      setRoutine(generateWeeklyRoutine(studentId, input))
      setStage("review")
    }, 1900)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-card w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-4 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground leading-tight">Generar rutina con TIA</h2>
              <p className="text-xs text-muted-foreground">{studentName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Aviso: la agente TIA no reemplaza al entrenador */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20">
            <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-foreground leading-relaxed">
              La agente TIA arma el borrador en segundos a partir de datos reales. <strong>Nada se envia al atleta sin tu aprobacion.</strong>
            </p>
          </div>

          {stage === "config" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Objetivo</label>
                <input
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:border-primary focus:outline-none text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Enfoque principal</label>
                <div className="flex flex-wrap gap-2">
                  {sportConfig.skills.slice(0, 6).map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => setEnfoque(skill)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        enfoque === skill
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Dias por semana: <span className="text-primary">{diasPorSemana}</span>
                </label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setDiasPorSemana(n)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                        diasPorSemana === n
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConsiderarLesiones((v) => !v)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border"
              >
                <span className="text-sm font-medium text-foreground">Considerar lesiones previas</span>
                <span
                  className={`relative w-10 h-6 rounded-full transition-colors ${
                    considerarLesiones ? "bg-primary" : "bg-border"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-card transition-all ${
                      considerarLesiones ? "left-5" : "left-1"
                    }`}
                  />
                </span>
              </button>

              <p className="text-xs text-muted-foreground leading-relaxed">
                La agente TIA usa el objetivo, el nivel, las lesiones previas y el historial real de cargas del atleta.
              </p>

              <button
                onClick={handleGenerate}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 px-4 rounded-xl transition-all hover:opacity-90"
              >
                <Sparkles className="w-4 h-4" />
                Generar plan semanal
              </button>
            </div>
          )}

          {stage === "thinking" && (
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <div>
                <p className="font-medium text-foreground">Armando el plan...</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Analizando historial de cargas, nivel y lesiones
                </p>
              </div>
            </div>
          )}

          {stage === "review" && routine && (
            <div className="space-y-4">
              <div className="flex items-start gap-2 rounded-xl bg-muted/50 border border-border p-3">
                <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{routine.summary}</p>
                  <ul className="mt-2 space-y-1">
                    {routine.rationale.map((r, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                        <span className="text-primary">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Borrador editable
                </span>
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:opacity-80"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerar
                </button>
              </div>

              <div className="space-y-2">
                {routine.days.map((d) => (
                  <div
                    key={d.day}
                    className={`rounded-xl border p-3 ${
                      d.rest ? "border-border bg-muted/30" : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-foreground">{d.day}</span>
                      <span className="text-xs text-muted-foreground">{d.title}</span>
                    </div>
                    {d.rest ? (
                      <p className="text-xs text-muted-foreground mt-1">Recuperacion / movilidad ligera</p>
                    ) : (
                      <div className="mt-2 space-y-2">
                        {d.exercises.map((ex, i) => {
                          const info = getTrainingTypeInfo(sport, ex.focus)
                          return (
                            <div key={i} className="flex items-start gap-2">
                              <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${info.color}`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground">{ex.name}</p>
                                <p className="text-xs text-muted-foreground">{ex.detail}</p>
                              </div>
                              <Pencil className="w-3.5 h-3.5 text-muted-foreground/60 flex-shrink-0 mt-0.5" />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-card pt-2 pb-1 space-y-2">
                <button
                  onClick={() => setStage("approved")}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 px-4 rounded-xl transition-all hover:opacity-90"
                >
                  <Check className="w-4 h-4" />
                  Aprobar y enviar al atleta
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Podes editar cada bloque antes de aprobar
                </p>
              </div>
            </div>
          )}

          {stage === "approved" && (
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Plan aprobado y enviado</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {studentName} ya tiene su rutina de la semana disponible.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-muted text-foreground font-medium py-3 px-4 rounded-xl transition-all hover:bg-muted/80"
              >
                <Send className="w-4 h-4" />
                Listo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
