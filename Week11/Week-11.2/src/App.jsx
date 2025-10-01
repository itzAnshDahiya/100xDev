// // Import RecoilRoot, useRecoilValue, and useSetRecoilState from the recoil package 
// import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

// // Import the counterAtom atom from the store/atoms/counter file
// import { counterAtom } from "./store/atoms/counter";

// // Create a App component that renders in the root element 
// function App() {
//     // Return the Counter component wrapped in a RecoilRoot component to provide the Recoil state to the Counter component
//     return (
//         // Wrap the Counter component in a RecoilRoot component to provide the Recoil state to the Counter component
//         <RecoilRoot>
//             {/* Render the Counter component */}
//             <Counter />
//         </RecoilRoot>
//     );
// }

// // Create a Counter component that renders the CurrentCount, Increase, and Decrease components
// function Counter() {
//     // Return the CurrentCount, Increase, and Decrease components
//     return (
//         <div>
//             {/* Render the CurrentCount component */}
//             <CurrentCount />

//             {/* Render the Increase component */}
//             <Incrase />

//             {/* Render the Decrease component */}
//             <Decrease />
//         </div>
//     );
// }

// // Create a CurrentCount component that displays the current count value
// function CurrentCount() {
//     // Use the useRecoilValue hook to get the current count value from the counterAtom atom and store it in the count variable
//     const count = useRecoilValue(counterAtom);

//     // Return the current count value
//     return (
//         // Display the current count value in an h2 element
//         <h2>{count}</h2>
//     );
// }

// // Create a Decrease component that decrements the count value by 1
// function Decrease() {
//     // Use the useSetRecoilState hook to update the count value in the counterAtom atom and store it in the setCount variable
//     const setCount = useSetRecoilState(counterAtom);

//     // Create a function that decrements the count value by 1 
//     function decrease() {
//         // Update the count value by decrementing it by 1 
//         setCount(count => count - 1);
//     }
    
//     // Return a button that decrements the count value when clicked
//     return (
//         // Display a button that decrements the count value when clicked 
//         <button onClick={decrease}>Decrease</button>
//     );
// }

// // Create a Incrase component that increments the count value by 1
// function Incrase() {
//     // Use the useSetRecoilState hook to update the count value in the counterAtom atom and store it in the setCount variable 
//     const setCount = useSetRecoilState(counterAtom);

//     // Create a function that increments the count value by 1
//     function increase() {
//         // Update the count value by incrementing it by 1 
//         setCount(count => count + 1);
//     }
    
//     // Return a button that increments the count value when clicked
//     return (
//         // Display a button that increments the count value when clicked
//         <button onClick={increase}>Increase</button>
//     );
// }

// // Export the App component as the default export to make it available in other parts of the application
// export default App;





// Memo in react
// import { useState, useEffect, memo } from "react";

// // Create a App component that renders in the root element
// function App() {
//     return (
//         <div>
//             {/* Render the Counter component */}
//             <Counter />
//         </div>
//     );
// }

// // Counter component that manages the count state
// function Counter() {
//     const [count, setCount] = useState(0);

//     // useEffect to set up an interval that increments the count every 3 seconds
//     useEffect(() => {
//         // Set up an interval to increment the count
//         const interval = setInterval(() => {
//             setCount((c) => c + 1); // Increment count by 1
//         }, 3000);

//         // Cleanup function to clear the interval on component unmount
//         return () => clearInterval(interval);
//     }, []); // Empty dependency array ensures this runs only once after the initial render

//     return (
//         <div>
//             {/* Display the current count */}
//             <CurrentCount count={count} />

//             {/* Render the Increase component and pass setCount as prop */}
//             <Increase setCount={setCount} />

//             {/* Render the Decrease component and pass setCount as prop */}
//             <Decrease setCount={setCount} />
//         </div>
//     );
// }

// // Memoized CurrentCount component to prevent unnecessary re-renders
// const CurrentCount = memo(function({ count }) {

//     // Return the current count value
//     return (
//         // Display the current count value
//         <h1>{count}</h1> 
//     );
// });

// // Memoized Decrease component that renders a button to decrease the count
// const Decrease = memo(function({ setCount }) {
//     // Function to handle the decrease action
//     function decrease() {
//         setCount((c) => c - 1); // Decrement count by 1
//     }

//     // Return the button to trigger the decrease function
//     return (
//         // Button to trigger the decrease function 
//         <button onClick={decrease}>Decrease</button>
//     ); 
// });

// // Memoized Increase component that renders a button to increase the count
// const Increase = memo(function({ setCount }) {
//     // Function to handle the increase action 
//     function increase() {
//         // Increment the count by 1
//         setCount((c) => c + 1); 
//     }

//     // Return the button to trigger the increase function
//     return (
//         // Button to trigger the increase function
//         <button onClick={increase}>Increase</button>
//     ); 
// });

// // Export the App component as the default export to make it available in other parts of the application
// export default App;



// Selectors in Recoil



// Importing counterAtom and evenSelector from the store module
import { counterAtom, evenSelector } from "./store/counter";

// Importing necessary functions from Recoil for state management
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

// Main App component that serves as the entry point for the application
function App() {
    return (
        <div>
            {/* Wrapping the application in RecoilRoot to provide Recoil state management */}
            <RecoilRoot>
                {/* Rendering the Buttons, Counter, and IsEven components */}
                <Buttons /> 
                <Counter /> 
                <IsEven /> 
            </RecoilRoot>
        </div>
    );
}

// Buttons component that provides controls to increase and decrease the count
function Buttons() {
    // useSetRecoilState hook to get the setter function for counterAtom
    const setCount = useSetRecoilState(counterAtom);

    // Function to increase the count by 2
    function increase() {
        setCount((c) => c + 2); // Updating state by adding 2 to the current count
    }

    // Function to decrease the count by 1
    function decrease() {
        setCount((c) => c - 1); // Updating state by subtracting 1 from the current count
    }

    return (
        <div>
            {/* Button to trigger the increase function when clicked */}
            <button onClick={increase}>Increase</button>
           
            {/* Button to trigger the decrease function when clicked */}
            <button onClick={decrease}>Decrease</button>
        </div>
    );
}

// Counter component that displays the current count
function Counter() {
    // useRecoilValue hook to get the current value of counterAtom
    const count = useRecoilValue(counterAtom);

    return (
        <div>
            <h2>Count: {count}</h2> {/* Displaying the current count value */}
        </div>
    );
}

// IsEven component that checks if the count is even and displays the result
function IsEven() {
    // useRecoilValue hook to get the computed value from evenSelector
    const isEven = useRecoilValue(evenSelector);

    return (
        <div>
            {/* Displaying whether the count is even or not */}
            <h3>Is Even: {isEven ? "Yes" : "No"}</h3>
        </div>
    );
}

// Exporting the App component as the default export to make it available in other parts of the application
export default App;