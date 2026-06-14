"use client"
import { useState } from "react"
import { ArrowLeft, Calendar, Send, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type PaymentStatus = "pagó" | "pendiente" | "vencido"
type FilterType = "todos" | PaymentStatus

interface StudentPayment {
  id: string
  initials: string
  name: string
  plan: string
  amount: number
  status: PaymentStatus
  date: string
  color: string
}

const STUDENTS: StudentPayment[] = [
  { id: "1", initials: "LR", name: "Lucas Rodríguez",  plan: "Plan mensual · Tenis",  amount: 8500,  status: "pagó",      date: "cobrado 3/6",  color: "bg-teal-600" },
  { id: "2", initials: "SP", name: "Sofía Peralta",    plan: "Plan mensual · Tenis",  amount: 8500,  status: "pendiente", date: "vence 20/6",   color: "bg-violet-600" },
  { id: "3", initials: "TM", name: "Tomás Méndez",     plan: "Plan semanal · Tenis",  amount: 12000, status: "vencido",   date: "venció 1/6",   color: "bg-orange-700" },
  { id: "4", initials: "MG", name: "Martina García",   plan: "Plan mensual · Tenis",    amount: 7000,  status: "pagó",      date: "cobrado 5/6",  color: "bg-amber-700" },
  { id: "5", initials: "RV", name: "Rodrigo Vega",     plan: "Plan mensual · Tenis",   amount: 9000,  status: "pendiente", date: "vence 18/6",   color: "bg-pink-700" },
  { id: "6", initials: "CA", name: "Camila Acosta",    plan: "Plan mensual · Tenis", amount: 7500,  status: "pagó",      date: "cobrado 8/6",  color: "bg-blue-600" },
]

const STATUS_STYLES: Record<PaymentStatus, { badge: string; amount: string }> = {
  "pagó":      { badge: "bg-teal-950 text-teal-400 hover:bg-teal-950",     amount: "text-teal-400" },
  "pendiente": { badge: "bg-amber-950 text-amber-400 hover:bg-amber-950",   amount: "text-amber-400" },
  "vencido":   { badge: "bg-red-950 text-red-400 hover:bg-red-950",         amount: "text-red-400" },
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "Todos",      value: "todos" },
  { label: "Pagaron",    value: "pagó" },
  { label: "Pendientes", value: "pendiente" },
  { label: "Vencidos",   value: "vencido" },
]

interface PagosViewProps {
  onBack: () => void
}

export function PagosView({ onBack }: PagosViewProps) {
  const [filter, setFilter] = useState<FilterType>("todos")

  const cobrado   = STUDENTS.filter(s => s.status === "pagó").reduce((a, s) => a + s.amount, 0)
  const pendiente = STUDENTS.filter(s => s.status === "pendiente").reduce((a, s) => a + s.amount, 0)
  const vencido   = STUDENTS.filter(s => s.status === "vencido").reduce((a, s) => a + s.amount, 0)
  const total     = cobrado + pendiente + vencido

  const cobradoPct   = Math.round((cobrado / total) * 100)
  const pendientePct = Math.round((pendiente / total) * 100)
  const vencidoPct   = 100 - cobradoPct - pendientePct

  const pendientesCount = STUDENTS.filter(s => s.status === "pendiente" || s.status === "vencido").length

  const filtered = filter === "todos" ? STUDENTS : STUDENTS.filter(s => s.status === filter)

  const fmt = (n: number) =>
    "$" + n.toLocaleString("es-AR", { maximumFractionDigits: 0 })

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <h1 className="text-base font-medium">Pagos — Junio</h1>
        <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <Calendar className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-muted rounded-xl p-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Cobrado</p>
          <p className="text-lg font-medium text-teal-500 mt-1">{fmt(cobrado)}</p>
        </div>
        <div className="bg-muted rounded-xl p-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Pendiente</p>
          <p className="text-lg font-medium text-amber-400 mt-1">{fmt(pendiente)}</p>
        </div>
        <div className="bg-muted rounded-xl p-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Vencido</p>
          <p className="text-lg font-medium text-red-400 mt-1">{fmt(vencido)}</p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="bg-muted rounded-xl p-4 space-y-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Progreso del mes</p>
        <div className="flex h-2 rounded-full overflow-hidden gap-px">
          <div className="bg-teal-500 rounded-l-full"   style={{ width: `${cobradoPct}%` }} />
          <div className="bg-amber-400"                  style={{ width: `${pendientePct}%` }} />
          <div className="bg-red-400 rounded-r-full"    style={{ width: `${vencidoPct}%` }} />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
            Cobrado {cobradoPct}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            Pend. {pendientePct}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
            Venc. {vencidoPct}%
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filter === f.value
                ? "bg-teal-950 text-teal-400"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista de clientes */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          Clientes · {filtered.length}
        </p>
        <div className="space-y-2">
          {filtered.map(student => (
            <div key={student.id} className="bg-muted rounded-xl px-4 py-3 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${student.color} flex items-center justify-center text-xs font-medium text-white flex-shrink-0`}>
                {student.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{student.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{student.plan}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-medium ${STATUS_STYLES[student.status].amount}`}>
                  {fmt(student.amount)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{student.date}</p>
              </div>
              <Badge className={`text-xs ${STATUS_STYLES[student.status].badge} capitalize`}>
                {student.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* CTA recordatorios */}
      {pendientesCount > 0 && (
        <Button className="w-full bg-teal-950 text-teal-400 hover:bg-teal-900 border-0 gap-2">
          <Send className="w-4 h-4" />
          Enviar recordatorios pendientes ({pendientesCount})
        </Button>
      )}

    </div>
  )
}
