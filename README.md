# 💸 Financial Account Management App

This is a full-stack financial management application where individual users can manage accounts in multiple currencies and precious metals. The backend is built with **.NET 8** and the frontend is built with **React + Vite**. The project follows **Clean Architecture** and **Domain-Driven Design (DDD)** principles to ensure scalability, maintainability, and separation of concerns.

> Developed by: Abdulkerim Talha Timur
> 
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

## 🖥️ Screenshots
<img width="1489" height="830" alt="Ekran Resmi 2025-08-21 23 56 11" src="https://github.com/user-attachments/assets/889b3085-921a-4f92-ab7d-7b879a7967bb" />
<img width="1494" height=<img width="1492" height="847" alt="Ekran Resmi 2025-08-21 23 59 51" src="https://github.com/user-attachments/assets/54b2ef57-8c65-4d97-82ca-a47d650fa38a" />
"851" alt="Ekran Resmi 2025-08-21 23 58 31" src="https://github.com/user-attachments/assets/5b030a30-3793-456e-8986-03f80df29f64" />
<img width="1508" height="862" alt="Ekran Resmi 2025-08-21 23 59 31" src="https://github.c<img width="1474" height="830" alt="Ekran Resmi 2025-08-22 00 00 19" src="https://github.com/user-attachments/assets/b8083509-f256-4dee-930d-a25a3d0ec791" />
om/user-attachments/assets/7d300a17-49ad-4acf-b8ec-91ff93e3dea1" />

<img width="1491" height="834" alt="Ekran Resmi 2025-08-22 00 00 48" src="https://github.com/user-attachments/assets/4f86c022-2812-4712-b2c2-1ce8eade3003" />
<img width="1483" height="821" alt="Ekran Resmi 2025-08-22 00 01 40" src="https://github.com/user-attachments/assets/e9f795be-4be6-4d4c-872a-69229d26957f" />
