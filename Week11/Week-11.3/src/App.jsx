// // Import the RecoilRoot, useRecoilValue, useSetRecoilState hooks from the 'recoil' package
// import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

// // Import the networkAtom, jobsAtom, notificationsAtom, messagingAtom atoms from the atoms file
// import { networkAtom, jobsAtom, notificationsAtom, messagingAtom } from "./atoms";

// // Define the App component to be rendered in the root element
// function App() {
//     // Return the JSX element
//     return (
//         // Wrap the MainApp component with the RecoilRoot to provide Recoil state management
//         <RecoilRoot>
//             {/* Render the MainApp component */}
//             <MainApp />
//         </RecoilRoot>
//     );
// }

// // Create a MainApp Component to render the main application
// function MainApp() {
//     // Use the useRecoilValue hook to get the current value of the networkAtom, jobsAtom, notificationsAtom, messagingAtom atoms
//     const networkNotificationCount = useRecoilValue(networkAtom);
//     const jobsAtomCount = useRecoilValue(jobsAtom);
//     const notificationsAtomCount = useRecoilValue(notificationsAtom);
//     const messagingAtomCount = useRecoilValue(messagingAtom);

//     // Use the useRecoilState hook to get the current value and setter function of the messagingAtom atom
//     // const [messagingAtomCount, setMessagingAtomCount] = useRecoilState(messagingAtom);

//     return (
//         // Return the JSX structure for rendering the UI
//         <>
//             {/* Render the Home button */}
//             <button>Home</button>

//             {/* Render the My Network button with the count, limiting the display to "99+" if the count exceeds 99 */}
//             <button>My Network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>

//             {/* Render the Jobs button with the job count */}
//             <button>Jobs ({jobsAtomCount})</button>

//             {/* Render the Messaging button with the messaging notification count */}
//             <button>Messaging ({messagingAtomCount})</button>

//             {/* Render the Notifications button with the notification count */}
//             <button>Notifications ({notificationsAtomCount})</button>

//             {/* Include the ButtonUpdator component to handle updates to messaging notifications */}
//             <ButtonUpdator />
//         </>
//     );
// }


import React from "react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { networkAtom, jobsAtom, notificationsAtom, messagingAtom } from "./atoms";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can log error info here if needed
  }
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

function App() {
    return (
        <RecoilRoot>
          <ErrorBoundary>
            <MainApp />
          </ErrorBoundary>
            
        </RecoilRoot>
    );
}

function MainApp() {
    const networkNotificationCount = useRecoilValue(networkAtom);
    const jobsAtomCount = useRecoilValue(jobsAtom);
    const notificationsAtomCount = useRecoilValue(notificationsAtom); // FIXED
    const messagingAtomCount = useRecoilValue(messagingAtom);         // FIXED

    return (
        <>
            <button>Home</button>
            <button>
                My Network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})
            </button>
            <button>Jobs ({jobsAtomCount})</button>
            <button>Messaging ({messagingAtomCount})</button>
            <button>Notifications ({notificationsAtomCount})</button>
            <button>Me</button> 
        </>
    );
}

export default App;