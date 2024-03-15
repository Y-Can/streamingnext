"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/filmdetail.module.css";

const FilmDetail = ({ id }) => {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          console.log(id, 'second');
          let apiUrl = `/api/films/?id=${encodeURIComponent(id)}`; // Ajustez selon la structure de votre projet
          const response = await axios.get(apiUrl);
          const filmData = response.data;
          setFilm(filmData.films[0]); // Assurez-vous que cela correspond à la structure de la réponse de votre API
          console.log(filmData);
        } catch (error) {
          console.error("Erreur lors de la requête API", error);
        }
      }
    };

    fetchData();
  }, [id]); 

	
	return (
		<div className={styles.container_col}>
			

			
					
					<div className={styles.block}>
						
						<div className={styles.titre}>
							
							<h1 className={styles.title}>{film?.titre}</h1>
						</div>
						<div className={styles.containermax}>
							
							<div className={styles.containerRow}>
								
								<img src={film?.image} className={styles.img} alt="" />
								<p className={styles.p}>{film?.description}</p>
							</div>
						</div>
					</div>
			
		 
		</div>
	);
};
FilmDetail.getInitialProps = async (context) => {
	const { query } = context;
	return { id: query.id || "" };
  };
  
export default FilmDetail;
