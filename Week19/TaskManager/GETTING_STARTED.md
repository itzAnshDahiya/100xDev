# Getting Started

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npm run db:push
```

### 3. Seed Sample Data (Optional)
```bash
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open in Browser
Visit `http://localhost:3000`

## Testing Credentials
- **Email**: user@example.com
- **Password**: password123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run seed` - Seed database with sample data

## Project Features

### ✓ Authentication
- Secure user registration and login
- JWT-based session management
- Protected API routes

### ✓ Task Management
- Create, read, update, delete tasks
- Set priorities and due dates
- Track task status
- Add subtasks

### ✓ Organization
- Custom task categories
- Color-coded categories
- Filter tasks by status/priority

### ✓ Analytics
- Task completion rate
- Priority distribution
- Status breakdown
- Visual charts and graphs

### ✓ User Features
- Profile management
- Responsive design
- Modern UI with Tailwind CSS

## Folder Structure

```
src/
├── app/              # Next.js pages and API routes
├── components/       # Reusable React components
├── lib/             # Utilities, hooks, and stores
└── middleware/      # Custom middleware

prisma/
├── schema.prisma    # Database schema
└── seed.ts          # Sample data
```

## API Routes

All authenticated endpoints require `Authorization: Bearer {token}` header.

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/profile`
- PUT `/api/auth/profile`

### Tasks
- GET `/api/tasks`
- POST `/api/tasks`
- GET `/api/tasks/{id}`
- PUT `/api/tasks/{id}`
- DELETE `/api/tasks/{id}`

### Categories
- GET `/api/categories`
- POST `/api/categories`
- PUT `/api/categories/{id}`
- DELETE `/api/categories/{id}`

### Stats
- GET `/api/stats`

## Environment Variables

Create `.env.local`:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

## Troubleshooting

### Database Issues
```bash
# Reset database
npx prisma migrate reset

# View database
npm run db:studio
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Port Already in Use
Change port in dev script:
```bash
npm run dev -- -p 3001
```

## Next Steps

1. Customize the UI colors in `tailwind.config.ts`
2. Add more features (notifications, sharing, etc.)
3. Deploy to Vercel or other platforms
4. Add tests with Jest and React Testing Library
5. Implement real-time updates with WebSockets

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## Support

For issues or questions, please open an issue in your repository.
