import React, { useState } from "react";
import "../app/globals.css";
import Link from "next/link";
import Slider from "react-slick"; // Import the Slider component
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from './Arrows';




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



    // Settings for the slider
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: false,
      autoplaySpeed: 2000,
      cssEase: "300ms ease-in-out",
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

  return (
    <div className="containerRowUl">
      <div className="containerCol maxheight">
        <div className="containerRowUlCards">
          <Slider {...settings}>
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
                    <a href={`/detail-film/${film.id}`} className="news-card__read-more">Lire la suite <i className="fas fa-long-arrow-alt-right"></i></a>
                  </div>
                </div>
              </Link>
              {hoveredItemId === film.id && trailerUrl && (
                <div className="coverBlack">
                  <video
                    blurDataURL={trailerUrl}
                    autoPlay
                    loop
                    controls // Changed to show controls
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    allowFullScreen
                  >
                    Votre navigateur ne supporte pas la balise vidéo.
                  </video>
                </div>
              )}
            </div>
          ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Card;

function getTrailerUrl(filmId) {
  // Mock implementation, replace with actual API call if needed
  try {
    // Simulate fetching URL
    const url = `/inter.mp4`;
    return url;
  } catch (error) {
    console.error('Failed to fetch trailer URL:', error);
    return '';  // Return an empty string or fallback URL if the fetch fails
  }
}

