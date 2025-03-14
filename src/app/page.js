// pages/index.js
"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Card from "./../components/Card";
import "./globals.css";
import playIcon from "../../public/icons/play-button.png";
import pauseIcon from "../../public/icons/pause-button.png";

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const search = searchParams.get("search");

  const [films, setFilms] = useState([]);
  const [animes, setAnimes] = useState([])
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(search);
  const [user, setUser] = useState(null);
  const [film, setFilm] = useState(null);

  // POUR LECTEUR VIDÉO
  const videoContainerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [iconSrc, setIconSrc] = useState(playIcon);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const video = videoContainerRef.current;
    if (video) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  useEffect(() => {
    if (videoContainerRef.current) {
      if (videoContainerRef.current.paused) {
        videoContainerRef.current.play();
        setIsPlaying(true);
        setIconSrc(pauseIcon);
      } else {
        videoContainerRef.current.pause();
        setIsPlaying(false);
        setIconSrc(playIcon);
      }
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 1000);
    }
  }, []);

  // Gestion des contrôles vidéo
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
      videoContainer.addEventListener("mousemove", handleActivity);
      videoContainer.addEventListener("keypress", handleActivity);
    }
    return () => {
      if (videoContainer) {
        clearTimeout(timeoutRef.current);
        videoContainer.removeEventListener("mousemove", handleActivity);
        videoContainer.removeEventListener("keypress", handleActivity);
      }
    };
  }, [showControls]);

  // Récupération des films et séries depuis ton API Backend
  useEffect(() => {
    const fetchFilms = async () => {
      try {
          let apiUrl = "https://api.monapi.site/movies";
          let queryParams = [];
  
          if (id) {
              queryParams.push(`id=${encodeURIComponent(id)}`);
          } else if (searchTerm) {
              queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
          }
  
          queryParams.push("limit=10"); // Ajouter une limite par défaut
          apiUrl += queryParams.length ? `?${queryParams.join("&")}` : "";
  
          const res = await axios.get(apiUrl);
          const data = res.data;
          
          setFilms(data.movies || []); // Corrigé
          setFilm(data.movies?.[0] || null);
      } catch (error) {
          console.error("Erreur lors de la récupération des films", error);
          setFilms([]);
      }
  };
  

  const fetchSeries = async () => {
    try {
        let apiUrl = "https://api.monapi.site/series?limit=10"; // Ajouter une limite

        const res = await axios.get(apiUrl);
        const data = res.data;

        setSeries(data.series || []);
    } catch (error) {
        console.error("Erreur lors de la récupération des séries", error);
        setSeries([]);
    }
};

    
    const fetchAnimes = async (newPage) => {
      if (loading) return;
      setLoading(true);
  
      try {
          const res = await axios.get(`https://api.monapi.site/animes`);
          const data = res.data;
          
          setAnimes(data.animes); // On remplace par la nouvelle page au lieu de concaténer
          setPage(newPage); // Met à jour la page actuelle
      } catch (error) {
          console.error("Erreur lors de la récupération des animes", error);
      } finally {
          setLoading(false);
      }
  };

    fetchFilms();
    fetchSeries();
    fetchAnimes(1);
  }, [id, searchTerm]);

  return (
    <div className="containerCol">
      <div className={"containerRowUne"}>
        <div
          className={`${
            "containerFixed"
          } ${isPlaying ? "videoPlaying" : "containerFixed"}`}
        >
          <h1 className={"titre"}>{film?.titre}</h1>
          <p className={"p"}>{film?.description}</p>
        </div>

        {showIcon && (
          <img src={iconSrc} className={"iconCenter"} alt="Play/Pause" />
        )}

        <video
          controls
          ref={videoContainerRef}
          poster="/icons/posterimitation.webp"
          className={`${"video"} `}
        >
          <source src="/inter.mp4" type="video/mp4" />
        </video>
      </div>
      <Card films={films} type={"Films"} />
      <Card series={series} type={"Séries"} />
      <Card animes={animes} type={"Animes"} />
    </div>
  );
};

export default Home;
