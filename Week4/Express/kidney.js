// const express = require("express");
// const app = express();

// const uaers = [{
//     name:John,
//     kidneys: [{
//         healthy : false
//     }]
// }];

// app.get("/" , function(rerq,res){
//     const johnKidneys = users[0].kidneys;
// })

// app.listen(3000);



// Kidneys tracking system

// Express module ko import kar rahe ho
const express = require("express");
// Express app banate ho
const app = express();
// JSON middleware
app.use(express.json());

// Users array - john ke kidneys ki info
const users = [
  {
    // User ka name
    name: "john",
    // Kidneys array - har kidney ka health status
    kidneys: [
      // Pehli kidney (unhealthy)
      { healthy: false }
    ],
  }
];

// GET endpoint - kidney info dekho
app.get("/", function (req, res) {
  // John ke kidneys nikaal rahe ho
  const johnKidneys = users[0].kidneys;
  // Total kidneys ka count
  const numberOfKidneys = johnKidneys.length;
  // Healthy kidneys ka count - initially 0
  let numberOfHealthyKidneys = 0;
  // Loop - har kidney pe check kar rahe ho
  for (let i = 0; i < johnKidneys.length; i++) {
    // Agar kidney healthy hai
    if (johnKidneys[i].healthy) {
      // Healthy count ko increment kar rahe ho
      numberOfHealthyKidneys += 1;
    }
  }
  // Unhealthy kidneys = total - healthy
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  // Response mein sabhi info bhej rahe ho
  res.json({
    // Sab kidneys
    johnKidneys,
    // Healthy kidneys count
    numberOfHealthyKidneys,
    // Unhealthy kidneys count
    numberOfUnhealthyKidneys,
  });
});

// POST: add a new kidney
app.post("/", function (req, res) {
  const isHealthy = req.body.healthy;
  users[0].kidneys.push({ healthy: isHealthy });
  res.json({ msg: "Kidney added." });
});

// DELETE: remove all unhealthy kidneys
app.delete("/", function(req, res){
  users[0].kidneys = users[0].kidneys.filter(kidney => kidney.healthy);
  res.json({ msg: "done" });
});
// ..

// PUT: update a kidney's healthy status (by index)
app.put("/:kidneyIndex", function (req, res) {
  const kidneyIndex = parseInt(req.params.kidneyIndex);
  if (
    kidneyIndex >= 0 &&
    kidneyIndex < users[0].kidneys.length &&
    typeof req.body.healthy === "boolean"
  ) {
    users[0].kidneys[kidneyIndex].healthy = req.body.healthy;
    res.json({ msg: "Kidney updated." });
  } else {
    res.status(400).json({ msg: "Invalid index or healthy value." });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});


// Here Is Same Code But With Different Functionality
  // const express = require("express");
  // const app = express();
  // app.use(express.json());

  // const users = [
  //   {
  //     name: "john",
  //     kidneys: [{ healthy: false }],
  //   },
  // ];

  // // GET all kidneys info
  // app.get("/", (req, res) => {
  //   const kidneys = users[0].kidneys;
  //   const healthy = kidneys.filter(k => k.healthy).length;
  //   const unhealthy = kidneys.length - healthy;
  //   res.json({
  //     kidneys,
  //     healthyKidneys: healthy,
  //     unhealthyKidneys: unhealthy,
  //   });
  // });

  // // POST: add a new kidney
  // app.post("/", (req, res) => {
  //   const { healthy } = req.body;
  //   if (typeof healthy !== "boolean") {
  //     return res.status(400).json({ msg: "healthy must be boolean" });
  //   }
  //   users[0].kidneys.push({ healthy });
  //   res.json({ msg: "Kidney added." });
  // });

  // // DELETE: remove all unhealthy kidneys
  // app.delete("/", (req, res) => {
  //   const before = users[0].kidneys.length;
  //   users[0].kidneys = users[0].kidneys.filter(k => k.healthy);
  //   const after = users[0].kidneys.length;
  //   res.json({ msg: `Removed ${before - after} unhealthy kidneys.` });
  // });

  // // PUT: update a kidney's healthy status (by index)
  // app.put("/:kidneyIndex", (req, res) => {
  //   const idx = parseInt(req.params.kidneyIndex);
  //   const { healthy } = req.body;
  //   if (
  //     isNaN(idx) ||
  //     idx < 0 ||
  //     idx >= users[0].kidneys.length ||
  //     typeof healthy !== "boolean"
  //   ) {
  //     return res.status(400).json({ msg: "Invalid index or healthy value." });
  //   }
  //   users[0].kidneys[idx].healthy = healthy;
  //   res.json({ msg: "Kidney updated." });
  // });

  // app.listen(3001, () => {
  //   console.log("Server running on port 3001");
  // });