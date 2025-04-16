// One More Promise Class With Synchronous
function promisefn(resolve){
    let c = 0;
    for(let i = 0 ; i < 10000000; i++){
        c++;
    }
    resolve("Hlo Ansh");
}

const p = new Promise(promisefn);

function callback(){
    console.log("Hi There!");
}
p.then(callback)


// Promise with Asynchronous

function setTimeoutPromisified(ms){
    return new Promise(reolve => setTimeout(reolve,ms));
}

async function solve() {
    await setTimeoutPromisified(100);
    console.log("HI");
    await setTimeoutPromisified(200);
    console.log("HOW");
    await setTimeoutPromisified(300);
    console.log("ARE");
    await setTimeoutPromisified(400);
    console.log("YOU");
    await setTimeoutPromisified(500);
    console.log("DOING");
}
solve();