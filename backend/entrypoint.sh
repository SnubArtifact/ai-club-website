#!/usr/bin/env bash
set -euo pipefail

# Entrypoint for the Django backend.
# Usage: cd backend && ./entrypoint.sh
# Environment variables (optional):
# DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, DJANGO_SUPERUSER_PASSWORD, DJANGO_BIND (default 0.0.0.0:8000)

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

DJANGO_MANAGE="${ROOT_DIR}/manage.py"

echo "[entrypoint] Running from $ROOT_DIR"

if [ ! -f "$DJANGO_MANAGE" ]; then
  echo "[entrypoint] Error: manage.py not found in $ROOT_DIR" >&2
  exit 1
fi

# If a virtualenv exists at .venv, activate it. Otherwise try to ensure requirements are installed.
if [ -d "$ROOT_DIR/.venv" ]; then
  echo "[entrypoint] Activating virtualenv at .venv"
  # shellcheck disable=SC1091
  # shellcheck source=/dev/null
  source "$ROOT_DIR/.venv/bin/activate"
else
  if command -v python3 >/dev/null 2>&1; then
    if [ -f "$ROOT_DIR/requirements.txt" ]; then
      echo "[entrypoint] No .venv found. Creating .venv and installing requirements"
      python3 -m venv "$ROOT_DIR/.venv"
      # shellcheck disable=SC1091
      # shellcheck source=/dev/null
      source "$ROOT_DIR/.venv/bin/activate"
      pip install --upgrade pip setuptools wheel
      pip install -r "$ROOT_DIR/requirements.txt"
    else
      echo "[entrypoint] No .venv found but requirements.txt missing; creating .venv only"
      python3 -m venv "$ROOT_DIR/.venv"
      # shellcheck disable=SC1091
      # shellcheck source=/dev/null
      source "$ROOT_DIR/.venv/bin/activate"
    fi
  else
    echo "[entrypoint] python3 not found. Please install Python 3 and rerun." >&2
    exit 1
  fi
fi

# Wait for DB lock / service readiness if needed (noop for sqlite)

echo "[entrypoint] Applying database migrations..."
python3 "$DJANGO_MANAGE" migrate --noinput

# Ensure a default admin user exists with known credentials (username: admin, password: admin123)
echo "[entrypoint] Ensuring 'admin' superuser exists with password 'admin123'"
python3 "$DJANGO_MANAGE" shell <<PYCODE
from django.contrib.auth import get_user_model
from django.db import transaction
User = get_user_model()
username = 'admin'
email = 'admin@example.com'
password = 'admin123'
with transaction.atomic():
  if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print('Superuser created:')
    print('  username:', username)
    print('  email:   ', email)
    print('  password:', password)
  else:
    u = User.objects.get(username=username)
    u.email = email
    u.is_staff = True
    u.is_superuser = True
    u.set_password(password)
    u.save()
    print('Existing user updated to superuser and password reset:')
    print('  username:', username)
    print('  password:', password)
PYCODE

# Run population script if present and executable
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

# Default bind address
DJANGO_BIND="${DJANGO_BIND-0.0.0.0:8000}"

echo "[entrypoint] Starting Django development server at $DJANGO_BIND"
python3 "$DJANGO_MANAGE" runserver "$DJANGO_BIND"
