"use client"

import { useState } from "react"
import { useSessions } from "@/lib/sessions-context"
import { useAuth } from "@/lib/auth-context"
import { getSportConfig, type SkillProgress } from "@/lib/types"
import { Plus, X, Check } from "lucide-react"

export function AddSessionForm() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 z-40"
        aria-label="Agregar sesion"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && <SessionFormModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

function SessionFormModal({ onClose }: { onClose: () => void }) {
  const { addSession } = useSessions()
  const { user } = useAuth()
  const sportConfig = getSportConfig(user?.sport ?? "tenis")
  const SKILLS = sportConfig.skills
  const trainingTypes = sportConfig.trainingTypes
  const [type, setType] = useState<string>(trainingTypes[0].key)
  const [duration, setDuration] = useState(60)
  const [notes, setNotes] = useState("")
  const [skills, setSkills] = useState<SkillProgress[]>([
    { skill: SKILLS[0], rating: 3 },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addSession({
      date: new Date().toISOString().split("T")[0],
      duration,
      type,
      skills,
      notes,
    })
    onClose()
  }

  const addSkill = () => {
    const unusedSkills = SKILLS.filter(
      (s) => !skills.some((sk) => sk.skill === s)
    )
    if (unusedSkills.length > 0) {
      setSkills([...skills, { skill: unusedSkills[0], rating: 3 }])
    }
  }

  const updateSkill = (index: number, field: "skill" | "rating", value: string | number) => {
    const newSkills = [...skills]
    if (field === "skill") {
      newSkills[index].skill = value as string
    } else {
      newSkills[index].rating = value as number
    }
    setSkills(newSkills)
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card w-full max-w-lg rounded-t-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="font-bold text-lg text-foreground">Nueva sesion</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-5">
          {/* Tipo de entrenamiento */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Tipo de entrenamiento
            </label>
            <div className="grid grid-cols-2 gap-2">
              {trainingTypes.map(({ key, label, color }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setType(key)}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    type === key
                      ? `border-primary ${color} text-primary-foreground`
                      : "border-border bg-muted/50 text-foreground hover:border-primary/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Duracion */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Duracion: {duration} minutos
            </label>
            <input
              type="range"
              min="15"
              max="180"
              step="15"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>15min</span>
              <span>180min</span>
            </div>
          </div>

          {/* Habilidades */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Habilidades trabajadas
            </label>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <select
                    value={skill.skill}
                    onChange={(e) => updateSkill(index, "skill", e.target.value)}
                    className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                  >
                    {SKILLS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => updateSkill(index, "rating", rating)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                          skill.rating >= rating
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  {skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {skills.length < SKILLS.length && (
                <button
                  type="button"
                  onClick={addSkill}
                  className="w-full p-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  + Agregar habilidad
                </button>
              )}
            </div>
          </div>

          {/* Notas */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Notas (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Como fue tu sesion?"
              rows={3}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <Check className="w-5 h-5" />
            Guardar sesion
          </button>
        </form>
      </div>
    </div>
  )
}
