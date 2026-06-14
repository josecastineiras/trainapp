"use client"
import { useState } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, User } from "lucide-react"
import { useBookings, AVAILABLE_DAYS } from "@/lib/booking-context"
import { useAuth } from "@/lib/auth-context"
import { getSportConfig } from "@/lib/types"

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const DAY_NAMES_FULL = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const MONTH_NAMES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const fmt = (d: Date) => d.toISOString().split("T")[0]
const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r }

function getWeekDays(base: Date) {
  const day = base.getDay()
  const monday = addDays(base, -day + (day === 0 ? -6 : 1))
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i))
}

interface InstructorCalendarProps {
  onBack: () => void
}

export function InstructorCalendar({ onBack }: InstructorCalendarProps) {
  const { user } = useAuth()
  const { getSlotsForDate, getBookingsForDate } = useBookings()
  const sportConfig = getSportConfig(user?.sport ?? "tenis")

  const today = new Date()
  const [weekBase, setWeekBase] = useState(today)
  const [selectedDate, setSelectedDate] = useState(fmt(today))

  const weekDays = getWeekDays(weekBase)
  const slots = getSlotsForDate(selectedDate)
  const selectedDateObj = new Date(selectedDate + "T12:00:00")
  const bookingsToday = getBookingsForDate(selectedDate)

  const isAvailableDay = (d: Date) => AVAILABLE_DAYS.includes(d.getDay())
  const isToday = (d: Date) => fmt(d) === fmt(today)
  const isSelected = (d: Date) => fmt(d) === selectedDate

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <h1 className="text-base font-medium">Mi Calendario</h1>
        <div className="w-8" />
      </div>

      {/* Disponibilidad */}
      <div className="bg-teal-950 rounded-xl px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-teal-400 font-medium uppercase tracking-wide">Disponibilidad</p>
          <p className="text-sm text-white mt-0.5">Lunes a Sábados · 10:00 — 19:00</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-teal-400">{bookingsToday.length} reservas hoy</p>
        </div>
      </div>

      {/* Navegación semanal */}
      <div className="bg-muted rounded-xl p-3">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setWeekBase(w => addDays(w, -7))} className="w-7 h-7 rounded-full bg-background flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-medium">
            {MONTH_NAMES[weekDays[0].getMonth()]} {weekDays[0].getFullYear()}
          </span>
          <button onClick={() => setWeekBase(w => addDays(w, 7))} className="w-7 h-7 rounded-full bg-background flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map(d => {
            const avail = isAvailableDay(d)
            const sel = isSelected(d)
            const tod = isToday(d)
            const dayBookings = getBookingsForDate(fmt(d))
            return (
              <button
                key={fmt(d)}
                onClick={() => avail && setSelectedDate(fmt(d))}
                disabled={!avail}
                className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
                  sel ? "bg-teal-600 text-white" :
                  tod ? "bg-background border border-teal-500 text-teal-400" :
                  avail ? "hover:bg-background text-foreground" :
                  "opacity-30 cursor-not-allowed text-muted-foreground"
                }`}
              >
                <span className="text-xs">{DAY_NAMES[d.getDay()]}</span>
                <span className="text-sm font-medium">{d.getDate()}</span>
                {avail && dayBookings.length > 0 && (
                  <span className={`w-1.5 h-1.5 rounded-full ${sel ? "bg-white" : "bg-teal-500"}`} />
                )}
                {avail && dayBookings.length === 0 && <span className="w-1.5 h-1.5" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Slots del día seleccionado */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          {DAY_NAMES_FULL[selectedDateObj.getDay()]} {selectedDateObj.getDate()} de {MONTH_NAMES[selectedDateObj.getMonth()]}
        </p>
        <div className="space-y-2">
          {slots.map(slot => (
            <div
              key={slot.time}
              className={`rounded-xl px-4 py-3 flex items-center gap-3 ${
                slot.available ? "bg-muted" : "bg-teal-950 border border-teal-900"
              }`}
            >
              <div className="flex items-center gap-1.5 w-14 flex-shrink-0">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">{slot.time}</span>
              </div>
              {slot.available ? (
                <span className="text-xs text-muted-foreground">Disponible</span>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-6 h-6 rounded-full bg-teal-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{slot.bookedByName}</p>
                      <p className="text-xs text-teal-400">
                        {sportConfig.trainingTypes[0]?.label ?? "Sesión"} · 60 min
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-teal-900 text-teal-400">Reservado</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
