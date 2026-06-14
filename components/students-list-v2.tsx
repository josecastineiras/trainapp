"use client"
import { useStudents } from "@/lib/students-context"
import { useAuth } from "@/lib/auth-context"
import { getSportConfig } from "@/lib/types"
import { ChevronRight, Clock, Calendar, TrendingUp, Coins } from "lucide-react"
import { getTotalTrainingTime } from "@/lib/mock-data"

interface StudentsListProps {
  onSelectStudent: (studentId: string) => void
  onOpenPagos: () => void
  onOpenCalendario: () => void
}

export function StudentsList({ onSelectStudent, onOpenPagos, onOpenCalendario }: StudentsListProps) {
  const { students, getStudentFeedback } = useStudents()
  const { user } = useAuth()
  const sportConfig = getSportConfig(user?.sport ?? "tenis")
  const noun = sportConfig.studentNoun.toLowerCase() + "s"

  const getLevelColor = (level: string) => {
    switch (level) {
      case "principiante": return "bg-chart-2 text-chart-2"
      case "intermedio":   return "bg-chart-1 text-chart-1"
      case "avanzado":     return "bg-accent text-accent-foreground"
      default:             return "bg-muted text-muted-foreground"
    }
  }

  const getLevelLabel = (level: string) =>
    level.charAt(0).toUpperCase() + level.slice(1)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Mis {sportConfig.studentNoun}s</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{students.length} {noun}</span>
          <button
            onClick={onOpenCalendario}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            Agenda
          </button>
          <button
            onClick={onOpenPagos}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-950 text-teal-400 text-xs font-medium hover:bg-teal-900 transition-colors"
          >
            <Coins className="w-3.5 h-3.5" />
            Pagos
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {students.map((student) => {
          const totalMinutes = getTotalTrainingTime(student.sessions)
          const totalHours = Math.floor(totalMinutes / 60)
          const feedbackCount = getStudentFeedback(student.id).length
          return (
            <button
              key={student.id}
              onClick={() => onSelectStudent(student.id)}
              className="w-full bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-12 h-12 rounded-full bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-opacity-20 ${getLevelColor(student.level)}`}>
                      {getLevelLabel(student.level)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {student.sessions.length} sesiones
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {totalHours}h entrenadas
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {feedbackCount} feedbacks
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
