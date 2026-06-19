const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db")
const courseRouter = Router();

// Course purchase route - userMiddleware se user authenticate hota hai
courseRouter.post('/purchase', userMiddleware, async function(req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({ userId, courseId })
    res.json({ message: "You Have Successfully Bought The Course" })
});

// Preview route - public courses list return karta hai
courseRouter.get('/preview', async function(req, res) {
    const courses = await courseModel.find({});
    res.json({ courses })
});

module.exports = {
    courseRouter: courseRouter
}