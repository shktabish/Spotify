import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Upload from "../components/modals/Upload"
import MainSection from './../components/MainSection';
import AudioPlayer from './../components/AudioPlayer';


const MainPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const [songPlaying, setSongPlaying] = useState({})

    useEffect(() => {
      console.log(songPlaying, "songPlaying")
    }, [songPlaying])

  return (
    <div className="flex bg-black w-full min-h-screen p-2">
      <Sidebar />
      <div className="bg-gradient-to-b from-[#1e1e1e] to-black w-full sm:w-[calc(100%-256px)] sm:ml-2 rounded-xl">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <MainSection isLoggedIn={isLoggedIn} setIsUploadOpen={setIsUploadOpen} setSongPlaying={setSongPlaying}/>
      </div> 
      <AudioPlayer song={songPlaying}/>
      <Upload isUploadOpen={isUploadOpen} setIsUploadOpen={setIsUploadOpen}/>
    </div>
  )
}

export default MainPage