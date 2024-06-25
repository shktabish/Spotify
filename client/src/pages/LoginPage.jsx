import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/axios'
import { useUser } from '../Contexts/UserContext'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const { setUser } = useUser()   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/user/login', formData)
            setFormData({
                email: '',
                password: ''
            }) 
            setUser(res.data.user)
            console.log(res.data.user)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-black overflow-hidden">
        <div className="bg-[url('/login-banner.jpg')] bg-cover bg-center hidden md:block relative">
            <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="bg-[url('/login-pattern.png')] bg-cover bg-center text-white p-4 flex flex-col items-center">
            <img src="/spotify-logo.svg" alt="spotify-logo" className="h-10 self-start"/>
            <div className='flex flex-col justify-center gap-5 h-[calc(100vh-80px-32px)] min-w-[288px] w-4/5'>
                <div className="text-6xl font-semibold">Welcome Back</div>
                <p className="text-[#0BDA92]">Please enter your login details below</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full my-3 bg-transparent border-2 border-[#4C4D4E] rounded-full text-white px-6 py-3 focus:outline-none focus:border-[#0BDA92]"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full my-3 bg-transparent border-2 border-[#4C4D4E] rounded-full text-white px-6 py-3 focus:outline-none focus:border-[#0BDA92]"
                    />
                    <div className='text-[#b3b3b3] hover:underline cursor-pointer ml-3'>Forgot password?</div>
                    <button type="submit" className="w-full mt-10 bg-[#0BDA92] text-black p-2 rounded-full text-lg font-semibold">Login</button>
                </form>
            </div>
            <div className='self-start'>Don't have an account?&#x2800;
                <Link to="/signup" className='text-[#0BDA92] hover:underline cursor-pointer'>Sign Up</Link>
            </div>
        </div>
    </div>
  )
}

export default LoginPage