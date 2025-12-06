
# **TakeANote – MERN Notes Application**

A full-stack notes app built using the **MERN stack (MongoDB, Express, React, Node.js)** with secure authentication, protected API routes, persistent sessions using HTTP-Only cookies, and smooth CRUD operations for notes.

---

## ⭐ **Features**

* User login and registration with JWT
* Persistent authentication using HTTP-Only cookies
* Protected routes and secure APIs
* Create, update, view and delete personal notes
* Centralized global state using React Context API
* Tailwind UI, Modals, Loaders and Toast alerts
* Production deployment using:

  * **Backend → Render**
  * **Frontend → Vercel**

---

## 🧰 **Tech Stack**

| Layer          | Tools                                     |
| -------------- | ----------------------------------------- |
| **Frontend**   | React, Vite, Tailwind, Axios, Context API |
| **Backend**    | Node.js, Express.js, Mongoose             |
| **Database**   | MongoDB Atlas                             |
| **Auth**       | JWT + HTTP-Only Cookies                   |
| **Deployment** | Vercel + Render                           |

---

## 📂 **Project Structure**

```
root/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── frontend/
    ├── src/
    ├── public/
    └── vite.config.js
```

---

## 📚 **REST API Overview**

### **Auth Routes**

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/user/register` | Register           |
| POST   | `/api/user/auth`     | Login              |
| POST   | `/api/user/logout`   | Logout             |
| GET    | `/api/user/profile`  | Get logged-in user |

### **Notes Routes**

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/notes`     | Get all notes     |
| GET    | `/api/notes/:id` | Get a single note |
| POST   | `/api/notes`     | Create note       |
| PUT    | `/api/notes/:id` | Update note       |
| DELETE | `/api/notes/:id` | Delete note       |

*All notes are private and linked to authenticated users only.*

---

## 🌐 **Deployment Overview**

* **Backend hosted on Render**
* **Frontend hosted on Vercel**
* CORS and cookies enabled for secure cross-origin communication
* No localStorage or sessionStorage used for auth—only HTTP-Only cookies

---

## 🎯 **What This Project Demonstrates**

* Practical MERN stack development
* Backend authentication and API security
* Global state handling with Context API
* Modular React UI with Tailwind
* Real-world deployment workflow

---

## 👤 **Author**

**Shivraj Maharaul**

---
