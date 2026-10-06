# UniSys – University Management System

<p align="center">
  <img src="https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge&logo=dotnet" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/RabbitMQ-Messaging-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" />
  <img src="https://img.shields.io/badge/Tests-xUnit-5E1F87?style=for-the-badge" />
</p>

<p align="center">
A full-stack university management system: an <strong>ASP.NET Core Web API</strong> backed by
<strong>PostgreSQL</strong> and <strong>RabbitMQ</strong>, with a <strong>React + Vite</strong> admin dashboard
for managing students, tutors, and subjects.
</p>

---

## Overview

```
 ┌──────────────────────┐      HTTP / JSON      ┌──────────────────────┐
 │  university-frontend │  ───────────────────► │        UniSys        │
 │  React + Vite        │  ◄─────────────────── │  ASP.NET Core API    │
 │  localhost:5173      │                       │  localhost:5137      │
 └──────────────────────┘                       └──────────┬───────────┘
                                                           │
                                              ┌────────────┴────────────┐
                                              ▼                         ▼
                                         PostgreSQL                 RabbitMQ
                                      (EF Core, migrations)   (student.* events)
```

**Highlights**

- Layered architecture: Controllers → Services → Repositories → EF Core
- CRUD for students, tutors, and subjects, using DTOs
- Event publishing and a background consumer over a RabbitMQ topic exchange
- In-memory caching, global exception middleware, and request logging filters
- Unit tests (xUnit + Moq) and integration tests (`WebApplicationFactory` + EF Core InMemory)

---

## Repository Structure

| Path | Description |
|------|-------------|
| [`UniSys/`](UniSys) | ASP.NET Core Web API ([README](UniSys/README.md)) |
| [`university-frontend/`](university-frontend) | React + Vite admin dashboard ([README](university-frontend/README.md)) |
| [`UniSys.UnitTests/`](UniSys.UnitTests) | Unit tests for controllers and services |
| [`UniSys.IntegrationTests/`](UniSys.IntegrationTests) | End-to-end API tests |
| `UniSys.slnx` | .NET solution file |

---

## Getting Started

### Prerequisites

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- PostgreSQL
- RabbitMQ (e.g. `docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:management`)

### 1. Clone

```bash
git clone https://github.com/moh05-a/UniSys.git
cd UniSys
```

### 2. Run the API

Set your PostgreSQL connection string and RabbitMQ settings in [`UniSys/appsettings.json`](UniSys/appsettings.json), then:

```bash
cd UniSys
dotnet ef database update
dotnet run
```

The API runs at `http://localhost:5137`.

### 3. Run the frontend

```bash
cd university-frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

### 4. Run the tests

From the repository root:

```bash
dotnet test UniSys.slnx
```

---

## API Endpoints

| Resource | Endpoints |
|----------|-----------|
| Students | `GET /api/students` · `GET /api/students/{id}` · `POST /api/students` · `PUT /api/students/{id}` · `DELETE /api/students/{id}` |
| Tutors   | `GET /api/tutors` · `POST /api/tutors` · `PUT /api/tutors/{id}` · `DELETE /api/tutors/{id}` |
| Subjects | `GET /api/subjects` · `POST /api/subjects` · `PUT /api/subjects/{id}` · `DELETE /api/subjects/{id}` |

See the [API README](UniSys/README.md) for details on the messaging workflow and architecture.

---

## Author

**Mohammad Ameerah** – Computer Science Student

[![GitHub](https://img.shields.io/badge/GitHub-moh05--a-181717?style=flat-square&logo=github)](https://github.com/moh05-a)
