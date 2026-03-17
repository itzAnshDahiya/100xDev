// ============================================
// PostgreSQL + TypeScript Complete Example
// ============================================

// Required libraries import kar rahe hain
import { Client } from "pg";

// ============================================
// STEP 1: TypeScript Interfaces/Types Define Karna
// ============================================

// Users table ke liye data structure define kar rahe hain
interface User {
    id: number;           // User ka unique ID
    username: string;     // User ka naam
    email: string;        // User ka email
    password: string;     // User ka password (encrypted hona chahiye real app mein)
    age: number;          // User ki age
    created_at: string;   // Account kab create hua
}

// Todos table ke liye structure
interface Todo {
    id: number;
    user_id: number;      // Yeh todo kis user ka hai
    title: string;        // Todo ka title
    description: string;  // Todo ka description
    completed: boolean;   // Todo complete hua ya nahi
    created_at: string;
}

// ============================================
// STEP 2: Database Connection Setup Karna
// ============================================

// PostgreSQL database se connection establish kar rahe hain
const pgClient = new Client({
    user: "neondb_owner",              // Database user ka naam
    password: "your_password_here",    // Database password
    port: 5432,                        // PostgreSQL default port
    host: "localhost",                 // Database server ka address
    database: "neondb"                 // Database ka naam
});

// Connection ke error handle karna
pgClient.connect().catch((error) => {
    console.error("❌ Database se connection nahi hoo saki:", error);
    process.exit(1);  // Agar connection fail ho to program band kar dena
});

console.log("✅ Database se successfully connect ho gaye!");

// ============================================
// STEP 3: Database Tables Create Karna
// ============================================

// Yeh function tables ko database mein create karta hai
async function createTables(): Promise<void> {
    try {
        // Users table banane ke liye SQL query
        await pgClient.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,              -- Har user ka unique ID
                username VARCHAR(50) UNIQUE NOT NULL,  -- Username unique hona chahiye
                email VARCHAR(100) UNIQUE NOT NULL,    -- Email bhi unique
                password VARCHAR(255) NOT NULL,    -- Password encrypted form mein
                age INTEGER,                       -- Age optional hai
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Account kab banaya
            );
        `);
        console.log("✅ Users table successfully create ho gaya!");

        // Todos table banane ke liye SQL query
        await pgClient.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key
                title VARCHAR(255) NOT NULL,
                description TEXT,
                completed BOOLEAN DEFAULT FALSE,   -- Shuru mein incomplete
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ Todos table successfully create ho gaya!");

    } catch (error) {
        console.error("❌ Table create karte waqt error:", error);
    }
}

// ============================================
// STEP 4: Create Operation (INSERT - Naya data add karna)
// ============================================

// Naya user register karna
async function createUser(username: string, email: string, password: string, age: number): Promise<User | null> {
    try {
        const query = `
            INSERT INTO users (username, email, password, age)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        
        // Parameterized query use kar rahe hain (SQL injection se safe hai)
        const result = await pgClient.query(query, [username, email, password, age]);
        
        console.log("✅ User successfully register ho gaya!");
        return result.rows[0] as User;  // Return new user data
        
    } catch (error) {
        console.error("❌ User create karte waqt error:", error);
        return null;
    }
}

// Todo create karna
async function createTodo(user_id: number, title: string, description: string): Promise<Todo | null> {
    try {
        const query = `
            INSERT INTO todos (user_id, title, description)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        
        const result = await pgClient.query(query, [user_id, title, description]);
        console.log("✅ Todo successfully create ho gaya!");
        return result.rows[0] as Todo;
        
    } catch (error) {
        console.error("❌ Todo create karte waqt error:", error);
        return null;
    }
}

// ============================================
// STEP 5: Read Operation (SELECT - Data nikal kar dekhna)
// ============================================

// Sabhi users ko list karna
async function getAllUsers(): Promise<User[]> {
    try {
        const result = await pgClient.query("SELECT * FROM users ORDER BY created_at DESC;");
        console.log(`📋 ${result.rows.length} users milgaye!`);
        return result.rows as User[];
        
    } catch (error) {
        console.error("❌ Users fetch karte waqt error:", error);
        return [];
    }
}

// ID se specific user dhundna
async function getUserById(id: number): Promise<User | null> {
    try {
        const result = await pgClient.query("SELECT * FROM users WHERE id = $1;", [id]);
        
        if (result.rows.length === 0) {
            console.log("❌ Yeh user exist nahi karta!");
            return null;
        }
        
        return result.rows[0] as User;
        
    } catch (error) {
        console.error("❌ User search karte waqt error:", error);
        return null;
    }
}

// Specific user ke todos nikal na
async function getUserTodos(user_id: number): Promise<Todo[]> {
    try {
        const result = await pgClient.query(
            "SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC;",
            [user_id]
        );
        
        console.log(`📋 ${result.rows.length} todos milgaye user ke!`);
        return result.rows as Todo[];
        
    } catch (error) {
        console.error("❌ Todos fetch karte waqt error:", error);
        return [];
    }
}

// ============================================
// STEP 6: Update Operation (Data modify karna)
// ============================================

// User ka profile update karna
async function updateUser(id: number, username: string, age: number): Promise<User | null> {
    try {
        const query = `
            UPDATE users
            SET username = $1, age = $2
            WHERE id = $3
            RETURNING *;
        `;
        
        const result = await pgClient.query(query, [username, age, id]);
        
        if (result.rows.length === 0) {
            console.log("❌ User update nahi ho saka!");
            return null;
        }
        
        console.log("✅ User successfully update ho gaya!");
        return result.rows[0] as User;
        
    } catch (error) {
        console.error("❌ User update karte waqt error:", error);
        return null;
    }
}

// Todo ko complete mark karna
async function completeTodo(todo_id: number): Promise<Todo | null> {
    try {
        const query = `
            UPDATE todos
            SET completed = true
            WHERE id = $1
            RETURNING *;
        `;
        
        const result = await pgClient.query(query, [todo_id]);
        console.log("✅ Todo complete mark ho gaya!");
        return result.rows[0] as Todo;
        
    } catch (error) {
        console.error("❌ Todo update karte waqt error:", error);
        return null;
    }
}

// ============================================
// STEP 7: Delete Operation (Data remove karna)
// ============================================

// User ko database se delete karna
async function deleteUser(id: number): Promise<boolean> {
    try {
        const result = await pgClient.query("DELETE FROM users WHERE id = $1;", [id]);
        
        if (result.rowCount === 0) {
            console.log("❌ User delete nahi ho saka (exist nahi karta)!");
            return false;
        }
        
        console.log("✅ User successfully delete ho gaya!");
        return true;
        
    } catch (error) {
        console.error("❌ User delete karte waqt error:", error);
        return false;
    }
}

// Specific todo delete karna
async function deleteTodo(todo_id: number): Promise<boolean> {
    try {
        const result = await pgClient.query("DELETE FROM todos WHERE id = $1;", [todo_id]);
        
        if (result.rowCount === 0) {
            console.log("❌ Todo delete nahi ho saka!");
            return false;
        }
        
        console.log("✅ Todo successfully delete ho gaya!");
        return true;
        
    } catch (error) {
        console.error("❌ Todo delete karte waqt error:", error);
        return false;
    }
}

// ============================================
// STEP 8: Advanced Queries (Complex operations)
// ============================================

// Join query - User ke liye sbhi todos count karna
async function getUserWithTodoCount(): Promise<void> {
    try {
        const result = await pgClient.query(`
            SELECT 
                u.id,
                u.username,
                u.email,
                u.age,
                COUNT(t.id) as total_todos,                    -- Total todos kitne hain
                SUM(CASE WHEN t.completed THEN 1 ELSE 0 END) as completed_todos  -- Kitne complete ho gaye
            FROM users u
            LEFT JOIN todos t ON u.id = t.user_id
            GROUP BY u.id, u.username, u.email, u.age
            ORDER BY u.created_at DESC;
        `);
        
        console.log("📊 Users with Todo Count:");
        console.log(result.rows);
        
    } catch (error) {
        console.error("❌ Query execute karte waqt error:", error);
    }
}

// ============================================
// STEP 9: Main Function - Sab kuch run karna
// ============================================

async function main(): Promise<void> {
    try {
        // Pehle tables create karna
        await createTables();

        // Naye users add karna
        const user1 = await createUser("rajesh_kumar", "rajesh@example.com", "pass123", 25);
        const user2 = await createUser("priya_sharma", "priya@example.com", "pass456", 22);

        // Users ke liye todos add karna
        if (user1) {
            await createTodo(user1.id, "Shopping karna hai", "Bazaar se groceries lane hain");
            await createTodo(user1.id, "Code likhna hai", "TypeScript seekhna hai");
        }

        if (user2) {
            await createTodo(user2.id, "GYM jana", "Monday ko gym jana hai");
        }

        // Sabhi users dikhana
        console.log("\n📋 Sabhi Users:");
        const allUsers = await getAllUsers();
        console.log(allUsers);

        // Specific user ke todos
        if (user1) {
            console.log(`\n📝 ${user1.username} ke Todos:`);
            const todos = await getUserTodos(user1.id);
            console.log(todos);

            // Pehla todo complete karna
            if (todos.length > 0) {
                await completeTodo(todos[0].id);
            }
        }

        // User ka profile update karna
        if (user1) {
            await updateUser(user1.id, "rajesh_updated", 26);
        }

        // Advanced query - User stats
        console.log("\n📊 User Statistics:");
        await getUserWithTodoCount();

    } catch (error) {
        console.error("❌ Main function mein error:", error);
    } finally {
        // Connection disconnect karna (cleanup)
        await pgClient.end();
        console.log("👋 Database connection band ho gaya!");
    }
}

// Main function ko run karna
main();

// ============================================
// SUMMARY
// ============================================
// 
// Yeh code mein:
// 1. ✅ Database connection setup kiya
// 2. ✅ TypeScript interfaces define kiye (type safety ke liye)
// 3. ✅ Tables create kiye (Users aur Todos)
// 4. ✅ CREATE operation - naya data add kiya
// 5. ✅ READ operation - data select kiya
// 6. ✅ UPDATE operation - data modify kiya
// 7. ✅ DELETE operation - data remove kiya
// 8. ✅ JOIN query - multiple tables se data combine kiya
// 9. ✅ Error handling - har jagah try-catch
// 10. ✅ Parameterized queries - SQL injection se safe
//
// ============================================
