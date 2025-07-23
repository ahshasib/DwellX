# 🏠 Real Estate Platform (DwellX)

# Live Link: https://dwellx-3223b.web.app/

## 📚 Overview

This project is a **Real Estate Platform** built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. It allows users to browse, buy, and list properties. It also includes admin and agent panels for advanced management.

---

## 🚀 Features

### 👤 User Role
- Register and login with email/password or Google
- View all available properties
- Wishlist properties
- Buy properties and view order history
- Write reviews for purchased properties
- Request to become a seller (agent)

### 🏢 Agent Role
- List new properties for sale
- Manage own properties
- View list of buyers and buyer information
- View reviews on sold properties

### 🛡️ Admin Role
- View/manage all users
- Make any user an agent
- Mark agents as "Fraud"
- Delete users (removes user from Firebase and database, but keeps their listed properties)
- View total sold properties and their earnings in a dashboard summary chart

---

## 📦 Tech Stack

| Technology | Description                     |
|------------|---------------------------------|
| React      | Frontend UI                     |
| TailwindCSS| Styling                         |
| DaisyUI    | UI Components                   |
| Node.js    | Backend Server                  |
| Express.js | Backend Routing and Middleware  |
| MongoDB    | Database                        |
| Firebase   | Authentication                  |
| TanStack Query | Server state management     |
| Axios Secure | Axios instance with interceptor|

---

## 🔒 Authentication

- Uses Firebase for authentication
- Google Sign-In & Email/Password
- JWT is used for secure API authorization

---

## 📈 Challenge Features (Optional but Completed)

- ✅ Wishlist functionality
- ✅ Buyer list for agents
- ✅ Reviews for purchased properties
- ✅ Agent fraud status
- ✅ Summary chart showing total earnings from sold properties

---

## 📁 Folder Structure

client/
│
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Routes: Home, Property Detail, Dashboard etc.
│ ├── context/ # AuthContext
│ ├── hooks/ # Custom hooks (e.g., useAxiosSecure)
│ ├── routes/ # React Router setup
│ └── App.jsx
└── tailwind.config.js

server/
├── routes/
├── controllers/
├── models/
└── index.js