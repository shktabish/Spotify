import api from "../utils/axios"
import toast from "react-hot-toast"

const Navbar = ({ setIsSignupOpen, setIsLoginOpen, isLoggedIn, setIsLoggedIn }) => {
  const handleLogOut = async () => {
    try {
      const res = await api.post('/user/logout')
      setIsLoggedIn(false)
      toast.success(res.data.message)
      console.log(res.data)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    }
  }

  return (
    <div className="flex items-center justify-end h-max w-full px-4 py-2">
        {isLoggedIn? 
        <>
          <div 
            className="font-semibold cursor-pointer px-8 py-3 text-[#b3b3b3]"
            onClick={handleLogOut}
          >Log out</div>
          <div className="w-14 h-14 rounded-full bg-white/50"></div>
          <div></div>
        </> : 
        <>
          <div 
          className="font-semibold cursor-pointer px-8 py-3 text-[#b3b3b3]"
          onClick={() => setIsSignupOpen(true)}
          >
            Sign up
          </div>
          <div 
            className="font-semibold cursor-pointer bg-[#f6f6f6] px-8 py-3 rounded-full mr-4"
            onClick={() => setIsLoginOpen(true)}
          >
            Log in
          </div>
        </>}
    </div>
  )
}

export default Navbar