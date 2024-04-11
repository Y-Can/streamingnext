// Footer.js
import React from "react";
import "../app/globals.css";
import styles from '../app/styles/videoplayer.module.css';
import { Helmet } from 'react-helmet';
// Créez un fichier Footer.module.css pour les styles
const VideoPlayer = ({title, videoSrc, description, image}) => {

return (
    
    <main className={styles.wrapper}>
        <Helmet>
        <script src="../js/index.js" crossorigin="anonymous" async></script>
      </Helmet>
      <div className={styles.player}>
        <div className={styles.playerOverlay} data-fullscreen="false">
          <div className={styles.container}>
            <div className={styles.informationContainer}>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>
                {description}
              </p>
            </div>
            <div className={styles.playerContainer}>
              <div className={styles.videoProgress}>
                <div className={styles.videoProgressFilled}></div>
              </div>
              <div className={styles.playerControls}>
                <div className={styles.playerButtons}>
                  <button aria-label="play" className={styles.button + ' ' + styles.play} title="play" type="button"></button>
                  <button aria-label="pause" className={styles.button + ' ' + styles.pause} hidden title="pause" type="button"></button>
                  <button aria-label="backward" className={styles.button + ' ' + styles.backward} title="backward" type="button"></button>
                  <button aria-label="forward" className={styles.button + ' ' + styles.forward} title="forward" type="button"></button>
                  <button aria-label="volume" className={styles.button + ' ' + styles.volume} title="volume" type="button"></button>
                  <button aria-label="silence" className={styles.button + ' ' + styles.silence} hidden title="silence" type="button"></button>
                  <div className={styles.volumeProgress}>
                    <div className={styles.volumeProgressFilled}></div>
                  </div>
                  <div className={styles.timeContainer}>
                    <p className={styles.currentTime}>0:00</p>
                    <p className={styles.timeSeparator}>/</p>
                    <p className={styles.durationVideo}>0:00</p>
                  </div>
                </div>
                <div className={styles.expandContainer}>
                  <button aria-label="expand" className={styles.button + ' ' + styles.expand} title="expand" type="button"></button>
                  <button aria-label="reduce" className={styles.button + ' ' + styles.reduce} hidden title="reduce" type="button"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <video className={styles.video} poster={image} src={videoSrc}></video>
      </div>

    </main>
  );
};
export default VideoPlayer;
