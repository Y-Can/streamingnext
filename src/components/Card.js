import React, { useState } from "react";
import "../app/globals.css";
import Link from "next/link";

const Card = ({ films, onMouseEnter = null, onMouseLeave = null }) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [timer, setTimer] = useState(null);

  const handleMouseEnter = (filmId) => {
    setHoveredItemId(filmId);
    const url = getTrailerUrl(filmId);  // Assurez-vous d'implémenter cette fonction pour récupérer les URLs des bandes-annonces
    const newTimer = setTimeout(() => {
      setTrailerUrl(url);
    }, 2000); // Set a timeout for 2 seconds
    setTimer(newTimer);
    if (onMouseEnter) {
      onMouseEnter();
    }
  };

  const handleMouseLeave = () => {
    if (timer) {
      clearTimeout(timer); // Clear the timer if the user leaves before 2 seconds
    }
    setTrailerUrl(''); // Clear the trailer URL
    setHoveredItemId(null);
    if (onMouseLeave) {
      onMouseLeave();
    }
  };


  return (
    <div className="containerRowUl">
      <div className="containerCol maxheight">
        <div className="containerRowUl">
          {films.map((film) => (
            <div className="news-card"
                 key={film.id}
                 onMouseEnter={() => handleMouseEnter(film.id)}
                 onMouseLeave={handleMouseLeave}
                 id={`li-${film.id}`}>
              <Link href={`/detail-film/${film.id}`}>
                <a href="#" className="news-card__card-link"></a>
                <img src={film.image} alt={film.titre} className="news-card__image" />
                <div className="news-card__text-wrapper">
                  <h2 className="news-card__title">{film.titre}</h2>
                  <div className="news-card__details-wrapper">
                    <p className="news-card__excerpt">{film.description}</p>
                    <a href="#" className="news-card__read-more">Lire la suite <i className="fas fa-long-arrow-alt-right"></i></a>
                  </div>
                </div>
              </Link>
              {hoveredItemId === film.id && trailerUrl && (
                <iframe
                  src={trailerUrl}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                ></iframe>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;


function getTrailerUrl(filmId) {
  // Implémentez cette fonction pour retourner l'URL de la bande-annonce basée sur l'ID du film
  return "https://example.com/trailer-url"; // Placeholder URL
}
