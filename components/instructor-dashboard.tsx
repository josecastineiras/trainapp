"use client"

import { useState } from "react"
import { AppHeader } from "./app-header"
import { StudentsList } from "./students-list"
import { StudentDetail } from "./student-detail"

export function InstructorDashboard() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background pb-8">
      <AppHeader />

      <main className="max-w-lg mx-auto px-4 py-6">
        {selectedStudentId ? (
          <StudentDetail
            studentId={selectedStudentId}
            onBack={() => setSelectedStudentId(null)}
          />
        ) : (
          <StudentsList onSelectStudent={setSelectedStudentId} />
        )}
      </main>
    </div>
  )
}
