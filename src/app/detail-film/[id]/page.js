"use client";
import React, { useEffect, useState, useRef  } from "react";
import axios from "axios";
import styles from "../../styles/filmdetail.module.css";
import Link from 'next/link';
import playIcon from './../../../../public/icons/play-button.png'; 
import pauseIcon from './../../../../public/icons/pause-button.png';
import VideoPlayer from "../../../components/Videoplayer"; // Ajuste le chemin si nécessaire

const FilmDetail = ({ params }) => {
	console.log(params.id);
	const videoContainerRef = useRef(null);
	const timeoutRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showControls, setShowControls] = useState(true);
	
	const [showIcon, setShowIcon] = useState(false);
    const [iconSrc, setIconSrc] = useState(playIcon);

	useEffect(() => {
		// Assurez-vous que l'élément video est monté
		const video = videoContainerRef.current;
		if (video) {
		  const handlePlay = () => setIsPlaying(true);
		  const handlePause = () => setIsPlaying(false);
			console.log(isPlaying);
		  // Ajout des écouteurs d'événements
		  video.addEventListener('play', handlePlay);
		  video.addEventListener('pause', handlePause);
	
		  // Nettoyage des écouteurs d'événements au démontage
		  return () => {
			video.removeEventListener('play', handlePlay);
			video.removeEventListener('pause', handlePause);
		  };
		}
		if (video) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
                setIconSrc(pauseIcon);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
                setIconSrc(playIcon);
            }
            setShowIcon(true);
            setTimeout(() => setShowIcon(false), 1000);
        }
	  }, []);
	
  const [film, setFilm] = useState(null);
  const [votes, setVotes] = useState(null);
  
  const handleActivity = () => {
	if (!showControls) {
	  setShowControls(true);
	}
	clearTimeout(timeoutRef.current);
	timeoutRef.current = setTimeout(() => {
	  setShowControls(false);
	}, 5000); 
  };
  
  useEffect(() => {
	const videoContainer = videoContainerRef.current;
	if (videoContainer) {
		videoContainer.addEventListener('mousemove', handleActivity);
		videoContainer.addEventListener('keypress', handleActivity);
	}

	return () => {
		if (videoContainer) {
			clearTimeout(timeoutRef.current);
			videoContainer.removeEventListener('mousemove', handleActivity);
			videoContainer.removeEventListener('keypress', handleActivity);
		}
	};
}, [showControls]);
  

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
			
							
							<div className={styles.containerRow}>
								
								{/* <div className={styles.card}>
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
								</div> */}
								
									<div 
									 className={`${styles.containerFixed} ${isPlaying ? styles.videoPlaying : styles.containerFixed}`}
									>
										<h1 className={styles.titre}>{film?.titre}</h1>
										<p className={styles.p}>{film?.description}</p>
									</div>
									
									{showIcon && <img src={iconSrc} className={styles.iconCenter} alt="Play/Pause" />}
									
									
 								<VideoPlayer src={"/inter.mp4"} />


							</div>
					</div>
			
		 
	);
};
FilmDetail.getInitialProps = async (context) => {
	const { query } = context;
	return { id: query.id || "" };
  };
  
export default FilmDetail;
