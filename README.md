# 🌌 Galactic Bounty Board

A full-stack web app for bounty hunters to post, browse, and accept bounties.

## 🔧 Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Auth**: JWT
- **Database**: PostgreSQL (via Prisma)
- **API**: REST
- **Deployment**: Vercel (frontend), Railway/Fly.io (backend)
- **Extras**: Star Wars Fandom API (images)

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
   DATABASE_URL=postgresql://user:pass@localhost:5432/bounties
   JWT_SECRET=supersecretkey
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
   Frontend runs on `http://localhost:3000`.

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
