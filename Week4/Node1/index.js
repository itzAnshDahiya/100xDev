// const fs = require("fs"); // File system module (commented)
// const { Command } = require("commander"); // Commander library (commented)
// const program = new Command(); // Program create karte ho (commented)

// program // Program ko configure kar rahe ho (commented)
//   .name("counter") // Name
//   .description("CLI to do file based tasks") // Description
//   .version("0.8.0"); // Version

// program // Command add kar rahe ho (commented)
//   .command("count") // Count command
//   .description("Count the number of lines in a file") // Description
//   .argument("<file>", "file to count") // File argument
//   .action((file) => { // File ko count karne ke liye
//     fs.readFile(file, "utf8", (err, data) => { // File read kar rahe ho
//       if (err) { // Agar error hai
//         console.log(err); // Error print kar rahe ho
//       } else { // Agar no error
//         const lines = data.split("\n").length; // Lines count kar rahe ho
//         console.log(`There are ${lines} lines in ${file}`); // Count print kar rahe ho
//       }
//     });
//   });

// program.parse(); // Program ko parse kar rahe ho (commented)


// Express module ko import kar rahe ho
const express=require('express')
// Express app banate ho
const app =express();
// GET request handler - root path ke liye
app.get('/',function(req,res){
  // JSON response bhej rahe ho
  res.json({
    // Message
    msg:'done the job'
  })
})
// Port 3001 pe server listen kar rahe ho
app.listen(3001);