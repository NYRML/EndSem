# AI Driven Full Stack Development (AI308B) - Project Report
**B.Tech, 4th SEMESTER**  
**ESE EXAMINATION (BLENDED), EVEN SEM. - 2025-26**

---

## 1. Project Overview

This project is a Full Stack AI-Driven application designed to manage employee records, predict promotions, and generate training suggestions using Advanced AI (OpenRouter API).

### Features Implemented:
- **Frontend (React)**: Beautiful UI with Glassmorphism, Authentication, Employee Dashboard, Search & Filter, AI Insights.
- **Backend (Node.js/Express)**: REST APIs, MVC Architecture, JWT Authentication, bcrypt password hashing.
- **Database (MongoDB)**: Mongoose schemas, Validation, CRUD operations.
- **AI Integration**: OpenRouter API for Promotion recommendations, Rankings, Training, and Feedback.

---

## 2. GitHub Repository

**Repository Link**: [Insert Your GitHub Link Here]

---

## 3. Live Deployment Links

- **Frontend URL**: [Insert Render Frontend URL Here]
- **Backend API URL**: [Insert Render Backend URL Here]

---

## 4. Code & Directory Structure

```text
c:\Users\itzni\Desktop\endsem
├── backend
│   ├── .env
│   ├── server.js
│   ├── controllers
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   └── employeeController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── Employee.js
│   │   └── User.js
│   └── routes
│       ├── aiRoutes.js
│       ├── authRoutes.js
│       └── employeeRoutes.js
└── frontend
    ├── index.html
    ├── src
    │   ├── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── components
    │   │   └── Navbar.jsx
    │   └── pages
    │       ├── AIRecommendations.jsx
    │       ├── Dashboard.jsx
    │       ├── EmployeeForm.jsx
    │       ├── Login.jsx
    │       └── Register.jsx
```

---

## 5. UI Screenshots (Code Output)

### Frontend Live UI
*(Insert screenshots of your React App running live below)*

- **Login / Register Page**:
  ![Login Screenshot](replace-with-your-screenshot.png)

- **Employee Directory (Dashboard)**:
  ![Dashboard Screenshot](replace-with-your-screenshot.png)

- **Add Employee Form**:
  ![Add Employee Screenshot](replace-with-your-screenshot.png)

- **AI Recommendations Insights Page**:
  ![AI Recommendations Screenshot](replace-with-your-screenshot.png)

---

## 6. API Testing (Postman / Thunder Client)

### Backend API Endpoints

*(Insert your Postman/Thunder Client screenshots testing the Live Render URLs below)*

1. **POST `/api/auth/register` (Register User)**
   ![Register API Screenshot](replace-with-your-screenshot.png)

2. **POST `/api/auth/login` (Login User)**
   ![Login API Screenshot](replace-with-your-screenshot.png)

3. **POST `/api/employees` (Add Employee)**
   ![Add Employee API Screenshot](replace-with-your-screenshot.png)

4. **GET `/api/employees` (Get All Employees)**
   ![Get Employees API Screenshot](replace-with-your-screenshot.png)

5. **GET `/api/employees/search?department=Engineering` (Search Employees)**
   ![Search Employee API Screenshot](replace-with-your-screenshot.png)

6. **POST `/api/ai/recommend` (AI Recommendation)**
   ![AI Recommendation API Screenshot](replace-with-your-screenshot.png)

---

## 7. MongoDB Storage

*(Insert screenshots of MongoDB Compass or Atlas showing your collections and data)*

- **Users Collection**:
  ![Users Collection Screenshot](replace-with-your-screenshot.png)

- **Employees Collection**:
  ![Employees Collection Screenshot](replace-with-your-screenshot.png)

---

## 8. Render Deployment

*(Insert screenshots showing the successful deployment on Render)*

- **Frontend Deployment Success**:
  ![Frontend Render Screenshot](replace-with-your-screenshot.png)

- **Backend Deployment Success**:
  ![Backend Render Screenshot](replace-with-your-screenshot.png)

---

## Instructions for Submission:
1. Replace the placeholder texts `[Insert ...]` with your actual links.
2. Replace all `![...](replace-with-your-screenshot.png)` lines with actual screenshots you take.
3. Open this Markdown file in VS Code or GitHub.
4. Use a markdown-to-pdf extension or print the rendered markdown to PDF.
5. Upload the resulting PDF to Moodle.
