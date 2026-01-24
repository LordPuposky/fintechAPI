# FutureBank Insights: Fintech API

This is a backend application developed for the **CSE 341: Web Backend Development** course at BYU-Idaho. The project focuses on creating a robust Fintech platform to manage financial accounts and their associated transaction history.

## 🚀 Key Features
- **Full CRUD Operations**: Create, Read, Update, and Delete for both Bank Accounts and Transactions.
- **Data Validation**: Strict schema enforcement using Mongoose (enums, min/max values, and required fields).
- **Automated Documentation**: Interactive API documentation generated with Swagger UI.
- **Relational Data**: Demonstrates a one-to-many relationship between Accounts and Transactions.
- **Cloud Deployment**: Hosted on Render with MongoDB Atlas as the database provider.

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Documentation**: Swagger Autogen & Swagger UI

## 📂 Project Structure
- `models/`: Data schemas for Accounts and Transactions.
- `controllers/`: Business logic and request handling.
- `routes/`: Endpoint definitions for the API.
- `db/`: Database connection configuration.

## 📖 API Documentation
Once the server is running, you can access the interactive Swagger documentation at:
`http://localhost:8080/api-docs` (Local)
`https://your-project-url.onrender.com/api-docs` (Production)

## 👤 Author
**Yesid Augusto Romero Ruiz**
