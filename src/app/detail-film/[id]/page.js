"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "../../styles/filmdetail.module.css";
import Link from 'next/link';

const FilmDetail = ({ params }) => {
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(0.5);
	const [playbackRate, setPlaybackRate] = useState(1.0);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.volume = volume;
			videoRef.current.playbackRate = playbackRate;
		}
	}, [volume, playbackRate]);

	const togglePlay = () => {
		if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current.play();
				setIsPlaying(true);
			} else {
				videoRef.current.pause();
				setIsPlaying(false);
			}
		}
	};

	const changeVolume = (e) => {
		setVolume(e.target.value);
	};

	const changePlaybackRate = (rate) => {
		setPlaybackRate(rate);
	};

	const [film, setFilm] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			if (params.id) {
				try {
					const response = await axios.get(`/api/films/?id=${encodeURIComponent(params.id)}`);
					setFilm(response.data.films[0]);
				} catch (error) {
					console.error("Erreur lors de la requête API", error);
				}
			}
		};

		fetchData();
	}, [params.id]);

	return (
		<div className={styles.container_col}>
			<div className={styles.block}>
				<div className={styles.titre}>
					<h1 className={styles.title}>{film?.titre}</h1>
				</div>
				<div className={styles.containerRow}>
					<div className={styles.card}>
						<img src={film?.image} className={styles.img} alt="" />
					</div>
					<div className={styles.videoPlayer}>
						<video ref={videoRef} className={styles.video} controls>
							<source src={film?.videoUrl} type="video/mp4" />
						</video>
						<div className={styles.controls}>
							<button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
							<input type="range" min="0" max="1" step="0.01" value={volume} onChange={changeVolume} />
							<button onClick={() => changePlaybackRate(1.0)}>Normal</button>
							<button onClick={() => changePlaybackRate(1.5)}>1.5x</button>
							<button onClick={() => changePlaybackRate(2.0)}>2x</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

FilmDetail.getInitialProps = async (context) => {
	const { query } = context;
	return { params: { id: query.id || "" } };
};

export default FilmDetail;
