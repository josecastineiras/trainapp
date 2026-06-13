"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { TrainingSession } from "./types"
import { mockSessions } from "./mock-data"

interface SessionsContextType {
  sessions: TrainingSession[]
  addSession: (session: Omit<TrainingSession, "id">) => void
}

const SessionsContext = createContext<SessionsContextType | undefined>(undefined)

export function SessionsProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<TrainingSession[]>(mockSessions)

  const addSession = (session: Omit<TrainingSession, "id">) => {
    const newSession: TrainingSession = {
      ...session,
      id: Date.now().toString(),
    }
    setSessions((prev) => [newSession, ...prev])
  }

  return (
    <SessionsContext.Provider value={{ sessions, addSession }}>
      {children}
    </SessionsContext.Provider>
  )
}

export function useSessions() {
  const context = useContext(SessionsContext)
  if (context === undefined) {
    throw new Error("useSessions debe usarse dentro de un SessionsProvider")
  }
  return context
}
