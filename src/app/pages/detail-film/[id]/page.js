"use client"
 import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";
import styles from "../../../styles/filmdetail.module.css";
const FilmDetail = ({ params }) => {
	const [film, setFilm] = useState(null);
	console.log(params.id);
	useEffect(() => {
		const fetchData = async () => {
			try {
				let apiUrl = `./../../api/films/?id=${encodeURIComponent(params.id)}`;
				const response = await axios.get(apiUrl);
				const filmData = response.data;
				setFilm(filmData.films[0]);
			} catch (error) {
				console.error("Erreur lors de la requête API", error);
			}
		};
		if (params.id) {
			fetchData();
		}
	}, [params.id]);
	return (
		<div className={styles.container_col}>
			{" "}
			{film ? (
				<>
					{" "}
					<div className={styles.block}>
						{" "}
						<div className={styles.titre}>
							{" "}
							<h1 className={styles.title}>{film.titre}</h1>{" "}
						</div>{" "}
						<div className={styles.containermax}>
							{" "}
							<div className={styles.containerRow}>
								{" "}
								<img src={film.image} className={styles.img} alt="" />{" "}
								<p className={styles.p}>{film.description}</p>{" "}
							</div>{" "}
						</div>{" "}
					</div>{" "}
				</>
			) : (
				<p>Chargement en cours...</p>
			)}{" "}
			<div className="container-col">{/* Autres éléments de la page */}</div>{" "}
		</div>
	);
};
FilmDetail.getInitialProps = async (context) => {
	const { query } = context;
	return { id: query.id || "" };
};
export default FilmDetail;
