# 42km Trainer

![FinalLevel 42 Logo](./public/logo2.png)

## Getting Started

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database

- **Local Development**: Uses SQLite (no setup needed)
- **Production/Vercel**: Uses Neon (Postgres) - set `DATABASE_URL` environment variable

See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for deployment instructions.

## Routes

- `/` - Training plan dashboard (requires login)
- `/login` - Login/Register page

## API Routes

- `POST /api/auth/login` - Login or register
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `GET /api/training` - Get training sessions
- `PATCH /api/training` - Update session completion status
