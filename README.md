# PurpleMerit User Management System

A production-ready MERN stack application for secure user management with JWT authentication, role-based access control, audit tracking, and a responsive admin dashboard.

---

# Overview

This project provides a complete user management solution with separate permissions for Admin, Manager, and User roles.

It demonstrates:

* Secure authentication
* Backend authorization
* REST API design
* CRUD operations
* Search and filtering
* Audit metadata
* Full-stack deployment
* Clean architecture

---

# Features

## Authentication

* Login with email and password
* Password hashing using bcrypt
* JWT access token authentication
* Protected API routes
* Persistent login state

## Authorization (RBAC)

### Admin

* Full user management access
* Create users
* Edit users
* Assign roles
* Activate / deactivate users
* View all users

### Manager

* View users
* Edit non-admin users
* Limited management permissions

### User

* View own profile
* Update own profile
* Change password

---

# User Management

* Paginated users list
* Search by name or email
* Filter by role
* Filter by status
* Create new user
* Edit existing user
* View user details
* Soft deactivate users

---

# Audit Tracking

Each user record stores:

* createdAt
* updatedAt
* createdBy
* updatedBy

---

# Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* express-validator
* dotenv

---

# Project Structure

```text
PurpleMerit/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── seed/
│       ├── app.js
│       └── server.js
│
└── frontend/
    └── src/
        ├── api/
        ├── components/
        ├── context/
        ├── hooks/
        ├── layouts/
        ├── pages/
        ├── utils/
        ├── App.jsx
        └── main.jsx
```

---

# Local Setup

## 1. Clone Repository

```bash
git clone <your-repository-url>
cd PurpleMerit
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
SIGNUP_INVITE_CODE=your_invite_code
```

Run backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Seed Data

Run once:

```bash
npm run seed
```

Default accounts:

| Role    | Email                                             | Password    |
| ------- | ------------------------------------------------- | ----------- |
| Admin   | [admin@example.com](mailto:admin@example.com)     | Admin@123   |
| Manager | [manager@example.com](mailto:manager@example.com) | Manager@123 |
| User    | [user@example.com](mailto:user@example.com)       | User@123    |

---

# Deployment

## Backend (Render / Railway)

* Root directory: `backend`
* Build command: `npm install`
* Start command: `npm start`

Required environment variables:

```env
PORT
MONGO_URI
JWT_SECRET
JWT_EXPIRES_IN
CLIENT_URL
SIGNUP_INVITE_CODE
```

---

## Frontend (Vercel / Netlify)

Build command:

```bash
npm run build
```

Environment:

```env
VITE_API_URL=https://your-backend-url/api
```

---

# API Documentation

Base URL:

```text
https://your-backend-url/api
```

---

# Authentication APIs

## Login

### POST `/auth/login`

Authenticate user and return JWT token.

### Request

```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token",
    "user": {
      "_id": "...",
      "name": "Admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

---

## Register

### POST `/auth/register`

Create new account.

### Request

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "Password123",
  "role": "user"
}
```

---

## Get Current User

### GET `/auth/me`

Header:

```text
Authorization: Bearer <token>
```

---

# User APIs

## Get Users

### GET `/users`

Admin / Manager only.

Query params:

| Param  | Example |
| ------ | ------- |
| page   | 1       |
| limit  | 10      |
| search | john    |
| role   | admin   |
| status | active  |

Example:

```text
GET /users?page=1&limit=10&search=john
```

---

## Create User

### POST `/users`

Admin only.

### Request

```json
{
  "name": "New User",
  "email": "new@example.com",
  "password": "Password123",
  "role": "user",
  "status": "active"
}
```

---

## Get User By ID

### GET `/users/:id`

Admin / Manager access.

---

## Update User

### PUT `/users/:id`

Admin or permitted Manager.

### Request

```json
{
  "name": "Updated Name",
  "role": "manager",
  "status": "active"
}
```

---

## Deactivate User

### DELETE `/users/:id`

Soft delete (status becomes inactive).

---

## My Profile

### GET `/users/me`

Return current logged-in user profile.

---

## Update My Profile

### PUT `/users/me`

### Request

```json
{
  "name": "New Name",
  "password": "NewPassword123"
}
```

---

# Standard Response Format

## Success

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

---

# Security Notes

* Password hashes are never returned
* JWT protects private routes
* Input validation on backend
* Role-based middleware enforcement
* Sensitive values stored in environment variables

---

# Frontend Pages

* `/login`
* `/signup`
* `/dashboard`
* `/users`
* `/users/new`
* `/users/:id`
* `/profile`

---

# Future Improvements

* Refresh token support
* Email verification
* Password reset flow
* Activity logs
* Rate limiting
* Unit / integration tests

---

# License

For assessment and learning purposes.
