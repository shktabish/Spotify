import MusicCard from "../components/MusicCard"

const Homepage = () => {
  return (
    <>
      <div className="text-white text-3xl font-semibold m-4">Newest Songs</div>
      <div className="flex flex-wrap">
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
      </div>
    </>
  )
}

export default Homepage