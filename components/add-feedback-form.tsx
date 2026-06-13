"use client"

import { useState } from "react"
import { useStudents } from "@/lib/students-context"
import { X, MessageSquare, FileText, Send } from "lucide-react"
import type { Feedback } from "@/lib/types"

interface AddFeedbackFormProps {
  studentId: string
  instructorId: string
  onClose: () => void
}

const CATEGORIES = [
  { value: "tecnica", label: "Tecnica" },
  { value: "tactica", label: "Tactica" },
  { value: "actitud", label: "Actitud" },
  { value: "fisico", label: "Fisico" },
  { value: "general", label: "General" },
] as const

export function AddFeedbackForm({ studentId, instructorId, onClose }: AddFeedbackFormProps) {
  const { addFeedback, getStudentById } = useStudents()
  const [type, setType] = useState<"feedback" | "instruccion">("feedback")
  const [category, setCategory] = useState<Feedback["category"]>("general")
  const [priority, setPriority] = useState<Feedback["priority"]>("normal")
  const [message, setMessage] = useState("")

  const student = getStudentById(studentId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    addFeedback({
      studentId,
      instructorId,
      type,
      category,
      priority,
      message: message.trim(),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-card w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">
            {type === "feedback" ? "Dar Feedback" : "Enviar Instruccion"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Student Info */}
          {student && (
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-foreground">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.email}</p>
              </div>
            </div>
          )}

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tipo de mensaje
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType("feedback")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  type === "feedback"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium">Feedback</span>
              </button>
              <button
                type="button"
                onClick={() => setType("instruccion")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  type === "instruccion"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="font-medium">Instruccion</span>
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Categoria
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    category === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Prioridad
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPriority("normal")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  priority === "normal"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="font-medium text-foreground">Normal</span>
              </button>
              <button
                type="button"
                onClick={() => setPriority("importante")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  priority === "importante"
                    ? "border-accent bg-accent/20"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <span className="font-medium text-foreground">Importante</span>
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {type === "feedback" ? "Tu feedback" : "Instrucciones"}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                type === "feedback"
                  ? "Escribe tu feedback sobre el progreso del atleta..."
                  : "Escribe las instrucciones para el atleta..."
              }
              rows={4}
              className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:border-primary focus:outline-none resize-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!message.trim()}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 px-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            Enviar {type === "feedback" ? "Feedback" : "Instruccion"}
          </button>
        </form>
      </div>
    </div>
  )
}
