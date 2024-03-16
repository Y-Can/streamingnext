"use client"
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/notation.module.css';

const VotingComponent = ({params}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  
  const userString = sessionStorage.getItem('user');

// Convertir la chaîne en objet JavaScript
const user = userString ? JSON.parse(userString) : null;

  const submitVote = async ( notation) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('./../notation', {
        filmId: params.id,
        notation: notation,
        userId: user.id,
      });

      console.log(response.data);
    } catch (e) {
      setError(e.response ? e.response.data : e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div>
      {/* Interface utilisateur pour le vote */}
      <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
    
      <button onClick={() => submitVote(5)}>Vote</button>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
    </div>
  );
};

export default VotingComponent;
