const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post('/signup', (req, res) => {
    res.json({
        message: "signup endpoint"
    });
});

adminRouter.post("/signin", (req, res) => {
    res.json({
        message: "signin endpoint"
    });
});

adminRouter.post("/course", (req, res) => {
    res.json({
        message: "signin endpoint"
    });
});

adminRouter.put("/course", (req, res) => {
    res.json({
        message: "signin endpoint"
    });
});

adminRouter.post("/course/bulk", (req, res) => {
    res.json({
        message: "signin endpoint"
    });
});

module.exports = {
    adminRouter: adminRouter
}