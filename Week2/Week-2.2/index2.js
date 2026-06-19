// Naya Date object banate ho - aaj ki date aur time milti hai
const date = new Date();
// Date nikaal rahe ho (din) - 1 to 31
console.log(date.getDate());
// Pure saal nikaal rahe ho - 2025, 2026 etc
console.log(date.getFullYear());
// Mahina nikaal rahe ho - 0 to 11 (0=January, 11=December)
console.log(date.getMonth( ));

// const d = Date(); -> Yeh Date class ka naya object banata hai
// console.log(d.getFullYea()); -> Object ke upar getFullYear function call karta (typo hai getFullYea)


// Object banana - jismein user ki details hain
 let user = {                
         // Name property
         name:"ansh",
         // Age property
         age: 20,
 }
 // Object ke property ko access kar rahe ho (age = 20)
 console.log(user.age)   //this is how i would excess an property of an object
 // Object ke name property ko update kar rahe ho
user.name="Ansh"; // this is how i would update the property of an object


// MAP class use karti hai - Key value pair store karti hai

// Naya map banate ho
const map = new Map();
// Map mein 'name' key ke liye 'Ansh' value daalni
map.set('name', 'Ansh');
// Map mein 'age' key ke liye 20 value daalni
map.set('age', 20);
// Map se 'name' key ki value nikaal rahe ho - output: 'Ansh'
console.log(map.get('name'));

// Doosra tarika - pehle value nikaal kar fir print karti
const firstName = map.get('name');
// firstName print hota hai - 'Ansh'
console.log(firstName);


//-----PROMISES-----//
// Promise ek JavaScript object hai - jo kisi future action ke result ko represent karti hai
// Ya to success hoga ya failure

// Pehle setTimeout use karte the (callback-based)
function logName(){
    // ANSH print karti hai
    console.log("ANSH")
}
// 3 second baad logName function call hoga
setTimeout(logName,3000);


/* callBack version -> Callback based approach
// setTimeout(callback , 3000); */

/* Promisified Version -> setTimeoutPromisified(3000).then(callback). */


// Promise return karne wala function - ms = milliseconds
function setTimeoutPromisified(ms){      // Promise class ka object return kar rahe ho
    // Naya Promise banate ho - resolve hone ke baad then call hoga
    return new Promise(resolve => setTimeout(resolve, ms));   // Promise class ka object
}
// Callback function jo 3 seconds ke baad call hoga
function callBack(){
    console.log("3 Seconds Have Passed");
}
// Promise ke .then method se callback attach kar rahe ho
setTimeoutPromisified(3000).then(callBack);

// Practice
// 5 second baad resolve call hoga
function waitFor5S(resolve){
    // 5 second baad resolve call hoga
    setTimeout(resolve , 5000)
}
// Main function
function main(){
    console.log("main is called")
}
// waitFor5S ko main ke saath call kar rahe ho
waitFor5S(main);