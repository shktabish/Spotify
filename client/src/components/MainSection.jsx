import { useEffect, useState } from "react"
import MusicCard from "./MusicCard"
import api from "../utils/axios"
import LoadingMusicCard from "./loading/LoadingMusicCard"

const MainSection = ({ setSongPlaying, audioRef, setSongs, songs }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSongs = async () => {
      try {
        setLoading(true)
        const res = await api.get('/song/')
        setSongs(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getSongs()
  }, [])

  const musicCardList = songs.map((song, i) => (
    <MusicCard key={i} song={song} setSongPlaying={setSongPlaying} audioRef={audioRef} />
  ))

  return (
    <>
      <div className="text-white text-3xl font-semibold p-4">Newest Songs</div>
      {loading ? 
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-4">
          <LoadingMusicCard />
          <LoadingMusicCard />
          <LoadingMusicCard />
          <LoadingMusicCard />
          <LoadingMusicCard />
          <LoadingMusicCard />
        </div>
        :
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-4">
          {musicCardList}
        </div>
      }
    </>
  )
}

export default MainSection