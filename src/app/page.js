// pages/index.js
"use client"
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Card from "./../components/Card";
import "./globals.css";
import playIcon from './../../../../public/icons/play-button.png'; 
import pauseIcon from './../../../../public/icons/pause-button.png';

const Home = () => {
	const router = useRouter();

	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const search = searchParams.get("search");
	const [films, setFilms] = useState([]);
	const [series, setSeries] = useState([]);

	const [searchTerm, setSearchTerm] = useState(search);
	const [user, setUser] = useState(null); 
	
	// POUR LECTEUR VIDEO 
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
		
		const fetchSerie = async () => {
			try {
				let apiUrl = "/../api/series";
				if (id !== null) {
					apiUrl += `?id=${encodeURIComponent(id)}`;
				} else if (searchTerm !== null) {
					apiUrl += `?search=${encodeURIComponent(searchTerm)}`;
				}
				const res = await axios.get(apiUrl);
				const data = res.data;
				setSeries(data.series || []);
			} catch (error) {
				console.error("Erreur lors de la récupération des series", error);
				setFilms([]);
			}
			
		};
			
			const fetchFilm = async () => {
				try {
					let apiUrl = "/../api/films";
					if (id !== null) {
						apiUrl += `?id=${encodeURIComponent(id)}`;
					} else if (searchTerm !== null) {
						apiUrl += `?search=${encodeURIComponent(searchTerm)}`;
					}
					const res = await axios.get(apiUrl);
					const data = res.data;
					setFilms(data.films || []);
					// temporaire en attendant la requete film du moment
					setFilm(data.films[0]|| [])
				} catch (error) {
					console.error("Erreur lors de la récupération des films", error);
					setFilms([]);
				}
				
			};
		fetchFilm()
		fetchSerie();
	}, [id, searchTerm]);
	const handleSearchTermChange = (newSearchTerm) => {
		setSearchTerm(newSearchTerm);
	};
	return (

			<div className="containerCol">
											<div className={'containerRow'}>
							
								
									<div 
									 className={`${'containerFixed'} ${isPlaying ? 'videoPlaying' : 'containerFixed'}`}
									>
										<h1 className={'titre'}>{film?.titre}</h1>
										<p className={'p'}>{film?.description}</p>
									</div>
									
									{showIcon && <img src={iconSrc} className={'iconCenter'} alt="Play/Pause" />}
									
									<video controls
									ref={videoContainerRef}
									poster="/icons/posterimitation.webp"
									  className={`${'video'} `}
									>
										<source src="/inter.mp4" type="video/mp4" />
									</video>
									<div className={isPlaying ? "info playing" : "info"}>
										{showIcon ? "Playing" : "Paused"}
									</div>
							</div>
					<Card films={films} />
					<Card series={series} />
			</div>

	);
};
export default Home;
