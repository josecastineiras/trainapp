"use client"

import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogOut, User, GraduationCap, Users } from "lucide-react"

export function AppHeader() {
  const { user, signOut } = useAuth()

  if (!user) return null

  const isInstructor = user.role === "instructor"

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M2 12h20" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-foreground leading-tight">TrainApp</h1>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {isInstructor ? (
                <Users className="w-3 h-3" />
              ) : (
                <GraduationCap className="w-3 h-3" />
              )}
              <span>{user.name}</span>
              <span className="text-muted-foreground/50">-</span>
              <span className={isInstructor ? "text-primary" : "text-accent-foreground"}>
                {isInstructor ? "Instructor" : "Atleta"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <button
            onClick={signOut}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Cerrar sesion"
          >
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
