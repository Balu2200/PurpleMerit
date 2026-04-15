# PurpleMerit User Management System

Production-ready MERN stack user management system with JWT authentication, role-based authorization, soft deactivation, audit fields, and a responsive dashboard UI.

## Features

- Secure login with email and password
- Public signup for users plus invite-code gated manager/admin signup
- JWT-based authentication and protected routes
- Role-based access control for admin, manager, and user
- Paginated user management with search and filters
- Create, edit, view, and deactivate users
- My Profile page for self-service updates
- Audit fields with created and updated metadata
- Clean API response format and centralized error handling
- Responsive dashboard UI built with React and Tailwind CSS

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, dotenv, express-validator

## Folder Structure

```text
PurpleMerit/
  backend/
    src/
      config/
      models/
      controllers/
      routes/
      middleware/
      services/
      utils/
      seed/
      app.js
      server.js
  frontend/
    src/
      api/
      context/
      pages/
      components/
      layouts/
      hooks/
      utils/
      App.jsx
      main.jsx
```

## Installation

1. Install dependencies for both apps.
2. Copy the example env files into real `.env` files.
3. Start MongoDB locally or use MongoDB Atlas.
4. Run the backend seed script once.
5. Start backend and frontend dev servers.

## Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
SIGNUP_INVITE_CODE=
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

### Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Seed Users

The seed script creates these default users:

- admin@example.com / Admin@123
- manager@example.com / Manager@123
- user@example.com / User@123

## Signup Roles

- Public signup creates a `user` account by default.
- Selecting `manager` or `admin` in the signup form requires a valid backend `SIGNUP_INVITE_CODE`.
- Admins can still create and manage users from the protected dashboard.

## API Endpoints

### Auth

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me`

### Frontend Routes

- `/login`
- `/signup`
- `/dashboard`
- `/users`
- `/users/new`
- `/users/:id`
- `/profile`

### Users

- `GET /api/users`
- `POST /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/users/me`
- `PUT /api/users/me`

## Deployment Steps

### Backend on Render or Railway

1. Create a new web service.
2. Set the root directory to `backend`.
3. Add the environment variables from the backend `.env` file.
4. Use `npm install` as the build command if required.
5. Use `npm start` as the start command.
6. Add your MongoDB Atlas connection string to `MONGO_URI`.
7. Set `CLIENT_URL` to your deployed frontend URL.

### Frontend on Vercel or Netlify

1. Create a new frontend project from the `frontend` folder.
2. Add `VITE_API_URL` pointing to the deployed backend API.
3. Run `npm run build` for production.
4. Deploy the generated site output.

## Notes

- Password hashes are never returned by the API.
- All sensitive configuration is loaded from environment variables.
- Unauthorized requests return `401` and forbidden requests return `403`.
