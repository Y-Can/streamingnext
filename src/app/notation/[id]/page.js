"use client"
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/notation.module.css';

const VotingComponent = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const userString = sessionStorage.getItem('user');
  // Convertir la chaîne en objet JavaScript
  const user = userString ? JSON.parse(userString) : null;

  const submitVote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/notation', {  // Assurez-vous que l'URL est correcte
        filmId: params.id,
        notation: rating,
        userId: user.id,
      });

      console.log('Vote réussi:', response.data);
    } catch (e) {
      setError(e.response ? e.response.data : e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles["star-rating"]}>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button
              type="button"
              key={ratingValue}
              className={styles["star-button"]}
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className={ratingValue <= (hover || rating) ? styles["star-on"] : styles["star-off"]}>&#9733;</span>
            </button>
          );
        })}
      </div>
      <button className={styles["vote-button"]} onClick={submitVote}>Soumettre votre vote</button>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
    </div>
  );
};

export default VotingComponent;
