"use client"

import type { Feedback } from "@/lib/types"
import { MessageSquare, FileText, AlertCircle } from "lucide-react"

interface FeedbackListProps {
  feedback: Feedback[]
  showStudentView?: boolean
}

export function FeedbackList({ feedback, showStudentView = false }: FeedbackListProps) {
  if (feedback.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6 border border-border text-center">
        <MessageSquare className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-muted-foreground">
          {showStudentView 
            ? "Aun no tienes feedback de tu instructor" 
            : "No hay feedback registrado"}
        </p>
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "tecnica":
        return "bg-chart-1/20 text-chart-1"
      case "tactica":
        return "bg-chart-2/20 text-chart-2"
      case "actitud":
        return "bg-accent/20 text-accent-foreground"
      case "fisico":
        return "bg-chart-3/20 text-chart-3"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-3">
      {feedback.map((item) => (
        <div
          key={item.id}
          className={`bg-card rounded-xl p-4 border transition-all ${
            item.priority === "importante" 
              ? "border-accent/50 bg-accent/5" 
              : "border-border"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${
              item.type === "feedback" 
                ? "bg-primary/10 text-primary" 
                : "bg-accent/10 text-accent-foreground"
            }`}>
              {item.type === "feedback" ? (
                <MessageSquare className="w-4 h-4" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(item.category)}`}>
                  {getCategoryLabel(item.category)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(item.date)}
                </span>
                {item.priority === "importante" && (
                  <span className="flex items-center gap-1 text-xs text-accent-foreground">
                    <AlertCircle className="w-3 h-3" />
                    Importante
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground leading-relaxed">{item.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
