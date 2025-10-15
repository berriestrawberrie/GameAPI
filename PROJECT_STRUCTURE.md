# 🧩 Project Structure Overview

# GameAPI

This is the main documentation file.  
It explains how to run both frontend and backend, project goals, and team roles.

## Frontend

This folder contains all frontend code (HTML, CSS, JS, React if added later).

Located in `/frontend/`

- Builds UI using HTML/Tailwind or React.
- Fetches data from backend API.
- Contains all visual and interaction code.

## Backend

This folder contains all backend code (APIs, database, Prisma, and configuration).

Located in `/backend/`

- Express + TypeScript + Prisma.
- Handles APIs for users, games, sessions, and stats.
- Connects to PostgreSQL (or SQLite for local testing).

## Database

Managed with Prisma ORM.

- Schema defined in `prisma/schema.prisma`
- Seed data in `prisma/seed.ts`
- Migrations run via `npx prisma migrate dev`

## Workflow

1. Backend team runs API server (port 3000).
2. Frontend team connects using `fetch('http://localhost:3000/api/...')`.
3. Data updates appear in stats and charts.

## /backend/package.json

Node.js project manifest.

Backend team:

- Defines dependencies (Express, Prisma, Zod, TypeScript, etc.)
- Contains npm scripts (dev, build, migrate, seed).
  Do not edit scripts unless adding new commands.

## /backend/tsconfig.json

TypeScript compiler configuration.

Defines:

- Source directory (src)
- Output directory (dist)
- Compilation rules (strict mode, ES modules, etc.)

Backend team: do not change unless necessary for compilation.

## Folders

- `routes/` → REST endpoints
  Holds route definition files (Express routers).

Each file = one group of related endpoints.
Example:

- users.ts → routes for managing users (/api/users)
- games.ts → routes for games (/api/games)
- sessions.ts → routes for starting/stopping sessions

- `controllers/` → logic for analytics or computations
  Controllers contain helper functions used by routes,
  such as analytics, statistics, or complex DB logic.

- `lib/` → helpers and shared modules
  Utility modules shared across the backend (e.g., database client, helpers).

- `types/` → global TypeScript types
  Contains custom TypeScript types and interfaces shared across backend code.

- `prisma/` → database schema & seed
  Prisma schema defining database tables and relations.

Entities:

- User: stores players' info.
- Game: stores available games.
- Session: stores game sessions (play time per user/game).

Backend team:

- Update models here if DB structure changes.
- Run `npx prisma migrate dev --name <desc>` after edits.

- `frontend/` → UI code

## 🚀 Quick Start

```bash
# Clone the repo
git clone <repo-url>
cd gameAPI

# Backend setup
cd backend
npm install
cp .env.example .env        # set DATABASE_URL
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev                 # server → http://localhost:3000 example

# Frontend setup
cd ../frontend
npx serve                   # open → http://localhost:3000 example
```
