#!/bin/bash

# Script to populate the database with sample data

# Ensure we're in the correct directory
cd "$(dirname "$0")"

# Note: virtualenv should already be activated by entrypoint_windows.sh
# If running standalone, the system Python will be used

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