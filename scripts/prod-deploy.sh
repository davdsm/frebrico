#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

COMPOSE=(docker compose -f docker-compose.yml -f docker-compose.prod.yml)

if [[ ! -f .env ]]; then
  echo "Missing .env in project root."
  echo "Copy .env.example to .env and set production values (JWT_SECRET, VITE_BASE_URL, …)."
  exit 1
fi

# shellcheck disable=SC1091
set -a
source .env
set +a

if [[ -z "${JWT_SECRET:-}" ]]; then
  echo "JWT_SECRET is required in .env for production."
  exit 1
fi

export NODE_ENV=production

echo "Building production images…"
"${COMPOSE[@]}" build "$@"

echo "Starting production stack…"
"${COMPOSE[@]}" up -d

FRONTEND_PORT="${FRONTEND_PORT:-4173}"

echo "Production stack is up."
echo "  Frontend (Vite preview): http://localhost:${FRONTEND_PORT}"
echo "  API:                     same-origin /api (proxied by Vite to backend)"
echo "  Backend:                 http://127.0.0.1:3002 (localhost only)"
echo "  Traefik:                 route to 127.0.0.1:${FRONTEND_PORT} (avoid 80/443/3000/4000/8080 on the host)"
