import { useState, useEffect, useRef } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Upload from "../components/modals/Upload"
import MainSection from './../components/MainSection';
import AudioPlayer from './../components/AudioPlayer';

const MainPage = () => {
    const [songPlaying, setSongPlaying] = useState(null)
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const [songs, setSongs] = useState([{}])
    const [showSidebar, setShowSidebar] = useState(false)
    const [songIndex, setSongIndex] = useState(null)
    const audioRef = useRef(null)

  return (
    <div className="flex bg-black w-full min-h-screen p-2">
      <Sidebar setIsUploadOpen={setIsUploadOpen} setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
      <div className={`${showSidebar ? "max-sm:hidden" : ""} bg-gradient-to-b from-[#1e1e1e] to-black w-full sm:w-[calc(100%-256px)] sm:ml-2 rounded-xl`}>
        <Navbar setShowSidebar={setShowSidebar}/>
        <MainSection setSongPlaying={setSongPlaying} songs={songs} setSongs={setSongs} setSongIndex={setSongIndex}/>
      </div> 
      {songPlaying && <AudioPlayer songList={songs} song={songPlaying} setSong={setSongPlaying} audioRef={audioRef} songIndex={songIndex} setSongIndex={setSongIndex} />}
      <Upload isUploadOpen={isUploadOpen} setIsUploadOpen={setIsUploadOpen} setSongs={setSongs}/>
    </div>
  )
}

export default MainPage