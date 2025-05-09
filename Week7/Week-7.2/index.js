const bcrypt = require("bcrypt");
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose.connect("")  //MongoDB connection string

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {

    const requireBody = z.object({
        email: z.string().min(3).max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(5).max(30)
    })

    //const parsedData = requiredBody.parse(req.body);
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        res.json({
            message: "Incorrect Format"
        })
        return
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    //promosify the fs function call

    // Email ek string hai or usme "@" aata hai vo check krne k liye
//     if(!email.isString() || !email.contains("@")){
// res.json({
//     message: "Incorrect email"
// })
//       return  
//  }

if(typeof email != "string" || email.length < 5 || email.includes("@")) {
    res.json({
        message: "Email Incorrect Check The Credentials"
    })
}
    const hashedpassword = await bcrypt.hash(password , 5);
    console.log(hashedpassword);

    await UserModel.create({
        email: email,
        password: hashedpassword  ,
        name: name
    });
 res.json({
    message: "You are signed up"
})
});

app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
    });

    if(!response){
        res.status(403).json({
            message: "User Does Not Exist In Our Database"
        })
    } 

    const passwordMatch = await bcrypt.compare(password , response.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000);