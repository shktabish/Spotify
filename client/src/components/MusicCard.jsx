import { useState } from "react"
import { IoPlaySharp } from "react-icons/io5"

const MusicCard = ({ image, title, artist }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-52 max-w-64 flex-auto ${isHovered? 'bg-white/10' : 'bg-white/5'} p-2 mx-4 my-2 relative flex flex-col justify-start rounded-md transition-all duration-300`}
    >
        <img src={image} alt="song cover image" className="w-full mb-4 rounded-md"/>
        <div className={`h-12 w-12 absolute right-4 bottom-1/3 bg-[#1FDC63] flex justify-center items-center rounded-full ${isHovered ? 'block' : 'hidden' } transition-all duration-300`}><IoPlaySharp className="fill-black text-2xl ml-0.5"/></div>
        <p className="text-white mb-1">{title}</p>
        <p className="text-[#b3b3b3] mb-1">{artist}</p>
    </div>
  )
}

export default MusicCard