export type SportId = "tenis" | "personal_trainer"

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  level: "principiante" | "intermedio" | "avanzado"
  joinDate: string
  role: "alumno" | "instructor"
  instructorId?: string // Solo para alumnos
  sport: SportId
}

export interface Feedback {
  id: string
  studentId: string
  instructorId: string
  date: string
  type: "feedback" | "instruccion"
  message: string
  category: "tecnica" | "tactica" | "actitud" | "fisico" | "general"
  priority: "normal" | "importante"
}

export interface Student extends User {
  role: "alumno"
  instructorId: string
  sessions: TrainingSession[]
  feedback: Feedback[]
}

export interface TrainingSession {
  id: string
  date: string
  duration: number // en minutos
  type: string // depende del deporte (ver SPORTS)
  skills: SkillProgress[]
  notes: string
}

export interface SkillProgress {
  skill: string
  rating: number // 1-5
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string | null
}

export interface TrainingType {
  key: string
  label: string
  color: string
}

export interface SportConfig {
  id: SportId
  name: string
  tagline: string
  studentNoun: string // como llamar al alumno (ej. "Alumno", "Cliente")
  skills: string[]
  trainingTypes: TrainingType[]
}

export const SPORTS: Record<SportId, SportConfig> = {
  tenis: {
    id: "tenis",
    name: "Tenis",
    tagline: "Registra tu progreso y mejora tu juego",
    studentNoun: "Atleta",
    skills: [
      "Derecha",
      "Reves",
      "Saque",
      "Volea",
      "Smash",
      "Juego de pies",
      "Estrategia",
      "Resistencia",
    ],
    trainingTypes: [
      { key: "tecnica", label: "Tecnica", color: "bg-chart-1" },
      { key: "tactica", label: "Tactica", color: "bg-chart-2" },
      { key: "fisico", label: "Fisico", color: "bg-chart-3" },
      { key: "partido", label: "Partido", color: "bg-chart-4" },
    ],
  },
  personal_trainer: {
    id: "personal_trainer",
    name: "Personal Trainer",
    tagline: "Registra tus entrenamientos y alcanza tus metas",
    studentNoun: "Cliente",
    skills: [
      "Fuerza",
      "Resistencia",
      "Movilidad",
      "Cardio",
      "Equilibrio",
      "Flexibilidad",
      "Tecnica",
      "Core",
    ],
    trainingTypes: [
      { key: "fuerza", label: "Fuerza", color: "bg-chart-1" },
      { key: "cardio", label: "Cardio", color: "bg-chart-2" },
      { key: "movilidad", label: "Movilidad", color: "bg-chart-3" },
      { key: "hiit", label: "HIIT", color: "bg-chart-4" },
    ],
  },
}

export function getSportConfig(sport: SportId): SportConfig {
  return SPORTS[sport] ?? SPORTS.tenis
}

export function getTrainingTypeInfo(sport: SportId, key: string): TrainingType {
  const config = getSportConfig(sport)
  return (
    config.trainingTypes.find((t) => t.key === key) ?? {
      key,
      label: key,
      color: "bg-muted",
    }
  )
}
