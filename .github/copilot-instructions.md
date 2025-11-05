# AI Club Website - Copilot Instructions

## Architecture Overview

This is a **full-stack AI club website** with a Django REST backend and React + Vite frontend, designed as a monorepo with separate `backend/` and `frontend/` directories.

**Key Components:**
- **Backend**: Django 5.2 + DRF providing REST APIs at `/api/members/`, `/api/blogs/`, `/api/projects/`
- **Frontend**: React 19 + Vite + TailwindCSS, single-page app with all pages rendered in one view (no routing)
- **Database**: SQLite (dev) with PostgreSQL support configured but not required
- **Media**: Dual storage pattern - both URL links and file uploads for images

## Development Workflow

### Backend Setup (Windows-optimized)
```bash
cd backend
./entrypoint_windows.sh  # Handles venv, deps, migrations, superuser, seed data, and server
```
- Auto-creates superuser: `admin` / `admin123` (dev only)
- Runs on `http://localhost:8000` (or `$DJANGO_BIND` if set)
- Uses `backend/.venv/Scripts/activate` (Windows paths)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Vite dev server on http://localhost:5173
```

### API Seeding
- Management command: `python manage.py populate_data` creates sample members, blogs, and projects
- Called automatically by `entrypoint_windows.sh` via `populate.sh`

## Critical Patterns

### 1. Dual Media Storage (URLs + Files)
All models (`Member`, `BlogPost`, `Project`) support BOTH external URLs and uploaded files:
```python
photo_link = models.URLField(null=True, blank=True)      # External URL
photo_file = models.ImageField(upload_to='...', ...)    # Local upload
```
**When editing**: Always maintain both fields. Serializers expose both via DRF.

### 2. Slug Auto-Generation
`BlogPost` and `Project` models auto-generate slugs from titles:
```python
def save(self, *args, **kwargs):
    if self.title and not self.slug:
        self.slug = slugify(self.title)
    super().save(*args, **kwargs)
```

### 3. ViewSet Query Parameters
APIs support extensive filtering via query params (see `api.md`):
```python
# Examples from views.py:
?active=true|false           # Member active status
?por_holders=true|false      # POR holders only
?status=ongoing|completed    # Project status
?search=value                # Full-text search
?ordering=-date_published    # Sort descending
```

### 4. Frontend Architecture: No Routing
`App.jsx` renders all pages in a single scroll view:
```jsx
<Landing />
<AboutUs />
<Team />
<Projects />
<Resources />
<ContactUs />
<Blogs />
```
**Important**: Navigation is anchor-based, not route-based. When adding pages, append to `App.jsx` render tree.

### 5. CORS Configuration
Backend allows `localhost:3000` and `localhost:5173` (Vite default):
```python
# backend/backend/settings.py
CORS_ALLOWED_ORIGINS = ["http://localhost:5173", ...]
CORS_ALLOW_CREDENTIALS = True
```

## Model Relationships

- **Member** ↔ **BlogPost**: `ManyToMany` via `author_members` field
  - BlogPost serializer includes nested `author_members_details` (read-only)
- All models use `null=True, blank=True` extensively for optional fields
- Default ordering: Members by POR status then name, Blogs/Projects by date descending

## Testing & Debugging

### Admin Panel
- URL: `http://localhost:8000/admin/`
- Credentials: `admin` / `admin123` (created by `create_superuser_if_none` command)

### API Endpoints
- Base: `http://localhost:8000/api/`
- Router registered: `/api/members/`, `/api/blogs/`, `/api/projects/`
- Browsable API available (DRF default)

### Custom Actions
```python
# ViewSet actions available:
GET /api/members/por_holders/       # Custom action
POST /api/blogs/{id}/increment_views/  # Increment view count
GET /api/projects/ongoing/          # Filter by status
```

## File Locations & Conventions

### Backend
- **Models**: `backend/main/models.py` - Member, BlogPost, Project
- **Views**: `backend/main/views.py` - ViewSets with filtering logic
- **Serializers**: `backend/main/serializers.py` - Full + Basic variants
- **Management Commands**: `backend/main/management/commands/` (populate_data, create_superuser_if_none)

### Frontend
- **Pages**: `frontend/src/pages/{PageName}/{PageName}.jsx`
- **Components**: `frontend/src/components/{ComponentName}/{ComponentName}.jsx`
- **Styling**: TailwindCSS with custom fonts (Montserrat, Playfair Display, Ultra)

## Common Tasks

### Adding a New Model Field
1. Update model in `main/models.py`
2. Create migration: `python manage.py makemigrations`
3. Apply: `python manage.py migrate`
4. Update serializer in `serializers.py`
5. Add to admin if needed (`admin.py`)

### Adding API Filtering
Add to ViewSet's `get_queryset()`:
```python
filter_value = self.request.query_params.get('param_name')
if filter_value:
    queryset = queryset.filter(field__icontains=filter_value)
```

### Environment Notes
- **Windows**: Use `entrypoint_windows.sh` (Git Bash compatible)
- **Unix**: Use `entrypoint_unix.sh`
- PostgreSQL optional - `psycopg2-binary` skipped on Windows if build fails
- Gunicorn excluded on Windows (`sys_platform != 'win32'` in requirements.txt)
