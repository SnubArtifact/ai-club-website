from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Member, BlogPost, Project
from .serializers import MemberSerializer, BlogPostSerializer, ProjectSerializer

# API Views
class MemberViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for viewing team members
    """
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'designation', 'batch', 'bio']
    ordering_fields = ['name', 'batch', 'joined_date']
    
    def get_queryset(self):
        queryset = Member.objects.all()
        
        # Filter by active status
        active = self.request.query_params.get('active')
        if active is not None:
            is_active = active.lower() == 'true'
            queryset = queryset.filter(is_active=is_active)
        
        # Filter by POR holders
        por_holders = self.request.query_params.get('por_holders')
        if por_holders is not None:
            is_por = por_holders.lower() == 'true'
            queryset = queryset.filter(is_por_holder=is_por)
            
        # Filter by designation
        designation = self.request.query_params.get('designation')
        if designation is not None:
            queryset = queryset.filter(designation__icontains=designation)
            
        # Filter by batch
        batch = self.request.query_params.get('batch')
        if batch is not None:
            queryset = queryset.filter(batch=batch)
            
        return queryset
    
    @action(detail=False)
    def por_holders(self, request):
        """
        Return a list of all POR holders
        """
        por_holders = Member.objects.filter(is_por_holder=True)
        serializer = self.get_serializer(por_holders, many=True)
        return Response(serializer.data)
    
    @action(detail=False)
    def active(self, request):
        """
        Return a list of active members
        """
        active_members = Member.objects.filter(is_active=True)
        serializer = self.get_serializer(active_members, many=True)
        return Response(serializer.data)

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for viewing blog posts
    """
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'author', 'blog_content', 'small_description']
    ordering_fields = ['date_published', 'date_created', 'views_count']
    
    def get_queryset(self):
        queryset = BlogPost.objects.all()
        
        # Filter by published status
        published = self.request.query_params.get('published')
        if published is not None:
            is_published = published.lower() == 'true'
            queryset = queryset.filter(is_published=is_published)
            
        # Filter by author
        author = self.request.query_params.get('author')
        if author is not None:
            queryset = queryset.filter(author__icontains=author)
            
        return queryset
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        """
        Increment the view count for a blog post
        """
        blog = self.get_object()
        blog.views_count = (blog.views_count or 0) + 1
        blog.save()
        return Response({'status': 'view count incremented'})


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for viewing projects
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'short_description', 'technologies_used']  # Removed 'tags'
    ordering_fields = ['name', 'start_date', 'end_date', 'created_at']
    
    def get_queryset(self):
        queryset = Project.objects.all()
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status is not None:
            queryset = queryset.filter(status=status)
            
        # Filter by technology
        technology = self.request.query_params.get('technology')
        if technology is not None:
            queryset = queryset.filter(technologies_used__icontains=technology)
            
        return queryset
        
    @action(detail=False)
    def ongoing(self, request):
        """
        Return a list of ongoing projects
        """
        ongoing = Project.objects.filter(status='ongoing')
        serializer = self.get_serializer(ongoing, many=True)
        return Response(serializer.data)
        
    @action(detail=False)
    def completed(self, request):
        """
        Return a list of completed projects
        """
        completed = Project.objects.filter(status='completed')
        serializer = self.get_serializer(completed, many=True)
        return Response(serializer.data)