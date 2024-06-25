import { Link, useNavigate } from "react-router-dom"
import api from "../utils/axios"
import { useUser } from "../Contexts/UserContext"
import { toast } from "sonner"

const Navbar = () => {
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
    <div className="flex items-center justify-end h-[10vh] w-full px-4 py-2">
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
          <Link to="/signup" className="font-semibold cursor-pointer px-8 py-2 text-[#b3b3b3]"> Sign up </Link>
          <Link to="/login" className="font-semibold cursor-pointer bg-[#f6f6f6] px-8 py-2 rounded-full mr-4">Log in</Link>
        </>
      }
    </div>
  )
}

export default Navbar