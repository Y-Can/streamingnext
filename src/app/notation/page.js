"use client"
import React, { useState } from 'react';
import axios from 'axios';

const VotingComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitVote = async (filmId, notation) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('URL_DE_VOTRE_API/votes', {
        filmId: filmId,
        notation: notation,
        userId: localStorage.getItem('user'),
      });

      // Traitez la réponse selon vos besoins
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
      <button onClick={() => submitVote('ID_DU_FILM', 5)}>Vote</button>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
    </div>
  );
};

export default VotingComponent;
