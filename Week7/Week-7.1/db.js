const mongoose = require("mongoose");  // Mongoose ko import kar rahe hain, jo MongoDB ke saath interact karta hai
const Schema = mongoose.Schema;  // Mongoose ke Schema object ko extract kar rahe hain
const ObjectId = mongoose.ObjectId;  // MongoDB ka ObjectId use kar rahe hain, jo references ko handle karta hai

// User Schema define kar rahe hain
const User = new Schema({
    email: String,   // User ka email
    password: String,  // User ka password
    name: String  // User ka name
});

// Todo Schema define kar rahe hain
const Todo = new Schema({
    title: String,  // Todo ka title
    done: Boolean,  // Kya todo complete ho gaya ya nahi (true/false)
    userId: ObjectId  // User ka reference (jo todo create karega)
});

// Mongoose model banane ke liye, jo MongoDB collection se interact karega
const UserModel = mongoose.model('users', User);  // "users" collection ke liye model
const TodoModel = mongoose.model('todos', Todo);  // "todos" collection ke liye model

// Models ko export kar rahe hain taaki baaki code mein use kiya ja sake
module.exports = {
    UserModel,  // UserModel ko export kar rahe hain
    TodoModel  // TodoModel ko export kar rahe hain
};
