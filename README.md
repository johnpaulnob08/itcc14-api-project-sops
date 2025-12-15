# Student Organization Profiling System (SOPS)

A web-based profiling and membership management system designed for a BSIT student organization.  
SOPS allows officers and admins to manage users, member profiles, roles, and activity status using a secure, API-driven backend.

## Team Members
1. [Karla Mae Alo-ot](https://github.com/Historia2005)
2. [Christine Marie Amarille](https://github.com/Tine-art16)
3. [Nadjah Dimaporo](https://github.com/nadjahdimaporo)
4. [John Paul Nob](https://github.com/johnpaulnob08)


## Milestone 1 (Nov Week 1): Project Proposal & Introduction

### ✔ What we completed:
- Finalized SOPS as our project topic
- Wrote the Problem Statement
- Defined User and Member data models
- Listed planned API endpoints
- Completed ITCC14 Final Project Document – Chapters 1 & 2
- Added Problem Statement + Data Models to README

### ✔ Deliverables:
- README updated with:
  - Problem Statement
  - Data Models
- ITCC14 Final Project Document (Chapters 1–2)
- Initial `api.yaml` listing endpoints

### ✔ Checklist:
- [x] Topic finalized
- [x] Problem Statement added to README
- [x] Data Models added
- [x] Chapters 1 & 2 completed
- [x] Initial API draft (YAML)
- [x] GitHub repository pushed


## Milestone 2 (Nov Week 2): Half API + Half Documentation + Git/GitHub

### ✔ What we completed:
- Initialized Node.js backend using Express and Mongoose
- Implemented user signup and login
- Created member endpoints:
  - POST `/members`
  - GET `/members/me`
- Added partial OpenAPI (Swagger) documentation
- Organized and pushed project to GitHub

### ✔ Deliverables:
- Running backend server
- Working authentication system
- Partial member API endpoints
- Updated OpenAPI YAML documentation
- GitHub repository with commits

### ✔ Checklist:
- [x] Repository initialized
- [x] Dependencies installed
- [x] Signup endpoint working
- [x] Login endpoint working
- [x] Member creation endpoint
- [x] Self-view member endpoint
- [x] OpenAPI documentation updated
- [x] GitHub commits pushed
- [x] Chapter 3 continued


## Milestone 3 (Nov Week 3): Full Backend API

### ✔ What we completed:
- Implemented full CRUD operations for Members
- Added full Admin User Management:
  - GET all users
  - PATCH user role
  - DELETE user
- Implemented Role-Based Access Control (RBAC):
  - Member
  - Executive
  - Admin
- Added `/auth/me` endpoint for logged-in user details
- Standardized API error responses (400, 403, 404, 500)
- Completed full OpenAPI documentation

### ✔ Deliverables:
- Fully functional backend API
- Seeded accounts (Admin and Member)
- Complete and validated OpenAPI specification

### ✔ Checklist:
- [x] All member CRUD endpoints completed
- [x] Admin user management implemented
- [x] RBAC fully enforced
- [x] `/auth/me` endpoint added
- [x] Error handling standardized
- [x] Seed data created
- [x] OpenAPI validated in Swagger Editor


## Milestone 4 (Nov Week 4): Frontend Integration (Optional)

### ✔ What would be completed (if required):
- Basic frontend UI for login and authentication
- Member profile creation and viewing interface
- Admin dashboard for role and member management
- README updated with frontend setup instructions

### ✔ Deliverables:
- Frontend interface connected to backend API
- Documentation explaining frontend setup and usage

### ✔ Checklist:
- [ ] Login page implemented
- [ ] Member list displayed in frontend
- [ ] Member creation via frontend
- [ ] Role-based UI behavior
- [ ] Error and loading states handled
- [ ] README frontend instructions added

> Note: This milestone is optional since the project is API-focused.


## Milestone 5 (Dec Week 1): Containerization (Optional)

### ✔ What would be completed (if required):
- Dockerfile created for backend API
- Containerized application setup
- Optional MongoDB Atlas connection via environment variables

### ✔ Deliverables:
- Dockerized backend application
- README documentation for Docker usage

### ✔ Checklist:
- [ ] Dockerfile created
- [ ] Docker image builds successfully
- [ ] Application runs inside container
- [ ] Environment variables configured
- [ ] Docker instructions added to README


## FINAL (Dec Week 2): Demo & Presentation

### ✔ What will be presented:
- Overview of the problem and proposed solution
- Live API demonstration
- Role-based access flow (Member → Executive → Admin)
- OpenAPI documentation walkthrough
- GitHub repository structure and commits
- Seeded example accounts

### ✔ Deliverables:
- Final presentation slides
- Live or recorded system demo
- Backup screenshots and documentation

### ✔ Checklist:
- [ ] Presentation slides finalized
- [ ] Demo data prepared
- [ ] API tested before demo
- [ ] Backup screenshots ready
