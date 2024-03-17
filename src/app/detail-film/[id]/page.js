"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/filmdetail.module.css";
import Link from 'next/link';

const FilmDetail = ({ params }) => {
	console.log(params.id);
	
  const [film, setFilm] = useState(null);

  useEffect(() => {
	const id = params.id;
    const fetchData = async () => {
      if (id) {
        try {
          console.log(id, 'second');
          let apiUrl = `/api/films/?id=${encodeURIComponent(id)}`; 
          const response = await axios.get(apiUrl);
          const filmData = response.data;
		  const responseVotes = await axios.get(`/api/votes/${filmId}`);
		  const votes = responseVotes.data;
          setFilm(filmData.films[0]); 
          console.log(filmData, 'votes', votes);
        } catch (error) {
          console.error("Erreur lors de la requête API", error);
        }
      }
    };

    fetchData();
  }, []); 

	
	return (
		<div className={styles.container_col}>
			

			
					
					<div className={styles.block}>
						
						<div className={styles.titre}>
							
							<h1 className={styles.title}>{film?.titre}</h1>
						</div>
							
							<div className={styles.containerRow}>
								
								<div className={styles.containerCol}>
								<Link className={styles.btn} href={`/notation/${film.id}`}>
										<button className="unlink maxwidth" type="button">
											Noter le film 
										</button>
									</Link>
								<img src={film?.image} className={styles.img} alt="" />
								</div>
								
								<div className={styles.containerCol}>
									<video  className={styles.video} controls>
										<source src="/inter.mp4" type="video/mp4" />
									</video>
							
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
