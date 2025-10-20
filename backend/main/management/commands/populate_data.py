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
                is_featured=i < 2,  # First couple of blogs are featured
                is_published=True,
                tags=self.generate_tags(title)
            )
            
            # Add 1-3 random members as co-authors
            author_count = random.randint(1, 3)
            co_authors = random.sample(members, author_count)
            blog.author_members.add(*co_authors)
            
            blogs.append(blog)
            self.stdout.write(f"Created blog: {blog.title}")
        
        return blogs
    
    def create_projects(self, count):
        self.stdout.write(self.style.NOTICE(f'Creating {count} projects...'))
        
        if not Member.objects.exists():
            self.stdout.write(self.style.ERROR('No members found! Create members first.'))
            return
        
        members = list(Member.objects.all())
        
        project_names = [
            "AI Image Generator",
            "Sentiment Analysis Tool",
            "Smart Chatbot",
            "Object Detection System",
            "Music Recommendation Engine",
            "Automated Essay Grader",
            "Stock Price Predictor"
        ]
        
        statuses = ['ongoing', 'completed', 'planned']
        
        tech_stacks = [
            "Python, TensorFlow, Flask, React",
            "Python, PyTorch, Django, Next.js",
            "JavaScript, Node.js, Express, MongoDB",
            "Python, scikit-learn, Streamlit",
            "Python, Keras, FastAPI, Vue.js"
        ]
        
        for i in range(count):
            project_name = project_names[i % len(project_names)]
            status = statuses[i % len(statuses)]
            tech_stack = tech_stacks[i % len(tech_stacks)]
            
            start_date = timezone.now() - timedelta(days=random.randint(30, 180))
            end_date = None if status == 'ongoing' else start_date + timedelta(days=random.randint(30, 90))
            
            project = Project.objects.create(
                name=project_name,
                short_description=f"A project to build {project_name.lower()}",
                description=self.generate_project_description(project_name),
                tagline=f"Next-generation {project_name.lower()} for everyone",
                technologies_used=tech_stack.replace(", ", ","),
                tech_stack=tech_stack,
                hero_section_image_link=f"https://picsum.photos/id/{i+200}/1200/600",
                image_1_link=f"https://picsum.photos/id/{i+205}/800/600",
                website_link="https://aiclub-project.example.com",
                github_link="https://github.com/ai-club/project",
                demo_link="https://demo.aiclub-project.example.com",
                team_lead=random.choice(members).name,
                date=f"{start_date.strftime('%b %Y')} - {'Present' if status == 'ongoing' else end_date.strftime('%b %Y')}",
                start_date=start_date,
                end_date=end_date,
                status=status,
                text_1=self.generate_project_text("Overview"),
                text_2=self.generate_project_text("Implementation"),
                features=self.generate_features(),
                challenges=self.generate_challenges(),
                learnings=self.generate_learnings(),
                is_featured=i < 2,  # First couple of projects are featured
                is_published=True,
                order=i,
                category="AI" if i % 2 == 0 else "ML",
                tags=f"AI,ML,{'deep-learning' if i % 2 == 0 else 'machine-learning'}"
            )
            
            # Add 2-5 random members to the project
            team_count = random.randint(2, 5)
            team_members = random.sample(members, team_count)
            project.team_members.add(*team_members)
            
            self.stdout.write(f"Created project: {project.name}")
        
        return projects
    
    def generate_blog_content(self, topic):
        paragraphs = []
        paragraphs.append(f"# {topic}\n\n")
        paragraphs.append(f"## Introduction\n\nThis blog post will explore {topic.lower()} and its applications in modern AI systems. We'll cover the basics and dive into more advanced techniques.\n\n")
        paragraphs.append(f"## What is {topic}?\n\n{topic} is an important area in artificial intelligence that focuses on developing algorithms capable of learning patterns from data. The goal is to create systems that can make decisions or predictions without being explicitly programmed.\n\n")
        paragraphs.append("## Key Concepts\n\n- Concept 1: Lorem ipsum dolor sit amet\n- Concept 2: Consectetur adipiscing elit\n- Concept 3: Sed do eiusmod tempor incididunt\n\n")
        paragraphs.append("## Implementation\n\n```python\n# Sample code\nimport tensorflow as tf\nimport numpy as np\n\ndef build_model():\n    model = tf.keras.Sequential([\n        tf.keras.layers.Dense(128, activation='relu'),\n        tf.keras.layers.Dense(64, activation='relu'),\n        tf.keras.layers.Dense(10, activation='softmax')\n    ])\n    return model\n```\n\n")
        paragraphs.append("## Results\n\nOur experiments show promising results with an accuracy of 95% on the test set. The model performs well on most categories, with some room for improvement in edge cases.\n\n")
        paragraphs.append("## Conclusion\n\nIn this post, we've explored the fundamentals of the topic and demonstrated a working implementation. The field is rapidly evolving, and we're excited to see what new advances will emerge in the coming years.\n\n")
        
        return "\n".join(paragraphs)
    
    def generate_project_description(self, name):
        return f"""
        # {name}
        
        {name} is a state-of-the-art AI project developed by our club members. It uses cutting-edge machine learning techniques to solve real-world problems.
        
        ## Project Goals
        
        1. Develop a robust AI system that can handle complex inputs
        2. Create an intuitive user interface for non-technical users
        3. Achieve high accuracy and performance on benchmark datasets
        4. Deploy the system in a scalable, cloud-based environment
        
        ## Technical Approach
        
        We're using a combination of deep learning, computer vision, and natural language processing techniques to build this system. The architecture is modular and extensible, allowing for easy updates and improvements.
        """
    
    def generate_project_text(self, section):
        if section == "Overview":
            return "This project aims to build an advanced AI system that can process and analyze data in real-time. We've focused on creating a scalable architecture that can handle diverse inputs and provide accurate outputs."
        elif section == "Implementation":
            return "The implementation uses a combination of TensorFlow for the machine learning components and React for the frontend. We've deployed the system on AWS using Docker containers for easy scaling and maintenance."
        return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    
    def generate_features(self):
        features = [
            "Real-time processing",
            "Adaptive learning capabilities",
            "Intuitive user interface",
            "Scalable architecture",
            "Comprehensive analytics dashboard",
            "Multi-platform support"
        ]
        return "\n".join([f"- {feature}" for feature in features])
    
    def generate_challenges(self):
        challenges = [
            "Handling large datasets efficiently",
            "Optimizing model performance for edge devices",
            "Ensuring privacy and security of user data",
            "Maintaining consistent accuracy across diverse inputs"
        ]
        return "\n".join([f"- {challenge}" for challenge in challenges])
    
    def generate_learnings(self):
        learnings = [
            "Effective team collaboration strategies",
            "Balancing model complexity with performance requirements",
            "Importance of user feedback in the development cycle",
            "Testing methodologies for AI systems"
        ]
        return "\n".join([f"- {learning}" for learning in learnings])
    
    def generate_tags(self, topic):
        base_tags = ["AI", "machine learning", "data science"]
        
        if "Machine Learning" in topic:
            extra_tags = ["supervised learning", "algorithms"]
        elif "Deep Learning" in topic:
            extra_tags = ["neural networks", "tensorflow", "pytorch"]
        elif "Vision" in topic:
            extra_tags = ["computer vision", "image processing", "CNN"]
        elif "Language" in topic:
            extra_tags = ["NLP", "transformers", "BERT"]
        else:
            extra_tags = ["research", "technology"]
            
        # Combine and select 3-5 tags
        all_tags = base_tags + extra_tags
        selected_tags = random.sample(all_tags, min(len(all_tags), random.randint(3, 5)))
        
        return ",".join(selected_tags)