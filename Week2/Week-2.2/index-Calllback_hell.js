//1. log 'Hi' after 1 second
//2. log 'hello' 3 second after step 1
//3. log 'hello there' 5 second after step 2

//The function/Code looks very bad.

function callback(){
    console.log("Hi");
}

setTimeout(function(){
    console.log("hi");
    setTimeout(function(){
        console.log("Hello");
        setTimeout(function() {
        console.log("Hi There");
        }, 5000 );
    } , 3000 );
} , 1000 );

console.log("Outside the callback Hell");