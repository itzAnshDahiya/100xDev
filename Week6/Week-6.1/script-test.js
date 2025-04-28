//It is a Test Program


// Add two number using Function
function sum(a,b){
    return a+b;
}
let result = sum (30,30);
console.log(result);

//find sum from 1 to a number
// for 2 :- 1+2 = 3
function sum2(n){
    let ans = 0;
    for(let i = 1 ; i<=n; i++){
        ans = ans + i;
    }
    return ans;
}
const ans = sum2(2);
console.log(ans);


//calculator 
function sum3(a,b){
    return a+b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function subtract(a,b){
    return a-b;
}
const ans3 = sum3(3,5);
console.log(ans3);
// console.log(multiply(3,5));
// console.log(divide(3,5));
// console.log(subtract(3,5));


//other method Calculator
function add(a,b){
    return a+b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function subtract(a,b){
    return a-b;
}

function doOperation(a,b,op){
    let val = op(a,b);
    return val;

}
const ansaagya = doOperation(3,5,divide);
console.log(ansaagyamera);
