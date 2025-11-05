# filepath: /home/darsh/ai-club-website/backend/backend/settings.py
"""
Django settings for backend project — consolidated for dev and production.

Loads secrets from environment (.env supported via python-dotenv).
Designed to work with SQLite locally and DATABASE_URL (Postgres) in production.
"""

from pathlib import Path
import os
from datetime import timedelta
import dj_database_url

# optional: load .env when present
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(Path(__file__).resolve().parent.parent, ".env"))
except Exception:
    pass

BASE_DIR = Path(__file__).resolve().parent.parent

# Security
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-dev-key-change-in-production')
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "main",
    "rest_framework",
    "corsheaders",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # serve static files in production
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

# Database
# Prefer DATABASE_URL env (Postgres). Fallback to sqlite for local dev.
DATABASE_URL = os.getenv("DATABASE_URL", "")
if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL, 
            conn_max_age=600,
            conn_health_checks=True,  # Added for better connection handling
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static & Media
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
# Remove frontend dist from STATICFILES_DIRS - nginx will serve it
STATICFILES_DIRS = []
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# REST framework
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
    # Added for production
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ] if not DEBUG else [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
}

# CORS
# Provide CORS_ALLOWED_ORIGINS as comma separated env or fallback to local dev ports
_default_cors = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000"
CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ALLOWED_ORIGINS", _default_cors).split(",")
    if origin.strip()
]
CORS_ALLOW_METHODS = ["DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"]
CORS_ALLOW_CREDENTIALS = True

# CSRF trusted origins (useful when DEBUG=False)
_csrf_env = os.getenv("CSRF_TRUSTED_ORIGINS", "")
if _csrf_env:
    CSRF_TRUSTED_ORIGINS = [s.strip() for s in _csrf_env.split(",") if s.strip()]
else:
    # build from ALLOWED_HOSTS for https schemes if not localhost
    CSRF_TRUSTED_ORIGINS = []
    if not DEBUG:
        for host in ALLOWED_HOSTS:
            if host and host not in ("localhost", "127.0.0.1"):
                if not host.startswith("http"):
                    CSRF_TRUSTED_ORIGINS.append(f"https://{host}")

# Security hardening for production
if not DEBUG:
    # Start with SSL redirect disabled, enable after SSL is working
    SECURE_SSL_REDIRECT = os.getenv("SECURE_SSL_REDIRECT", "False").lower() in ("1", "true", "yes")
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = "SAMEORIGIN"  # Changed from DENY to allow admin frames
    # HSTS - only enable after SSL is confirmed working
    SECURE_HSTS_SECONDS = int(os.getenv("SECURE_HSTS_SECONDS", "0"))  # Start at 0
    SECURE_HSTS_INCLUDE_SUBDOMAINS = False  # Disable until ready
    SECURE_HSTS_PRELOAD = False  # Disable until ready
    
    # Proxy headers (for nginx)
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    USE_X_FORWARDED_HOST = True
    USE_X_FORWARDED_PORT = True

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Logging (enhanced for production debugging)
LOG_LEVEL = os.getenv("DJANGO_LOG_LEVEL", "INFO")
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        }
    },
    "root": {
        "handlers": ["console"],
        "level": LOG_LEVEL,
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
            "propagate": False,
        },
        "django.request": {
            "handlers": ["console"],
            "level": "ERROR",
            "propagate": False,
        },
    },
}

# Optional extras: allow binding to specific interface via env DJANGO_BIND
DJANGO_BIND = os.getenv("DJANGO_BIND", "0.0.0.0:8000")