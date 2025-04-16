const express = require("express");

const app = express();

function isOldEnough(age) {
  if (age >= 14) {
    return true;
  } else {
    return false;
  }
}
console.log(chalk.blue('I Am Always One Step Ahead'));
console.log(chalk.blue('I Am Gona Rule This World'));
console.log(chalk.blue('I Am Gona Become A Billionaire'));
app.get("/ride1", function (req, res) {
  if (isOldEnough(req.query.age)) {
    res.json({
      msg: "You have successfully riden the Ride1",
    });
  } else {
    res.status(411).json({
      msg: "Sorry you are not at age yet",
    });
  }
});

app.listen(3000);
