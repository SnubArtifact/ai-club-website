from rest_framework import serializers
from .models import Member, BlogPost, Project

class MemberSerializer(serializers.ModelSerializer):
    """
    Serializer for the Member model
    """
    class Meta:
        model = Member
        fields = '__all__'


class MemberBasicSerializer(serializers.ModelSerializer):
    """
    Simplified Member serializer for nested relationships
    """
    class Meta:
        model = Member
        fields = ['id', 'name', 'designation', 'photo_link', 'photo_file', 'github_link', 'linkedin_link']


class BlogPostSerializer(serializers.ModelSerializer):
    """
    Serializer for the BlogPost model
    """
    # Add member details when they are associated with a blog post
    author_members_details = MemberBasicSerializer(source='author_members', many=True, read_only=True)
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'author', 'author_members', 'date_published', 
                 'date_created', 'date_modified', 'blog_content', 'small_description', 
                 'blog_image_link', 'blog_image_file', 'thumbnail', 'linkedin_link', 
                 'github_link', 'medium_link', 'other_links', 'views_count', 
                 'is_published', 'author_members_details']


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializer for the Project model
    """
    class Meta:
        model = Project
        fields = ['id', 'name', 'slug', 'short_description', 'description', 'tagline',
                 'technologies_used', 'tech_stack', 'hero_section_image_link', 
                 'hero_section_image_file', 'image_1_link', 'website_link', 'github_link', 
                 'demo_link', 'documentation_link', 'video_link', 'start_date', 
                 'end_date', 'status', 'created_at', 'updated_at']