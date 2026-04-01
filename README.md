# Finance Backend API

Backend system for a finance dashboard with role-based access control, built with Node.js, Express, MySQL, and JWT.

## Features
- JWT Authentication
- Role-based access control (viewer / analyst / admin)
- Financial records CRUD with filtering
- Dashboard summary API (income, expenses, net balance, category totals)
- Input validation and error handling

## Stack
Node.js • Express • MySQL • Sequelize • JWT • bcrypt

## Quick Start
```bash
npm install
# Update config/db.js with your MySQL credentials
npm run dev
```

## API Endpoints
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /auth/register | Public |
| POST | /auth/login | Public |
| GET | /records | All roles |
| GET | /records/summary | Analyst, Admin |
| POST | /records | Admin only |
| PUT | /records/:id | Admin only |
| DELETE | /records/:id | Admin only |
