// Task:
// 1. 1 second baad 'Hi' print karna
// 2. phir 3 second baad 'hello' print karna
// 3. phir 5 second baad 'hello there' print karna

// Yeh code bohot zyada nested hai - callback hell ke roop mein likha hai (bahut bekar pattern)

// Ek simple callback function
function callback(){
    // Hi print karti hai
    console.log("Hi");
}

// Pehla setTimeout - 1 second baad execute hoga
setTimeout(function(){
    // Hi print hota hai
    console.log("hi");
    // Doosra setTimeout nested - 3 second baad execute hoga
    setTimeout(function(){
        // Hello print hota hai
        console.log("Hello");
        // Teesra setTimeout nested - 5 second baad execute hoga
        setTimeout(function() {
        // Hi There print hota hai
        console.log("Hi There");
        // 5 second ka timeout
        }, 5000 );
    // 3 second ka timeout
    } , 3000 );
// 1 second ka timeout
} , 1000 );

// Yeh line turant print hota hai - setTimeout se pehle (asynchronous)
console.log("Outside the callback Hell");