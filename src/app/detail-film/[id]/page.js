"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "../../styles/filmdetail.module.css";
import Link from 'next/link';

const FilmDetail = ({ params }) => {
  const [film, setFilm] = useState(null);
  const [votes, setVotes] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume initial à 100%

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

    const fetchNote = async () => {
      if (params.id) {
        try {
          const responseVotes = await axios.get(`/api/notation/?id=${encodeURIComponent(params.id)}`);
          setVotes(responseVotes.data);
        } catch (error) {
          console.error("Erreur lors de la requête API", error);
        }
      }
    };

    fetchNote();
    fetchData();
  }, [params.id]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    if (videoRef.current) {
      videoRef.current.volume = e.target.value;
      setVolume(e.target.value);
    }
  };

  return (
    <div className={styles.container_col}>
      <div className={styles.block}>
        <div className={styles.titre}>
          <h1 className={styles.title}>{film?.titre}</h1>
        </div>
        <div className={styles.containerRow}>
          <div className={styles.card}>
            <img src={film?.image} className={styles.img} alt="" />
            {/* Votre contenu supplémentaire ici */}
          </div>
          <div className={styles.containerCol}>
            <video ref='/inter.mp4' src='/inter.mp4' className={styles.video} controls>
              <source src='/inter.mp4' type="video/mp4" />
            </video>
            <div className={styles.videoControls}>
              <button onClick={togglePlayPause}>
                {isPlaying ? "Pause" : "Play"}
              </button>
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
            </div>
            <p className={styles.p}>{film?.description}</p>
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
