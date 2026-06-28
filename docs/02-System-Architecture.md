# System Architecture

## NTI POS

### Version

1.0

---

# 1. Introduction

This document describes the overall architecture of NTI POS.

The purpose of this document is to define the system structure, architectural patterns, technology stack, and communication flow between different components of the application.

The architecture has been designed to be scalable, maintainable, secure, and modular while following modern software engineering principles.

---

# 2. Architecture Style

NTI POS follows a **Client–Server Architecture**.

The backend is developed using the **MVC (Model–View–Controller)** architectural pattern with a dedicated **Service Layer** for implementing business logic.

This architecture separates responsibilities into different layers, making the application easier to maintain, test, and extend.

---

# 3. High-Level Architecture

```
                 User
                  │
                  ▼
         React Frontend (Vite)
                  │
          REST API (HTTP/HTTPS)
                  │
                  ▼
      Express.js Backend (MVC)
                  │
      ┌───────────┼───────────┐
      ▼           ▼           ▼
 Controllers   Services     Models
                  │
                  ▼
             MongoDB Database
```

---

# 4. Architectural Principles

The project follows these principles:

* Separation of Concerns (SoC)
* Single Responsibility Principle (SRP)
* Modular Design
* Reusable Components
* RESTful API Design
* Clean Folder Structure
* Role-Based Access Control (RBAC)
* Environment-Based Configuration

# 5. Technology Stack

The following technologies will be used throughout the development of NTI POS.

| Layer                 | Technology        | Purpose                            |
| --------------------- | ----------------- | ---------------------------------- |
| Frontend              | React.js          | User Interface                     |
| Build Tool            | Vite              | Fast development and build process |
| Styling               | Tailwind CSS      | Responsive UI styling              |
| Component Library     | shadcn/ui         | Reusable UI components             |
| Language              | JavaScript (ES6+) | Application development            |
| Backend               | Node.js           | Server-side runtime                |
| Framework             | Express.js        | REST API development               |
| Database              | MongoDB           | Data storage                       |
| ODM                   | Mongoose          | MongoDB object modeling            |
| Authentication        | JWT               | User authentication                |
| Password Hashing      | bcrypt            | Password security                  |
| File Upload           | Multer            | Image upload handling              |
| Environment Variables | dotenv            | Configuration management           |
| Version Control       | Git               | Source code management             |
| Repository Hosting    | GitHub            | Remote repository                  |
| API Testing           | Postman           | API testing                        |
| Database Tool         | MongoDB Compass   | Database management                |

---

# 6. Why These Technologies?

## React.js

Provides a modern, component-based approach for building dynamic user interfaces.

---

## Vite

Offers significantly faster startup and build times compared to older build tools.

---

## Express.js

Provides a lightweight and flexible framework for building RESTful APIs.

---

## MongoDB

A NoSQL database that offers flexibility for evolving business requirements and works well with the MERN stack.

---

## Mongoose

Simplifies schema definition, validation, and interaction with MongoDB.

---

## JWT

Enables secure stateless authentication between the client and server.

---

## Tailwind CSS

Allows rapid development of responsive and maintainable user interfaces.

---

## Git & GitHub

Enable version control, collaboration, and project history tracking.
