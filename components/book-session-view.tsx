"use client"
import { useState } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, CheckCircle } from "lucide-react"
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

interface BookSessionViewProps {
  onBack: () => void
}

export function BookSessionView({ onBack }: BookSessionViewProps) {
  const { user } = useAuth()
  const { getSlotsForDate, addBooking, getStudentBookings } = useBookings()
  const sportConfig = getSportConfig(user?.sport ?? "tenis")

  const today = new Date()
  const [weekBase, setWeekBase] = useState(today)
  const [selectedDate, setSelectedDate] = useState(fmt(today))
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState(sportConfig.trainingTypes[0]?.key ?? "")
  const [confirmed, setConfirmed] = useState(false)

  const weekDays = getWeekDays(weekBase)
  const slots = getSlotsForDate(selectedDate).filter(s => s.available)
  const selectedDateObj = new Date(selectedDate + "T12:00:00")
  const myBookings = user ? getStudentBookings(user.id) : []
  const isPastDate = new Date(selectedDate) < new Date(fmt(today))

  const isAvailableDay = (d: Date) => AVAILABLE_DAYS.includes(d.getDay()) && fmt(d) >= fmt(today)
  const isToday = (d: Date) => fmt(d) === fmt(today)
  const isSelected = (d: Date) => fmt(d) === selectedDate

  function handleConfirm() {
    if (!selectedTime || !user) return
    addBooking({
      studentId: user.id,
      studentName: user.name,
      date: selectedDate,
      time: selectedTime,
      duration: 60,
      type: selectedType,
      status: "confirmada",
    })
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-950 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-teal-400" />
        </div>
        <h2 className="text-xl font-bold">¡Sesión reservada!</h2>
        <p className="text-muted-foreground text-sm">
          {DAY_NAMES_FULL[selectedDateObj.getDay()]} {selectedDateObj.getDate()} de {MONTH_NAMES[selectedDateObj.getMonth()]} · {selectedTime}
        </p>
        <button
          onClick={() => { setConfirmed(false); setSelectedTime(null) }}
          className="px-6 py-2 rounded-full bg-teal-950 text-teal-400 text-sm font-medium hover:bg-teal-900 transition-colors"
        >
          Reservar otra sesión
        </button>
        <button onClick={onBack} className="text-sm text-muted-foreground underline">
          Volver al inicio
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <h1 className="text-base font-medium">Reservar sesión</h1>
        <div className="w-8" />
      </div>

      {/* Disponibilidad del instructor */}
      <div className="bg-muted rounded-xl px-4 py-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Disponibilidad del instructor</p>
        <p className="text-sm font-medium mt-0.5">Lunes a Sábados · 10:00 — 19:00</p>
      </div>

      {/* Calendario semanal */}
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
            return (
              <button
                key={fmt(d)}
                onClick={() => { if (avail) { setSelectedDate(fmt(d)); setSelectedTime(null) } }}
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
              </button>
            )
          })}
        </div>
      </div>

      {/* Tipo de sesión */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Tipo de sesión</p>
        <div className="flex gap-2 flex-wrap">
          {sportConfig.trainingTypes.map(t => (
            <button
              key={t.key}
              onClick={() => setSelectedType(t.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedType === t.key
                  ? "bg-teal-950 text-teal-400"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horarios disponibles */}
      {!isPastDate && (
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            Horarios disponibles · {DAY_NAMES_FULL[selectedDateObj.getDay()]} {selectedDateObj.getDate()}
          </p>
          {slots.length === 0 ? (
            <div className="bg-muted rounded-xl px-4 py-6 text-center">
              <p className="text-sm text-muted-foreground">No hay horarios disponibles para este día.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {slots.map(slot => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    selectedTime === slot.time
                      ? "bg-teal-600 text-white"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Botón confirmar */}
      {selectedTime && (
        <button
          onClick={handleConfirm}
          className="w-full py-3 rounded-xl bg-teal-600 text-white font-medium text-sm hover:bg-teal-500 transition-colors"
        >
          Confirmar sesión · {selectedTime}
        </button>
      )}

      {/* Mis próximas reservas */}
      {myBookings.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Mis próximas sesiones</p>
          <div className="space-y-2">
            {myBookings.slice(0, 3).map(b => (
              <div key={b.id} className="bg-muted rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{b.date} · {b.time}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 capitalize">{b.type} · 60 min</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  b.status === "confirmada" ? "bg-teal-950 text-teal-400" : "bg-amber-950 text-amber-400"
                }`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
