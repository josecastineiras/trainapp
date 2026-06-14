"use client"
import { useState } from "react"
import { CalendarPlus } from "lucide-react"
import { AppHeader } from "./app-header"
import { StatsOverview } from "./stats-overview"
import { SkillsChart } from "./skills-chart"
import { RecentSessions } from "./recent-sessions"
import { Achievements } from "./achievements"
import { AddSessionForm } from "./add-session-form"
import { StudentFeedbackView } from "./student-feedback-view"
import { BookSessionView } from "./book-session-view"

export function Dashboard() {
  const [bookingOpen, setBookingOpen] = useState(false)

  if (bookingOpen) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <AppHeader />
        <main className="max-w-lg mx-auto px-4 py-6">
          <BookSessionView onBack={() => setBookingOpen(false)} />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader />
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">

        {/* Welcome + botón reservar */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Tu progreso</h2>
            <p className="text-muted-foreground">Sigue entrenando para mejorar</p>
          </div>
          <button
            onClick={() => setBookingOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-950 text-teal-400 text-xs font-medium hover:bg-teal-900 transition-colors flex-shrink-0"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            Reservar sesión
          </button>
        </div>

        <StatsOverview />
        <StudentFeedbackView />
        <SkillsChart />
        <RecentSessions />
        <Achievements />
      </main>
      <AddSessionForm />
    </div>
  )
}

