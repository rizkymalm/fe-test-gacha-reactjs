# 🎮 Gacha Game Technical Assessment

A simple Gacha Game application developed as a technical assessment.

The project demonstrates a complete gacha system implementation including authentication, wallet management, inventory management, configurable event-based drop rates, and MongoDB atomic transactions.

---

## 🎥 Demo Video

[![Watch the demo](https://img.youtube.com/vi/45XHvSvgWVg/maxresdefault.jpg)](https://www.youtube.com/watch?v=45XHvSvgWVg)

Click the image above to watch the full demo on YouTube.

Link Demo: https://gacha.rizkymalm.com/

Repository: https://github.com/rizkymalm/fe-test-gacha-reactjs/

---


## ✨ Features

### Authentication

- JWT Authentication
- Access Token (15 minutes)
- Refresh Token (7 days)
- Password hashing using bcrypt

### User

- Login
- Refresh Token
- View Wallet Balance
- View Inventory
- View Gacha History
- Single Draw Gacha
- Multiple Draw Gacha (x10)

### Admin

- Manage Items
- Manage Events
- Configure Event Items
- Configure Drop Rates

### Gacha System

- Weighted Random Algorithm
- Configurable Drop Rates
- Event-based Gacha
- Treasure Chest Animation

### Wallet

- Coin Balance
- Transaction History

### Inventory

- Item Ownership
- Quantity System
- Optimized using MongoDB bulkWrite()

### Database

- MongoDB Transaction
- Atomic Operations
- Soft Delete
- Event & Item Relationship

---

# 🛠 Tech Stack

- **React.js**
- **Tailwind CSS**
- **Redux** – Global workspace state management
- TypeScript

Deployed on **Vercel**.

---

# 🚀 Getting Started

## Frontend

Install dependencies

```bash
npm install
# or
yarn install
```

Run development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# ⚙ Environment Variables

Frontend

```env
NODE_ENV=
VITE_API_URL=
VITE_DUMMY_API_URL=
```

---

# 📖 Documentation

Additional documentation is included in:

```
docs/
```

Contents include:

- System Architecture
- Database Design (ERD)
- Authentication Flow
- Wallet Flow
- Inventory Flow
- Gacha Flow
- Weighted Random Algorithm
- Atomic Transaction
- API Overview
- Design Decisions

---

# 📬 Postman Collection

Postman files are provided for API testing.

```
postman/
```

Includes:

- API Collection
- Environment

---

# 📌 Design Highlights

- JWT Authentication
- Refresh Token
- MongoDB Transaction
- Weighted Random Sampling
- Event-based Drop Rate Configuration
- Inventory Optimization using bulkWrite()
- Wallet Transaction History
- Configurable Gacha Events

---
## 🎨 UI Foundation

This project is built on top of **Digimal**, a modern dashboard template created by Rizki Malem.

Digimal is a customizable dashboard UI system designed for scalable web applications, built with:

- Next.js
- Tailwind CSS
- Modular component architecture

You can explore the Digimal template here:  
https://rizkymalm.site/

Using Digimal as the UI foundation allowed this project to focus more on interaction systems and configurator logic rather than rebuilding layout infrastructure from scratch.

---
