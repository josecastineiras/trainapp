# TrainApp 🎾

**La app de progreso diseñada para instructores y atletas.**

TrainApp permite a instructores gestionar el avance de sus alumnos y a los atletas hacer seguimiento de su progreso en tiempo real, todo desde una interfaz mobile-first simple y sin fricciones.

🔗 **Demo en vivo:** [v0-tennis-progress-app.vercel.app](https://v0-tennis-progress-app.vercel.app)

---

## ✨ Funcionalidades

### Vista Instructor
- Panel de control con resumen de clientes, sesiones del día y cobros pendientes
- Gestión de clientes con ficha individual y historial
- Creación y asignación de rutinas personalizadas
- Registro de pagos y seguimiento de deuda

### Vista Atleta
- Racha de entrenamiento y motivación diaria
- Rutina del día con checklist de ejercicios
- Progreso mensual con métricas visuales
- Mensajes directos del instructor

---

## 🛠 Tech Stack

| Tecnología | Uso |
|---|---|
| [Next.js 14](https://nextjs.org/) | Framework React con App Router |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos utilitarios |
| [shadcn/ui](https://ui.shadcn.com/) | Componentes de UI |
| [pnpm](https://pnpm.io/) | Package manager |
| [Vercel](https://vercel.com/) | Deploy y hosting |

---

## 🚀 Cómo correr el proyecto localmente

### Requisitos previos
- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/josecastineiras/trainapp.git
cd trainapp

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev
```

La app va a estar disponible en [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

```bash
pnpm dev        # Servidor de desarrollo
pnpm build      # Build de producción
pnpm start      # Servidor de producción
pnpm lint       # Linter
```

---

## 📁 Estructura del proyecto

```
trainapp/
├── app/                  # App Router de Next.js
│   ├── layout.tsx        # Layout raíz
│   └── page.tsx          # Página principal
├── components/           # Componentes reutilizables
│   └── ui/               # Componentes de shadcn/ui
├── hooks/                # Custom hooks de React
├── lib/                  # Utilidades y helpers
├── public/               # Assets estáticos
├── styles/               # Estilos globales
└── README.md
```

---

## 🌐 Deploy

El proyecto está configurado para deploy automático en Vercel.

Cada push a `main` dispara un nuevo deploy en producción.

Para hacer tu propio deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/josecastineiras/trainapp)

---

## 📍 Roadmap

- [ ] Autenticación de usuarios (instructor / atleta)
- [ ] Base de datos persistente (Supabase / PlanetScale)
- [ ] Módulo de cobros integrado (Mercado Pago)
- [ ] Notificaciones push
- [ ] PWA instalable desde el browser
- [ ] Soporte multi-deporte (fútbol, básquet, natación)

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor abrí un issue antes de hacer un PR para discutir los cambios propuestos.

---

## 📄 Licencia

MIT © [Jose Castineiras](https://github.com/josecastineiras)
