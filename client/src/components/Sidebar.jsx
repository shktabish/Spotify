import { GoHomeFill } from "react-icons/go"
import { CiSearch } from "react-icons/ci"
import { BiLibrary } from "react-icons/bi"
import { HiOutlinePlusSmall } from "react-icons/hi2"
import { IoMdCloudUpload } from "react-icons/io"
import { useUser } from "../Contexts/UserContext"

const Sidebar = ({ setIsUploadOpen }) => {
  const { user } = useUser()
  
  const handleClick = () => {
    if(!user) {
      alert("You need to be logged in to upload songs")
      return
    }
    setIsUploadOpen(true)
  }

  return (
    <div className="h-[calc(100vh-16px)] w-64 flex flex-col gap-2 max-sm:hidden sticky top-2">
      <div className="w-full bg-[#121212] h-1/4 rounded-xl px-4 py-2 flex flex-col gap-2 justify-around">
        <img src="/spotify-logo.svg" alt="Spotify logo" className="h-8 ml-2 self-start" />
        <div className="flex items-center">
          <GoHomeFill className="fill-white text-3xl mr-4 ml-2" />
          <span className="text-white text-l font-semibold">Home</span>
        </div>
        <div onClick={handleClick} className="flex items-center cursor-pointer">
          <IoMdCloudUpload className="fill-[#b3b3b3] text-3xl mr-4 ml-2" />
          <span className="text-[#b3b3b3] text-l font-semibold">Upload Songs</span>
        </div>
      </div>
      <div className="w-full bg-[#121212] h-3/4 py-2 px-4 rounded-xl flex flex-col gap-4">
        <div className="flex justify-start items-center gap-4 p-2">
          <BiLibrary className="fill-[#b3b3b3] text-3xl" />
          <div className="text-[#b3b3b3] text-l font-semibold mr-auto">Your Library</div>
          <HiOutlinePlusSmall className="text-[#b3b3b3] text-3xl" />
        </div>
        <CiSearch className="fill-white text-2xl mr-4 ml-2" />
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-slate-50"></div>
          <div className="text-white">Playlist Name</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-slate-50"></div>
          <div className="text-white">Playlist Name</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-slate-50"></div>
          <div className="text-white">Playlist Name</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
