🌌 Galactic Bounty Board
A full-stack web application for bounty hunters in the galaxy to post, browse, and accept bounties.

🔧 Tech Stack
Layer	Tech
Frontend	Next.js + React + Tailwind CSS
Backend	Node.js + Express
Auth	JWT
Database	PostgreSQL (via Prisma)
API	REST
Styling	Tailwind CSS
Deployment	Vercel (frontend), Railway/Fly.io (backend)
Extras	Star Wars Fandom API (images)

📁 Project Structure
bash
Copy
Edit
/frontend         - Next.js app
/backend          - Express API
⚙️ Features
🔐 Authentication

Register/Login with JWT-based auth

📃 Public Bounty List

Everyone can view bounties

➕ Create Bounty

Authenticated hunters can post bounties

✅ Accept Bounty

Authenticated users can accept one bounty each

📂 My Bounties

View bounties posted and accepted by current user

🌍 Planet Filter (Bonus)

🖼️ Bounty Images (Bonus)

Pull from Star Wars Fandom API

🔐 Admin-only route (Bonus)

View all users and their accepted bounties

🚀 Getting Started
📦 Prerequisites
Node.js (>= 18.x)

PostgreSQL running locally or hosted

pnpm or npm

🔁 Backend Setup (/backend)
Install dependencies

bash
Copy
Edit
cd backend
npm install
Configure Environment Variables

Create a .env file:

env
Copy
Edit
DATABASE_URL=postgresql://user:pass@localhost:5432/bounties
JWT_SECRET=supersecretkey
Run database migration (if using Prisma)

bash
Copy
Edit
npx prisma migrate dev --name init
Start server

bash
Copy
Edit
npm run dev
Server runs on http://localhost:3000.

🎨 Frontend Setup (/frontend)
Install dependencies

bash
Copy
Edit
cd frontend
npm install
Configure environment

Create .env.local:

env
Copy
Edit
NEXT_PUBLIC_API_URL=http://localhost:3000
Start dev server

bash
Copy
Edit
npm run dev
Frontend runs on http://localhost:3000.

🐳 Docker (Optional)
You can run the entire app via Docker Compose:

bash
Copy
Edit
docker-compose up --build
Ensure Docker is installed. The compose file should include services for:

frontend

backend

postgres

📸 Example Screens
Public bounty list

Auth forms (login/register)

Bounty creation

My Bounties dashboard

Admin user view (if admin token used) - /admin/users

📚 API Reference
Auth
POST /auth/register

POST /auth/login

Bounties
GET /bounties – public list

POST /bounties – create (auth)

POST /bounties/:id/accept – accept (auth)

GET /bounties/me – posted/accepted (auth)

Admin
GET /admin/users – admin-only
