const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db"); 
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");
const { z } = require("zod");
console.log(JWT_USER_PASSWORD);

const userRouter = Router();

// Zod schemas
const signupSchema = z.object({
    email: z.string().email().min(5).max(100),
    password: z.string().min(5).max(32).regex(/[!@#$%^&*(),.?":{}|<>]/),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50)
});

const signinSchema = z.object({
    email: z.string().email().min(5).max(100).regex(/[!@#$%^&*(),.?":{}|<>]/),
    password: z.string().min(5).max(32)
});

userRouter.post('/signup', async function(req, res) {
    const parseResult = signupSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid input", errors: parseResult.error.errors });
    }
    const {  email, password , firstName, lastName } = parseResult.data;
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }
    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
    res.json({
        message: "signup endpoint"
    });
});

userRouter.post("/signin", async function(req, res) {
    const parseResult = signinSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid input", errors: parseResult.error.errors });
    }
    const { email , password } = parseResult.data;
    
    const user = await userModel.findOne({
        email: email,
        password: password
    });
if(user){
    const token = jwt.sign({
        id: user._id
    }, JWT_USER_PASSWORD)

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

userRouter.post('/purchases', userMiddleware , async function (req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,

    })
    let purchasedCourseIds= [];
    for(let i = 0 ; i < purchases.length; i++){
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: {$in: purchasedCourseIds}
    })
    res.json({
        purchases,
        coursesData
    });
});

module.exports = {
    userRouter: userRouter
}



//=========================================================================================


// const { Router } = require("express");
// const { userModel, purchaseModel, courseModel } = require("../db"); 
// const jwt = require("jsonwebtoken");
// const {JWT_USER_PASSWORD} = require("../config");
// console.log(JWT_USER_PASSWORD);


// const userRouter = Router();

// userRouter.post('/signup', async function(req, res) {
//     const {  email, password , firstName, lastName } = req.body;
//     // Check if user already exists
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//         return res.status(409).json({ message: "User already exists" });
//     }
//     await userModel.create({
//         email: email,
//         password: password,
//         firstName: firstName,
//         lastName: lastName
//     })
//     res.json({
//         message: "signup endpoint"
//     });
// });

// userRouter.post("/signin", async function(req, res) {
//     const { email , password } = req.body;
    
//     const user = await userModel.findOne({
//         email: email,
//         password: password
//     });
// if(user){
//     const token = jwt.sign({
//         id: user._id
//     }, JWT_USER_PASSWORD)

//      // Do Cookie Logic in Future
// res.json({
//     token: token 
// })
// }else{
//     res.status(403).json({
//         message: "Incorrect Credentials"
//     });
// }
// });

// userRouter.post('/purchases', userMiddleware , async function (req, res) {
//     const userId = req.userId;

//     const purchases = await purchaseModel.find({
//         userId,

//     })
//     let purchasedCourseIds= [];
//     for(let i = 0 ; i < purchases.length; i++){
//         purchasedCourseIds.push(purchases[i].courseId)
//     }

//     const coursesData = await courseModel.find({
//         _id: {$in: purchasedCourseIds}
//     })
//     res.json({
//         purchases,
//         coursesData
//     });
// });

// module.exports = {
//     userRouter: userRouter
// }


// ==========================================================================================


// const { Router } = require("express");
// const { userModel } = require("../db"); 
// const jwt = require("jsonwebtoken");
// const { JWT_USER_PASSWORD } = require("../config");

// const userRouter = Router();

// // Signup route
// userRouter.post('/signup', async function(req, res) {
//     try {
//         const { email, password, firstName, lastName } = req.body;
//         if (!email || !password || !firstName || !lastName) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//         // Check if user already exists
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ message: "User already exists" });
//         }
//         await userModel.create({
//             email,
//             password, 
//             firstName,
//             lastName
//         });
//         res.json({ message: "Signup successful" });
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// // Signin route
// userRouter.post("/signin", async function(req, res) {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password required" });
//         }
//         const user = await userModel.findOne({ email, password });
//         if (user) {
//             const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);
//             res.json({ token });
//         } else {
//             res.status(403).json({ message: "Incorrect Credentials" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// // Purchases route (placeholder)
// userRouter.post('/purchases', function (req, res) {
//     res.json({
//         message: "purchases endpoint"
//     });
// });

// module.exports = {
//     userRouter: userRouter
// }