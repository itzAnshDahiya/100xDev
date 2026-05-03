/*     Promise class banate hain - yeh custom Promise implement karta hai

// fs module ko require kar rahe ho (file system)
const fs = require("fs");

// Top of file
console.log("----Top of the file----");
// Readfile function - callback le rahe ho
function readTheFile(resolve){
    // readTheFile call ho gaya
    console.log("readTheFile called");
    // 3 second baad yeh function execute hoga
    setTimeout(function (){
    // setTimeout complete ho gaya
    console.log("CallBack based setTimeout completed");
    // resolve call kar rahe ho - Promise complete
    resolve ();
    // 3 second wait
    } , 3000);
}

// Promise version - readTheFile ke Promise return kar rahe ho
function setTimeoutPromisified(fileName){
    // setTimeoutPromisified called
    console.log("setTimeoutPromisified Called");

    // File read karti aur uska value return karti
    return new Promise(readTheFile);
}

// Promise object banati hai
const p = setTimeoutPromisified();

// Callback function jo promise complete hone ke baad call hoga
function callback(){
    // Timer complete
    console.log("Timer is Done");
}
// Promise ke .then se callback attach karte ho
p.then(callback);
// End of file
console.log("----End of the File----");

*/


// Ek aur custom Promise class - promise2 naam se
class promise2{
    // Constructor - function leta hai
    constructor(fn){
        // Function ko store karti hai
        this.fn = fn;
        // Function ko resolve ke saath call karti hai
        this.fn(() => {
            // resolve function ko call karti hai
            this.resolve();
        }) 
    }
    // then method - callback le rahe ho
    then(callBack){
        // Callback ko resolve ke roop mein store karti hai
        this.resolve = callBack;
    }
}
// ReadTheFile function - resolve callback leta hai
function readTheFile(resolve){
    // readTheFile called
    console.log("readTheFile called");
    // 3 second baad
    setTimeout(function (){
    // Callback complete
    console.log("CallBack based setTimeout completed");
    // resolve call kar rahe ho
    resolve ();
    // 3 second delay
    } , 3000);
}
// Promise ke version - custom promise2 return kar rahe ho
function setTimeoutPromisified(){
    // Custom promise2 return karti hai
    return new promise2(readTheFile)
}

// Promise object banate ho
let d = setTimeoutPromisified();
// Callback function jo execute hoga
function callBack(){
// Callback call ho gaya
console.log("CallBack has been called");
}
// Callback attach kar rahe ho
d.then(callBack);


