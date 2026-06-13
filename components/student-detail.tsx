"use client"

import { useState } from "react"
import { useStudents } from "@/lib/students-context"
import { useAuth } from "@/lib/auth-context"
import { ArrowLeft, MessageSquare, FileText, Clock, Calendar, TrendingUp } from "lucide-react"
import { getTotalTrainingTime, getSkillAverages } from "@/lib/mock-data"
import { AddFeedbackForm } from "./add-feedback-form"
import { FeedbackList } from "./feedback-list"

interface StudentDetailProps {
  studentId: string
  onBack: () => void
}

export function StudentDetail({ studentId, onBack }: StudentDetailProps) {
  const { getStudentById, getStudentFeedback } = useStudents()
  const { user } = useAuth()
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  const student = getStudentById(studentId)
  const feedback = getStudentFeedback(studentId)

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Atleta no encontrado</p>
        <button onClick={onBack} className="mt-4 text-primary">
          Volver
        </button>
      </div>
    )
  }

  const totalMinutes = getTotalTrainingTime(student.sessions)
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60
  const skillAverages = getSkillAverages(student.sessions)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "principiante":
        return "bg-chart-2/20 text-chart-2"
      case "intermedio":
        return "bg-chart-1/20 text-chart-1"
      case "avanzado":
        return "bg-accent/20 text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-14 h-14 rounded-full bg-muted"
          />
          <div>
            <h2 className="text-xl font-bold text-foreground">{student.name}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(student.level)}`}>
              {student.level.charAt(0).toUpperCase() + student.level.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <Calendar className="w-5 h-5 mx-auto mb-2 text-chart-1" />
          <p className="text-2xl font-bold text-foreground">{student.sessions.length}</p>
          <p className="text-xs text-muted-foreground">Sesiones</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <Clock className="w-5 h-5 mx-auto mb-2 text-chart-2" />
          <p className="text-2xl font-bold text-foreground">{totalHours}h {remainingMinutes}m</p>
          <p className="text-xs text-muted-foreground">Tiempo total</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <TrendingUp className="w-5 h-5 mx-auto mb-2 text-accent" />
          <p className="text-2xl font-bold text-foreground">{feedback.length}</p>
          <p className="text-xs text-muted-foreground">Feedbacks</p>
        </div>
      </div>

      {/* Skills Progress */}
      {skillAverages.length > 0 && (
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="font-semibold text-foreground mb-4">Progreso de Habilidades</h3>
          <div className="space-y-3">
            {skillAverages.map(({ skill, average }) => (
              <div key={skill} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{skill}</span>
                  <span className="font-medium text-foreground">{average}/5</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(average / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 px-4 rounded-xl transition-all hover:opacity-90"
        >
          <MessageSquare className="w-4 h-4" />
          Dar Feedback
        </button>
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="flex items-center justify-center gap-2 bg-card text-foreground font-medium py-3 px-4 rounded-xl border border-border transition-all hover:bg-muted"
        >
          <FileText className="w-4 h-4" />
          Instruccion
        </button>
      </div>

      {/* Feedback History */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Historial de Feedback</h3>
        <FeedbackList feedback={feedback} />
      </div>

      {/* Add Feedback Modal */}
      {showFeedbackForm && user && (
        <AddFeedbackForm
          studentId={studentId}
          instructorId={user.id}
          onClose={() => setShowFeedbackForm(false)}
        />
      )}
    </div>
  )
}
