// Import useState and useEffect hooks from react module
import { useState, useEffect } from "react";

// Create a custom hook called usePostTitle and export it from this module to be used in other components
export function usePostTitle() {
    // Create a state variable called post and a function to update it called setPost to manage the state of the post variable
    const [post, setPost] = useState({});

    // Create an async function called getPosts that fetches the post data from the API and updates the post state variable with the response data
    async function getPosts() {
        // Fetch the post data from the API using the fetch function and store the response in a variable named response
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

        // Parse the response data to JSON format and store in a variable named json
        const json = await response.json();

        // Update the post state variable with the response data
        setPost(json);
    }

    // Use the useEffect hook to call the getPosts function when the component mounts
    useEffect(() => {
        // Call the getPosts function when the component mounts
        getPosts();
    }, []); // Empty dependency array to ensure the effect runs only once

    // Return the post title from the post state variable
    return post.title;
}


// Create a custom hook called useFetch that fetches data from a given URL and returns the data as an object
export function useFetch(url) {
    // Create a state variable called finalData and a function to update it called setFinalData to manage the state of the finalData variable
    const [finalData, setFinalData] = useState({});

    // Create a state variable called loading and a function to update it called setLoading to manage the loading state
    const [loading, setLoading] = useState(true);

    // Create an async function called getDetails that fetches the data from the given URL and updates the finalData state variable with the response data
    async function getDetails() {
        // Set the loading state to true when the data is being fetched
        setLoading(true);

        // Fetch the data from the given URL using the fetch function and store the response in a variable named response
        const response = await fetch(url);

        // Parse the response data to JSON format and store in a variable named json
        const json = await response.json();

        // Update the finalData state variable with the response data
        setFinalData(json);

        // Set the loading state to false when the data has been fetched
        setLoading(false);
    }

    // Use the useEffect hook to call the getDetails function when the component mounts
    useEffect(() => {

        // Call the getDetails function when the component mounts and the URL changes
        getDetails();
    }, [url]); // Dependency array with the URL to ensure the effect runs when the URL changes

    // Return the finalData and loading state variables as an object to be used in other components 
    return { finalData, loading };
}



// Lecture codes

// // Import the useState hook from the react module
// import { useState } from "react";

// // Import the useFetch custom hook from the hooks folder
// import useFetch from "./hooks/useFetch";

// // Create a function component named App that serves as the main application component
// function App() {
//     // Declare a state variable named currentPost and a function to update it named setCurrentPost using the useState hook
//     const [currentPost, setCurrentPost] = useState(1);

//     // Call the useFetch custom hook to fetch the post data from the API endpoint and store it in the finalData state variable and the loading state variable 
//     const { finalData, loading } = useFetch("https://jsonplaceholder.typicode.com/posts/" + currentPost, 5000);

//     // If the data is still loading, display a loading message to the user
//     if (loading) {
//         // Return the JSX for the loading message
//         return <div>Loading...</div>;
//     }

//     // Return the JSX for the component
//     return (
//         <div>
//             {/* Create buttons to switch between posts */}
//             <button onClick={() => setCurrentPost(1)}>1</button>
//             <button onClick={() => setCurrentPost(2)}>2</button>
//             <button onClick={() => setCurrentPost(3)}>3</button>

//             {/* Display the post data */}
//             <p>{JSON.stringify(finalData)}</p>
//         </div>
//     );
// }

// // Export the App component as the default export from this module
// export default App;




// // Lecture codes

// // Import useState and useEffect hooks from react module
// import { useState, useEffect } from "react";

// // Create a custom hook named useFetch that fetches data from the specified URL and re-fetches it at the specified interval
// function useFetch(url, interval) {
//     // Declare a state variable named finalData and a function to update it named setFinalData using the useState hook
//     const [finalData, setFinalData] = useState({});

//     // Declare a state variable named loading and a function to update it named setLoading using the useState hook
//     const [loading, setLoading] = useState(true);

//     // Create an async function named getDetails that fetches data from the specified URL and updates the finalData state variable
//     async function getDetails() {
//         // try-catch block to handle errors
//         try {
//             // Fetch data from the specified URL and store the response in the response variable
//             let response = await fetch(url);

//             // Parse the response data as JSON and store it in the json variable
//             let json = await response.json();

//             // Set the finalData state variable to the response data
//             setFinalData(json);
//         } catch (error) {
//             // Log any errors to the console
//             console.log(error);
//         } finally {
//             // Set the loading state variable to false once the data has been fetched
//             setLoading(false);
//         }
//     }

//     // Use the useEffect hook to fetch data from the specified URL and re-fetch it at the specified interval
//     useEffect(() => {
//         // Call the getDetails function to fetch data from the specified URL
//         getDetails();

//         // If an interval is specified, re-fetch the data at the specified interval using setInterval
//         if (interval) {
//             // Set an interval to re-fetch the data at the specified interval and store it in the fetchInterval variable
//             const fetchInterval = setInterval(() => {

//                 // Call the getDetails function to re-fetch the data at the specified interval
//                 getDetails();
//             }, interval); // Interval specified in milliseconds

//             // Return a cleanup function to clear the interval when the component is unmounted
//             return () => clearInterval(fetchInterval); // Clear interval on cleanup
//         }
//     }, [url, interval]); // Dependencies for the useEffect hook to re-run the effect

//     // Return the finalData and loading state variables from the custom hook 
//     return { finalData, loading };
// }

// // Export the useFetch custom hook as the default export from this module to make it available for use in other modules
// export default useFetch;