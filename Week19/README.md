# TaskFlow - Full-Stack Task Management Application

A modern, full-featured task management application built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Features

### 🎯 Core Features
- **User Authentication** - Secure sign-up, login, and JWT-based authentication
- **Task Management** - Create, read, update, and delete tasks
- **Task Organization** - Categorize tasks with custom categories and colors
- **Priority Levels** - Set task priorities (Low, Medium, High, Urgent)
- **Status Tracking** - Track task progress (TODO, In Progress, Review, Completed)
- **Subtasks** - Break down tasks into smaller, manageable subtasks
- **Task Filtering** - Filter tasks by status, priority, and category

### 📊 Analytics & Insights
- **Dashboard** - Overview of task statistics and progress
- **Analytics Page** - Detailed charts and visualizations
- **Progress Tracking** - Completion rate and task breakdown by priority
- **Visual Reports** - Pie charts showing task distribution

### 👤 User Features
- **User Profiles** - Manage profile information and bio
- **Notifications** - Get notified about important task events
- **Dark Mode** - Eye-friendly dark mode toggle
- **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

### Frontend
- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API requests
- **Recharts** - Data visualization library
- **React Toastify** - Toast notifications

### Backend & Database
- **Next.js API Routes** - Backend API endpoints
- **Prisma** - ORM for database management
- **SQLite** - Lightweight database (can be upgraded to PostgreSQL)
- **JWT** - JSON Web Tokens for authentication
- **Bcryptjs** - Password hashing and encryption

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking

## Project Structure

```
TaskManager/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── api/             # API routes
│   │   │   ├── auth/        # Authentication endpoints
│   │   │   ├── tasks/       # Task CRUD endpoints
│   │   │   ├── categories/  # Category endpoints
│   │   │   └── stats/       # Analytics endpoint
│   │   ├── dashboard/       # Protected dashboard pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Landing page
│   │   ├── login/           # Login page
│   │   └── register/        # Register page
│   ├── components/          # Reusable React components
│   │   ├── Button.tsx       # Custom button component
│   │   ├── TaskCard.tsx     # Task display component
│   │   ├── TaskForm.tsx     # Task creation/edit form
│   │   ├── Modal.tsx        # Modal dialog component
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── AnalyticsDashboard.tsx # Analytics visualization
│   ├── lib/                 # Utility functions and hooks
│   │   ├── prisma.ts        # Database client
│   │   ├── jwt.ts           # JWT token handling
│   │   ├── api.ts           # API utilities and middleware
│   │   ├── utils.ts         # Helper functions
│   │   └── store.ts         # Zustand state stores
│   └── middleware/          # Express-like middleware
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding script
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- SQLite (comes with Prisma)

### Steps

1. **Navigate to project**
   ```bash
   cd TaskManager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment** (Create `.env.local`)
   ```bash
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secret-key-change-this"
   ```

4. **Setup database**
   ```bash
   npm run db:push
   ```

5. **Seed sample data** (optional)
   ```bash
   npm run seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Open in browser**
   ```
   http://localhost:3000
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks/[id]` - Get specific task (protected)
- `PUT /api/tasks/[id]` - Update task (protected)
- `DELETE /api/tasks/[id]` - Delete task (protected)
- `POST /api/tasks/[taskId]/subtasks` - Create subtask (protected)

### Categories
- `GET /api/categories` - Get all categories (protected)
- `POST /api/categories` - Create new category (protected)
- `PUT /api/categories/[id]` - Update category (protected)
- `DELETE /api/categories/[id]` - Delete category (protected)

### Analytics
- `GET /api/stats` - Get task statistics (protected)

## Default Test Credentials

For testing with seeded data:
- **Email**: user@example.com
- **Password**: password123

## Features Walkthrough

### 1. Authentication
- Sign up with email and secure password
- Login to access protected features
- Automatic logout with session management

### 2. Task Management
- Create tasks with title, description, priority, and due date
- Assign tasks to categories
- Update task status in real-time
- Delete tasks when no longer needed
- Add subtasks to break down complex tasks

### 3. Categories
- Create custom task categories with colors
- Organize tasks by category
- View task count per category
- Edit or delete categories as needed

### 4. Analytics
- View task statistics and metrics
- Track completion rate
- See task distribution by priority
- Monitor tasks by status

### 5. Profile Management
- Update personal information
- Add bio/description
- View account creation date
- Manage profile settings

## Advanced Features

### State Management
Uses Zustand for lightweight global state:
- `useTaskStore` - Task management state
- `useAuthStore` - Authentication state
- `useUIStore` - UI preferences

### Form Validation
- Email format validation
- Password strength validation
- Required field validation
- Real-time error feedback

### Error Handling
- Comprehensive error messages
- API error handling
- Client-side validation

### Security
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes
- CORS-ready setup

## Database Schema

### User
- id, email, password, name, avatar, bio, createdAt, updatedAt

### Task
- id, title, description, status, priority, dueDate, completedAt, userId, categoryId, createdAt, updatedAt

### Category
- id, name, color, icon, userId, createdAt, updatedAt

### Subtask
- id, title, completed, taskId, createdAt, updatedAt

### Attachment
- id, filename, url, size, taskId, createdAt

### Notification
- id, type, message, read, userId, createdAt, updatedAt

## Customization

### Styling
- Modify `tailwind.config.ts` for custom colors and themes
- Update `globals.css` for global styles
- Components use Tailwind utilities for easy customization

### Database
- Modify `prisma/schema.prisma` to add/change database tables
- Run `npm run db:migrate` after schema changes

### API
- Add new endpoints in `src/app/api/` directory
- Follow the same pattern as existing endpoints

## Performance Optimizations

- Server-side rendering with Next.js
- Database query optimization via Prisma
- Image optimization
- Code splitting and lazy loading
- Debounced API calls

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project for learning and development.

## Support & Contribution

For bugs, feature requests, or contributions, please create an issue or pull request.

---

**Built with ❤️ for productivity enthusiasts**
