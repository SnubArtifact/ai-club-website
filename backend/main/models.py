from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.text import slugify

# Create your models here.

class Member(models.Model):
    name = models.CharField(max_length=250, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    
    # Photos
    photo_link = models.URLField(null=True, blank=True)
    photo_file = models.ImageField(upload_to='member_photos/', null=True, blank=True)
    
    # Academic Info
    batch = models.CharField(max_length=150, null=True, blank=True)
    designation = models.CharField(max_length=250, null=True, blank=True)
    
    # Role Info
    is_por_holder = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True, null=True, blank=True)
    
    # Social Media Links
    github_link = models.URLField(null=True, blank=True)
    linkedin_link = models.URLField(null=True, blank=True)
    
    # Additional Info
    joined_date = models.DateField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    
    class Meta:
        ordering = ['-is_por_holder', 'name']
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'
    
    def __str__(self):
        return f'{self.name or "Unnamed"} - {self.designation or "Member"}'


class BlogPost(models.Model):
    title = models.CharField(max_length=300, null=True, blank=True)
    slug = models.SlugField(max_length=350, unique=True, null=True, blank=True)
    author = models.CharField(max_length=300, null=True, blank=True)
    author_members = models.ManyToManyField(Member, blank=True, related_name='blog_posts')
    
    # Dates
    date_published = models.DateTimeField(default=timezone.now, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    date_modified = models.DateTimeField(auto_now=True, null=True, blank=True)
    
    # Content
    blog_content = models.TextField(null=True, blank=True)
    small_description = models.TextField(null=True, blank=True)
    
    # Media
    blog_image_link = models.URLField(null=True, blank=True)
    blog_image_file = models.ImageField(upload_to='blog_images/', null=True, blank=True)
    thumbnail = models.ImageField(upload_to='blog_thumbnails/', null=True, blank=True)
    
    # Links
    linkedin_link = models.URLField(null=True, blank=True)
    github_link = models.URLField(null=True, blank=True)
    medium_link = models.URLField(null=True, blank=True)
    other_links = models.TextField(null=True, blank=True)
    
    # Status
    views_count = models.IntegerField(default=0, null=True, blank=True)
    is_published = models.BooleanField(default=True, null=True, blank=True)
    
    class Meta:
        ordering = ['-date_published']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
    
    def save(self, *args, **kwargs):
        if self.title and not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'{self.title or "Untitled"} - {self.author or "Unknown"}'


class Project(models.Model):
    STATUS_CHOICES = [
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('planned', 'Planned'),
    ]
    
    # Basic Info
    name = models.CharField(max_length=250, null=True, blank=True)
    slug = models.SlugField(max_length=300, unique=True, null=True, blank=True)
    short_description = models.TextField(null=True, blank=True, help_text="Short project description")
    description = models.TextField(null=True, blank=True, help_text="Detailed project description")
    tagline = models.CharField(max_length=500, null=True, blank=True)
    
    # Technologies
    technologies_used = models.CharField(max_length=500, null=True, blank=True, help_text="Comma-separated technologies")
    tech_stack = models.TextField(null=True, blank=True, help_text="Detailed tech stack")
    
    # Images
    hero_section_image_link = models.URLField(null=True, blank=True)
    hero_section_image_file = models.ImageField(upload_to='projects/hero/', null=True, blank=True)
    image_1_link = models.URLField(null=True, blank=True)  # add more if required
    
    # Links
    website_link = models.URLField(null=True, blank=True)
    github_link = models.URLField(null=True, blank=True)
    demo_link = models.URLField(null=True, blank=True)
    documentation_link = models.URLField(null=True, blank=True)
    video_link = models.URLField(null=True, blank=True)
    
    #team details to be added later if required

    # Timeline
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='ongoing', null=True, blank=True)
    
    # Additional Content add if needed
    # text_1 = models.TextField(null=True, blank=True, help_text="Additional content section 1")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    
    class Meta:
        ordering = ['-start_date']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
    
    def save(self, *args, **kwargs):
        if self.name and not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'{self.name or "Unnamed Project"} - {self.status or "Unknown"}'

