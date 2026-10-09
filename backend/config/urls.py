from pathlib import Path
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import HttpResponse
from django.conf import settings
from django.views.static import serve


def frontend_view(request):
    """Serve the Vite-built React index.html page."""
    index_file = settings.BASE_DIR / 'frontend_dist' / 'index.html'
    if index_file.exists():
        with open(index_file, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read(), content_type='text/html')
    return HttpResponse(
        "<h1>Frontend Build Not Found</h1><p>Run <code>npm.cmd run build</code> inside the <code>frontend/</code> directory.</p>",
        status=404
    )


urlpatterns = [
    # 1. Admin URLs
    path('admin/', admin.site.urls),

    # 2. REST API Endpoints (Takes Precedence)
    path('api/', include('tasks.urls')),

    # 3. Serve Vite Static Assets (/assets/...)
    re_path(
        r'^assets/(?P<path>.*)$',
        serve,
        {'document_root': settings.BASE_DIR / 'frontend_dist' / 'assets'}
    ),

    # 4. React SPA Fallback (Excludes /api/, /admin/, and /assets/)
    re_path(r'^(?!api/|admin/|assets/).*$', frontend_view, name='frontend'),
]
