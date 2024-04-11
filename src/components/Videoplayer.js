import React, { useState, useRef, useEffect } from "react";
import "../app/globals.css";
import styles from '../app/styles/videoplayer.module.css';

const VideoPlayer = ({ title, videoSrc, description, image }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener("timeupdate", updateProgress);

    return () => videoElement.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleSkip = (amount) => {
    videoRef.current.currentTime += amount;
  };

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.parentNode.requestFullscreen();
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.player}>
        <div className={styles.playerOverlay} data-fullscreen="false">
          <div className={styles.container}>
            <div className={styles.informationContainer}>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.playerContainer}>
              <video className={styles.video} ref={videoRef} poster={image} src={videoSrc} />
              <div className={styles.playerControls}>
                <button className={styles.button} onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button className={styles.button} onClick={() => handleSkip(-10)}>Rewind 10s</button>
                <button className={styles.button} onClick={() => handleSkip(10)}>Forward 10s</button>
                <input className={styles.volumeProgress} type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolumeChange} />
                <button className={styles.button} onClick={toggleFullScreen}>Full Screen</button>
                <div className={styles.videoProgress} onClick={handleProgressClick}>
                  <div className={styles.videoProgressFilled} style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VideoPlayer;
