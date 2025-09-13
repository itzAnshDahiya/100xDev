const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken")
// bcrypt , zod , jsonwebtokwn
const {JWT_ADMIN_PASSWORD} = require("../config"); 
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post('/signup', async function(req, res) {
     const {  email, password , firstName, lastName } = req.body;
    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
res.json({
        message: "signup endpoint"
    });
});


adminRouter.post("/signin", async function(req, res) {
     const { email , password } = req.body;
    
    const admin = await adminModel.findOne({
        email: email,
        password: password
    });
if(admin){
    const token = jwt.sign({
        id: admin._id
    }, JWT_ADMIN_PASSWORD)

     // Do Cookie Logic in Future
res.json({
    token: token 
})
}else{
    res.status(403).json({
        message: "Incorrect Credentials"
    });
}
});


adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const{ title , description , imageUrl , price } = req.body;
    const course = await courseModel.create({
        title: title , 
        description: description , 
        imageUrl: imageUrl , 
        price: price , 
        creatorId: adminId
    })
    res.json({
        message: "Course Created",
        courseId: course._Id
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