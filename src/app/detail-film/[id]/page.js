"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/filmdetail.module.css";
import Link from 'next/link';

const FilmDetail = ({ params }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [volume, setVolume] = useState(0.5);
	const [playbackProgress, setPlaybackProgress] = useState(0);
	const [isFullScreen, setIsFullScreen] = useState(false);
  
	useEffect(() => {
	  console.log(videoRef);
	  if (videoRef.current) {
		videoRef.current.volume = volume;
	  }
	}, [volume]);
  
	useEffect(() => {
	  const video = videoRef.current;
  
	  const updateProgress = () => {
		if (videoRef.current) {
		  const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
		  setPlaybackProgress(progress);
		}
	  };
  
	  video.addEventListener('timeupdate', updateProgress);
  
	  return () => video.removeEventListener('timeupdate', updateProgress);
	}, []);
  
	const togglePlay = () => {
	  if (videoRef.current.paused) {
		videoRef.current.play();
		setIsPlaying(true);
	  } else {
		videoRef.current.pause();
		setIsPlaying(false);
	  }
	};
  
	const toggleMute = () => {
	  const newMutedState = !isMuted;
	  videoRef.current.muted = newMutedState;
	  setIsMuted(newMutedState);
	};
  
	const handleVolumeChange = (newVolume) => {
	  setVolume(newVolume);
	  setIsMuted(newVolume === 0);
	};
  
	const skipTime = (time) => {
	  videoRef.current.currentTime += time;
	};
  
	const toggleFullScreen = () => {
	  if (!document.fullscreenElement) {
		videoRef.current.requestFullscreen();
		setIsFullScreen(true);
	  } else {
		document.exitFullscreen();
		setIsFullScreen(false);
	  }
	};
  

	
	console.log(params.id);
	
  const [film, setFilm] = useState(null);
  const [votes, setVotes] = useState(null);

  useEffect(() => {
	const id = params.id;
    const fetchData = async () => {
      if (id) {
        try {
          console.log(id, 'second');
          let apiUrl = `/api/films/?id=${encodeURIComponent(id)}`; 
          const response = await axios.get(apiUrl);
          const filmData = response.data;

          setFilm(filmData.films[0]);
        } catch (error) {
          console.error("Erreur lors de la requête API", error);
        }

      }
    };
			// Requete votes
			const fetchNote = async () => {
				if(id){
					try{
						const responseVotes = await axios.get(`/api/notation/?id=${encodeURIComponent(id)}`);
						const votes = responseVotes.data;
						setVotes(votes)
					}
					catch(error){
					    console.error("Erreur lors de la requête API", error);
					}
				}
			}
			
	fetchNote();
    fetchData();
  }, []); 

	
	return (
		<div className={styles.container_col}>
			

			
					
					<div className={styles.block}>
						
						<div className={styles.titre}>
							
							<h1 className={styles.title}>{film?.titre}</h1>
						</div>
							
							<div className={styles.containerRow}>
								
								<div className={styles.card}>
									<div className={styles.row}>
										<Link className={styles.btn} href={`/notation/${film?.id}`}>
												<button className="unlink maxwidth" type="button">
													Noter le film 
												</button>
											</Link>
										<div className={styles.container_col_min}>
												<div>{votes}</div>
												<div className={styles["star-rating"]}>
													
												<div className={styles.containerCol}>	
												<button
													type="button"
													className={styles["star-button"]}
													>
													<span className={votes ? styles["star-on"] : styles["star-off"]}>&#9733;</span>
												</button>
												</div>
											</div>
										</div>
									</div>
									
								<img src={film?.image} className={styles.img} alt="" />
								</div>
								
								<main className={styles.wrapper}>

    <div className={styles.player}>
      <div className={styles.playerOverlay} data-fullscreen="false">
        <div className={styles.container}>
          <div className={styles.informationContainer}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.playerContainer}>
            <video
            
            //  ref={videoRef} 
            className={styles.video} 
            controls src="/inter.mp4" 
            poster={'/icons/posterimitation.webp'}
            >
				<source src="/inter.mp4" type="video/mp4" />
			</video>

            <div className={styles.playerControls}>
              <button onClick={togglePlay} className={styles.button + ' ' + (isPlaying ? styles.pause : styles.play)} aria-label={isPlaying ? 'Pause' : 'Play'}></button>
              <button onClick={toggleMute} className={styles.button + ' ' + (isMuted ? styles.silence : styles.volume)} aria-label={isMuted ? 'Unmute' : 'Mute'}></button>
              <button onClick={() => skipTime(-10)} className={styles.button + ' ' + styles.backward} aria-label="Backward 10 seconds"></button>
              <button onClick={() => skipTime(10)} className={styles.button + ' ' + styles.forward} aria-label="Forward 10 seconds"></button>
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => handleVolumeChange(parseFloat(e.target.value))} className={styles.volumeProgress} />
              <button onClick={toggleFullScreen} className={styles.button + ' ' + styles.expandContainer} aria-label="Full Screen"></button>
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
								</div>
							</div>
					</div>
			
		 

	);
};
FilmDetail.getInitialProps = async (context) => {
	const { query } = context;
	return { id: query.id || "" };
  };
  
export default FilmDetail;
