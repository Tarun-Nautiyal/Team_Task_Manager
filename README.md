# Ethara Task - Team Task Manager

A full-stack, premium team collaboration and task management application built with React, Express, and PostgreSQL.

## 🚀 Key Features

- 🔐 **Secure Authentication** — JWT-based signup & login with persistent sessions.
- 📋 **Project Management** — Create projects and organize workflows.
- ✅ **Kanban Task Board** — Dynamic board with To Do, In Progress, and Completed columns.
- 👥 **Team Collaboration** — Invite members via email with role-based access (Admin/Member).
- 📊 **Real-time Status** — Track task progress, priority, and due dates.
- ✨ **Premium UI/UX** — Modern design with glass-morphism, micro-animations, and responsiveness.

## ⚙️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Node.js, Express.js, Sequelize ORM.
- **Database**: PostgreSQL.
- **Deployment**: Railway.

## 🛠️ Getting Started

### Prerequisites
- Node.js v20+
- PostgreSQL (Local or Cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Ethara_Ai
   ```

2. Install all dependencies:
   ```bash
   npm run install-all
   ```

3. Set up environment variables:
   Create `server/.env`:
   ```env
   PORT=5001
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

This app is configured for **Railway**. Simply connect your GitHub repository and add the environment variables to the Railway dashboard.

## 📄 License

MIT
