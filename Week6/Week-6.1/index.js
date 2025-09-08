//<------- Authentication without JWT      ---------->

// const express = require('express');

// const app = express();
// app.use(express.json());
// //[{username:"Ansh", password: 123 , token: "asdasdasadasd"}]

// const users = [];

// //should return a logn random string
// function generateToken(){
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' , 
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' , 
//     '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

//     let token = "";
//     for(let i = 0 ; i <32 ; i++){
//         //use a simple function here
//         token = token + options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }

// app.post("/signup", function(req,res){
//     const username = req.body.username;
//     const password = req.body.password;

//     users.push({
//         username: username,
//         password: password
//     })

//     res.json({
//         message: "You are Signed In"
//     })
// })

// app.post("/signin", function(req,res){
//       const username = req.body.username;
//       const password = req.body.password;

//      //maps and filters
//      let foundUsers = null;

//      for(let i = 0; i < users.length ; i++){
//         if(users[i].username == username && users[i].password == password){
//             foundUsers = users[i]
//         }
//      }
//      if(foundUsers){
//         const token = generateToken();
// foundUsers.token = token;
//         res.json({
//             message: token
//         })
//      }
// })

// app.get("/me", function(req,res){
//     const token = req.headers.token
//     let foundUser = null;

//     for(let i = 0; i<users.length ; i++){
//         if(users[i].token == token){
//             foundUser = users[i]
//         }
//     }
//     if(foundUser){
//         res.json({
//             username: foundUser.username,
//             password: foundUser.password
//         })
//     }else{
//         res.json({
//             message: "Invalid Token"
//         })
//     }
// })

// app.listen(3000);






//<------- Authentication with JWT      ---------->

// const express = require('express');
// const jwt = reuire('jsonwebtoken');
// const JWT_SECRET = "randomAnsh";

// const app = express();
// app.use(express.json());
// //[{username:"Ansh", password: 123 , token: "asdasdasadasd"}]

// const users = [];

// app.post("/signup", function(req,res){
//     const username = req.body.username;
//     const password = req.body.password;

//     users.push({
//         username: username,
//         password: password
//     })

//     res.json({
//         message: "You are Signed In"
//     })
// })

// app.post("/signin", function(req,res){
//       const username = req.body.username;
//       const password = req.body.password;

//      //maps and filters
//      let foundUsers = null;

//      for(let i = 0; i < users.length ; i++){
//         if(users[i].username == username && users[i].password == password){
//             foundUsers = users[i]
//         }
//      }
//      if(foundUsers){
//         const token = jwt.sign({
//             username: username
//      }, JWT_SECRET); //convert their username over to a JWT 
// // foundUsers.token = token;
//         res.json({
//             message: token
//         })
//      }
// })

// app.get("/me", function(req,res){
//     const token = req.headers.token
//     const decodedInformation = jwt.verify(token, JWT_SECRET);  //{username: "Ansh@gmail.com"}   converting the JWT over to the User
//     const username = decodedInformation.username
//     let foundUser = null;

//     for(let i = 0; i<users.length ; i++){
//         if(users[i].username == username){
//             foundUser = users[i]
//         }
//     }
//     if(foundUser){
//         res.json({
//             username: foundUser.username,
//             password: foundUser.password
//         })
//     }else{
//         res.json({
//             message: "Invalid Token",
//         })
//     }
// })

// app.listen(3000);


//----------------------Harkirat code----------------------//

const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ramdomanshlovekiara"
const app = express();
app.use(express.json());

const users = [];

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })    

    res.json({
        message: "You are signed up"      //it will be shown when we are Signed Up
    })

    console.log(users)
    
})

app.post("/signin", function(req, res) {
    
    const username = req.body.username;
    const password = req.body.password;

    // maps and filter
    let foundUser = null;

    for (let i = 0; i<users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            foundUser = users[i]
        }
    }

    if (foundUser) {
        const token = jwt.sign({
            username: username,
            password: password,
            firstname,
            lastName,
            courses: []
        }, JWT_SECRET) ;

        // foundUser.token = token;
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    console.log(users)
})

app.get("/me", function(req, res) {
    const token = req.headers.token // jwt
    const decodedInformation = jwt.verify(token, JWT_SECRET);  // {username: "ansh@gmail.com"}
    const unAuthDecodedinfo = jwt.decode(token,);  // {username: "ansh@gmail.com"}
    const username = decodedInformation.username
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {           //loop for checking
        if (users[i].username == username)  {
            foundUser = users[i]
        }
    }

    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    } else {
        res.json({
            message: "token invalid"        //this will be shown when we dont have a token
        })
    }


})


app.listen(3000);// that the http server is listening/Projected on port 3000