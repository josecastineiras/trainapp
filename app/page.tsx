"use client"

import { AuthProvider, useAuth } from "@/lib/auth-context"
import { SessionsProvider } from "@/lib/sessions-context"
import { StudentsProvider } from "@/lib/students-context"
import { LoginScreen } from "@/components/login-screen"
import { Dashboard } from "@/components/dashboard"
import { InstructorDashboard } from "@/components/instructor-dashboard"
import { BookingProvider } from "@/lib/booking-context"

function AppContent() {
  const { user } = useAuth()

  if (!user) {
    return <LoginScreen />
  }

  if (user.role === "instructor") {
    return <InstructorDashboard />
  }

  return (
    <SessionsProvider>
      <Dashboard />
    </SessionsProvider>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <StudentsProvider>
        <BookingProvider>   {/* ← esto tiene que estar */}
          <AppContent />
        </BookingProvider>
      </StudentsProvider>
    </AuthProvider>
  )
}
