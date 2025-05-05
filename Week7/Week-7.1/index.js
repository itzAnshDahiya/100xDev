const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "asdasd@!23";


const app = express();
app.use(express.json());

app.post("/signup", async function(req , res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

   await UserModel.create ({
        email: email,
        password: password,
        name: name
    })
    res.json({
        message: " You are logged In "
    })
});

app.post("/signin", async function(req , res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
     email: email,
     password: password
    })
console.log(user);

    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        });
        res.json({
           token: token
        });
    } else {
        res.sendStatus(403).json({
            message: " Incorrect Credentials "
        })
    }
});

app.post("/todo" , auth , function(req , res){
    const userId = req.userId;
    const title = req.body.title;
    TodoModel.create({
        title,
        userId
    })

    res.json({
        userId : userId
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

function auth(req , res , next){
    const token = req.headers.token;

    const decodeData = jwt.verify(token , JWT_SECRET);

    if(decodedData) {
        req.userId = decodedData.Id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
}

app.listen(3000);