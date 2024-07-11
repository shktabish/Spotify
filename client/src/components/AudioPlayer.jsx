import React, { useState, useEffect, useRef } from 'react'
import { IoPauseSharp } from 'react-icons/io5'
import { IoMdPlay } from 'react-icons/io'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { FaVolumeUp } from 'react-icons/fa'
import socket from '../utils/socket'

const AudioPlayer = ({ song, audioRef, songIndex, setSongIndex, songList, setSong, roomID }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [showVolume, setShowVolume] = useState(false)
    const seekTimeout = useRef(null)

    useEffect(() => {
        setSong(songList[songIndex])
    }, [songIndex, setSong, songList])

    useEffect(() => {
        setCurrentTime(0)
        const audio = audioRef.current
        
        const updateTime = () => {
            setCurrentTime(audio.currentTime)
        }

        const metadataLoaded = () => {
            setDuration(audio.duration)
        }

        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('loadedmetadata', metadataLoaded)

        if (song) {
            playAudio()
        }

        return () => {
            audio.removeEventListener('timeupdate', updateTime)
            audio.removeEventListener('loadedmetadata', metadataLoaded)
        }
    }, [song, audioRef])

    useEffect(() => {
        const audio = audioRef.current
        audio.volume = volume
    }, [volume, audioRef])

    useEffect(() => {
        socket.on('play', () => {
          audioRef.current.play()
          setIsPlaying(true)
        })

        socket.on('pause', () => {
          audioRef.current.pause()
          setIsPlaying(false)
        })

        socket.on('seek', (time) => {
          audioRef.current.currentTime = time
        })

        return () => {
          socket.off('play')
          socket.off('pause')
          socket.off('seek')
        }
    }, [])

    useEffect(() => {
        if (roomID && songIndex !== undefined) {
            socket.emit('change-song', { roomID, songIndex })
        }
    }, [roomID, songIndex])

    const playAudio = () => {
        audioRef.current.play()
        setIsPlaying(true)
        socket.emit('play', roomID)
    }

    const pauseAudio = () => {
        audioRef.current.pause()
        setIsPlaying(false)
        socket.emit('pause', roomID)
    }

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * duration
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)

        clearTimeout(seekTimeout.current)
        seekTimeout.current = setTimeout(() => {
            socket.emit('seek', roomID, newTime)
        }, 300)
    }

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value / 100
        audioRef.current.volume = newVolume
        setVolume(newVolume)
    }

    const playNextSong = () => {
        setSongIndex((songIndex + 1) % songList.length)
    }

    const playPrevSong = () => {
        setSongIndex((songIndex - 1 + songList.length) % songList.length)
    }

    return (
        <div key={song._id} className="bg-black fixed bottom-0 h-[10vh] w-full flex justify-between items-center">
            <audio src={song.song} ref={audioRef} className="hidden" />

            <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleProgressChange}
                className="h-[3px] w-full accent-[#0EDD95] fixed bottom-[10vh] z-10"
            />

            <div className="flex gap-2 max-sm:ml-2 ml-4 sm:w-max max-sm:grow overflow-hidden sm:overflow-visible">
                <img src={song.coverImage} alt="song cover" className="h-[8vh] aspect-square" />
                <div className="flex flex-col justify-center sm:w-28">
                    <div className="text-white text-nowrap sm:text-base text-sm">{song.title}</div>
                    <div className="text-[#b3b3b3] text-nowrap sm:text-base text-sm">By {song.artist}</div>
                </div>
            </div>

            <div className="flex items-center justify-end sm:justify-center mr-5 sm:mr-[12vw] grow gap-1 sm:gap-2">
                <BiSkipPrevious fill="#b3b3b3" className="text-3xl sm:text-4xl block cursor-pointer" onClick={playPrevSong} />
                {isPlaying ? (
                    <div className="grid place-content-center h-[6vh] w-[6vh] rounded-full bg-[#0EDD95] cursor-pointer" onClick={pauseAudio}>
                        <IoPauseSharp fill="black" size={24} />
                    </div>
                ) : (
                    <div className="grid place-content-center h-[6vh] w-[6vh] rounded-full bg-[#0EDD95] cursor-pointer" onClick={playAudio}>
                        <IoMdPlay fill="black" size={24} className="ml-[2px]" />
                    </div>
                )}
                <BiSkipNext fill="#b3b3b3" className="text-3xl sm:text-4xl block cursor-pointer" onClick={playNextSong} />
            </div>

            <div className="relative">
                <FaVolumeUp fill="#b3b3b3" className="text-2xl mr-6 hidden sm:block cursor-pointer" onClick={() => setShowVolume(!showVolume)} />
                {showVolume && (
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume * 100}
                        onChange={handleVolumeChange}
                        className="w-24 absolute z-50 -rotate-90 -top-3 left-3 origin-left accent-[#0EDD95] h-[7px]"
                    />
                )}
            </div>
        </div>
    )
}

export default AudioPlayer
