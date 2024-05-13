import { useState } from "react"
import { AiFillGithub } from "react-icons/ai"
import { IoClose } from "react-icons/io5"
import api from "../../utils/axios"
import toast from "react-hot-toast"


const Signup = ({ isSignupOpen, setIsSignupOpen, setIsLoginOpen }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("avatar", avatar)

        try {
            const res = await api.post('/user/register', formData)

            toast.success(res.data.message)

            setName('')
            setEmail('')
            setPassword('')
            setAvatar(null)

            setIsSignupOpen(false)
            setIsLoginOpen(true)

            console.log(res.data)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

  return (
    <div className={`h-full w-full bg-black/75 fixed flex justify-center items-center ${isSignupOpen? "block" : "hidden"}`}>
        <div className="bg-[#232123] flex flex-col items-center gap-2 px-3 py-4 rounded-md relative">
            <p className="text-2xl font-semibold text-white ">Let's get started</p>
            <p className="text-lg text-[#b3b3b3] mb-4">Create an account</p>
            <div className="flex justify-center items-center bg-[#2A282A] p-2 w-96 max-sm:w-80 rounded-md">
                <AiFillGithub className="text-2xl fill-white mr-2" />
                <p className="text-white">Sign up with Github</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col border-t-[1px] border-[#363436] mt-4 pt-4">
                <label className="block text-[#b3b3b3]">Name</label>
                <input 
                        type="text"
                        value={name}
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-96 max-sm:w-80 text-white p-2 border-[1px] bg-[#1D1C1D] mt-2 mb-3 rounded-md border-[#363436] focus:outline-none"
                />
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
                <label className="text-white my-2" >
                    <input type="file" className="hidden" onChange={(e) => setAvatar(e.target.files[0])} />
                    {avatar ? (
                        <>
                            <span className="bg-[#2A282A] py-2 px-4 rounded-sm w-max">Select avatar </span>
                            <span>{avatar.name}</span> 
                        </>
                    ) : (
                        <span className="bg-[#2A282A] py-2 px-4 rounded-sm w-max">Select avatar</span>
                    )}
                </label>
                <button className="w-96 max-sm:w-80 p-2 bg-[#363436] text-white rounded-md my-4">Sign up</button>
            </form>
            <IoClose 
                className="absolute top-3 right-3 fill-[#363436] text-2xl cursor-pointer" 
                onClick={() => setIsSignupOpen(false)} 
            />
        </div>
    </div>
  )
}

export default Signup