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



//Kidneys

const express = require("express");
const app = express();
app.use(express.json());

const users = [
  {
    name: "john",
    kidneys: [
      { healthy: false }
    ],
  }
];

// GET all kidneys info
app.get("/", function (req, res) {
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
      numberOfHealthyKidneys += 1;
    }
  }
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  res.json({
    johnKidneys,
    numberOfHealthyKidneys,
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