import { useEffect, useState } from "react"
import MusicCard from "../components/MusicCard"
import toast from "react-hot-toast"
import api from "../utils/axios"

const Homepage = ({ isLoggedIn, setIsUploadOpen }) => {
  const [songs, setSongs] = useState([{}])

  const getSongs = async () => {
    try {
      const res = await api.get('/song/')
      setSongs(res.data)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    }
  }

  useEffect(() => {
    getSongs()
  }, [])

  const musicCardList = songs.map((item, i) => (
    <MusicCard key={i} title={item.title} artist={item.artist} image={item.coverImage} />
  ))

  return (
    <>
      <div className="text-white text-3xl font-semibold m-4">Newest Songs</div>
      <div className="flex flex-wrap">
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

export default Homepage