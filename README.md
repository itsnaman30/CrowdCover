# Gym Portfolio (fullstack)

## Features built
- Authentication (register/login, JWT)
- Programs CRUD (`/api/programs`)
- Sessions CRUD (`/api/sessions`)
- Bookings (`/api/bookings`)
- User dashboard with bookings and roles
- Frontend React app with login/registration, listings, admin create forms

## Backend setup
1. `cd backend`
2. Copy `.env.example` to `.env` and set `MONGO_URI`, `JWT_SECRET`, `PORT`
3. `npm install`
4. `npm run start` (or `npm run dev` with `nodemon`)

## Frontend setup
1. `cd frontend`
2. `npm install`
3. Create `.env` and optionally set `VITE_API_URL=http://localhost:5000/api`
4. `npm run dev`

## Deploy
- Deploy backend to Railway/Render/Heroku with `MONGO_URI`, `JWT_SECRET` env vars.
- Deploy frontend to Vercel and set `VITE_API_URL` to backend URL.
- Enable CORS for the backend (already set to `*`).
