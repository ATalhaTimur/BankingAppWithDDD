# 💸 Financial Account Management App

This is a full-stack financial management application where individual users can manage accounts in multiple currencies and precious metals. The backend is built with **.NET 8** and the frontend is built with **React + Vite**. The project follows **Clean Architecture** and **Domain-Driven Design (DDD)** principles to ensure scalability, maintainability, and separation of concerns.

> Developed by: Abdulkerim Talha Timur & ChatGPT  
> 📄 [Project Presentation (PDF)] (https://github.com/user-attachments/files/20656291/Finansal.Yonetim.Web.Uygulamasi.pptx)


---

## 🧱 Project Architecture

### Backend – Clean Architecture (DDD)
- **WebApi** – ASP.NET Core API endpoints
- **Application** – UseCases, DTOs, business logic
- **Domain** – Core entities and interfaces
- **Infrastructure** – EF Core, Repositories, DbContext
- **UnitTests** – Created but not implemented due to time constraints

### Frontend – React (Vite)
- Built with Vite for fast performance
- Styled using TailwindCSS
- Axios for API communication
- React Router for navigation

---

## ⚙️ Technologies Used

### Backend:
- .NET 8 + ASP.NET Core Web API  
- Entity Framework Core with PostgreSQL  
- MongoDB (installed but not used in the current version)  
- Docker Compose for database setup  
- AutoMapper & FluentValidation  
- Mock service for currency exchange rates

### Frontend:
- React (Vite template)
- TailwindCSS
- Axios
- React Router

---

## 💼 Core Features

- User authentication (login/register)
- Create accounts in: `TRY`, `USD`, `EUR`, `XAU` (gold), `XAG` (silver)
- Perform **exchange** between own accounts (only TRY-based conversions supported)
  - ✅ TRY ➝ USD, TRY ➝ XAU
  - ❌ USD ➝ EUR (not supported)
- Transfer money:
  - Between own accounts
  - To other users (IBAN and name must match)
  - Transfer only allowed between same currency accounts (e.g., TRY ➝ TRY)
- All operations are stored as **transactions**
- Users can:
  - View account balances
  - Filter past transactions
  - Manually add expenses to any account

---

## 🧪 Mock Currency Service

Instead of connecting to a real external service, the exchange rates are simulated through:

- `ICurrencyRateService` interface
- `MockCurrencyRateService` class
  - Rates are hardcoded in a `Dictionary<(string, string), decimal>`
  - Behaves like a real API internally

---

## 🖥️ Frontend Pages

| Page             | Description |
|------------------|-------------|
| **Login/Register**  | Auth system with localStorage support |
| **Home Page**        | Lists all accounts grouped by type |
| **Account Details**  | Shows account transactions, balance, filtering, and manual expense entry |
| **Transfer**         | Allows transfers between same-type accounts (to self or other users) |
| **Exchange**         | TRY-based exchange using mock currency rates |
| **Create Account**   | Add new account in any supported currency |
| **Logout**           | Clears session and redirects to login |

---

## 🐳 Database Setup (Docker)

Run the following command from the root of the project:

```bash
docker-compose up -d
