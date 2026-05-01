# Team Task Manager

A full-stack team collaboration and task management application built with React and Node.js.

## Features

- 🔐 **Authentication** — Secure JWT-based signup & login
- 📋 **Project Management** — Create and manage multiple projects
- ✅ **Task Tracking** — Kanban-style board with To Do, In Progress, and Done columns
- 👥 **Team Collaboration** — Invite members and assign tasks
- 🔒 **Role-Based Access** — Admin and Member roles per project
- 📊 **Dashboard** — Overview of all projects and task stats

## Tech Stack

**Frontend**
- React (Vite)
- React Router v6
- Framer Motion
- Lucide Icons
- Axios

**Backend**
- Node.js + Express
- Sequelize ORM
- SQLite (development)
- JWT Authentication
- bcrypt password hashing

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/Tarun-Nautiyal/Team_Task_Manager.git
cd Team_Task_Manager
```

2. Install all dependencies
```bash
npm run install-all
```

3. Set up environment variables

Create `client/.env`:
```
VITE_API_URL=http://localhost:5001/api
```

Create `server/.env`:
```
PORT=5001
JWT_SECRET=your_jwt_secret_here
```

4. Run the development server
```bash
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5001

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Navbar, etc.
│   │   ├── pages/        # Login, Signup, Dashboard, ProjectDetails
│   │   └── api.js        # Axios instance
├── server/               # Express backend
│   ├── config/           # Database config
│   ├── middleware/        # Auth middleware
│   ├── models/           # Sequelize models
│   └── routes/           # API routes
└── package.json          # Root scripts
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start both client and server |
| `npm run client` | Start frontend only |
| `npm run server` | Start backend only |
| `npm run install-all` | Install all dependencies |
