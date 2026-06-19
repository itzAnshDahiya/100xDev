import { useState, useEffect } from "react";

//conditional rendering
function App() {
  let [counterVisible, setCounterVisible] = useState(true); // Corrected the variable name

  useEffect(function() {
    setInterval(function() {
      setCounterVisible(c => !c); // Fixed the state update function name
    }, 5000);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <b>Hi, How Are You</b>
      {counterVisible && <Counter />}
      <b>There</b>
    </div>
  );
}

// mounting, re-rendering, unmounting
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(function () {
    console.log("On Mount");
    let clock = setInterval(function() {
      console.log("From Inside SetInterval");
      setCount(c => c + 1);
    }, 1000);

    // Cleanup interval on unmount
    return function() {
      console.log("On Unmount");
      clearInterval(clock);  
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  function increaseCount() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1 id="text">{count}</h1>
      <button onClick={increaseCount}>Increase Count</button>
    </div>
  );
}

export default App;




// Harkirat code


// import { useState , useEffect } from "react";

// function App() {
// return <div>
// <b>
//   Hi There
//   </b>
//   <Counter>

//   </Counter>
// </div>
// }

// function Counter(){
//   const [count , setCount] = useState(0);
// // hooking into the lifecycle events of react
//   console.log("Counter");


//   // function increaseCount(){
//   //  setCount ( count + 1 );
//   // }

//   // function decreaseCount(){
//   //   setCount ( count -1 ); 
//   // }

//   // function resetCount(){
//   //   setCount (0);
//   // }
//     // set Interval
//   useEffect(function(){
//     setInterval(function(){
//    // setCount( count => count + 1 );
//    //   OR
//    setCount(function(count){
//     return count + 1;
//    })
//     } , 1000 ) 
//     console.log("Mounted");  // it will only come Once
//  }, [] );

//   function increaseCount(){
//     setCount( count + 1 );
//   }

//   return <div>
//     <h1 id="text">{count}</h1>
//     <button onClick={increaseCount}>Increase Count</button>
    
//    {/* <button onClick={decreaseCount}>Decrease Count</button> */}
//    {/* <button onClick={resetCount}>Reset Count</button> */}


//   </div>
// }

// export default App