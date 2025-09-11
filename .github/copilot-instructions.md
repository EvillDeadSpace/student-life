# IPI Smart Academic System - AI Agent Instructions

## Architecture Overview

This is a **3-tier academic management system** with integrated AI chatbot:

- **Frontend**: React 18 + TypeScript + Vite (port 5173)
- **Backend**: Spring Boot 3.x + PostgreSQL (port 8080)
- **NLP Service**: Flask + Mistral AI (port 5000)

## Key Development Patterns

### Frontend (React + TypeScript)

- **Context Pattern**: Global state via `Context.tsx` - handles authentication, user types (STUDENT/PROFESOR), and chat state
- **Protected Routes**: Use `ProtectedProfessorRoute` wrapper for professor-only pages
- **Component Structure**:
  - `components/Dashboard/` - Role-specific dashboards (MainBoard, ProfessorBoard, AdminBoard)
  - `components/Auth/` - Login/authentication
  - `components/Faculty/` - Academic features (StudentExams, StudentSchedule)
- **Routing**: React Router with nested routes - dashboard has child routes for profile, settings, exams
- **Chat Integration**: `Chat.tsx` connects to NLP service at `/search` endpoint with typing animation

### Backend (Spring Boot)

- **Controller Pattern**: RESTful controllers per domain:
  - `UserController` - Authentication, user management
  - `ProfessorController` - Professor setup, subject assignment
  - `ExamController` - Exam creation, student registration, grading
  - `SubjectController` - Academic progress, grade management
  - `EnrollmentController` - Student subject enrollment
- **Entity Relationships**:
  - `Faculty_users` → `FacultyStudent`/`FacultyProfessor`
  - `StudentEnrollment` links students to subjects
  - `Grade` tracks academic performance
- **CORS Configuration**: Allow origins `localhost:5173` for React dev server

### NLP Service (Flask)

- **Modular Structure**: `app/` package with `routes.py`, `services.py`, `nlp_utils.py`
- **Knowledge Base**: `fakultetski_sadržaj.txt` loaded at startup for academic Q&A
- **AI Integration**: Uses Mistral AI via GitHub Models API for response generation
- **Search Pattern**: Keyword-based search → context extraction → AI response generation

## Critical Workflows

### Development Setup

```bash
# Start all services
docker-compose up --build

# Frontend development
cd frontend && npm run dev

# Backend development
cd backend/SpringBoot_Service && ./mvnw spring-boot:run

# NLP service development
cd NLP && python main.py
```

### Adding New Academic Features

1. **Database**: Add entity in `backend/src/main/java/com/postgresql/SpringBoot_Service/model/`
2. **Repository**: Create repo interface extending `JpaRepository`
3. **Controller**: Add REST endpoints with `@CrossOrigin(origins = "http://localhost:5173")`
4. **Frontend**: Create component in appropriate `components/` subdirectory
5. **Routing**: Add route in `App.tsx`, update `hideHeaderPaths` if needed

### Authentication Flow

- Login via `/login` endpoint returns user type (STUDENT/PROFESOR/ADMIN)
- Frontend stores in localStorage and Context
- Role-based dashboard routing in `App.tsx`
- Protected routes check `userType` from Context

## Environment Requirements

### Required Environment Variables

```env
# NLP Service
GITHUB_TOKEN=xxx                    # For Mistral AI via GitHub Models
OPEN_API_KEY_MISTRAL=xxx           # Alternative Mistral key
OPEN_API_KEY_OPENAI=xxx            # For embeddings

# Backend (Spring Boot)
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/faculty_database
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=admin
```

### Database Schema

- Core tables: `faculty_users`, `faculty_student`, `faculty_professors`, `exams`, `student_exam_registration`
- Academic tracking: `subjects`, `student_enrollment`, `grades`, `majors`

## Integration Points

### Frontend ↔ Backend API

- Authentication: `POST /login`
- Student management: `POST /add_student`, `GET /student/{email}`
- Academic progress: `GET /api/student/progress/{email}`
- Exam system: `POST /api/exams`, `POST /api/exams/{id}/register`

### Frontend ↔ NLP Service

- Chat interface: `POST http://localhost:5000/search` with `{word: "user question"}`
- Returns: `{response: "AI answer", context_used: [...], query: "..."}`

### Backend ↔ Database

- JPA/Hibernate with PostgreSQL
- Entity relationships managed via `@OneToMany`, `@ManyToOne` annotations
- Transaction management with `@Transactional`

## Project-Specific Conventions

### API Responses

- Spring Boot returns `ResponseEntity<?>` with error handling
- Consistent JSON structure: `{error: "message"}` for errors
- Grade calculation via `GradeCalculator.calculateGrade(points)` utility

### Frontend State Management

- Global auth state via React Context (`Context.tsx`)
- Local component state for UI interactions
- No external state library (Redux, Zustand) used

### File Organization

- Backend: Package by feature (`com.postgresql.SpringBoot_Service`)
- Frontend: Component categorization (`Auth/`, `Dashboard/`, `Faculty/`)
- NLP: Service-oriented (`app/routes.py`, `app/services.py`)

When working on this codebase, always consider the three-service architecture and ensure CORS, authentication, and API contract consistency across all integration points.

# Copilot Instructions

## General Rules

- Nemoj pisati cijeli kod rješenja odmah.
- Prvo mi objasni korak po korak šta da uradim.
- Ako tražim pomoć, daj mi hintove ili mali dio koda, ali ne cijelo rješenje.
- Ako napravim grešku, objasni mi u čemu je greška i kako da je popravim.
- Ponašaj se kao mentor koji me uči da razumijem koncepte.

## Style of Response

- Koristi primjere u malim blokovima koda, ne kompletne datoteke.
- Ponekad koristi pitanja prema meni da me natjeraš da razmišljam.
- Objašnjavaj jednostavnim jezikom, kao da učim.

## Focus

- Uči me korak po korak kako da pišem kod.
- Ne rješavaj sve umjesto mene, nego me vodi da ja sam napišem.
