# Portfolio — Sam Al Jaboury

Next.js + Tailwind + Three.js frontend, Go Echo API (repository pattern + goose migrations), MariaDB, Docker, Caddy reverse proxy (`/api/*` → backend, no CORS).

## Layout

```text
portfolio_sam/
  Backend/          Echo + GORM + repository + goose
  Frontend/next/    Next.js App Router
  Caddy/            reverse proxy
  docker-compose.dev.yml
```

## Quick start (Docker)

```bash
cd portfolio_sam
cp .env.example .env   # already have .env for local
docker compose -f docker-compose.dev.yml up --build
```

Then in another terminal, once MariaDB is healthy:

```bash
# from host, point at published DB port 3307
cd Backend
DB_ADDRESS=127.0.0.1:3307 MYSQL_USER=portfolio MYSQL_PASSWORD=portfolio MYSQL_DATABASE=portfolio_sam \
  go run ./cmd/migrate up
```

Open [http://localhost](http://localhost) (Caddy).

### Useful endpoints

- `GET /api/health`
- `GET /api/projects`
- `GET /api/projects/:id`

## Local without Docker

Terminal 1 — MariaDB (or use compose `db` service only).

Terminal 2 — API:

```bash
cd Backend
export MYSQL_USER=portfolio MYSQL_PASSWORD=portfolio MYSQL_DATABASE=portfolio_sam DB_ADDRESS=127.0.0.1:3307 GO_PORT=8080
go run ./cmd/migrate up
go run .
```

Terminal 3 — Next:

```bash
cd Frontend/next
NEXT_PUBLIC_API_BASE=http://localhost:8080 npm run dev
```

## Backend notes

- Controllers depend on `ProjectRepository`, not `*gorm.DB`
- `main.go` wires `NewGormProjectRepository`
- Schema: goose in `Backend/migrations/` (`up` / `down`)

## Frontend notes

- TanStack Query via `Providers` in `layout.tsx`
- `lib/api.ts` → `fetchProjects()` → `Projects` → `ProjectCard`
- External GitHub links use `<a target="_blank">`
# my-portfolio
