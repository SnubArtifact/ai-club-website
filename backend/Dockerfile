FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn psycopg2-binary

# Copy application
COPY . .

# Create static/media directories
RUN mkdir -p staticfiles media

EXPOSE 8000

# Start command
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && python manage.py create_superuser_if_none && gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 2"]