const express = require('express');

const app = express();
app.use(express.json());
//[{username:"Ansh", password: 123 , token: "asdasdasadasd"}]

const users = [];

//should return a logn random string
function generateToken(){
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' , 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' , 
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    let token = "";
    for(let i = 0 ; i <32 ; i++){
        //use a simple function here
        token = token + options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post("/signup", function(req,res){
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

app.post("/signin", function(req,res){
      const username = req.body.username;
      const password = req.body.password;

     //maps and filters
     let foundUsers = null;

     for(let i = 0; i < users.length ; i++){
        if(users[i].username == username && users[i].password == password){
            foundUsers = users[i]
        }
     }
     if(foundUsers){
        const token = generateToken();
foundUsers.token = token;
        res.json({
            message: token
        })
     }
})

app.listen(3000);