import React, { useRef, useState } from "react";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showPlayButton, setShowPlayButton] = useState(true);



  const handleProgress = () => {
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setProgress((current / duration) * 100);
  };
  const togglePlay = () => {
    if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false); // Cacher le bouton Play en mode lecture
    } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowPlayButton(true); // Afficher le bouton Play quand c'est en pause
    }
};

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const handleVolume = (e) => {
    videoRef.current.volume = e.target.value;
    setVolume(e.target.value);
  };

  const enterFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="video-wrapper">
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleProgress}
        className="video-player"
        
      />
      <div className="controls">
      {showPlayButton && (
    <button className="play-button" onClick={togglePlay}>
        ▶️
    </button>
)}

        <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
        <input type="range" value={progress} onChange={handleSeek} />
        <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolume} />
        <button onClick={enterFullScreen}>⛶</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
