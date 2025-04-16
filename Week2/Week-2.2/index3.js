/*     Making a Promise class

const fs = require("fs");

console.log("----Top of the file----");
function readTheFile(resolve){
    console.log("readTheFile called");
    setTimeout(function (){
    console.log("CallBack based setTimeout completed");
    resolve ();
    } , 3000);
}

function setTimeoutPromisified(fileName){
    console.log("setTimeoutPromisified Called");

    //read the file and return its value
    return new Promise(readTheFile);
}

const p = setTimeoutPromisified();

function callback(){
    console.log("Timer is Done");
}
p.then(callback);
console.log("----End of the File----");


*/


//One More Promise Class 
class promise2{
    constructor(fn){
        this.fn = fn;
        this.fn(() => {
            this.resolve();
        }) 
    }
    then(callBack){
        this.resolve = callBack;
    }
}
function readTheFile(resolve){
    console.log("readTheFile called");
    setTimeout(function (){
    console.log("CallBack based setTimeout completed");
    resolve ();
    } , 3000);
}
function setTimeoutPromisified(){
    return new promise2(readTheFile)
}

let d = setTimeoutPromisified();
function callBack(){
console.log("CallBack has been called");
}
d.then(callBack);


