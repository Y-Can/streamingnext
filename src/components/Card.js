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
        <ul className="containerRowUl">
          {films.map((film) => (
            <li
              key={film.id}
              onMouseEnter={() => handleMouseEnter(film.id)}
              onMouseLeave={handleMouseLeave}
              className={`card transition`}
              id={`li-${film.id}`}
            >
              <Link href={`/detail-film/${film.id}`}>
                {/* Assurez-vous qu'il n'y a qu'un seul élément <a> ici, et pas d'autres éléments <a> imbriqués */}
                  <img src={film.image} alt={film.titre} />
                  <h3 className={'transition'}>{film.titre}</h3>
                  <p >
                    {film.description}
                  </p>
                  <div class="cta-container transition"><a href="#" class="cta">Call to action</a></div>
  <div class="card_circle transition"></div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
