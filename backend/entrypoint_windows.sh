#!/usr/bin/env bash
set -euo pipefail

# Entrypoint for Windows (Git Bash / PowerShell)

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

DJANGO_MANAGE="${ROOT_DIR}/manage.py"

echo "[entrypoint] Running from $ROOT_DIR"

if [ ! -f "$DJANGO_MANAGE" ]; then
  echo "[entrypoint] Error: manage.py not found in $ROOT_DIR" >&2
  exit 1
fi

# Activate virtualenv on Windows (Scripts folder)
if [ -d "$ROOT_DIR/.venv" ]; then
  echo "[entrypoint] Activating virtualenv at .venv"
  if [ -f "$ROOT_DIR/.venv/Scripts/activate" ]; then
    source "$ROOT_DIR/.venv/Scripts/activate"
  else
    echo "[entrypoint] Error: could not find virtualenv activation script in .venv/Scripts" >&2
    exit 1
  fi
else
  if command -v python >/dev/null 2>&1; then
    if [ -f "$ROOT_DIR/requirements.txt" ]; then
      echo "[entrypoint] No .venv found. Creating .venv and installing requirements"
      python -m venv "$ROOT_DIR/.venv"
      source "$ROOT_DIR/.venv/Scripts/activate"
      pip install --upgrade pip setuptools wheel
      pip install -r "$ROOT_DIR/requirements.txt"
    else
      echo "[entrypoint] No .venv and no requirements.txt; creating empty .venv"
      python -m venv "$ROOT_DIR/.venv"
      source "$ROOT_DIR/.venv/Scripts/activate"
    fi
  else
    echo "[entrypoint] python not found. Please install Python and rerun." >&2
    exit 1
  fi
fi

# Debug info
echo "[entrypoint] Activated venv with Python at: $(which python)"
python --version
pip --version
pip list

echo "[entrypoint] Installing requirements from requirements.txt..."

# Upgrade pip, setuptools, wheel before install
pip install --upgrade pip setuptools wheel

# Create temp requirements file excluding psycopg2-binary
grep -v 'psycopg2-binary' "$ROOT_DIR/requirements.txt" > /tmp/req_no_psycopg2.txt || true

# Install everything except psycopg2-binary first
echo "[entrypoint] Installing core requirements..."
pip install -r /tmp/req_no_psycopg2.txt

# Try to install psycopg2-binary with binary wheels only
echo "[entrypoint] Attempting to install psycopg2-binary..."
if pip install --only-binary=:all: psycopg2-binary; then
  echo "[entrypoint] psycopg2-binary installed successfully."
else
  echo "[entrypoint] WARNING: Could not install psycopg2-binary."
  echo "This is OK if you're using SQLite. For PostgreSQL, install PostgreSQL and add pg_config to PATH."
fi

echo "[entrypoint] Requirements installation complete."

echo "[entrypoint] Applying database migrations..."
python "$DJANGO_MANAGE" migrate --noinput

echo "[entrypoint] Creating admin superuser (username: admin, password: admin123)..."
python "$DJANGO_MANAGE" create_superuser_if_none

echo ""
echo "=========================================="
echo "  Django Admin Panel Access"
echo "=========================================="
echo "  URL:      http://localhost:8000/admin/"
echo "  Username: admin"
echo "  Password: admin123"
echo "=========================================="
echo ""

if [ -f "$ROOT_DIR/populate.sh" ]; then
  if [ -x "$ROOT_DIR/populate.sh" ]; then
    echo "[entrypoint] Running populate.sh"
    "$ROOT_DIR/populate.sh"
  else
    echo "[entrypoint] populate.sh found but not executable. Running with bash"
    bash "$ROOT_DIR/populate.sh"
  fi
else
  echo "[entrypoint] No populate.sh found; skipping population"
fi

DJANGO_BIND="${DJANGO_BIND-0.0.0.0:8000}"

echo "[entrypoint] Starting Django development server at $DJANGO_BIND"

python "$DJANGO_MANAGE" runserver "$DJANGO_BIND"
