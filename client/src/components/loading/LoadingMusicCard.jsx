const LoadingMusicCard = () => {
  return (
    <div className="w-full overflow-clip bg-white/5 rounded-lg">
      <div className={"w-full flex-auto p-2 relative flex flex-col justify-start gap-4 rounded-md text-nowrap"} >
          <div className="w-full h-max relative">
            <div className="relative w-full aspect-square rounded-md bg-white/10 animate-pulse"/>
          </div>
          <div className="text-white w-full h-6 rounded-lg bg-white/10 animate-pulse"/>
          <div className="text-[#b3b3b3] mb-2 w-full h-6 rounded-lg bg-white/10 animate-pulse" />
      </div>
    </div>
  )
}

export default LoadingMusicCard