"use client"
import { useState } from "react"
import { AppHeader } from "./app-header"
import { StudentsList } from "./students-list"
import { StudentDetail } from "./student-detail"
import { PagosView } from "./pagos-view"
import { InstructorCalendar } from "./instructor-calendar"

type View = "list" | "detail" | "pagos" | "calendario"

export function InstructorDashboard() {
  const [view, setView] = useState<View>("list")
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)

  function handleSelectStudent(id: string) {
    setSelectedStudentId(id)
    setView("detail")
  }

  function handleBack() {
    setSelectedStudentId(null)
    setView("list")
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <AppHeader />
      <main className="max-w-lg mx-auto px-4 py-6">
        {view === "detail" && selectedStudentId ? (
          <StudentDetail studentId={selectedStudentId} onBack={handleBack} />
        ) : view === "pagos" ? (
          <PagosView onBack={handleBack} />
        ) : view === "calendario" ? (
          <InstructorCalendar onBack={handleBack} />
        ) : (
          <StudentsList
            onSelectStudent={handleSelectStudent}
            onOpenPagos={() => setView("pagos")}
            onOpenCalendario={() => setView("calendario")}
          />
        )}
      </main>
    </div>
  )
}
