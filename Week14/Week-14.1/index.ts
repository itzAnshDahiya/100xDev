// let x: number = 1;     ====== type inferencing
// console.log(x);


// Add 2 numbers
// function sum (a: number , b: number){
//     return a + b;
// }

// let ans = sum (1,2);
// console.log(ans);


// Return true or false based on if user is 18+ or not
// function isLegal(age: number){
//     if(age > 18){
//         return true;
//     }else{
//         false;
//     }
// }
// console.log(isLegal(5));


//function take another function and return after 1 minute
// function delayandCall(fn: () => void) {
//     setTimeout(fn,1000);
// }

// delayandCall(() => {
// console.log("Hi There");
// })

// How a function is written with the same output datatype

// function sum(a: number, b: number): number {
// return a+b
// }
// sum(3,5);

//greet function using a string and returning with another string

// function greet(name: string): string {
//     return "Hello" + name
// }
// greet("Siddharth");
// const greeting = greet("Siddharth");
// console.log(greeting);

// odd and even number
// function isEven(num: number): boolean {
//     if(num%2 == 0) {
//         return true
//     }else{
//         return false
//     }
// } 