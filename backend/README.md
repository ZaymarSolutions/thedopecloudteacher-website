# The Dope Cloud Teacher - Backend Server

Production-ready Node.js/Express backend for The Dope Cloud Teacher learning platform.

## Features

- ✅ User authentication (JWT)
- ✅ Stripe payment integration
- ✅ Course management
- ✅ Progress tracking
- ✅ Certificate generation
- ✅ SQLite database
- ✅ Rate limiting
- ✅ Security headers

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your Stripe keys
```

### 3. Initialize Database

```bash
npm run init-db
```

### 4. Start Server

```bash
npm start
```

Server runs on http://localhost:3000

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run init-db` - Initialize/reset database

## Environment Variables

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
DATABASE_PATH=./database.sqlite
FRONTEND_URL=http://localhost:8080
CORS_ORIGIN=http://localhost:8080
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Courses
- `GET /api/courses` - List all active courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/access` - Check user access (requires auth)

### Payments
- `POST /api/create-checkout` - Create Stripe checkout session (requires auth)
- `POST /api/webhook` - Stripe webhook handler

### Progress
- `GET /api/progress/:courseId` - Get user progress (requires auth)
- `POST /api/progress` - Update lesson progress (requires auth)

### Certificates
- `POST /api/certificates/generate` - Generate certificate (requires auth)
- `GET /api/certificates` - List user certificates (requires auth)
- `GET /api/certificates/verify/:code` - Verify certificate (public)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (admin only)

### Health Check
- `GET /health` - Server health check

## Database Schema

### Tables
- `users` - User accounts
- `courses` - Course catalog
- `purchases` - Course purchases
- `progress` - Lesson completion tracking
- `certificates` - Generated certificates

## Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Rate limiting (100 requests per 15 minutes)
- Helmet.js security headers
- CORS protection
- SQL injection prevention (parameterized queries)

## Deployment

### Heroku
```bash
heroku create
heroku addons:create heroku-postgresql:mini
git push heroku main
```

### DigitalOcean
1. Create Ubuntu droplet
2. Install Node.js 18+
3. Clone repository
4. Set up PM2
5. Configure Nginx reverse proxy

### Azure
```bash
az webapp create --name dope-cloud-teacher --runtime "NODE|18-lts"
git push azure main
```

## Support

For issues or questions, contact: admin@thedopecloudteacher.org

---

Built with ❤️ by The Dope Cloud Teacher
