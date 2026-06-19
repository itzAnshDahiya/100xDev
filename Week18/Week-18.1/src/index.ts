import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const app = express();
const client = new PrismaClient();

app.use(express.json());

app.post("/user", async (req: Request, res: Response) => {
    try {
        const { username, password, age, city } = req.body;

        if (!username || !password || age === undefined || !city) {
            res.status(400).json({
                message: "username, password, age and city are required",
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await client.user.create({
            data: {
                username,
                password: hashedPassword,
                age: Number(age),
                city,
            },
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
            age: user.age,
            city: user.city,
        });
    } catch (error) {
        res.status(500).json({ message: "failed to create user", error });
    }
});

app.get("/users", async (_req: Request, res: Response) => {
    const users = await client.user.findMany({
        select: {
            id: true,
            username: true,
            age: true,
            city: true,
        },
    });

    res.json({ users });
});

app.get("/todos/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        res.status(400).json({ message: "invalid user id" });
        return;
    }

    const user = await client.user.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            age: true,
            city: true,
        },
    });

    if (!user) {
        res.status(404).json({ message: "user is not found" });
        return;
    }

    const todos = await client.todo.findMany({ where: { userId: id } });

    res.json({ user, todos });
});

app.listen(3000);