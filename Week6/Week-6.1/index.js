const express = require('express');

const app = express();
app.use(express.json());

const users = [];
function generateToken(){
    
}

app.post("/singup", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    username.push({
        username: username,
        password: password
    })

    res.json({
        message: "You are Signed In"
    })
})

app.post("/singup", function(req,res){

})

app.listen(3000);