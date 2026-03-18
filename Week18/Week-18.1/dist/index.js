"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.use(express_1.default.json());
app.post("/user", async (req, res) => {
    try {
        const { username, password, age, city } = req.body;
        if (!username || !password || age === undefined || !city) {
            res.status(400).json({
                message: "username, password, age and city are required",
            });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
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
    }
    catch (error) {
        res.status(500).json({ message: "failed to create user", error });
    }
});
app.get("/users", async (_req, res) => {
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
app.get("/todos/:id", async (req, res) => {
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
        res.status(404).json({ message: "user not found" });
        return;
    }
    const todos = await client.todo.findMany({ where: { userId: id } });
    res.json({ user, todos });
});
app.listen(3000);
//# sourceMappingURL=index.js.map