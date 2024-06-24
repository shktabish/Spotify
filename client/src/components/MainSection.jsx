import { useEffect, useState } from "react"
import MusicCard from "./MusicCard"
import toast from "react-hot-toast"
import api from "../utils/axios"

const MainSection = ({ isLoggedIn, setIsUploadOpen, setSongPlaying }) => {
  const [songs, setSongs] = useState([{}])

  useEffect(() => {
    const getSongs = async () => {
      try {
        const res = await api.get('/song/')
        setSongs(res.data)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.error)
      }
    }

    getSongs()
  }, [])

  const musicCardList = songs.map((song, i) => (
    <MusicCard key={i} song={song} setSongPlaying={setSongPlaying} />
  ))

  return (
    <>
      <div className="text-white text-3xl font-semibold p-4">Newest Songs</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-4">
        {musicCardList}
        {musicCardList}
        {musicCardList}
        {musicCardList}
        {musicCardList}
        {musicCardList}
        {musicCardList}
        {musicCardList}
        {musicCardList}
        {musicCardList}
      </div>
      {isLoggedIn && 
      <div 
        onClick={(() => setIsUploadOpen(true))}
        className="bg-white inline-block text-lg font-semibold py-2 px-4 rounded-full absolute bottom-10 right-10 cursor-pointer"
      >
        Upload Video
      </div>}
    </>
  )
}

export default MainSection