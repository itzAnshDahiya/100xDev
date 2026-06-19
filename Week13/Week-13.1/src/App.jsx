// import { useState } from "react"; 
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//      <div className='bg-blue-300'>Hi</div>
//     </>
//   )
// }

// export default App


// Import FlexExample, GridExample and ResponsivenessExample components from the components folder in the src folder
import FlexExample from "./components/flexexample";
import GridExample from "./components/gridexample";
import ResponsivenessExample from "./components/responsivenessexample";

// Create a functional component App that will be rendered in the root element
function App() {
    // Return the JSX of the App component
    return (
        <>
            This div will have a background color of light blue
            <div className="bg-red">Hi</div>

            {/* This div will have a background color of blue because we have changed the color of red-500 to blue in the tailwind.config.js file... */}
           <div class="bg-blue-500">This div has a blue background.</div>

            {/* This div will have a background color of purple-800 and a border color of red-600 */}
            <div className="h-24 w-24 bg-purple-800 mt-3 ml-3 rounded-md border-2 border-red-600"></div>

            {/* Render the FlexExample Component in the App component */}
            <FlexExample />

            {/* Render the GridExample Component in the App component */}
            <GridExample />

            {/* Render the ResponsivenessExample Component in the App component */}
            <ResponsivenessExample />
        </>
    );
}

// Exporting the App component as default to be used in other components or files
export default App;``