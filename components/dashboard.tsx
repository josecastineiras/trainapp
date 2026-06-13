"use client"

import { AppHeader } from "./app-header"
import { StatsOverview } from "./stats-overview"
import { SkillsChart } from "./skills-chart"
import { RecentSessions } from "./recent-sessions"
import { Achievements } from "./achievements"
import { AddSessionForm } from "./add-session-form"
import { StudentFeedbackView } from "./student-feedback-view"

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Welcome message */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Tu progreso</h2>
          <p className="text-muted-foreground">Sigue entrenando para mejorar</p>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Feedback from Instructor */}
        <StudentFeedbackView />

        {/* Skills Chart */}
        <SkillsChart />

        {/* Recent Sessions */}
        <RecentSessions />

        {/* Achievements */}
        <Achievements />
      </main>

      {/* Add Session FAB */}
      <AddSessionForm />
    </div>
  )
}
