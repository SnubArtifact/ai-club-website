from django.contrib import admin
from .models import Member, BlogPost, Project

# Register your models here.

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'designation', 'batch', 'is_por_holder', 'is_active')
    list_filter = ('is_por_holder', 'is_active', 'batch', 'designation')
    search_fields = ('name', 'email', 'designation', 'bio')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'email', 'bio')
        }),
        ('Photos', {
            'fields': ('photo_link', 'photo_file'),
        }),
        ('Academic Info', {
            'fields': ('batch', 'designation'),
        }),
        ('Role Info', {
            'fields': ('is_por_holder', 'is_active'),
        }),
        ('Social Media Links', {
            'fields': ('github_link', 'linkedin_link'),
        }),
        ('Additional Info', {
            'fields': ('joined_date',),
        }),
    )


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'date_published', 'views_count')
    list_filter = ('date_published', 'is_published')
    search_fields = ('title', 'author', 'blog_content', 'small_description')
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'author', 'author_members')
        }),
        ('Dates', {
            'fields': ('date_published',),
        }),
        ('Content', {
            'fields': ('blog_content', 'small_description'),
        }),
        ('Media', {
            'fields': ('blog_image_link', 'blog_image_file', 'thumbnail'),
        }),
        ('Links', {
            'fields': ('linkedin_link', 'github_link', 'medium_link', 'other_links'),
        }),
        ('Status', {
            'fields': ('views_count', 'is_published'),
        }),
    )
    filter_horizontal = ('author_members',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'status')
    list_filter = ('status',)
    search_fields = ('name', 'description', 'short_description', 'technologies_used')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'short_description', 'description', 'tagline')
        }),
        ('Technologies', {
            'fields': ('technologies_used', 'tech_stack'),
        }),
        ('Images', {
            'fields': ('hero_section_image_link', 'hero_section_image_file', 'image_1_link'),
        }),
        ('Links', {
            'fields': ('website_link', 'github_link', 'demo_link', 'documentation_link', 'video_link'),
        }),
        ('Timeline', {
            'fields': ('start_date', 'end_date', 'status'),
        }),
    )
