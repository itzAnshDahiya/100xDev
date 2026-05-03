// Express module ko import kar rahe ho
const express = require("express");

// Express app banate ho
const app = express();

// Function - age check kar rahe ho
function isOldEnough(age) {
  // Agar age 18 ya usse zyada hai
  if (age >= 18) {
    // True return kar rahe ho (adult hai)
    return true;
  } else {
    // False return kar rahe ho (minor hai)
    return false;
  }
}
// Chalky ko use kar rahe ho - color text print karne ke liye (blue)
console.log(chalk.blue('I Am Always One Step Ahead'));
// Green color mein
console.log(chalk.Green('I Am Gona Rule This World'));
// Red color mein
console.log(chalk.Red('I Am Gona Become A Billionaire'));
// GET endpoint - ride ke liye age check kar rahe ho
app.get("/ride1", function (req, res) {
  // Age query parameter check kar rahe ho
  if (isOldEnough(req.query.age)) {
    // Agar age sufficient hai
    res.json({
      // Success message
      msg: "You have successfully riden the Ride1",
    });
  } else {
    // Agar age sufficient nahi hai
    res.status(411).json({
      // Error message
      msg: "Sorry you are not at required age yet",
    });
  }
});

// Server port 3000 pe listen kar rahe ho
app.listen(3000);
