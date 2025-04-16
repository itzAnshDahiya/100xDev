const fs = require('fs');

// const contents = fs.readFileSync('a.txt' , 'utf-8');  // reads file synchrously
console.log(contents);

const contents2 = fs.readFileSync('b.txt' , 'utf-8');  // reads fil synchrously
console.log(contents2);


//Asynchrously
const fs = require('fs'); // Correct way
// // If it's a local module

console.log("Data");


function print(err,data){
    console.log (data);
}
// fs1.readFile('a.txt' , 'utf-8' , print);  // reads file Asynchrously
fs.readFile("b.txt" , "utf-8" , print);  // reads fil Asynchrously
console.log("done!!");