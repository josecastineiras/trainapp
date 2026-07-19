// Motor de IA simulado (mockup). No hace llamadas reales:
// devuelve insights deterministas por atleta para demostrar la funcionalidad.

export type RiskLevel = "verde" | "amarillo" | "rojo"

export interface RetentionRisk {
  level: RiskLevel
  score: number // 0-100, mayor = mas riesgo
  headline: string
  signals: string[]
}

export interface ProgressionSuggestion {
  stalledWeeks: number
  skill: string
  insight: string
  variant: string
  expectedGain: string
}

export interface RoutineExercise {
  name: string
  detail: string
  focus: string // key de trainingType para el color
}

export interface RoutineDay {
  day: string
  title: string
  rest: boolean
  exercises: RoutineExercise[]
}

export interface GeneratedRoutine {
  summary: string
  rationale: string[]
  days: RoutineDay[]
}

export interface RoutineGoalInput {
  objetivo: string
  enfoque: string
  diasPorSemana: number
  considerarLesiones: boolean
}

// ---- Alerta temprana de abandono ----------------------------------------

const RISK_BY_STUDENT: Record<string, RetentionRisk> = {
  "1": {
    level: "verde",
    score: 12,
    headline: "Adherencia estable",
    signals: [
      "Entrena 3 veces por semana de forma sostenida",
      "Registra todas sus sesiones",
      "Progresion constante en derecha y saque",
    ],
  },
  "2": {
    level: "amarillo",
    score: 54,
    headline: "Frecuencia en descenso",
    signals: [
      "Paso de 3 a 1.5 sesiones por semana en el ultimo mes",
      "2 sesiones agendadas sin registrar",
      "Sin feedback nuevo hace 9 dias",
    ],
  },
  "3": {
    level: "verde",
    score: 20,
    headline: "Alto compromiso",
    signals: [
      "Asistencia perfecta las ultimas 4 semanas",
      "Progresion sostenida rumbo al torneo",
      "Responde a las instrucciones dentro de las 24h",
    ],
  },
  "4": {
    level: "rojo",
    score: 82,
    headline: "Riesgo alto de abandono",
    signals: [
      "Cayo de 3 a 0 sesiones registradas en 2 semanas",
      "3 turnos cancelados seguidos",
      "Progresion estancada hace 5 semanas",
      "Ultimo ingreso a la app hace 11 dias",
    ],
  },
  "5": {
    level: "amarillo",
    score: 48,
    headline: "Progresion estancada",
    signals: [
      "Mantiene la frecuencia pero sin mejoras medibles",
      "Volea estancada hace 3 semanas",
      "Motivacion a la baja segun ultimas notas",
    ],
  },
  "6": {
    level: "rojo",
    score: 74,
    headline: "Se esta enfriando",
    signals: [
      "Sin sesiones registradas hace 10 dias",
      "Dejo de abrir las instrucciones enviadas",
      "Frecuencia -60% respecto al mes anterior",
    ],
  },
}

const DEFAULT_RISK: RetentionRisk = {
  level: "verde",
  score: 18,
  headline: "Adherencia estable",
  signals: ["Sin señales de abandono detectadas"],
}

export function getRetentionRisk(studentId: string): RetentionRisk {
  return RISK_BY_STUDENT[studentId] ?? DEFAULT_RISK
}

export const RISK_STYLES: Record<
  RiskLevel,
  { dot: string; text: string; bg: string; border: string; label: string }
> = {
  verde: {
    dot: "bg-chart-1",
    text: "text-chart-1",
    bg: "bg-chart-1/10",
    border: "border-chart-1/30",
    label: "En riel",
  },
  amarillo: {
    dot: "bg-accent",
    text: "text-accent-foreground",
    bg: "bg-accent/15",
    border: "border-accent/40",
    label: "Atencion",
  },
  rojo: {
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    label: "Riesgo",
  },
}

// ---- Sugerencia de progresion -------------------------------------------

const SUGGESTION_BY_STUDENT: Record<string, ProgressionSuggestion> = {
  "1": {
    stalledWeeks: 0,
    skill: "Saque",
    insight: "Viene subiendo parejo. El saque alcanzo nivel 5 y esta listo para sumar potencia.",
    variant: "Sumar saque con salto y trabajo de primera de quiebre al cuerpo.",
    expectedGain: "+8% velocidad de primer saque en 4 semanas",
  },
  "2": {
    stalledWeeks: 2,
    skill: "Reves",
    insight: "El reves se estanco en 3/5 hace 2 semanas: repite el mismo drill sin carga progresiva.",
    variant: "Cambiar a reves cruzado con objetivo y aumentar el ritmo de alimentacion un 15%.",
    expectedGain: "Salir de la meseta en 2-3 semanas",
  },
  "4": {
    stalledWeeks: 5,
    skill: "Volea",
    insight: "Este alumno se estanco hace 5 semanas en volea y bajo la frecuencia. Priorizar reenganche.",
    variant: "Bloques cortos de 20 min de volea + juego reducido para recuperar motivacion.",
    expectedGain: "Reactivar adherencia y desbloquear volea",
  },
  "5": {
    stalledWeeks: 3,
    skill: "Volea",
    insight: "Este alumno se estanco hace 3 semanas en volea. Mismo estimulo, sin progresion.",
    variant: "Probar esta variante: volea de definicion en movimiento con desplazamiento lateral.",
    expectedGain: "Retomar progresion de +0.5/5 por mes",
  },
  "6": {
    stalledWeeks: 4,
    skill: "Estrategia",
    insight: "Estancado hace 4 semanas y desconectado. La progresion tecnica quedo en pausa.",
    variant: "Reencuadre: 1 sesion de partido guiado para reconectar antes de sumar carga tecnica.",
    expectedGain: "Reenganche + base para retomar plan",
  },
}

const DEFAULT_SUGGESTION: ProgressionSuggestion = {
  stalledWeeks: 3,
  skill: "Tecnica",
  insight: "Detectamos una meseta en la progresion reciente.",
  variant: "Introducir una variante nueva del ejercicio para romper la adaptacion.",
  expectedGain: "Retomar la curva de mejora",
}

export function getProgressionSuggestion(studentId: string): ProgressionSuggestion {
  return SUGGESTION_BY_STUDENT[studentId] ?? DEFAULT_SUGGESTION
}

// ---- Generacion de rutinas ----------------------------------------------

const DAYS = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

const BLOCKS: RoutineExercise[][] = [
  [
    { name: "Entrada en calor dinamica", detail: "10 min movilidad + activacion de hombro", focus: "fisico" },
    { name: "Derecha cruzada con objetivo", detail: "4 series de 12, foco en grip y seguimiento", focus: "tecnica" },
    { name: "Peloteo de fondo controlado", detail: "15 min a ritmo medio, profundidad constante", focus: "tecnica" },
  ],
  [
    { name: "Circuito de agilidad", detail: "6 estaciones x 30s, desplazamiento lateral", focus: "fisico" },
    { name: "Resistencia aerobica", detail: "20 min continuo zona 2", focus: "fisico" },
  ],
  [
    { name: "Saque: lanzamiento consistente", detail: "50 saques, pelota a la 1 en punto", focus: "tecnica" },
    { name: "Primera de quiebre", detail: "4 series de 10 al cuerpo", focus: "tactica" },
  ],
  [
    { name: "Subida a la red", detail: "Aproximacion + volea, 6 series", focus: "tactica" },
    { name: "Volea de definicion", detail: "3 series de 12 en movimiento", focus: "tecnica" },
  ],
  [
    { name: "Partido guiado", detail: "Sets cortos aplicando patron de juego", focus: "partido" },
    { name: "Vuelta a la calma", detail: "10 min estiramiento + registro de sensaciones", focus: "fisico" },
  ],
]

export function generateWeeklyRoutine(
  studentId: string,
  input: RoutineGoalInput,
): GeneratedRoutine {
  const risk = getRetentionRisk(studentId)
  const suggestion = getProgressionSuggestion(studentId)
  const trainingDays = Math.min(Math.max(input.diasPorSemana, 2), 6)

  const days: RoutineDay[] = DAYS.map((day, i) => {
    const isTraining = i < trainingDays
    if (!isTraining) {
      return { day, title: "Descanso activo", rest: true, exercises: [] }
    }
    const block = BLOCKS[i % BLOCKS.length]
    return {
      day,
      title: `Bloque ${i + 1}`,
      rest: false,
      exercises: input.considerarLesiones
        ? block.map((e) =>
            e.focus === "fisico"
              ? e
              : { ...e, detail: `${e.detail} · carga adaptada a lesion previa` },
          )
        : block,
    }
  })

  const rationale = [
    `Objetivo: ${input.objetivo || "mejora general"} con foco en ${input.enfoque}.`,
    `Ajustado al historial de cargas real del atleta (nivel y volumen recientes).`,
  ]
  if (suggestion.stalledWeeks > 0) {
    rationale.push(
      `Incluye la variante sugerida para ${suggestion.skill.toLowerCase()} (meseta de ${suggestion.stalledWeeks} semanas).`,
    )
  }
  if (input.considerarLesiones) {
    rationale.push("Carga reducida en ejercicios de impacto por lesiones previas registradas.")
  }
  if (risk.level !== "verde") {
    rationale.push("Bloques mas cortos para favorecer la adherencia y el reenganche.")
  }

  return {
    summary: `Plan de ${trainingDays} dias generado a partir del objetivo, nivel, lesiones e historial de cargas.`,
    rationale,
    days,
  }
}
