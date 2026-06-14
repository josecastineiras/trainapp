import type { User, TrainingSession, Achievement, Feedback, Student } from "./types"

export const mockInstructor: User = {
  id: "instructor-1",
  name: "Roberto Sanchez",
  email: "roberto.instructor@gmail.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joseph",
  level: "avanzado",
  joinDate: "2020-03-01",
  role: "instructor",
  sport: "tenis",
}

export const mockUser: User = {
  id: "1",
  name: "Carlos Martinez",
  email: "carlos.martinez@gmail.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joseph",
  level: "intermedio",
  joinDate: "2024-01-15",
  role: "alumno",
  instructorId: "instructor-1",
  sport: "tenis",
}

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Lucas Rodríguez",
    email: "lucas.martinez@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    level: "intermedio",
    joinDate: "2024-01-15",
    role: "alumno",
    instructorId: "instructor-1",
    sport: "tenis",
    sessions: [],
    feedback: [],
  },
  {
    id: "2",
    name: "Sofía Peralta",
    email: "sofi.lopez@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    level: "principiante",
    joinDate: "2024-06-20",
    role: "alumno",
    instructorId: "instructor-1",
    sport: "tenis",
    sessions: [],
    feedback: [],
  },
  {
    id: "3",
    name: "Tomás Mendez",
    email: "tomas.garcia@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
    level: "avanzado",
    joinDate: "2023-09-10",
    role: "alumno",
    instructorId: "instructor-1",
    sport: "tenis",
    sessions: [],
    feedback: [],
  },
  {
    id: "4",
    name: "Martina Garcia",
    email: "martina.raaz@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Martina",
    level: "intermedio",
    joinDate: "2024-02-28",
    role: "alumno",
    instructorId: "instructor-1",
    sport: "tenis",
    sessions: [],
    feedback: [],
  },
  {
    id: "5",
    name: "Rodrigo Vega",
      email: "Rodrigo.vega@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rodrigo",
    level: "intermedio",
    joinDate: "2024-02-28",
    role: "alumno",
    instructorId: "instructor-1",
    sport: "tenis",
    sessions: [],
    feedback: [],
  },
  {
    id: "6",
    name: "Camila Acosta",
    email: "camila.acosta@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camile",
    level: "intermedio",
    joinDate: "2024-02-28",
    role: "alumno",
    instructorId: "instructor-1",
    sport: "tenis",
    sessions: [],
    feedback: [],
  },
]

export const mockFeedback: Feedback[] = [
  {
    id: "fb-1",
    studentId: "1",
    instructorId: "instructor-1",
    date: "2026-03-08",
    type: "feedback",
    message: "Excelente mejora en tu derecha esta semana. El grip esta mucho mejor y el seguimiento es mas fluido.",
    category: "tecnica",
    priority: "normal",
  },
  {
    id: "fb-2",
    studentId: "1",
    instructorId: "instructor-1",
    date: "2026-03-06",
    type: "instruccion",
    message: "Para la proxima sesion: Practica 50 saques diarios enfocandote en el lanzamiento de la pelota. Debe ser consistente a las 1 en punto.",
    category: "tecnica",
    priority: "importante",
  },
  {
    id: "fb-3",
    studentId: "2",
    instructorId: "instructor-1",
    date: "2026-03-07",
    type: "feedback",
    message: "Buen primer mes de entrenamiento. Tu actitud y dedicacion son ejemplares. Sigue asi!",
    category: "actitud",
    priority: "normal",
  },
  {
    id: "fb-4",
    studentId: "3",
    instructorId: "instructor-1",
    date: "2026-03-05",
    type: "instruccion",
    message: "Torneo el proximo sabado: Descansa bien, hidratate y recuerda usar tu reves como arma principal.",
    category: "tactica",
    priority: "importante",
  },
]

export const mockSessions: TrainingSession[] = [
  {
    id: "1",
    date: "2026-03-08",
    duration: 90,
    type: "tecnica",
    skills: [
      { skill: "Derecha", rating: 4 },
      { skill: "Reves", rating: 3 },
    ],
    notes: "Buen progreso en la derecha, trabajar mas el reves",
  },
  {
    id: "2",
    date: "2026-03-06",
    duration: 60,
    type: "fisico",
    skills: [
      { skill: "Juego de pies", rating: 4 },
      { skill: "Resistencia", rating: 3 },
    ],
    notes: "Circuito de agilidad completado",
  },
  {
    id: "3",
    date: "2026-03-04",
    duration: 120,
    type: "partido",
    skills: [
      { skill: "Estrategia", rating: 4 },
      { skill: "Saque", rating: 5 },
    ],
    notes: "Partido ganado 6-4, 6-3. Excelente servicio",
  },
  {
    id: "4",
    date: "2026-03-02",
    duration: 75,
    type: "tactica",
    skills: [
      { skill: "Volea", rating: 3 },
      { skill: "Estrategia", rating: 4 },
    ],
    notes: "Practica de subida a la red",
  },
  {
    id: "5",
    date: "2026-02-28",
    duration: 90,
    type: "tecnica",
    skills: [
      { skill: "Smash", rating: 4 },
      { skill: "Volea", rating: 3 },
    ],
    notes: "Trabajo en juego de red",
  },
]

export const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Primera Sesion",
    description: "Completaste tu primera sesion de entrenamiento",
    icon: "trophy",
    unlockedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Semana Perfecta",
    description: "Entrenaste 5 dias en una semana",
    icon: "flame",
    unlockedAt: "2024-02-01",
  },
  {
    id: "3",
    title: "Maestro del Saque",
    description: "Alcanzaste nivel 5 en saque",
    icon: "target",
    unlockedAt: "2026-03-04",
  },
  {
    id: "4",
    title: "Maraton",
    description: "Acumula 10 horas de entrenamiento",
    icon: "clock",
    unlockedAt: null,
  },
  {
    id: "5",
    title: "Todo Terreno",
    description: "Completa sesiones de todos los tipos",
    icon: "star",
    unlockedAt: null,
  },
]

export function getSkillAverages(sessions: TrainingSession[]) {
  const skillTotals: Record<string, { total: number; count: number }> = {}

  sessions.forEach((session) => {
    session.skills.forEach(({ skill, rating }) => {
      if (!skillTotals[skill]) {
        skillTotals[skill] = { total: 0, count: 0 }
      }
      skillTotals[skill].total += rating
      skillTotals[skill].count += 1
    })
  })

  return Object.entries(skillTotals).map(([skill, { total, count }]) => ({
    skill,
    average: Math.round((total / count) * 10) / 10,
  }))
}

export function getTotalTrainingTime(sessions: TrainingSession[]) {
  return sessions.reduce((acc, session) => acc + session.duration, 0)
}

export function getSessionsByType(sessions: TrainingSession[]) {
  const counts: Record<string, number> = {}
  sessions.forEach((session) => {
    counts[session.type] = (counts[session.type] || 0) + 1
  })
  return counts
}
