const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD} = require("../config"); 
const { adminMiddleware } = require("../middleware/admin");

// Admin signup - simple create (no validation here)
adminRouter.post('/signup', async function(req, res) {
    const { email, password, firstName, lastName } = req.body;
    await adminModel.create({ email, password, firstName, lastName })
    res.json({ message: "signup endpoint" });
});

// Admin signin - check credentials aur token return
adminRouter.post("/signin", async function(req, res) {
    const { email , password } = req.body;
    const admin = await adminModel.findOne({ email: email, password: password });
    if(admin){
        const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD)
        res.json({ token: token })
    } else {
        res.status(403).json({ message: "Incorrect Credentials" });
    }
});

// Create course - adminMiddleware se ensure karega ki request admin hai
adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;
    const course = await courseModel.create({ title, description, imageUrl, price, creatorId: adminId })
    res.json({ message: "Course Created", courseId: course._id });
});

// Update course - sirf same creator hi update kar sakta hai
adminRouter.put("/course", adminMiddleware , async function (req, res) {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;
    await courseModel.updateOne({ _id: courseId, creatorId: adminId }, { title, description, imageUrl, price })
    res.json({ message: "Course Updated", courseId: courseId });
});

// Get all courses created by this admin
adminRouter.get("/course/bulk", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    const courses = await courseModel.find({ creatorId: adminId });
    res.json({ message: "Courses Fetched", courses });
});

module.exports = { adminRouter: adminRouter }