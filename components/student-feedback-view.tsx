"use client"

import { useAuth } from "@/lib/auth-context"
import { useStudents } from "@/lib/students-context"
import { FeedbackList } from "./feedback-list"
import { MessageSquare } from "lucide-react"

export function StudentFeedbackView() {
  const { user } = useAuth()
  const { getStudentFeedback } = useStudents()

  if (!user) return null

  const feedback = getStudentFeedback(user.id)
  const importantFeedback = feedback.filter(f => f.priority === "importante")
  const regularFeedback = feedback.filter(f => f.priority === "normal")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">
          Feedback del Instructor
        </h2>
        <span className="text-sm text-muted-foreground">
          {feedback.length} mensajes
        </span>
      </div>

      {importantFeedback.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-accent-foreground flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Mensajes Importantes
          </h3>
          <FeedbackList feedback={importantFeedback} showStudentView />
        </div>
      )}

      {regularFeedback.length > 0 && (
        <div className="space-y-3">
          {importantFeedback.length > 0 && (
            <h3 className="text-sm font-medium text-muted-foreground">
              Otros mensajes
            </h3>
          )}
          <FeedbackList feedback={regularFeedback} showStudentView />
        </div>
      )}

      {feedback.length === 0 && (
        <FeedbackList feedback={[]} showStudentView />
      )}
    </div>
  )
}
