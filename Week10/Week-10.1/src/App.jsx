
import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";

function App() {

  return <div>
    <BrowserRouter>
      <Link to="/">Allen</Link>
      | 
      <Link to="/neet/online-coaching-class-11">Class 11</Link> 
      | 
      <Link to="/neet/online-coaching-class-12">Class 12</Link>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
        <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      Footer | Contact us
    </BrowserRouter>
  </div>
}

function Layout (){
  return <div style={{height: "100vh"}}>
    <Link to= "/">Allen</Link>
    |
    <Link to="/neet/online-coaching-class-11">Class 11</Link>
    |
    <Link to="/neet/online-coaching-class-12">Class 12</Link>
    <div style={{height: "90vh"}}> 
    <Outlet />
    </div>
    Footer
  </div>
}
  
function ErrorPage(){
  return <div>
    Sorry Page Not Found
  </div>
}

function Landing() {
  return <div>
    Welcome to Allen
  </div>
}

function Class11Program() {
  return <div>
      NEET programs for Class 11th
  </div>
}

function Class12Program() {
  const navigate = useNavigate();

  function redirectUser(){
    navigate("/")
  }
  return <div>
      NEET programs for Class 12th
      <button onClick={redirectUser}>Go Back To Landing Page</button>
  </div>
}

export default App
