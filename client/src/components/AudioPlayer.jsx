import React, { useRef, useState, useEffect } from 'react';
import { IoPlay, IoPauseSharp } from 'react-icons/io5';

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const AudioPlayer = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div className="bg-black fixed bottom-0 h-[10vh] w-full flex items-center px-4">
      <audio src={song.song} ref={audioRef} className="hidden" />
      <img src={song.coverImage} alt="song cover" className="h-[8vh] mr-4" />
      <div className="flex flex-col justify-center mr-4">
        <div className="text-white">{song.title}</div>
        <div className="text-[#b3b3b3]">By {song.artist}</div>
      </div>
      <div className="flex flex-col items-center flex-grow mx-4">
        <div className="flex items-center w-full">
          <span className="text-white">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleProgressChange}
            className="mx-2 flex-grow"
          />
          <span className="text-white">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex items-center mr-4">
        {isPlaying ? (
          <IoPauseSharp fill="white" size={24} onClick={pauseAudio} />
        ) : (
          <IoPlay fill="white" size={24} onClick={playAudio} />
        )}
      </div>
      <div className="flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="w-24 "
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
