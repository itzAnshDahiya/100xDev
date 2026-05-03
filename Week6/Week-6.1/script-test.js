// Test Program

// Do numbers ko add karne ka function
function sum(a,b){
    // a aur b ko add kar rahe ho
    return a+b;
}
// Function ko call kar rahe ho
let result = sum (30,30);
// Result print kar rahe ho
console.log(result);

// 1 se n tak ka sum nikalna
// 2 ke liye: 1+2 = 3
function sum2(n){
    // Sum variable 0 se start
    let ans = 0;
    // 1 se n tak loop
    for(let i = 1 ; i<=n; i++){
        // Sum mein i add kar rahe ho
        ans = ans + i;
    }
    // Sum return kar rahe ho
    return ans;
}
// Function ko call kar rahe ho n=2
const ans = sum2(2);
// Result print kar rahe ho
console.log(ans);

// Simple calculator
function sum3(a,b){
    // Add kar rahe ho
    return a+b;
}
function multiply(a,b){
    // Multiply kar rahe ho
    return a*b;
}
function divide(a,b){
    // Divide kar rahe ho
    return a/b;
}
function subtract(a,b){
    // Subtract kar rahe ho
    return a-b;
}
// sum3 function ko call kar rahe ho
const ans3 = sum3(3,5);
// Result print kar rahe ho
console.log(ans3);
// Other functions commented hain
// console.log(multiply(3,5));
// console.log(divide(3,5));
// console.log(subtract(3,5));

// Calculator - alternate method using higher-order function
function add(a,b){
    // Add kar rahe ho
    return a+b;
}
function multiply(a,b){
    // Multiply kar rahe ho
    return a*b;
}
function divide(a,b){
    // Divide kar rahe ho
    return a/b;
}
function subtract(a,b){
    // Subtract kar rahe ho
    return a-b;
}

// Higher-order function - operation function ko parameter mein le rahe ho
function doOperation(a,b,op){
    // Operation ko execute kar rahe ho (op function ko call kar rahe ho)
    let val = op(a,b);
    // Result return kar rahe ho
    return val;

}
// doOperation function ko call kar rahe ho divide function ke saath
const ansaagya = doOperation(3,5,divide);
// Result print kar rahe ho
console.log(ansaagyamera);
