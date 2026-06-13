"use client"

import { useSessions } from "@/lib/sessions-context"
import { useAuth } from "@/lib/auth-context"
import { getTrainingTypeInfo } from "@/lib/types"
import { Calendar, Clock } from "lucide-react"

export function RecentSessions() {
  const { sessions } = useSessions()
  const { user } = useAuth()
  const recentSessions = sessions.slice(0, 5)

  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
      <h3 className="font-semibold text-foreground mb-4">Sesiones recientes</h3>
      <div className="space-y-3">
        {recentSessions.map((session) => {
          const typeInfo = getTrainingTypeInfo(user?.sport ?? "tenis", session.type)
          return (
            <div
              key={session.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-lg ${typeInfo.color} flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-sm font-bold text-primary-foreground">
                  {typeInfo.label.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-foreground truncate">
                    {typeInfo.label}
                  </p>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {session.duration}min
                  </span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(session.date)}
                </p>
                {session.notes && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {session.notes}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}
