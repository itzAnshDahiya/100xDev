// fs module ko import kar rahe ho - yeh files ko read/write karne ke liye use hota hai
const fs = require('fs');

// Yeh commented hai - a.txt ko synchronously (turant, ek saath) read karta - pura file load hone tak program wait karti hai
// const contents = fs.readFileSync('a.txt' , 'utf-8');  // reads file synchrously
// File ka content print karti - lekin upar wali line commented hai isliye yeh execute nahi hoga
console.log(contents);

// b.txt file ko synchronously read kar rahe ho - 'utf-8' format mein (text ke roop mein)
const contents2 = fs.readFileSync('b.txt' , 'utf-8');  // reads fil synchrously
// File ka content console mein dikhate ho
console.log(contents2);


// Yeh comment hai - ab asynchronous tarike se padheinge (jab file load ho, tab callback function call hoga)
//Asynchrously
// fs module ko phir se import kar rahe ho (yeh duplicate hai, pehle se likha tha)
const fs = require('fs'); // Correct way
// // If it's a local module

// Console mein "Data" likha hua print hota hai
console.log("Data");


// Callback function banate ho jo file read hone ke baad call hoga
// err = agar error ho to usmein error message aata hai
// data = file ka content aata hai
function print(err,data){
    // File ka data console mein print karti hai
    console.log (data);
}
// Yeh commented hai - a.txt ko asynchronously read karti aur print function ko callback ke roop mein deti
// fs1.readFile('a.txt' , 'utf-8' , print);  // reads file Asynchrously
// b.txt ko asynchronously read kar rahe ho - file load hone ke baad print function automatically call hoga
fs.readFile("b.txt" , "utf-8" , print);  // reads fil Asynchrously
// Yeh line turant print hota hai - file read hone se pehle bhi! (kyunki asynchronous hai)
console.log("done!");