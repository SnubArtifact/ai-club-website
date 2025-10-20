#!/bin/bash

# Script to populate the database with sample data

# Ensure we're in the correct directory
cd "$(dirname "$0")"

# Activate virtual environment if it exists
if [ -d "../venv" ]; then
    source ../venv/bin/activate
    echo "Virtual environment activated."
else
    echo "Warning: Virtual environment not found. Using system Python."
fi

# Run migrations first to ensure schema is up to date
echo "Running migrations..."
python manage.py migrate

# Run the populate command
echo "Populating database..."
python manage.py populate_data

# Check if the command was successful
if [ $? -eq 0 ]; then
    echo "✅ Database populated successfully!"
else
    echo "❌ Error: Database population failed."
    exit 1
fi