# Task Manager Database

This directory contains the Prisma database configuration for the Task Manager application.

## Features

- **User Management**: Authentication and user profiles
- **Task Management**: Create, update, and organize tasks
- **Categories**: Organize tasks by categories
- **Subtasks**: Break down tasks into smaller items
- **Attachments**: Attach files to tasks
- **Notifications**: Get notified about task events
- **Priority Levels**: Set task priorities (Low, Medium, High, Urgent)
- **Task Status**: Track task progress (TODO, In Progress, Review, Completed)

## Setup

1. Run migrations:
   ```bash
   npm run db:migrate
   ```

2. Push schema:
   ```bash
   npm run db:push
   ```

3. Seed database:
   ```bash
   npm run seed
   ```

4. View data:
   ```bash
   npm run db:studio
   ```
