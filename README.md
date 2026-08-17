# Smart Assessment Platform

> **A full-stack online examination system built as the final project of the Full Stack .NET Track at the Digital Egypt Pioneers Initiative (DEPI).**

Smart Assessment Platform is a web-based examination system that manages the complete assessment workflow for **Admins, Instructors, and Students**. The project focuses on practical backend development, authentication and authorization, database-driven CRUD operations, and exam business logic.

---

## 📌 Project Overview

The platform provides a structured way to create and manage exams, questions, and choices, while allowing students to start exams, track their remaining time, submit answers, and receive automatically calculated results.

The project was developed to apply real-world concepts from the **Full Stack .NET Track at DEPI**, with particular attention to API design, business rules, relational data modeling, and secure access to application resources.

---

## ✨ Main Features

### 🔐 Authentication & Authorization

* User authentication using JWT.
* Role-based access for **Instructor and Student**.
* Protected endpoints based on authenticated user roles.
* Password hashing using BCrypt.

### 📝 Exam Management

* Create, read, update, and delete exams.
* Configure exam duration and availability.
* Manage exam questions and answer choices.
* Associate exams with instructors.

### 🎯 Student Examination Workflow

* Start an exam and create a student attempt.
* Track exam start time and remaining time.
* Retrieve questions associated with an exam.
* Submit answers after completing an attempt.
* Handle exam-state business rules.

### ✅ Automatic Grading

* Automatic evaluation of supported question types.
* Score calculation based on submitted answers.
* Store student answers and exam results.

### 🌐 RESTful API

* Resource-based API endpoints for authentication, exams, questions, choices, and student exam operations.
* Swagger/OpenAPI documentation for API exploration and testing.

---

## 🛠️ Technologies Used

### Backend

* **C#**
* **ASP.NET Core 8 Web API**
* **Entity Framework Core 8**
* **SQL Server**
* **JWT Bearer Authentication**
* **BCrypt.Net**
* **Swagger / OpenAPI**

### Frontend

* **React**
* **TypeScript**
* **Vite**
* **React Router**

---

## 🏗️ Project Structure

```text
Smart-Assessment-Platform/
│
├── SmartAssessment.API/
│   ├── SmartAssessment.API.Server/
│   │   ├── Controllers/
│   │   ├── DTOs/
│   │   ├── Data/
│   │   ├── Models/
│   │   ├── Helpers/
│   │   ├── Services/
│   │   ├── Program.cs
│   │   └── SmartAssessment.API.Server.csproj
│   │
│   └── smartassessment.api.client/
│       ├── src/
│       ├── package.json
│       └── vite.config.*
│
├── data base/
├── Phase1.docx
└── README.md
```

The backend is organized around controllers, DTOs, data access, models, helpers, and services, while the frontend is maintained as a separate React/Vite client.

---

## 🔄 Core Examination Flow

```text
Instructor/Admin
      │
      ▼
Create Exam
      │
      ▼
Add Questions & Choices
      │
      ▼
Student Starts Exam
      │
      ▼
Student Attempt Created
      │
      ▼
Answer Questions
      │
      ▼
Submit Exam
      │
      ▼
Automatic Grading
      │
      ▼
Result / Score
```

---

## 🔑 API Areas

| Area           | Purpose                                        |
| -------------- | ---------------------------------------------- |
| Authentication | Login and JWT-based authentication             |
| Exams          | Exam CRUD and exam configuration               |
| Questions      | Question management and exam questions         |
| Choices        | Answer-choice management                       |
| Students       | Exam attempts, timing, submission, and grading |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Node.js](https://nodejs.org/)
* SQL Server
* Visual Studio 2022 or another compatible .NET development environment

### 1. Clone the Repository

```bash
git clone https://github.com/moamenosman/Smart-Assessment-Platform.git
cd Smart-Assessment-Platform
```

### 2. Configure the Database

Update the connection string in:

```text
SmartAssessment.API/SmartAssessment.API.Server/appsettings.json
```

with your local SQL Server configuration.

> **Important:** Do not commit real database credentials, JWT secrets, or other sensitive configuration values to the repository.

### 3. Run the Backend

Open the solution:

```text
SmartAssessment.API/SmartAssessment.API.sln
```

Then restore dependencies and run the ASP.NET Core API:

```bash
dotnet restore
dotnet run
```

### 4. Run the Frontend

Navigate to the client application:

```bash
cd SmartAssessment.API/smartassessment.api.client
npm install
npm run dev
```

The frontend will start through Vite, while the ASP.NET Core project hosts the backend API.

---

## 📚 API Documentation

When the backend is running, Swagger/OpenAPI can be used to explore and test the available endpoints.

The exact Swagger URL depends on the launch profile and local HTTPS configuration.

---

## 👥 Team

### Smart Assessment Platform Team

* **Mo'men Osman Mohamed**
* **Ahmed Mohamed Ahmed Atta**
* **Ahmed Eid**
* **Sayed Osama Sayed**

---

## 🎓 DEPI

This project was developed as the **final project of the Full Stack .NET Track** at the **Digital Egypt Pioneers Initiative (DEPI)**.

The project provided hands-on experience in building a complete web application and applying concepts including backend development, RESTful APIs, authentication, authorization, Entity Framework Core, SQL Server, React, and business logic.
