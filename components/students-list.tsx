"use client"
import { useStudents } from "@/lib/students-context"
import { useAuth } from "@/lib/auth-context"
import { getSportConfig } from "@/lib/types"
import { ChevronRight, Clock, Calendar, TrendingUp, Coins, AlertTriangle } from "lucide-react"
import { getTotalTrainingTime } from "@/lib/mock-data"
import { getRetentionRisk, RISK_STYLES } from "@/lib/ai-insights"

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

  const atRisk = students
    .map((s) => ({ student: s, risk: getRetentionRisk(s.id) }))
    .filter((x) => x.risk.level !== "verde")
    .sort((a, b) => b.risk.score - a.risk.score)

  const rojoCount = atRisk.filter((x) => x.risk.level === "rojo").length
  const amarilloCount = atRisk.filter((x) => x.risk.level === "amarillo").length

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

      {/* Alerta temprana de abandono (agente TIA) */}
      {atRisk.length > 0 && (
        <div className="rounded-xl border border-accent/40 bg-accent/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-accent-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Alerta temprana de abandono</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            La agente TIA detecto{" "}
            {rojoCount > 0 && (
              <>
                <span className="font-medium text-destructive">{rojoCount} en riesgo alto</span>
                {amarilloCount > 0 ? " y " : ""}
              </>
            )}
            {amarilloCount > 0 && (
              <span className="font-medium text-accent-foreground">{amarilloCount} para vigilar</span>
            )}
            . Retener cuesta una fraccion de conseguir un {sportConfig.studentNoun.toLowerCase()} nuevo.
          </p>
          <div className="mt-3 space-y-2">
            {atRisk.slice(0, 3).map(({ student, risk }) => (
              <button
                key={student.id}
                onClick={() => onSelectStudent(student.id)}
                className="w-full flex items-center gap-2 text-left rounded-lg bg-card border border-border px-3 py-2 hover:border-primary/50 transition-colors"
              >
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${RISK_STYLES[risk.level].dot}`} />
                <span className="text-sm font-medium text-foreground truncate">{student.name}</span>
                <span className="text-xs text-muted-foreground truncate flex-1">{risk.headline}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {students.map((student) => {
          const totalMinutes = getTotalTrainingTime(student.sessions)
          const totalHours = Math.floor(totalMinutes / 60)
          const feedbackCount = getStudentFeedback(student.id).length
          const risk = getRetentionRisk(student.id)
          const riskStyle = RISK_STYLES[risk.level]
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
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${riskStyle.dot}`}
                      title={`${riskStyle.label}: ${risk.headline}`}
                    />
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
