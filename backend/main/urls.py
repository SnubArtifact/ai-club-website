from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'members', views.MemberViewSet, basename='member')
router.register(r'blogs', views.BlogPostViewSet, basename='blog')
router.register(r'projects', views.ProjectViewSet, basename='project')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]