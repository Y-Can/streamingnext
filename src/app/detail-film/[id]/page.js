"use client"
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Pusher from 'pusher-js';
import styles from "../../styles/filmdetail.module.css";
import playIcon from './../../../../public/icons/play-button.png'; 
import pauseIcon from './../../../../public/icons/pause-button.png';
import Link from 'next/link';

function setupVideoSync(videoRef) {
    const pusher = new Pusher('APP_KEY', { cluster: 'eu' });
    const channel = pusher.subscribe('video-channel');

    channel.bind('play-video', () => {
        videoRef.current.play();
    });

    channel.bind('pause-video', () => {
        videoRef.current.pause();
    });

    channel.bind('seek-video', (data) => {
        videoRef.current.currentTime = data.time;
    });
}

const FilmDetail = ({ params }) => {
    const videoContainerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [film, setFilm] = useState(null);

    useEffect(() => {
        const video = videoContainerRef.current;
        if (video) {
            setupVideoSync(videoContainerRef);
            video.addEventListener('play', () => setIsPlaying(true));
            video.addEventListener('pause', () => setIsPlaying(false));
        }

        return () => {
            if (video) {
                video.removeEventListener('play', () => setIsPlaying(true));
                video.removeEventListener('pause', () => setIsPlaying(false));
            }
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/films/?id=${encodeURIComponent(params.id)}`);
                setFilm(response.data.films[0]);
            } catch (error) {
                console.error("Erreur lors de la requête API", error);
            }
        };

        if (params.id) {
            fetchData();
        }
    }, [params.id]);

    return (
        <div className={styles.container_col}>
            <div className={styles.containerRow}>
                <video ref={videoContainerRef} className={styles.video} controls>
                    <source src="/inter.mp4" type="video/mp4" />
                </video>
                {isPlaying ? <img src={pauseIcon} alt="Pause Icon" /> : <img src={playIcon} alt="Play Icon" />}
            </div>
        </div>
    );
};

FilmDetail.getInitialProps = async (context) => {
    const { query } = context;
    return { params: { id: query.id || "" } };
};

export default FilmDetail;
