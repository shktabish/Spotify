import { Link, useNavigate } from "react-router-dom"
import api from "../utils/axios"
import { useUser } from "../Contexts/UserContext"
import { toast } from "sonner"
import { HiOutlineBars3 } from "react-icons/hi2"

const Navbar = ({ setShowSidebar }) => {
  
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      const res = await api.post('/user/logout')
      setUser(null)
      toast.success(res.data.message)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-start sm:justify-end h-[10vh] w-full px-4 py-2">
      <HiOutlineBars3 stroke="white" className="block sm:hidden mr-auto text-4xl" onClick={() => setShowSidebar(true)}/>
      { user ? 
        <>
          <div 
            className="font-semibold cursor-pointer px-8 py-3 text-[#b3b3b3]"
            onClick={handleLogOut}
          >Log out</div>
          <img src={user?.avatar} alt="Profile picture" className="w-14 h-14 rounded-full bg-white/50"/>
        </> 
        : 
        <>
          <Link to="/signup" className="font-semibold cursor-pointer px-4 sm:px-8 py-2 max-sm:text-sm text-[#b3b3b3]"> Sign up </Link>
          <Link to="/login" className="font-semibold cursor-pointer bg-[#f6f6f6] px-4 sm:px-8 py-2 max-sm:text-sm rounded-full mr-2 sm:mr-4">Log in</Link>
        </>
      }
    </div>
  )
}

export default Navbar