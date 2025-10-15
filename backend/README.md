# PrimeTrade Backend

This is the backend API for **PrimeTrade Scalable Web App**, built using **Node.js**, **Express.js**, and **SQLite**.  
It handles **user authentication** and **task management** features.

---

## 🌐 Deployed URL  
🔗 [https://primetradescalablewebapp-production.up.railway.app/api](https://primetradescalablewebapp-production.up.railway.app/api)

---

## 🧰 Tech Stack

- Node.js
- Express.js
- SQLite3
- JWT (`jsonwebtoken`)
- Bcrypt (`bcrypt`) – password hashing
- Dotenv – environment config
- CORS – cross-origin requests

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the server

```bash
npm start
```

➡️ Server runs at: [http://localhost:5000](http://localhost:5000)

---

## 📁 Folder Structure

```
backend/
├── routes/
│   ├── auth.js         # Register & Login APIs
│   ├── users.js        # User management (if needed)
│   └── tasks.js        # Task CRUD APIs
│
├── utils/
│   └── db.js           # SQLite database connection
│
├── server.js           # Main server entry point
└── .env                # Environment variables (PORT, JWT_SECRET, etc.)
```

---

## 🔑 API Routes

| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| POST   | `/api/auth/register`  | Register new user      |
| POST   | `/api/auth/login`     | Login existing user    |
| GET    | `/api/tasks`          | Get all tasks (auth)   |
| POST   | `/api/tasks`          | Create a new task      |
| PUT    | `/api/tasks/:id`      | Update a task by ID    |
| DELETE | `/api/tasks/:id`      | Delete a task by ID    |

> 🔐 **Note**: All `/api/tasks` routes are **protected** via JWT authentication.

---

## 🧠 Notes

- JWT is used to secure and verify user sessions.
- SQLite database (`database.sqlite`) is automatically created in the project root.
- CORS is enabled to allow communication with the Netlify frontend.

---

## 🏗️ Deployment

- Deployed on **Railway**.
- Commits to the `main` branch trigger automatic rebuilds & deployment.

---
