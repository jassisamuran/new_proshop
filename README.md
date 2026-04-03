# 🛒 ProShop — Full Stack E-Commerce Platform with AI Assistant

> A production-ready, full-stack e-commerce system with an integrated AI chatbot for customer support, product comparison, and order management.

---

## 🚀 Overview

ProShop is a modern e-commerce platform designed to deliver a seamless shopping experience. It goes beyond a typical storefront by integrating an **AI-powered assistant** that enhances user interaction and automates support workflows.

This project demonstrates real-world engineering skills including:

* Full-stack architecture
* Microservice-style separation (Frontend, Backend, AI Service)
* Real-time and API-based communication
* Scalable deployment using Docker

---

## 🏗️ Project Architecture

This system is split into multiple repositories/services:

* 🖥️ **Frontend (React)**
  https://github.com/jassisamuran/new_proshop

* ⚙️ **Backend API (Node.js / Django)**
  https://github.com/jassisamuran/proshop

* 🤖 **AI Chat Service**
  https://github.com/jassisamuran/ai-support-agent

---

## 🔄 System Flow

```
User
 ↓
Frontend (React)
 ↓
Backend API (Authentication, Orders, Products)
 ↓
Database

        ↓
   AI Chat Service (LLM / RAG)
```

* Frontend communicates with backend via REST APIs
* Backend handles business logic and database operations
* AI chatbot runs as a separate service for intelligent queries

---

## ✨ Features

### 🧑‍💻 Customer-Facing

* Product browsing, search, and filtering
* Detailed product pages with ratings & reviews
* Persistent shopping cart
* Multi-step checkout (shipping, payment, confirmation)
* User authentication and profile management

---

### 🤖 AI-Powered Assistant

* Real-time chat support
* Order status tracking
* Product comparison
* FAQ & policy queries (returns, shipping, warranty)
* Ticket creation and management

---

### 🛠️ Admin Features

* User management
* Product CRUD operations
* Order tracking and delivery updates

---

## 🧰 Tech Stack

### Frontend

* React
* Redux / Redux Thunk
* React Router
* Axios
* Bootstrap / Tailwind

### Backend

* Node.js / Django (REST APIs)
* JWT Authentication
* Database (MongoDB / PostgreSQL)

### AI Service

* LLM Integration (RAG / Vector DB)
* Python / FastAPI (or similar)



---

## ⚙️ Environment Variables

Create a `.env` file in the frontend root:

```
# Backend API
REACT_APP_API_URL=http://localhost:5000

# AI Chat Service
REACT_APP_CHATBOT_URL=http://localhost:8000
```

> ⚠️ Ensure backend and chatbot services are running before starting frontend.

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Frontend

```
git clone https://github.com/jassisamuran/new_proshop.git
cd new_proshop
npm install
```

---

### 2️⃣ Start Backend

```
cd backend
npm install
npm start
```

---

### 3️⃣ Start AI Chat Service

```
cd chatbot
pip install -r requirements.txt
python app.py
```

---

### 4️⃣ Run Frontend

```
npm start
```

App will run at:
👉 http://localhost:3000


## 📈 Key Highlights

* Designed **modular architecture** with separate AI service
* Built **real-world e-commerce workflows**
* Integrated **AI chatbot for automation**

---

## 📌 Future Improvements

* WebSocket-based real-time notifications
* Advanced recommendation system

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit a PR.

---

## 📬 Contact

**Jaspreet Singh**

* LinkedIn: https://www.linkedin.com/in/jaspreet-singh-7315ba220/
* GitHub: https://github.com/jassisamuran

---

