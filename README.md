# Support Desk Lite

Support Desk Lite is a MERN-style ticket management system built with **Node.js, Express, MongoDB, and React**.  
It supports authentication, role-based access control, ticket management, comments, and pagination.

---

# Features

- JWT Authentication
- Role-based access (Customer, Agent, Admin)
- Ticket creation and management
- Ticket assignment to agents
- Status transitions with validation
- Pagination for ticket listing
- Public comments and internal notes
- MongoDB database with Mongoose

---

# Tech Stack

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi validation

Frontend
- React
- Axios
- Vite

---

# Project Structure
 TicketSystem/
│
├ frontend/ # React frontend
├ middleware/ # Auth middleware
├ models/ # Mongoose schemas
├ routes/ # Express routes
├ scripts/ # Seed script
├ validation/ # Joi validation schemas
│
├ server.js
├ package.json
└ .env


---

# Setup Instructions

## 1. Clone Repository


git clone https://github.com/RajeevRayagada/support-desk-lite.git

cd support-desk-lite/TicketSystem


---

## 2. Install Backend Dependencies


npm install


---

## 3. Create `.env` file

Create a file named `.env` in the root of `TicketSystem`.

Example:


PORT=5000
MONGO_URI=mongodb://localhost:27017/supportdesk
JWT_SECRET=supersecret


---

## 4. Seed Database

Creates:
- 1 Admin
- 1 Agent
- 1 Customer
- Sample tickets

Run:


npm run seed


---

## 5. Start Backend Server


node server.js


Server runs at:


http://localhost:5000


---

# Run Frontend

Go to frontend folder:


cd frontend
npm install
npm run dev


Frontend runs at:


http://localhost:5173


---

# Seeded Users

These users are created by the seed script.


Admin
admin@test.com

password123

Agent
agent@test.com

password123

Customer
customer@test.com

password123


---

# API Endpoints

## Authentication


POST /api/auth/register
POST /api/auth/login


---

## Tickets


POST /api/tickets
GET /api/tickets
PATCH /api/tickets/:id/status
PATCH /api/tickets/:id/assign


---

## Comments


POST /api/comments
GET /api/comments/:ticketId


---

# Status Transition Rules

Allowed transitions:


open → in_progress
in_progress → resolved
resolved → closed
resolved → in_progress


Invalid transitions return **HTTP 400**.

---

# Pagination

Tickets endpoint supports:


GET /api/tickets?page=1&limit=10


Maximum limit: **50**

---

# Author

Rajeev Rayagada
