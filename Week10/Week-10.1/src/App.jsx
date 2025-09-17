
// import './App.css'
// import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";

// function App() {

//   return <div>
//     <BrowserRouter>
//       <Link to="/">Allen</Link>
//       | 
//       <Link to="/neet/online-coaching-class-11">Class 11</Link> 
//       | 
//       <Link to="/neet/online-coaching-class-12">Class 12</Link>
//       <Routes>
//         <Route path="/" element={<Layout />} />
//         <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
//         <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
//         <Route path="/" element={<Landing />} />
//         <Route path="*" element={<ErrorPage />} />
//       </Routes>
//       Footer | Contact us
//     </BrowserRouter>
//   </div>
// }

// function Layout (){
//   return <div style={{height: "100vh"}}>
//     <Link to= "/">Allen</Link>
//     |
//     <Link to="/neet/online-coaching-class-11">Class 11</Link>
//     |
//     <Link to="/neet/online-coaching-class-12">Class 12</Link>
//     <div style={{height: "90vh"}}> 
//     <Outlet />
//     </div>
//     Footer
//   </div>
// }
  
// function ErrorPage(){
//   return <div>
//     Sorry Page Not Found
//   </div>
// }

// function Landing() {
//   return <div>
//     Welcome to Allen
//   </div>
// }

// function Class11Program() {
//   return <div>
//       NEET programs for Class 11th
//   </div>
// }

// function Class12Program() {
//   const navigate = useNavigate();

//   function redirectUser(){
//     navigate("/")
//   }
//   return <div>
//       NEET programs for Class 12th
//       <button onClick={redirectUser}>Go Back To Landing Page</button>
//   </div>
// }

// export default App


// ----------------Kisi Ek Field Pr Focus Krne k Liye --------------------
// import './App.css'
// import { useRef , useState } from 'react'

// function App() {
//    // useRef hook ka use kar rahe hain input element ko reference dene ke liye
//    const inputRef = useRef();

//    // Ye function input field par focus karega jab button click hoga
//    function focusOnInput(){
//       {/* 
//         document.getElementById("name").focus() ka matlab hota hai 
//         ki 'name' id wale input field pe cursor chala jaye.
//         Par React mein hum useRef ka use karte hain same kaam ke liye.
//       */}
//       inputRef.current.focus(); // isse input field auto focus ho jayega bina click kiye
//    }

//    return <div>
//      Sign Up {/* Heading ya title jaisa hai */}
     
//      {/* Pehla input jisme ref diya gaya hai taaki ispe focus kiya ja sake */}
//      <input ref={inputRef} id='name' type={"text"}></input>

//      {/* Dusra input jisme koi ref nahi hai, bas normal text field hai */}
//      <input type={"text"} ></input>

//      {/* Jab button click hoga, to pehla input field automatically focus ho jayega */}
//      <button onClick={focusOnInput}>Submit</button>
//    </div>
// }

// export default App;


// ---------------- Clock Bnane k Liye With A Start And Stop Button-----------------

// import { useRef, useState } from "react";
// import './App.css'

// function App(){
//    const [currentCount , setCurrentCount] = useState(0);
// const timer = useRef();

//    function startClock(){
//       let value = setInterval(function(){
//          setCurrentCount(c => c + 1);
//       }, 1000);
//       timer.current = value;
//    }

//    function stopClock(){
//       clearInterval(timer.current);
//    }
//    return <div>
//       {currentCount}
//       <br />
//       <button onClick={startClock}>Start</button>
//       <button onClick={stopClock}>Stop</button>
//    </div>
// }

// export default App;



//===================Allen Website====================


// Import the BrowserRouter, Routes, Route, Link, and useNavigate from react-router-dom for handling routing
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

// Create a function component named App that will be rendered in the root element
function App() {
    // Return the JSX of the component
    return (
        // Create a div element that will contain the navigation links and the routes
        <div>
            {/* Wrap the routing inside BrowserRouter, which manages the routing history */}
            <BrowserRouter>
                {/* Create navigation links using Link component to switch between pages without refreshing */}
                <Link to="/">Allen</Link> | <Link to="/neet/online-coaching-class-11">Class 11</Link> |{" "}
                <Link to="/neet/online-coaching-class-12">Class 12</Link>
                
                {/* Define the routes for different pages */}
                <Routes>                    
                    <Route path="/" element={<Landing />} /> {/* Route for the landing page, mapped to the "/" path */}
                    <Route path="/neet/online-coaching-class-11" element={<Class11Program />} /> {/* Route for Class 11 NEET program page */}
                    <Route path="/neet/online-coaching-class-12" element={<Class12Program />} /> {/* Route for Class 12 NEET program page */}
                    <Route path="*" element={<ErrorPage />} /> {/* Route for handling unmatched paths, rendering a 404 error page */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

// Function component to display a 404 error message if no route matches
function ErrorPage() {
    // Return the JSX for the component
    return (
        <div>
            {/* Display a message indicating the page was not found */}
            <h1>404 Page not found</h1>
        </div>
    );
}

// Function component to display the landing page
function Landing() {
    // Return the JSX for the component
    return (
        <div>
            {/* Display the main title of the landing page */}
            <h1>Welcome to Allen</h1>
        </div>
    );
}

// Function component to display information about the NEET program for Class 11
function Class11Program() {
    // Return the JSX for the component
    return (
        <div>
            {/* Display the heading for the Class 11 program */}
            <h2>Neet Programs for Class 11th</h2>
        </div>
    );
}

// Function component to display information about the NEET program for Class 12
function Class12Program() {
  // useNavigate hook allows programmatic navigation within the component
  const navigate = useNavigate();

    // Function to redirect the user to the landing page when the button is clicked
    function redirectUser() {
        navigate("/"); // Navigate to the landing page ("/" path)
    }

    // Return the JSX for the component
    return (
        <div>
            {/* Display the heading for the Class 12 program */}
            <h2>Neet Programs for Class 12th</h2>

            {/* Button that triggers the redirect function to navigate back to the landing page */}
            <button onClick={redirectUser}>Back to Landing Page</button>
        </div>
    );
}

// Export the App component to be used in other parts of the application
export default App;