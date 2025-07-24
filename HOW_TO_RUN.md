# HOW TO RUN - Exchange Rates Project

This guide explains how to run the **frontend** and **backend** locally and with Docker.

---

##  Prerequisites

Make sure you have the following installed:

- [Node.js v20+](https://nodejs.org/en/download)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/) (optional, for containerized run)

---

##  Clone the Repository

Start by cloning the project:

```bash
git clone https://github.com/LeahHeller387/exchange-rates-app.git
cd exchange-rates-app
```

##  Project Structure

exchange-rates-app/
├── Dockerfile
├── ExchangeRates.Api/ ← ASP.NET backend
└── exchangerates-web/ ← React frontend


---

##  Run Backend (ASP.NET)

```bash
cd ExchangeRates.Api
dotnet restore
dotnet run
```
The backend runs at:
http://localhost:5227

API routes include:
API routes include:  
- `/api/ExchangeRates/currencies`  
- `/api/ExchangeRates/rates/{baseCurrency}` (e.g. `/api/ExchangeRates/rates/USD`)


## Run Frontend (React + Vite)
```bash
cd exchangerates-web
npm install
npm run dev
```
Frontend will run at:
http://localhost:5173

Make sure the backend is running first.

## Run with Docker (combined)
To build and run both frontend and backend together via Docker:
```bash

docker build -t exchange-rates-app .
docker run -p 5227:80 exchange-rates-app
```
Then open in browser:
http://localhost:5227

The backend will serve the React app from wwwroot

API endpoints will also be accessible under /api/ExchangeRates

### Important Note:
The table columns are sortable as required – clicking on a column header sorts the table by that column.

