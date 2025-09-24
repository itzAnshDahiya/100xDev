import { useState } from 'react'; // React ka useState hook import kar rahe hain, jo state manage karne ke liye hota hai
import './App.css'; // App ke CSS ko import kar rahe hain

// App component jo ek parent component hai
function App() {
  return<div> 
      {/* LightBulb component ko render kar rahe hain */}
      <LightBulb />
    </div>
}

// LightBulb component jo main functionality ko handle karega
function LightBulb() {
  const [bulbOn, setBulbOn] = useState(true); // yeh hook bulb ke state ko manage karta hai. true se start ho raha hai (bulb on hai initially)
  
  // bulbOn ko prop ke through BulbState component ko bhej rahe hain
  // setBulbOn ko prop ke through ToggleBulbState component ko bhej rahe hain
  return <div>
      {/* BulbState ko bulbOn prop pass kar rahe hain */}
      <BulbState bulbOn={bulbOn} />
      
      {/* ToggleBulbState ko bulbOn aur setBulbOn props pass kar rahe hain */}
      <ToggleBulbState bulbOn={bulbOn} setBulbOn={setBulbOn} />
    </div>
}

// BulbState component jo current bulb ke state ko dikhata hai
function BulbState({ bulbOn }) {
  return <div>{bulbOn ? "Bulb On" : "Bulb Off"}</div>; // agar bulbOn true hai to "Bulb On" dikhayega, agar false hai to "Bulb Off" dikhayega
}

// ToggleBulbState component jo button ke click pe bulb ka state change karega
function ToggleBulbState({ bulbOn, setBulbOn }) {
  // yeh function bulb ka state toggle karega
  function toggle() {
    setBulbOn(!bulbOn); // agar bulbOn true hai to setBulbOn false kar dega, aur agar false hai to true
  }

  return<div>
      {/* Toggle button jo toggle() function ko call karega jab click kiya jayega */}
      <button onClick={toggle}>Toggle The Bulb</button>
    </div>
}

export default App; // App component ko export kar rahe hain taaki baaki app mein use kr sake

// ---------Alternate Method ka Code (Single Component) jo Parent-Child ko demonstrate nahi karta hai---------
// is method mein direct bulb ka state same component mein handle hota hai, lekin yeh component separation nahi dikhata
// yeh sirf ek single component mein sab kuch handle kar raha hai
// import { useState } from 'react';
// import './App.css';

// function App() {
//   return (
//     <div>
//       <LightBulb />
//     </div>
//   );
// }

// function LightBulb() {
//   const [bulbon, setBulbon] = useState(true);

//   const toggleBulb = () => {
//     setBulbon(!bulbon); // bulb ka state toggle karega
//   };

//   return (
//     <div>
//       <div>{bulbon ? 'Bulb on' : 'Bulb off'}</div>
//       <button onClick={toggleBulb}>Toggle</button> {/* button jo toggleBulb function ko call karega */}
//     </div>
//   );
// }

// export default App;


// .................More Refined Way - More Optimized way.....................//
// import { useState } from 'react'; // React ka useState hook import kar rahe hain (state manage karne ke liye)
// import './App.css'; // App ke CSS file ko import kar rahe hain

// // App component - yeh parent component hai
// function App() {
//   return (
//     <div>
//       {/* LightBulb component ko render kar rahe hain */}
//       <LightBulb />
//     </div>
//   );
// }

// // LightBulb component - yeh main logic handle karta hai (state aur UI control)
// function LightBulb() {
//   const [bulbOn, setBulbOn] = useState(true); // useState hook se bulb ka initial state "on" set kiya gaya hai

//   return (
//     <div>
//       {/* BulbState component ko bulbOn prop pass kar rahe hain taaki wo state dikhaye */}
//       <BulbState bulbOn={bulbOn} />

//       {/* ToggleBulbState component ko state aur setState function dono pass kar rahe hain */}
//       <ToggleBulbState bulbOn={bulbOn} setBulbOn={setBulbOn} />
//     </div>
//   );
// }

// // BulbState component - yeh component current bulb ka status show karta hai
// function BulbState({ bulbOn }) {
//   return (
//     <div>
//       {/* Conditional rendering - agar bulbOn true hai to "Bulb On", warna "Bulb Off" dikhayega */}
//       {bulbOn ? "Bulb On" : "Bulb Off"}
//     </div>
//   );
// }

// // ToggleBulbState component - yeh button provide karta hai jo bulb ka state toggle karta hai
// function ToggleBulbState({ bulbOn, setBulbOn }) {
//   // toggle function - bulb ka state on/off switch karega
//   function toggle() {
//     setBulbOn(!bulbOn); // bulbOn ko ulta kar rahe hain: true to false, false to true
//   }

//   return (
//     <div>
//       {/* Button - jab click hoga to toggle() function call karega */}
//       <button onClick={toggle}>Toggle The Bulb</button>
//     </div>
//   );
// }

// export default App; // App component ko export kar rahe hain taaki use kiya ja sake





//=======================NOTES============================
//=====================COUNTER/CLOCK======================


// import React, { useEffect, useState } from 'react';

// function Parent() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <Incrase count={count} setCount={setCount} />
//       <Decrease count={count} setCount={setCount} />
//       <Value count={count} setCount={setCount} />
//     </>
//   );
// }

// function Decrease({ count, setCount }) {
//   return <button onClick={() => setCount(count - 1)}>Decrease</button>;
// }

// function Incrase({ count, setCount }) {
//   return <button onClick={() => setCount(count + 1)}>Increase</button>;
// }

// function Value({ count }) {
//   return <p>Count: {count}</p>;
// }

// // App Component
// const App = () => {
//   return <div>
//     <Parent />
//   </div>
// };

// export default App;




//==================LIGHT BULB HARKIRAT CODE==================
// import { useState } from 'react'
// import './App.css'

// function App() {
//   return <div>
//     <LightBulb />
//   </div>
// }

// function LightBulb() {
//   const [bulbOn, setBulbOn] = useState(true)

//   return <div>
//     <BulbState bulbOn={bulbOn} />
//     <ToggleBulbState bulbOn={bulbOn} setBulbOn={setBulbOn} />
//   </div>
// }

// function BulbState({bulbOn}) {
//   return <div>
//     {bulbOn ? "Bulb on" : "Bulb off"}
//   </div>
// }

// function ToggleBulbState({bulbOn, setBulbOn}) {

//   function toggle() {
//     // setBulbOn(currentState => !currentState)
//     setBulbOn(!bulbOn)
    
//   }

//   return <div>
//     <button onClick={toggle}>Toggle the bulb</button>
//   </div>
// }

// export default App
