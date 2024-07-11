import { useState } from "react"
import { IoPlaySharp } from "react-icons/io5"
import socket from "../utils/socket";

const MusicCard = ({ song, setSongPlaying, index, setSongIndex, roomID }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setSongPlaying(song)
    setSongIndex(index)
    socket.emit('change-song', { roomID, songIndex: index })
  }

  return (
    <div className="w-full overflow-clip" onClick={handleClick}>
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full flex-auto ${isHovered? 'bg-white/10' : 'bg-white/5'} p-2 relative flex flex-col justify-start rounded-md transition-all duration-300 text-nowrap`}
      >
          <div className="w-full h-max relative">
            <img src={song.coverImage} alt="song cover image" className="relative w-full aspect-square mb-4 rounded-md"/>
            <div className={`sm:h-12 h-8 sm:w-12 w-8 absolute right-2 bottom-6 bg-[#0EDD95] flex justify-center items-center rounded-full ${isHovered ? 'block' : 'hidden' } transition-all duration-300`}><IoPlaySharp className="fill-black sm:text-2xl text-lg ml-0.5"/></div>
          </div>
          <p className="text-white mb-1">{song.title}</p>
          <p className="text-[#b3b3b3] mb-1">By {song.artist}</p>
      </div>
    </div>
  )
}

export default MusicCard