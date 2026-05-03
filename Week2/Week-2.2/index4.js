// Synchronous Promise - function turant complete hoga
// Promise banate ho - function leta hai
function promisefn(resolve){
    // Counter variable
    let c = 0;
    // Loop - 10 million times chalega (heavy computation)
    for(let i = 0 ; i < 10000000; i++){
        // Counter ko increment kar rahe ho
        c++;
    }
    // Loop complete hone ke baad resolve call hota hai - string pass kar rahe ho
    resolve("Hlo Ansh");
}

// Promise create kar rahe ho
const p = new Promise(promisefn);

// Callback function - promise complete hone ke baad call hoga
function callback(){
    // Message print hota hai
    console.log("Hi There!");
}
// Callback attach kar rahe ho - .then se
p.then(callback)


// Promise with Asynchronous timing

// Function - milliseconds le rahe ho
function setTimeoutPromisified(ms){
    // Promise return karte ho - setTimeout ke saath
    return new Promise(reolve => setTimeout(reolve,ms));
}

// Async function - jismein await use kar sakte ho
async function solve() {
    // 100ms wait karo - phir age badho
    await setTimeoutPromisified(100);
    // HI print karo
    console.log("HI");
    // 200ms wait karo
    await setTimeoutPromisified(200);
    // HOW print karo
    console.log("HOW");
    // 300ms wait karo
    await setTimeoutPromisified(300);
    // ARE print karo
    console.log("ARE");
    // 400ms wait karo
    await setTimeoutPromisified(400);
    // YOU print karo
    console.log("YOU");
    // 500ms wait karo
    await setTimeoutPromisified(500);
    // DOING print karo
    console.log("DOING");
}
// solve function ko call kar rahe ho
solve();