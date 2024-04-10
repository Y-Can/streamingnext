import React, { useState } from "react";
import "../app/globals.css";
import Link from "next/link";

const Card = ({ films, onMouseEnter = null, onMouseLeave = null }) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseEnter = (filmId) => {
    setHoveredItemId(filmId);
    if (onMouseEnter) {
      onMouseEnter();
    }
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

 
  return (
    <div className="container">
      {films.map((film) => (
        <div
          key={film.id}
          className={`card ${hoveredItemId === film.id ? "hovered" : ""}`}
          onMouseEnter={() => setHoveredItemId(film.id)}
          onMouseLeave={() => setHoveredItemId(null)}
        >
          <div className="card_circle"></div> {/* Cercle décoratif */}
          <h2>{film.titre}</h2>
          <p>{film.description}</p>
          <div className="cta-container">
            <Link href={`/detail-film/${film.id}`}>
              <a className="cta">En savoir plus</a>
            </Link>
          </div>
          <Link href={`/detail-film/${film.id}`}>
            <a>
              <img src={film.image} alt={film.titre} />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Card;
