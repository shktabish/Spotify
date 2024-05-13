import { useEffect, useState } from "react"
import { AiFillGithub } from "react-icons/ai"
import { IoClose } from "react-icons/io5"
import api from "../../utils/axios"
import toast from "react-hot-toast"

function getCookie(name) {
    // Split cookies into individual name-value pairs
    var cookies = document.cookie.split(';');
    
    // Iterate over each cookie
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        
        // Check if this cookie is the one we're looking for
        if(cookie.indexOf(name + '=') === 0) {
            // If found, return the value of the cookie
            return cookie.substring(name.length + 1);
        }
    }
    
    // If the cookie is not found, return null
    return null;
}

const Login = ({ isLoginOpen, setIsLoginOpen,setIsLoggedIn }) => {
    useEffect(() => {
        const token = getCookie('accessToken')
        console.log(token)
        if(token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post('/user/login/', {
                email,
                password
            })

            toast.success(res.data.message)

            setEmail('')
            setPassword('')

            setIsLoggedIn(true)
            setIsLoginOpen(false)

            console.log(res.data)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

  return (
    <div className={`h-full w-full bg-black/75 fixed flex justify-center items-center ${isLoginOpen? "block" : "hidden"}`}>
        <div className="bg-[#232123] flex flex-col items-center gap-2 px-3 py-4 rounded-md relative">
            <p className="text-2xl font-semibold text-white ">Welcome back</p>
            <p className="text-lg text-[#b3b3b3] mb-4">Login to your account</p>
            <div className="flex justify-center items-center bg-[#2A282A] p-2 w-96 max-sm:w-80 rounded-md">
                <AiFillGithub className="text-2xl fill-white mr-2" />
                <p className="text-white">Sign in with Github</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col border-t-[1px] border-[#363436] mt-4 pt-4">
                <label className="block text-[#b3b3b3]">Email Address</label>
                <input 
                        type="text"
                        value={email}
                        placeholder="Your email address"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-96 max-sm:w-80 text-white p-2 border-[1px] bg-[#1D1C1D] mt-2 mb-3 rounded-md border-[#363436] focus:outline-none"
                />
                <label className="block text-[#b3b3b3]">Password</label>
                <input 
                        type="password"
                        value={password}
                        placeholder="Your password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-96 max-sm:w-80 text-white p-2 border-[1px] bg-[#1D1C1D] mt-2 mb-3 rounded-md border-[#363436] focus:outline-none"
                />
                <button className="w-96 max-sm:w-80 p-2 bg-[#363436] text-white rounded-md my-4">Sign in</button>
            </form>
            <p className="text-[#b3b3b3] underline decoration-solid">Forgot your password?</p>
            <p className="text-[#b3b3b3] underline decoration-solid">Don't have an account? Sign up</p>
            <IoClose 
                className="absolute top-3 right-3 fill-[#363436] text-2xl cursor-pointer" 
                onClick={() => setIsLoginOpen(false)} 
            />
        </div>
    </div>
  )
}

export default Login