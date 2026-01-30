# BlogAT

A modern blog system built with **Nuxt 3** + **Express** + **MongoDB**.

## Tech Stack

### Frontend (client/)
- **Nuxt 3** - Vue 3 SSR Framework
- **TypeScript** - Type Safety
- **TailwindCSS** - Utility-first CSS
- **Pinia** - State Management

### Backend (server/)
- **Express 5** - Web Framework
- **TypeScript** - Type Safety
- **MongoDB** - Database (via Mongolass)
- **JWT** - Authentication (httpOnly Cookie)
- **bcrypt** - Password Hashing

## Project Structure

```
blogAT/
├── client/                 # Nuxt 3 Frontend
│   ├── components/         # Vue Components
│   ├── composables/        # Composables (useApi)
│   ├── layouts/            # Page Layouts
│   ├── middleware/         # Route Guards
│   ├── pages/              # Page Components
│   ├── stores/             # Pinia Stores
│   └── types/              # TypeScript Types
│
├── server/                 # Express API
│   └── src/
│       ├── config/         # Configuration
│       ├── lib/            # Database Connection
│       ├── middlewares/    # Auth Middleware
│       ├── models/         # Data Models
│       ├── routes/         # API Routes
│       └── types/          # TypeScript Types
│
├── docker-compose.yml      # Docker Deployment
└── package.json            # Root Scripts
```

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### Installation

```bash
# Install all dependencies
npm run install:all

# Or install separately
npm install
cd server && npm install
cd ../client && npm install
```

### Development

```bash
# Start both server and client
npm run dev

# Or start separately
npm run dev:server   # http://localhost:4000
npm run dev:client   # http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create post (auth) |
| PUT | `/api/posts/:id` | Update post (auth) |
| DELETE | `/api/posts/:id` | Delete post (auth) |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts/:id/comments` | Get post comments |
| POST | `/api/posts/:id/comments` | Create comment (auth) |
| DELETE | `/api/comments/:id` | Delete comment (auth) |

### Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload file (auth) |

## Environment Variables

### Server (.env)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/blogat
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000
```

### Client (.env)
```env
NUXT_PUBLIC_API_BASE=http://localhost:4000/api
```

## Docker Deployment

```bash
# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## License

MIT
