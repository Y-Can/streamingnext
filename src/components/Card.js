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
    <div className="containerRowUl">
      <div className="containerCol maxheight">
        <div className="containerRowUl">
          {films.map((film) => (
            // <li
            //   key={film.id}
            //   onMouseEnter={() => handleMouseEnter(film.id)}
            //   onMouseLeave={handleMouseLeave}
            //   className={`li ${hoveredItemId === film.id ? "lihovered" : ""}`}
            //   id={`li-${film.id}`}
            // >
            //   <Link href={`/detail-film/${film.id}`}>
            //     {/* Assurez-vous qu'il n'y a qu'un seul élément <a> ici, et pas d'autres éléments <a> imbriqués */}
            //       <img src={film.image} alt={film.titre} />
            //       <h3>{film.titre}</h3>
            //       <p className={`p ${hoveredItemId === film.id ? "phover" : ""}`}>
            //         {film.description}
            //       </p>
            //   </Link>
            // </li>
            <div class="content-wrapper">
  
  <div class="news-card"
                key={film.id}
              onMouseEnter={() => handleMouseEnter(film.id)}
              onMouseLeave={handleMouseLeave}
              className={`li ${hoveredItemId === film.id ? "lihovered" : ""}`}
              id={`li-${film.id}`}
  >
    <Link href={`/detail-film/${film.id}`}>
    <a href="#" class="news-card__card-link"></a>
    <img src={film.image} alt={film.titre} class="news-card__image" />
    <div class="news-card__text-wrapper">
      <h2 class="news-card__title">{film.titre}</h2>
      {/* <div class="news-card__post-date">Jan 29, 2018</div> */}
      <div class="news-card__details-wrapper">
        <p class="news-card__excerpt"> {film.description}</p>
        <a href="#" class="news-card__read-more">Lire la suite <i class="fas fa-long-arrow-alt-right"></i></a>
      </div>
    </div>
    </Link>
  </div>

</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
