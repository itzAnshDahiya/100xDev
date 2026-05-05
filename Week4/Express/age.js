const express = require("express");

function isOldEnough(age) {
  return age >= 18;
}

function createRideApp() {
  const app = express();

  app.get("/ride1", function (req, res) {
    const age = Number(req.query.age);

    if (!Number.isFinite(age)) {
      return res.status(400).json({
        msg: "Age query parameter must be a number",
      });
    }

    if (isOldEnough(age)) {
      return res.json({
        msg: "You have successfully ridden Ride1",
      });
    }

    return res.status(411).json({
      msg: "Sorry you are not at required age yet",
    });
  });

  return app;
}

if (require.main === module) {
  const app = createRideApp();
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

module.exports = {
  createRideApp,
  isOldEnough,
};
