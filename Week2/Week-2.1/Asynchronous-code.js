const fs = require("fs");
function print(err,data){
    if(err){
        console.log("File not found")
    }else{
        console.log(data);
    }
}
fs.readFile("aas.txt" , "utf-8" , print);
console.log("Done!");
console.log(chalk.blue('I Am Always One Step Ahead Of You'));
console.log(chalk.blue('I Am Gona Rule This World'));
console.log(chalk.blue('I Am Gona Become A Billionaire For Sure'));


//Other example = timeout se 15 sec tk vo timeout chalta rahega background mai
function timeout(){
    console.log("click the button");
}
console.log("Hi");
setTimeout(timeout , 15000);
console.log("You are welcomed here");



//Clock With a expensive time consuming function

function timeout1(){
    console.log("Click The button");
}
console.log("Hi");
setTimeout(timeout1 , 1000);
console.log("Welcome to loupe!");

let c = 0;
for(let i = 0 ; i<100000000; i++){
    c= c+1;
}
console.log("Expensive Operation Done");