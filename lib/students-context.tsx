"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Student, Feedback } from "./types"
import { mockStudents, mockFeedback, mockSessions } from "./mock-data"

interface StudentsContextType {
  students: Student[]
  feedback: Feedback[]
  addFeedback: (feedback: Omit<Feedback, "id" | "date">) => void
  getStudentFeedback: (studentId: string) => Feedback[]
  getStudentById: (studentId: string) => Student | undefined
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students] = useState<Student[]>(() => {
    // Asignar sesiones mock a los estudiantes
    return mockStudents.map((student, index) => ({
      ...student,
      sessions: index === 0 ? mockSessions : mockSessions.slice(0, Math.max(1, 3 - index)),
      feedback: mockFeedback.filter(f => f.studentId === student.id),
    }))
  })
  
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback)

  const addFeedback = (newFeedback: Omit<Feedback, "id" | "date">) => {
    const feedbackItem: Feedback = {
      ...newFeedback,
      id: `fb-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    }
    setFeedback(prev => [feedbackItem, ...prev])
  }

  const getStudentFeedback = (studentId: string) => {
    return feedback.filter(f => f.studentId === studentId)
  }

  const getStudentById = (studentId: string) => {
    return students.find(s => s.id === studentId)
  }

  return (
    <StudentsContext.Provider value={{ 
      students, 
      feedback, 
      addFeedback, 
      getStudentFeedback,
      getStudentById 
    }}>
      {children}
    </StudentsContext.Provider>
  )
}

export function useStudents() {
  const context = useContext(StudentsContext)
  if (context === undefined) {
    throw new Error("useStudents debe usarse dentro de un StudentsProvider")
  }
  return context
}
