"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Card from "../components/Card";
import "./globals.css";
import Navbar from "@/components/Navbar";

const Home = () => {
  const router = useRouter();
  const [films, setFilms] = useState([]);

  // Utilisation de useEffect pour écouter les changements de l'URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "/api/films";
        const { id, search } = router.query; // Récupération des paramètres de l'URL

        if (id) {
          apiUrl += `?id=${encodeURIComponent(id)}`;
        } else if (search) {
          apiUrl += `?search=${encodeURIComponent(search)}`;
        }

        const res = await axios.get(apiUrl);
        const data = res.data;
        setFilms(data.films || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des films", error);
        setFilms([]);
      }
    };

    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, router.query]); // Dépendances mises à jour pour inclure router.isReady et router.query

  return (
    <div className="containerCol">
      <Navbar onSearch={handleSearchTermChange} /> {/* Assurez-vous que Navbar accepte une prop onSearch et la gère correctement */}
      <div className="rowCenter">
        <h1>Liste des Films</h1>
      </div>
      <div className="containerRow">
        <Card films={films} />
      </div>
    </div>
  );
};

export default Home;
