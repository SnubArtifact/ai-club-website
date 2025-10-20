# Backend — Quick start

Run the entire local backend setup with one command:

```bash
cd backend
chmod +x entrypoint.sh   # only needed once if the file isn't executable
./entrypoint.sh
```

What `./entrypoint.sh` does (in order):

- Creates and activates a Python virtualenv at `.venv/` (if `.venv/` does not already exist).
- Installs `requirements.txt` into the virtualenv (if `requirements.txt` exists).
- Runs Django migrations (`manage.py migrate`).
- Ensures a superuser exists with the credentials below (creates or resets if present).
- Runs `populate.sh` (if present) to seed example data.
- Starts the Django development server (default: `0.0.0.0:8000`).

Default admin credentials (for local development only):

- username: `admin`
- password: `admin123`

Override the bind address before running the script (optional):

```bash
export DJANGO_BIND=127.0.0.1:8001
./entrypoint.sh
```

If you prefer to prepare a virtualenv yourself instead of letting the script create it:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
./entrypoint.sh
```

Notes & security
- The script uses fixed `admin`/`admin123` credentials for convenience. Do NOT use these in production or public repos.
- If you want different behavior (no automatic admin creation, different password, etc.), edit `entrypoint.sh`.
- The server runs in the foreground (development server). For production use a proper WSGI server and configuration.

Troubleshooting
- If `python3` is not installed, install Python 3 first.
- If `pip install` fails, try running the commands inside an activated virtualenv (see example above).
- Check terminal output for migration or dependency installation errors.

That's it — one command to get the backend ready for local development.
