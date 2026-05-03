// Mongoose import - MongoDB se interact karne ke liye
const mongoose = require("mongoose");

// Schema/Types helper
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// User schema - basic fields
const userSchema = new Schema({
        email: { type: String, unique: true }, // unique email
        password: String,
        firstName: String,
        lastName: String,
});

// Admin schema - similar to user
const adminSchema = new Schema({
        email: { type: String, unique: true },
        password: String,
        firstName: String,
        lastName: String,
});

// Course schema - course metadata aur creator reference
const courseSchema = new Schema({
        title: String,
        description: String,
        price: Number,
        imageUrl: String,
        creatorId: ObjectId, // admin/creator ka ObjectId
});

// Purchase schema - user aur course relation store karta hai
const purchaseSchema = new Schema({
        userId: ObjectId,
        courseId: ObjectId,
});

// Models
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
        userModel,
        adminModel,
        courseModel,
        purchaseModel
}
