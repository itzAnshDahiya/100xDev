const date = new Date();
// console.log(date.getDate());
// console.log(date.getFullYear());
// console.log(date.getMonth( ));

// // const d = Date();        -> created a new object of the Data class
// // console.log(d.getFullYea());       -> I called a function on the object


// //creating object
//  let user = {                
//          name:"ansh",
//          age: 20,
//  }
//  console.log(user.age)   //this is how i would excess an property of an object
// user.name="Ansh"; // this is how i would update the property of an object


// // MAP class to create Key value pair

// const map = new Map();
// map.set('name', 'Ansh');
// map.set('age', 20);
// console.log(map.get('name'));

// //Other Method
// const firstName = map.get('name');
// console.log(firstName);


// //-----PROMISES-----//
// //Promise in JavaScript is an object that represents the eventual competion
// // (or failure) of an asynchronous operation and its resulting value.

// //previously we have done setTimeout(fn,3000)
// function logName(){
//     console.log("ANSH")
// }
// setTimeout(logName,3000);


// /* callBack version  ->callback based approch
// //setTimeout(callback , 3000); */

// /* Promisified Version -> setTimeoutPromisified(3000).then(callback). */


// // Using a function that returns a Promise
// function setTimeoutPromisified(ms){      // it is returning the object of the Promise class
//     let p = new Promise(resolve => setTimeout(resolve, ms));   // making an Object of the promise class
//     return p;

// }
// function callBack(){
//     console.log("3 Seconds Have Passed");
// }
// setTimeoutPromisified(3000).then(callBack);