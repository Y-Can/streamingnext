// pages/index.js
import React, { useEffect, useState } from "react";
import Card from "./../components/Card";
import "./../app/globals.css";
const Films = () => {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("./api/films");
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
