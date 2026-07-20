"use client"
import { useState } from "react"
import { ArrowLeft, CheckCircle, CreditCard, Calendar, Download, Clock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { getSportConfig } from "@/lib/types"

type PaymentStatus = "pagado" | "pendiente"

interface PaymentRecord {
  id: string
  concept: string
  period: string
  amount: number
  status: PaymentStatus
  date: string
}

const HISTORY: PaymentRecord[] = [
  { id: "h1", concept: "Plan mensual", period: "Mayo 2026",   amount: 8500, status: "pagado", date: "cobrado 3/5" },
  { id: "h2", concept: "Plan mensual", period: "Abril 2026",  amount: 8500, status: "pagado", date: "cobrado 4/4" },
  { id: "h3", concept: "Plan mensual", period: "Marzo 2026",  amount: 8000, status: "pagado", date: "cobrado 2/3" },
  { id: "h4", concept: "Clase extra",  period: "Marzo 2026",  amount: 3000, status: "pagado", date: "cobrado 18/3" },
]

const PLAN_AMOUNT = 8500
const DUE_DATE = "20/6"

interface MisPagosViewProps {
  onBack: () => void
}

export function MisPagosView({ onBack }: MisPagosViewProps) {
  const { user } = useAuth()
  const sportConfig = getSportConfig(user?.sport ?? "tenis")
  const [paid, setPaid] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const fmt = (n: number) =>
    "$" + n.toLocaleString("es-AR", { maximumFractionDigits: 0 })

  const history = confirmed
    ? [{ id: "current", concept: "Plan mensual", period: "Junio 2026", amount: PLAN_AMOUNT, status: "pagado" as PaymentStatus, date: "cobrado hoy" }, ...HISTORY]
    : HISTORY

  function handlePay() {
    setProcessing(true)
    // Simulación de procesamiento del pago (mockup, sin cobro real)
    setTimeout(() => {
      setProcessing(false)
      setPaid(true)
      setConfirmed(true)
    }, 1800)
  }

  if (paid) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-950 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-teal-400" />
        </div>
        <h2 className="text-xl font-bold">¡Pago realizado!</h2>
        <p className="text-muted-foreground text-sm">
          Plan mensual · Junio 2026 · {fmt(PLAN_AMOUNT)}
        </p>
        <p className="text-xs text-muted-foreground max-w-xs">
          Tu instructor ya fue notificado. El comprobante quedó disponible en tu historial.
        </p>
        <button
          onClick={() => setPaid(false)}
          className="px-6 py-2 rounded-full bg-teal-950 text-teal-400 text-sm font-medium hover:bg-teal-900 transition-colors"
        >
          Ver mis pagos
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
        <h1 className="text-base font-medium">Mis pagos</h1>
        <div className="w-8" />
      </div>

      {/* Estado del plan */}
      <div className="bg-muted rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Plan actual</p>
            <p className="text-sm font-medium mt-0.5">Plan mensual · {sportConfig.label}</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            confirmed ? "bg-teal-950 text-teal-400" : "bg-amber-950 text-amber-400"
          }`}>
            {confirmed ? "Al día" : "Pendiente"}
          </span>
        </div>
        <div className="flex items-end justify-between pt-1">
          <div>
            <p className="text-2xl font-bold">{fmt(PLAN_AMOUNT)}</p>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {confirmed ? "Próximo cobro: Julio 2026" : `Vence el ${DUE_DATE}/6`}
            </p>
          </div>
        </div>
      </div>

      {/* Cuota pendiente + pago */}
      {!confirmed && (
        <div className="bg-amber-950/40 border border-amber-900/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-300">Cuota de Junio pendiente</p>
              <p className="text-xs text-amber-400/70 mt-0.5">Vence el {DUE_DATE} de junio</p>
            </div>
            <p className="text-lg font-bold text-amber-300">{fmt(PLAN_AMOUNT)}</p>
          </div>
          <button
            onClick={handlePay}
            disabled={processing}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-600 text-white font-medium text-sm hover:bg-teal-500 transition-colors disabled:opacity-60"
          >
            {processing ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                Procesando pago...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Pagar ahora · {fmt(PLAN_AMOUNT)}
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-muted-foreground">
            Pago simulado — no se realiza ningún cobro real.
          </p>
        </div>
      )}

      {/* Método de pago */}
      <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
          <CreditCard className="w-4 h-4 text-teal-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Visa •••• 4242</p>
          <p className="text-xs text-muted-foreground mt-0.5">Método de pago predeterminado</p>
        </div>
        <button className="text-xs text-teal-400 font-medium">Cambiar</button>
      </div>

      {/* Historial de pagos */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          Historial · {history.length}
        </p>
        <div className="space-y-2">
          {history.map(rec => (
            <div key={rec.id} className="bg-muted rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-950 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-teal-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{rec.concept}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{rec.period} · {rec.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-medium text-teal-400">{fmt(rec.amount)}</p>
                <button className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 ml-auto hover:text-foreground transition-colors">
                  <Download className="w-3 h-3" />
                  Recibo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
