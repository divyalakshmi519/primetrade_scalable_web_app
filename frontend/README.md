# PrimeTrade Frontend

This is the frontend part of **PrimeTrade Scalable Web App**, built with **React.js** and deployed on **Netlify**.

---

## 🚀 Live Site  
🔗 [https://primetradescalablewebapp.netlify.app](https://primetradescalablewebapp.netlify.app)

---

## 🧩 Tech Stack

- React.js
- React Router DOM
- Axios
- JWT (for authentication)
- React Hooks (for state & effect management)
- Tailwind CSS / CSS Modules (for styling)

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start the development server

```bash
npm run dev
```

➡️ Frontend runs at: [http://localhost:5173](http://localhost:5173)

---

## 🔗 API Integration

All API requests are handled via:

```
src/api.js
```

**Base API URL:**

```js
https://primetradescalablewebapp-production.up.railway.app/api
```

---

## 📂 Folder Structure

```
frontend/
├── src/
│   ├── api.js                # Axios base setup for API calls
│   ├── pages/                # Login, Register, Dashboard pages
│   ├── components/           # Reusable UI components (Task list, forms, navbar)
│   ├── hooks/                # Custom hooks for auth and other logic
│   ├── App.js                # Main routing logic
│   └── main.js               # React entry point
└── package.json
```

---

## 🧠 Features

- 🔐 **User Login & Registration** with JWT authentication
- 🔒 **Protected Routes** using a custom `ProtectedRoute` component
- 🧾 **Dashboard Page**:  
  After login, users are redirected to the **Dashboard**, where they can:
  - Create new tasks
  - View existing tasks
  - Edit/update task details
  - Delete tasks
- ⚙️ Full CRUD operations on tasks
- ⚡ Persistent auth using localStorage + hooks
- 📱 Responsive design across devices

---

## 🏗️ Deployment

This frontend is deployed using **Netlify**.

### 🔄 To Redeploy:

- Push your changes to the `main` branch.
- Netlify will automatically detect changes and trigger a new deployment.

---
