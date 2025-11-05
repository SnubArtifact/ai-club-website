from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction


class Command(BaseCommand):
    help = 'Creates a superuser if none exists'

    def handle(self, *args, **options):
        User = get_user_model()
        
        username = 'admin'
        email = 'admin@example.com'
        password = 'admin123'
        
        try:
            with transaction.atomic():
                if not User.objects.filter(username=username).exists():
                    User.objects.create_superuser(
                        username=username,
                        email=email,
                        password=password
                    )
                    self.stdout.write(self.style.SUCCESS('✅ Superuser created successfully!'))
                    self.stdout.write(self.style.SUCCESS(f'   Username: {username}'))
                    self.stdout.write(self.style.SUCCESS(f'   Email:    {email}'))
                    self.stdout.write(self.style.SUCCESS(f'   Password: {password}'))
                else:
                    # Update existing user to ensure they're a superuser with correct password
                    user = User.objects.get(username=username)
                    user.email = email
                    user.is_staff = True
                    user.is_superuser = True
                    user.is_active = True
                    user.set_password(password)
                    user.save()
                    self.stdout.write(self.style.SUCCESS('✅ Existing admin user updated!'))
                    self.stdout.write(self.style.SUCCESS(f'   Username: {username}'))
                    self.stdout.write(self.style.SUCCESS(f'   Password: {password}'))
                    self.stdout.write(self.style.SUCCESS(f'   Superuser: True'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error creating/updating superuser: {str(e)}'))
            raise
