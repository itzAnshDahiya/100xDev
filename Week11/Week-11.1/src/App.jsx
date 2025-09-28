// /*=======================Lecture Codes==================== */

// // Import useState hook from react module
// import { useState } from "react";

// // Custom Hook - useCounter
// // Create a custom hook called useCounter 
// function useCounter() {
//     // Create a state variable called count and a function to update it called setCount to manage the state of the count variable
//     const [count, setCount] = useState(0);

//     // function to increase the count by 1 
//     function increaseCount() {
//         // Increment the count state variable by 1 
//         setCount(count + 1);
//     }

//     // Return the count and increaseCount function to be used in other components 
//     return { count, increaseCount };
// }

// // Create a function component named App that serves as the main application component
// function App() {

//     // Return the JSX for the component 
//     return (
//         <div>
//             {/* Render the Counter component */}
//             <Counter />

//             {/* Render the Counter component */}
//             <Counter />
//         </div>
//     );
// }

// // Create a function component named Counter that displays a button to increase the count 
// function Counter() {
//     // Destructure the count and increaseCount function from the useCounter custom hook
//     const { count, increaseCount } = useCounter();

//     // Return the JSX for the component
//     return (
//         <div>
//             {/* Display the count value */}
//             <button onClick={increaseCount}>Increase {count}</button>
//         </div>
//     );
// }

// // Export the App component as the default export from this module
// export default App;



// Lecture Codes

// // Import useState hook from React module
// import { useState } from "react";

// // Import the usePrev custom hook from the hooks folder 
// import usePrev from "./hooks/usePrev";

// // Create a function component named App that serves as the main application component
// function App() {
//     // Define a state variable named count and a function named setCount to update the state variable
//     const [count, setCount] = useState(0);

//     // Call the usePrev custom hook to get the previous value of the count state variable
//     const prev = usePrev(count);

//     // Return the JSX for the component
//     return (
//         <div>
//             {/* Display the current value of the count state variable */}
//             <p>{count}</p>

//             {/* Button to increment the count state variable */}
//             <button onClick={() => setCount(count + 1)}>Increment</button>

//             {/* Display the previous value of the count state variable */}
//             <p>Previous Value: {prev}</p>
//         </div>
//     );
// }

// // Export the App component as the default export from this module
// export default App;


// // Lecture codes

// // Import the useDebounce custom hook from the hooks folder
// import { useEffect, useState } from "react";

// // Import the useDebounce custom hook from the hooks folder
// import useDebounce from "./hooks/useDebounce";

// // Create a function component named App that serves as the main application component
// function App() {
//     // Create a state variable named inputValue and a function named setInputValue that updates the state variable when called
//     const [inputValue, setInputValue] = useState("");

//     // call the useDebounce custom hook with the inputValue state variable and a delay of 200 milliseconds
//     const useDebouncedValue = useDebounce(inputValue, 200);

//     // Create a function named change that takes an event object as an argument and updates the inputValue state variable with the value of the input element
//     function change(e) {
//         // Update the inputValue state variable with the value of the input element
//         setInputValue(e.target.value);
//     }

//     // Create a side effect that logs the string "Exensive Oprations" to the console when the useDebouncedValue state variable changes
//     useEffect(() => {
//         // expensive operation
//         // fetch
//         console.log("Exensive Oprations");
//     }, [useDebouncedValue]);

//     // Return the JSX for the component
//     return (
//         <div>
//             {/* Create an input element with a type of text and an onChange event handler that calls the debounceFn function */}
//             <input type="text" onChange={change} />
//         </div>
//     );
// }

// // Export the App component as the default export from this module
// export default App;



// // Create a function component named App that serves as the main application component
// function App() {
//     // Create a function named sendDataToBackend that logs the string "api.amazon.com/search/" to the console when called
//     function sendDataToBackend() {
//         console.log("api.amazon.com/search/");
//     }

//     // Create a function named debounceFn that calls the useDebounce custom hook with the sendDataToBackend function as an argument
//     const debounceFn = useDebounce(sendDataToBackend);

//     // Return the JSX for the component
//     return (
//         <div>
//             {/* Create an h1 element with the text "Debounce Example" */}
//             <h1>Debounce Example</h1>

//             {/* Create an input element with a type of text and an onChange event handler that calls the debounceFn function */}
//             <input type="text" onChange={debounceFn} />
//         </div>
//     );
// }

// Export the App component as the default export from this module
// export default App;






















//// ================= Assignment - 1 =====================
// Import the useIsOnline custom hook from the hooks folder
// import useIsOnline from "./hooks/useIsOnline";

// // App component to display the online status of the user using the useIsOnline custom hook
// function App() {
//   // Call the useIsOnline hook to get the current online status
//   const isOnline = useIsOnline();

//   // Render the online status
//   return (
//     <div>
//       <h1>Custom Hook - useIsOnline</h1> {/* Header for the custom hook demo */}

//       {/* Display online status message based on the value of isOnline */}
//       <h3>You are currently {isOnline ? "Online🟢" : "Offline🔴"}</h3>
//     </div>
//   );
// }

// // Export the App component as default to use it in other files 
// export default App; 



//================== Assignment -2 ========================
// Import the CustomUsePrevious component in the App component
// import CustomUsePrevious from "./CustomUsePrevious";

// // Import the UsePreviousFromuseHooks component in the App component
// import UsePreviousFromuseHooks from "./UsePreviousFromuseHooks";

// // Create a function component named App that serves as the main application component
// function App() {

//     // Return the JSX for the component
//     return (
//         <div>
//             {/* /Render the CustomUsePrevious component */}
//            <CustomUsePrevious />

//             {/* Render the UsePreviousFromuseHooks component */}
//             <UsePreviousFromuseHooks />
//         </div>
//     );
// }

// // Export the App component as the default export from this module
// export default App;