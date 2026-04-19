# 🏗️ Basic Server Starter (Express + TypeScript)

A **production-ready Node.js + TypeScript backend starter** with:

- Express.js
- MongoDB (via Mongoose)
- Modular, feature-based architecture
- Optional session authentication
- Cookie parsing & CORS
- Centralized error handling + 404 middleware
- Graceful server shutdown
- Zod validation support
- Fully TypeScript ready

Perfect for **starting new projects quickly** with a clean structure.

---

## 📂 Project Structure

```

src/
├── app/
│ ├── helpers/ # Utility functions
│ ├── interfaces/ # TypeScript interfaces/types
│ ├── middlewares/ # globalErrorHandler, notFound, auth, validation
│ ├── modules/ # Feature-based modules (auth, user)
│ │ ├── auth/
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.routes.ts
│ │ │ └── auth.service.ts
│ │ └── user/
│ │ ├── user.controller.ts
│ │ ├── user.routes.ts
│ │ ├── user.service.ts
│ │ ├── user.interface.ts
│ │ ├── user.model.ts
│ │ ├── user.validation.ts
│ │ └── user.constants.ts
├── config/
│ └── env.ts # Environment variables loader
├── routes/
│ └── index.ts # Central API router
├── utils/
│ ├── catchAsync.ts # Async wrapper for errors
│ ├── jwt.ts # JWT helpers
│ ├── seedSuperAdmin.ts # DB seeding helper
│ ├── sendResponse.ts # Standard response helper
│ ├── setCookie.ts # Cookie helper
│ └── userTokens.ts # JWT token helper
├── app.ts # Express app configuration
├── server.ts # Server + DB connection + graceful shutdown
└── env.ts # Existing environment loader (optional, can merge with config/env.ts)

```

---

## ⚡ Features

- TypeScript ready
- Express server
- MongoDB connection
- Optional `express-session`
- Cookie parsing with `cookie-parser`
- CORS configured for local and production frontends
- Global error handling (Mongoose errors, Zod errors, AppError)
- 404 middleware
- Graceful server shutdown
- Modular, feature-based routing

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ismaileub/Basic-Server-Starter-Express-TypeScript-.git
cd backend-starter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the root directory:

```bash
Follow .env.example to complete env variables.
```

### 4.Run Server in Development

```bash
npm run dev
```

- Server will be available at http://localhost:5000

### 5.Run Server in Production

```bash
npm run build
npm run start:prod
```

- Compiles TypeScript to dist/
- Runs the Node.js production server

🌟 Contribution

- This is a starter template. You can:
- Add new modules
- Extend controllers
- Integrate JWT auth or Passport
- Add unit or integration tests
- Replace console.log with a logger (winston or pino)
- Customize middleware
