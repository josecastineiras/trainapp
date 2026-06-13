"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { User, SportId } from "./types"
import { mockUser, mockInstructor } from "./mock-data"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signInWithGoogle: (role: "alumno" | "instructor", sport?: SportId) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const signInWithGoogle = (role: "alumno" | "instructor", sport?: SportId) => {
    setIsLoading(true)
    // Simular delay de autenticacion
    setTimeout(() => {
      if (role === "instructor") {
        // El instructor elige la disciplina que imparte
        setUser({ ...mockInstructor, sport: sport ?? mockInstructor.sport })
      } else {
        // El alumno hereda la disciplina asociada a su instructor
        setUser(mockUser)
      }
      setIsLoading(false)
    }, 1000)
  }

  const signOut = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}
