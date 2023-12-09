// pages/index.js
import React, { useEffect, useState } from "react";
import Card from "./../components/Card";
import "./../app/globals.css";
const Films = () => {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/films");
        console.log(res, "la réponse de l'API");
        const data = await res.json();
        console.log(data, "données récupérées de l'API");
        setFilms(data.films || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des films", error);
        setFilms([]);
      }
    };
    fetchData();
  }, []);
  console.log("ça build la page ok", films);
  return (
    <div className="containerCol">
      <div className="rowCenter">
        <h1>Liste des Films</h1>
      </div>
      <div className="containerRow">
        <Card films={films} />{" "}
      </div>{" "}
    </div>
  );
};
export default Films;
