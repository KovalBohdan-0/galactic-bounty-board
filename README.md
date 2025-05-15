# 🌌 Galactic Bounty Board

A full-stack web app for bounty hunters to post, browse, and accept bounties.

[Live Demo](https://galactic-bounty-board.vercel.app/)

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js (>= 18.x)
- PostgreSQL (local or hosted)
- pnpm or npm

### 🐳 Docker (Optional)
Run the app with Docker Compose:
```bash
docker-compose up --build
```
Includes services for `frontend`, `backend`, and `postgres`.

### 🔁 Backend Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Configure `.env`:
   ```env
    DB_TYPE=postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=xxxx
    DB_DATABASE=galactic_bounty

    JWT_SECRET=supersecretkey
    JWT_EXPIRES_IN=3600s
   ```

3. Start the server:
   ```bash
   npm run dev
   ```
   Backend runs on `http://localhost:3000`.

### 🎨 Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Configure `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3001`.

## 📚 API Reference

### Auth
- `POST /auth/register`: Register
- `POST /auth/login`: Login

### Bounties
- `GET /bounties`: Public list
- `POST /bounties`: Create (auth)
- `POST /bounties/:id/accept`: Accept (auth)
- `GET /bounties/me`: Posted/accepted (auth)

### Admin
- https://galactic-bounty-board.vercel.app/admin/users : Admin-only

Admin credentials:  
- **Email**: admin  
- **Password**: admin1234
