# 42km Trainer

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Routes

- `/` - Training plan dashboard (requires login)
- `/login` - Login/Register page

## API Routes

- `POST /api/auth/login` - Login or register
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `GET /api/training` - Get training sessions
- `PATCH /api/training` - Update session completion status
