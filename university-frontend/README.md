# 🎓 UniSys Frontend – University Management Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/ESLint-Configured-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
</p>

<p align="center">
A clean, fast <strong>React + Vite</strong> admin dashboard for the
<a href="../unisys"><strong>UniSys API</strong></a>, used to manage
<strong>students</strong>, <strong>tutors</strong>, and <strong>subjects</strong> from the browser.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-api-integration">API</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 📖 Overview

**UniSys Frontend** is the web client for the UniSys University Management System.
It talks to the ASP.NET Core backend over REST and gives administrators a simple
interface to view and manage university records.

```
 ┌──────────────────────┐        HTTP / JSON        ┌──────────────────────┐
 │   UniSys Frontend    │  ───────────────────────► │      UniSys API      │
 │   React + Vite       │  ◄─────────────────────── │   ASP.NET Core       │
 │   localhost:5173     │                           │   localhost:5137     │
 └──────────────────────┘                           └──────────┬───────────┘
                                                               │
                                                               ▼
                                                     PostgreSQL · RabbitMQ
```

---

## ✨ Features

### 📊 Dashboard
- Overview of key university stats with reusable `StatCard` components

### 👨‍🎓 Student Management (fully connected to the API)
- ➕ **Create** students (name, major, GPA)
- 📋 **List** all students in a table, including enrolled subject count
- ✏️ **Edit** students inline
- 🗑️ **Delete** students
- ⏳ Loading and ❌ error states

### 👨‍🏫 Tutors & 📚 Subjects
- Routed pages ready; API integration in progress (see [Roadmap](#-roadmap))

### 🧭 Navigation
- Client-side routing with **React Router**
- Persistent **Navbar** and **Sidebar** layout

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| ⚛️ React 19 | UI library |
| ⚡ Vite 8 | Dev server & bundler (instant HMR) |
| 🧭 React Router 7 | Client-side routing |
| 🌐 Fetch API | HTTP calls to the backend |
| 🧹 ESLint | Code quality & React Hooks rules |

---

## 📂 Project Structure

```
university-frontend
│
├── public/                 # Static assets (favicon, icons)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Top navigation bar
│   │   ├── Sidebar.jsx     # Side menu with route links
│   │   └── StatCard.jsx    # Reusable dashboard stat card
│   │
│   ├── Pages/
│   │   ├── Dashboard.jsx   # Overview page
│   │   ├── Students.jsx    # Full CRUD for students
│   │   ├── Tutors.jsx      # Tutors page
│   │   └── Subjects.jsx    # Subjects page
│   │
│   ├── services/
│   │   └── api.js          # All backend API calls
│   │
│   ├── App.jsx             # Layout + routes
│   ├── main.jsx            # Entry point (BrowserRouter)
│   ├── App.css
│   └── index.css
│
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) **18+** and npm
- The [UniSys API](../unisys) running locally on `http://localhost:5137`

### 1. Clone the repository

```bash
git clone https://github.com/moh05-a/uni-system-api.git
cd uni-system-api/university-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the backend

In a separate terminal, run the API (see the [backend README](../unisys/README.md)):

```bash
cd ../unisys
dotnet run
```

> 💡 Make sure CORS is enabled in the API for `http://localhost:5173`.

### 4. Run the frontend

```bash
npm run dev
```

Open 👉 **http://localhost:5173**

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build an optimized production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on the project |

---

## 🔌 API Integration

All HTTP calls live in [`src/services/api.js`](src/services/api.js).
The base URL is configured at the top of that file:

```js
const API_URL = 'http://localhost:5137'
```

| Function | Method | Endpoint |
|----------|--------|----------|
| `getStudents()` | `GET` | `/api/students` |
| `createStudent(student)` | `POST` | `/api/students` |
| `updateStudent(id, student)` | `PUT` | `/api/students/{id}` |
| `deleteStudent(id)` | `DELETE` | `/api/students/{id}` |

Example request body:

```json
{
  "name": "Mohammad",
  "major": "Computer Science",
  "gpa": 3.8
}
```

---

## 🗺️ Roadmap

- [x] App layout with Navbar & Sidebar
- [x] Client-side routing
- [x] Student CRUD connected to the API
- [ ] Tutors CRUD
- [ ] Subjects CRUD
- [ ] Live dashboard stats from the API
- [ ] Assign students to subjects
- [ ] Move API URL to an environment variable (`VITE_API_URL`)
- [ ] Search, filtering & pagination
- [ ] JWT authentication & protected routes
- [ ] Responsive / mobile-friendly design
- [ ] Dockerize and deploy

---

## 🧩 Related

| Project | Description |
|---------|-------------|
| [**UniSys API**](../unisys) | ASP.NET Core backend · PostgreSQL · RabbitMQ |
| [**Unit Tests**](../UniSys.UnitTests) | Unit tests for services & controllers |
| [**Integration Tests**](../UniSys.IntegrationTests) | End-to-end API tests |

---

## 👨‍💻 Author

**Mohammad Ameerah**

Computer Science Student • Full-Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-moh05--a-181717?style=flat-square&logo=github)](https://github.com/moh05-a)

---

<p align="center">
  ⭐ If you found this project helpful, consider giving it a star on GitHub!
</p>
