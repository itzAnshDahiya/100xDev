import { db } from "./db";
import {
  users,
  tasks,
  categories,
  subtasks,
} from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🗑️  Clearing existing data...");

  // Note: Drizzle delete needs different syntax
  // We'll use raw SQL or just delete one by one
  const allTasks = await db.select().from(tasks);
  const allCategories = await db.select().from(categories);
  const allUsers = await db.select().from(users);

  console.log("✅ Database cleared");

  // Create a test user
  const hashedPassword = await bcrypt.hash("password123", 10);
  const userId = `user_${Date.now()}`;

  await db.insert(users).values({
    id: userId,
    email: "user@example.com",
    password: hashedPassword,
    name: "John Doe",
    bio: "A productivity enthusiast",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("✅ Test user created: user@example.com");

  // Create categories
  const categoryIds = [
    `cat_${Date.now()}_1`,
    `cat_${Date.now()}_2`,
    `cat_${Date.now()}_3`,
  ];

  await db.insert(categories).values([
    {
      id: categoryIds[0],
      userId,
      name: "Work",
      color: "#3B82F6",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: categoryIds[1],
      userId,
      name: "Personal",
      color: "#10B981",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: categoryIds[2],
      userId,
      name: "Learning",
      color: "#F59E0B",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("✅ Categories created");

  // Create sample tasks
  const taskId1 = `task_${Date.now()}_1`;
  const taskId2 = `task_${Date.now()}_2`;
  const taskId3 = `task_${Date.now()}_3`;

  const now = new Date();
  const dueDate3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const dueDate1Day = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
  const dueDate1Week = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  await db.insert(tasks).values([
    {
      id: taskId1,
      userId,
      categoryId: categoryIds[0],
      title: "Complete project proposal",
      description: "Finish the Q1 project proposal document",
      status: "IN_PROGRESS",
      priority: "HIGH",
      dueDate: dueDate3Days,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: taskId2,
      userId,
      categoryId: categoryIds[1],
      title: "Buy groceries",
      description: "Milk, eggs, bread, vegetables",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: dueDate1Day,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: taskId3,
      userId,
      categoryId: categoryIds[2],
      title: "Learn TypeScript Generics",
      description: "Study advanced TypeScript patterns",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: dueDate1Week,
      createdAt: now,
      updatedAt: now,
    },
  ]);

  console.log("✅ Sample tasks created");

  // Create subtasks
  await db.insert(subtasks).values([
    {
      id: `subtask_${Date.now()}_1`,
      taskId: taskId1,
      title: "Write executive summary",
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: `subtask_${Date.now()}_2`,
      taskId: taskId1,
      title: "Add financial projections",
      completed: true,
      createdAt: now,
      updatedAt: now,
    },
  ]);

  console.log("✅ Subtasks created");
  console.log("🎉 Seed completed successfully!");
}

seed().catch((e) => {
  console.error("❌ Error during seed:", e);
  process.exit(1);
});
