import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import Login from './components/Login';
import Signup from "./components/Signup";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="flex bg-black">
      <Toaster position="bottom-right" reverseOrder="false" />
      <Sidebar />
      <div className="bg-gradient-to-b from-[#1e1e1e] to-black w-full max-sm:m-2 my-2 mr-2 rounded-xl">
        <Navbar setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={setIsSignupOpen} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Homepage />
      </div> 
      <Login isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} setIsLoggedIn={setIsLoggedIn} />
      <Signup isSignupOpen={isSignupOpen} setIsSignupOpen={setIsSignupOpen} setIsLoginOpen={setIsLoginOpen} />
    </div>
  )
}