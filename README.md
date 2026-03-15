# Support Desk Lite

A backend ticket management system built with Node.js, Express, and MongoDB.

## Features
- JWT authentication
- Role-based access (customer, agent, admin)
- Ticket creation
- Ticket assignment
- Status transitions
- Pagination
- Comment support

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- JWT

## Setup

1. Clone the repository
2. Install dependencies

npm install

3. Create `.env`

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

4. Run the server

node server.js

Server runs on:
http://localhost:5000

## API Endpoints

### Auth
POST /api/auth/register  
POST /api/auth/login

### Tickets
POST /api/tickets  
GET /api/tickets  
PATCH /api/tickets/:id/status  
PATCH /api/tickets/:id/assign

### Comments
POST /api/comments
GET /api/comments/:ticketId
