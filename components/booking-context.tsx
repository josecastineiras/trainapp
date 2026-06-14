"use client"
import { createContext, useContext, useState, type ReactNode } from "react"

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface TimeSlot {
  time: string   // "10:00"
  available: boolean
  bookedBy?: string  // studentId
  bookedByName?: string
}

export interface Booking {
  id: string
  studentId: string
  studentName: string
  date: string       // "2026-06-16"
  time: string       // "10:00"
  duration: number   // minutos
  type: string
  status: "confirmada" | "pendiente" | "cancelada"
}

// ── Config de disponibilidad ─────────────────────────────────────────────────

export const AVAILABLE_DAYS = [1, 2, 3, 4, 5, 6] // lunes a sábado (0=domingo)

export const AVAILABLE_HOURS: string[] = []
for (let h = 10; h < 19; h++) {
  AVAILABLE_HOURS.push(`${h.toString().padStart(2, "0")}:00`)
  if (h < 18) AVAILABLE_HOURS.push(`${h.toString().padStart(2, "0")}:30`)
}

// ── Mock bookings ────────────────────────────────────────────────────────────

const today = new Date()
const fmt = (d: Date) => d.toISOString().split("T")[0]
const addDays = (d: Date, n: number) => {
  const r = new Date(d); r.setDate(r.getDate() + n); return r
}

const MOCK_BOOKINGS: Booking[] = [
  { id: "b1", studentId: "s1", studentName: "Lucas Rodríguez", date: fmt(today),         time: "10:00", duration: 60, type: "tecnica",  status: "confirmada" },
  { id: "b2", studentId: "s2", studentName: "Sofía Peralta",   date: fmt(today),         time: "11:30", duration: 60, type: "fisico",   status: "confirmada" },
  { id: "b3", studentId: "s3", studentName: "Tomás Méndez",    date: fmt(today),         time: "18:00", duration: 60, type: "partido",  status: "confirmada" },
  { id: "b4", studentId: "s1", studentName: "Lucas Rodríguez", date: fmt(addDays(today,1)), time: "10:00", duration: 60, type: "tactica", status: "confirmada" },
  { id: "b5", studentId: "s4", studentName: "Martina García",  date: fmt(addDays(today,2)), time: "14:00", duration: 60, type: "tecnica", status: "pendiente" },
]

// ── Context ──────────────────────────────────────────────────────────────────

interface BookingContextType {
  bookings: Booking[]
  addBooking: (b: Omit<Booking, "id">) => void
  cancelBooking: (id: string) => void
  getBookingsForDate: (date: string) => Booking[]
  getSlotsForDate: (date: string) => TimeSlot[]
  getStudentBookings: (studentId: string) => Booking[]
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS)

  const addBooking = (b: Omit<Booking, "id">) => {
    setBookings(prev => [...prev, { ...b, id: Date.now().toString() }])
  }

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "cancelada" } : b))
  }

  const getBookingsForDate = (date: string) =>
    bookings.filter(b => b.date === date && b.status !== "cancelada")

  const getSlotsForDate = (date: string): TimeSlot[] => {
    const dayBookings = getBookingsForDate(date)
    return AVAILABLE_HOURS.map(time => {
      const booking = dayBookings.find(b => b.time === time)
      return {
        time,
        available: !booking,
        bookedBy: booking?.studentId,
        bookedByName: booking?.studentName,
      }
    })
  }

  const getStudentBookings = (studentId: string) =>
    bookings.filter(b => b.studentId === studentId && b.status !== "cancelada")

  return (
    <BookingContext.Provider value={{
      bookings, addBooking, cancelBooking,
      getBookingsForDate, getSlotsForDate, getStudentBookings
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBookings() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBookings debe usarse dentro de BookingProvider")
  return ctx
}
