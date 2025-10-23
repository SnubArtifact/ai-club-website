import os
import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from main.models import Member, BlogPost, Project
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Populates the database with sample data'
    
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting data population...'))
        
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        Member.objects.all().delete()
        BlogPost.objects.all().delete()
        Project.objects.all().delete()
        
        # Create members
        self.stdout.write('Creating members...')
        members = self.create_members()
        
        # Create blog posts
        self.stdout.write('Creating blog posts...')
        blogs = self.create_blogs(members)
        
        # Create projects
        self.stdout.write('Creating projects...')
        projects = self.create_projects()
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created:'))
        self.stdout.write(self.style.SUCCESS(f'- {len(members)} members'))
        self.stdout.write(self.style.SUCCESS(f'- {len(blogs)} blog posts'))
        self.stdout.write(self.style.SUCCESS(f'- {len(projects)} projects'))

    def create_members(self):
        members = []
        
        # Create POR holders
        por_positions = [
            'President', 
            'Vice President', 
            'Secretary', 
            'Treasurer', 
            'Technical Lead',
            'Design Lead',
            'Content Lead',
            'PR Lead'
        ]
        
        for i, position in enumerate(por_positions):
            member = Member.objects.create(
                name=f'{position.split()[0]} {["Smith", "Johnson", "Williams", "Jones", "Brown"][i % 5]}',
                email=f'{position.lower().replace(" ", ".")}@aiclub.org',
                bio=f'Passionate AI enthusiast with expertise in {random.choice(["computer vision", "NLP", "reinforcement learning", "deep learning", "GANs"])}.',
                batch=f'20{random.randint(18, 22)}',
                designation=position,
                is_por_holder=True,
                is_active=True,
                github_link=f'https://github.com/user{i+1}',
                linkedin_link=f'https://linkedin.com/in/user{i+1}',
                joined_date=timezone.now().date() - timedelta(days=random.randint(30, 365))
            )
            members.append(member)
            self.stdout.write(f'Created POR holder: {member.name} - {member.designation}')
        
        # Create regular members
        designations = [
            'Member', 
            'ML Engineer', 
            'Research Assistant', 
            'Developer',
            'Data Scientist',
            'AI Enthusiast'
        ]
        
        for i in range(15):
            is_active = random.random() > 0.3
            member = Member.objects.create(
                name=f'Member {["Anderson", "Taylor", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson"][i % 8]} {i+1}',
                email=f'member{i+1}@aiclub.org',
                bio=f'Working on AI projects with focus on {random.choice(["computer vision", "NLP", "reinforcement learning", "deep learning", "GANs"])}.',
                batch=f'20{random.randint(18, 22)}',
                designation=random.choice(designations),
                is_por_holder=False,
                is_active=is_active,
                github_link=f'https://github.com/member{i+1}',
                linkedin_link=f'https://linkedin.com/in/member{i+1}',
                joined_date=timezone.now().date() - timedelta(days=random.randint(30, 730))
            )
            members.append(member)
            self.stdout.write(f'Created {"active" if is_active else "inactive"} member: {member.name} - {member.designation}')
            
        return members
        
    def create_blogs(self, members):
        blogs = []
        blog_titles = [
            'Introduction to Neural Networks',
            'The Future of AI Ethics',
            'Building Your First Machine Learning Model',
            'Deep Learning vs Traditional Machine Learning',
            'Understanding Transformers in NLP',
            'Reinforcement Learning Explained',
            'Computer Vision Applications in Healthcare',
            'GANs: Creative AI Systems',
            'The AI Revolution in Education',
            'Quantum Computing and AI',
            'Explainable AI: Making AI Transparent',
            'AI for Climate Change Solutions'
        ]
        
        for i, title in enumerate(blog_titles):
            # Select 1-3 random members as authors
            author_members = random.sample(members, random.randint(1, min(3, len(members))))
            author_names = ', '.join([member.name for member in author_members])
            
            blog = BlogPost.objects.create(
                title=title,
                slug=slugify(title),
                author=author_names,
                date_published=timezone.now() - timedelta(days=random.randint(1, 180)),
                blog_content=f"""# {title}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, 
nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl nec ultricies lacinia,
nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl.

## Key Points

- Point 1: Important concept in AI
- Point 2: Technical details and implementation
- Point 3: Practical applications

## Code Example

```python
def train_model(data, labels):
    model = NeuralNetwork()
    model.compile(optimizer='adam', loss='categorical_crossentropy')
    model.fit(data, labels, epochs=10)
    return model
```
                """,
                small_description=f"Learn about {title.lower()} and its impact on AI technology.",
                blog_image_link=f"https://picsum.photos/id/{i+100}/800/400",
                linkedin_link="https://linkedin.com/company/ai-club",
                github_link="https://github.com/ai-club",
                views_count=random.randint(10, 500),
                is_published=True
            )
            
            # Add 1-3 random members as co-authors
            author_count = random.randint(1, 3)
            co_authors = random.sample(members, author_count)
            blog.author_members.add(*co_authors)
            
            blogs.append(blog)
            self.stdout.write(f"Created blog: {blog.title}")
        
        return blogs
    
    def create_projects(self):
        projects = []
        
        project_data = [
            {
                "name": "AI Image Generator",
                "description": "A generative AI system that creates images from text descriptions using advanced deep learning techniques.",
                "tech_stack": "Python, TensorFlow, GANs, Flask, React",
                "status": "completed"
            },
            {
                "name": "Sentiment Analysis Tool",
                "description": "Natural language processing tool for analyzing sentiment in social media posts and customer reviews.",
                "tech_stack": "Python, PyTorch, BERT, Django, Vue.js",
                "status": "ongoing"
            },
            {
                "name": "Smart Chatbot",
                "description": "Intelligent conversational AI assistant powered by transformer models and fine-tuned for domain-specific queries.",
                "tech_stack": "Python, OpenAI API, LangChain, FastAPI, Next.js",
                "status": "ongoing"
            },
            {
                "name": "Object Detection System",
                "description": "Real-time object detection and tracking system for autonomous vehicles and security applications.",
                "tech_stack": "Python, YOLOv8, OpenCV, TensorFlow, Streamlit",
                "status": "completed"
            },
            {
                "name": "Music Recommendation Engine",
                "description": "Personalized music recommendation system using collaborative filtering and deep learning.",
                "tech_stack": "Python, scikit-learn, Spotify API, MongoDB, React",
                "status": "planned"
            },
            {
                "name": "Automated Essay Grader",
                "description": "AI-powered essay grading system that provides detailed feedback on grammar, structure, and content.",
                "tech_stack": "Python, spaCy, GPT-4, FastAPI, Angular",
                "status": "ongoing"
            },
            {
                "name": "Stock Price Predictor",
                "description": "Machine learning model for predicting stock prices using historical data and sentiment analysis.",
                "tech_stack": "Python, LSTM, pandas, yfinance, Plotly, Dash",
                "status": "completed"
            }
        ]
        
        for i, data in enumerate(project_data):
            start_date = timezone.now().date() - timedelta(days=random.randint(60, 365))
            end_date = None
            
            if data["status"] == "completed":
                end_date = start_date + timedelta(days=random.randint(60, 180))
            
            project = Project.objects.create(
                name=data["name"],
                slug=slugify(data["name"]),
                short_description=data["description"][:200],
                description=data["description"],
                tagline=f"Innovative AI solution for {data['name'].lower()}",
                technologies_used=data["tech_stack"].replace(", ", ","),
                tech_stack=data["tech_stack"],
                hero_section_image_link=f"https://picsum.photos/id/{i+200}/1200/600",
                image_1_link=f"https://picsum.photos/id/{i+210}/800/600",
                website_link="https://aiclub-project.example.com",
                github_link=f"https://github.com/ai-club/{slugify(data['name'])}",
                demo_link=f"https://demo.{slugify(data['name'])}.aiclub.org",
                documentation_link=f"https://docs.{slugify(data['name'])}.aiclub.org",
                start_date=start_date,
                end_date=end_date,
                status=data["status"]
            )
            
            projects.append(project)
            self.stdout.write(f"Created project: {project.name} ({project.status})")
        
        return projects
