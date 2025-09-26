// Mongoose library ko import karte hain, jo MongoDB ke saath interact karne ke liye use hota hai.
const mongoose = require("mongoose");  

// Schema aur ObjectId ko use karne ke liye import kiya gaya hai.
const Schema = mongoose.Schema;  
const ObjectId = mongoose.Types.ObjectId;  

// User ka schema define karte hain.
// Isme user ke email, password, firstName aur lastName fields hain.
const userSchema = new Schema({
        email: {type: String , unique: true},  // Email unique hona chahiye
        password: String,                     // Password type string
        firstName: String,                    // First name type string
        lastName: String,                     // Last name type string
});

// Admin ka schema bhi user schema ke similar hi hai.
const adminSchema = new Schema({
        email: {type: String , unique: true},  // Email unique hona chahiye
        password: String,                     // Password type string
        firstName: String,                    // First name type string
        lastName: String,                     // Last name type string
});

// Course ka schema define kar rahe hain.
// Isme course ka title, description, price, imageUrl aur creatorId (jo ki ObjectId type hai) hote hain.
const courseSchema = new Schema({
        title: String,                        // Course ka title type string
        description: String,                  // Course ki description type string
        price: Number,                        // Course ka price type number
        imageUrl: String,                     // Image URL type string
        creatorId: ObjectId,                  // Creator ka ID (ObjectId type), jo creator ko link karega
});

// Purchase ka schema define karte hain.
// Ye schema user aur course ke beech relation ko represent karega.
// userId aur courseId dono ObjectId type hain.
const purchaseSchema = new Schema({
    userId: ObjectId,  // User ka ID, jo course ko purchase karega
    courseId: ObjectId, // Course ka ID, jo purchase kiya gaya hai
});

// Models create kar rahe hain jo MongoDB collections ko represent karte hain.
// User, admin, course aur purchase models banaye gaye hain.
const userModel = mongoose.model("user", userSchema);     // "user" collection ke liye model
const adminModel = mongoose.model("admin", adminSchema);  // "admin" collection ke liye model
const courseModel = mongoose.model("course", courseSchema); // "course" collection ke liye model
const purchaseModel = mongoose.model("purchase", purchaseSchema); // "purchase" collection ke liye model

// Ab sabhi models ko export kar rahe hain, taaki doosri files mein use kiya ja sake.
module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
