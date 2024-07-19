# Task Management Tool
This is task management app built using python framework -Django and Frontend using React . It allows users to create an account -Signup and login -Signin. They can perform CRUD operations on tasks once they are logged in. Each task include a title, description, priority, due date, and completion.

# Features
User authentication (sign up and sign in)
Create, update, view, and delete tasks
Task attributes: title, description, priority, due date, completion status
Priority selection via dropdown menu (High, Medium, Low)

# Technologies Used
Backend: Django, Django REST Framework
Frontend: React, Bootstrap
Authentication: JSON Web Tokens (JWT)
API: Axios

Installation
Backend (Django)
Clone the repository by:

copy code on the github
git clone https://github.com/micheal-ngige/task-manager
cd task-management-tool/backend
Create and activate a virtual environment:

 terminal
copy code
python3 -m venv venv
source venv/bin/activate 
Install dependencies:

terminal
pip install -r requirements.txt
Run migrations:

terminal
python manage.py migrate
Start the development server:

terminal
python manage.py runserver
Frontend (React)
Navigate to the frontend directory:

terminal
cd ../frontend
Install dependencies:

terminal
npm install
Start the development server:

terminal
npm run dev
Usage
Sign Up:

Navigate to the signup page at http://localhost:5173/auth.
Fill out the registration form and submit.
Sign In:

Navigate to the sign-in page at http://localhost:5173/auth.
Enter your credentials and submit.
Manage Tasks:

After signing in, you will be redirected to the task management page.
You can create, update, view, and delete tasks.
Project Structure
markdown

```plaintext
TASKMANAGER/
│
├── backend/
│   ├── accounts/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── tasks/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── project/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── AuthPage.jsx
    │   │   ├── SignIn.jsx
    │   │   ├── SignUp.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── TaskList.jsx
    │   ├── App.jsx
    │   ├── index.js
    │   └── api.js
    ├── package.json
    └── README.md

Contributing
Contributions are welcome to improve the app! Please feel free to submit a Pull Request.
