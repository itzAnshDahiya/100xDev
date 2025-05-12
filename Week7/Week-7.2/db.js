// Mongoose ko import kar rahe hain MongoDB se connect karne ke liye
const mongoose = require("mongoose");

// Mongoose se Schema ko extract kar rahe hain
const Schema = mongoose.Schema;
// ObjectId ko Schema se extract kar rahe hain, jo references ko handle karta hai
const ObjectId = Schema.ObjectId;

// User schema define kar rahe hain
const User = new Schema({
    name: String,  // User ka naam
    email: { 
        type: String, 
        unique: true  // Email unique hona chahiye, taaki duplicate na ho
    },
    password: String  // User ka password (production mein password ko hash karna zaroori hai)
});

// Todo schema define kar rahe hain
const Todo = new Schema({
    userId: ObjectId, // User ka reference (jo Todo create karega)
    title: String,     // Todo ka title
    done: Boolean      // Task complete hua ya nahi (true ya false)
});

// UserModel banate hain, jo "users" collection se interact karega
const UserModel = mongoose.model('users', User);

// TodoModel banate hain, jo "todos" collection se interact karega
const TodoModel = mongoose.model('todos', Todo);

// Models ko export kar rahe hain taaki baaki application mein use kar sakein
module.exports = {
    UserModel,
    TodoModel
};
