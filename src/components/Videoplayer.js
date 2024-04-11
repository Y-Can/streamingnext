// Footer.js
import React from "react";
import "../app/globals.css";
import styles from '../app/styles/videoplayer.module.css';
import { Helmet } from 'react-helmet';
import * as script from '../js/index.js'
import useVideoPlayer from '../js/index.js';

// Créez un fichier Footer.module.css pour les styles
const VideoPlayer = ({title, videoSrc, description, image}) => {
    const {
        videoRef,
        isPlaying,
        togglePlay,
        isMuted,
        toggleMute,
        volume,
        playbackProgress,
        handleVolumeChange,
        skipTime,
        toggleFullScreen,
      } = useVideoPlayer("./../../public/inter.mp4");
return (
    
    <main className={styles.wrapper}>
    <Helmet>
      <script src="./js/index.js" crossorigin="anonymous" async></script>
    </Helmet>
    <div className={styles.player}>
      <div className={styles.playerOverlay} data-fullscreen="false">
        <div className={styles.container}>
          <div className={styles.informationContainer}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.playerContainer}>
            <video
            
             ref={videoRef} 
            className={styles.video} 
            controls src={videoSrc} 
            ></video>

            <div className={styles.playerControls}>
              <button onClick={togglePlay} className={styles.button + ' ' + (isPlaying ? styles.pause : styles.play)} aria-label={isPlaying ? 'Pause' : 'Play'}></button>
              <button onClick={toggleMute} className={styles.button + ' ' + (isMuted ? styles.silence : styles.volume)} aria-label={isMuted ? 'Unmute' : 'Mute'}></button>
              <button onClick={() => skipTime(-10)} className={styles.button + ' ' + styles.backward} aria-label="Backward 10 seconds"></button>
              <button onClick={() => skipTime(10)} className={styles.button + ' ' + styles.forward} aria-label="Forward 10 seconds"></button>
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => handleVolumeChange(parseFloat(e.target.value))} className={styles.volumeProgress} />
              <button onClick={toggleFullScreen} className={styles.button + ' ' + styles.expand} aria-label="Full Screen"></button>
              <div className={styles.timeContainer}>
                <span className={styles.currentTime}>0:00</span> / <span className={styles.durationVideo}>0:00</span>
              </div>
              <div className={styles.videoProgress} style={{ width: `${playbackProgress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  );
};
export default VideoPlayer;
