// FilmList.js
"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "@/utils/getToken";
import { authMiddleware } from "@/utils/authMiddleware";
const FilmList = () => {
	const [films, setFilms] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchFilms = async () => {
			try {
                const authToken = getAuthToken();
                
				const response = await axios.get("../../../api/user_film", {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				});
				const fetchedFilms = response.data.films;
				setFilms(fetchedFilms);
			} catch (error) {
				console.error("Erreur lors de la récupération des films", error);
				setError("Erreur lors de la récupération des films");
			}
		};
		fetchFilms();
	}, []);
	if (error) {
		return <div>Erreur : {error}</div>;
	}
	return (
		<div>
			{" "}
			<h2>Mes Films</h2>{" "}
			<ul>
				{" "}
				{films.map((film) => (
					<li key={film.id}>
						{" "}
						<h3>{film.titre}</h3> <p>{film.description}</p>{" "}
						{/* Autres informations sur le film */}{" "}
					</li>
				))}{" "}
			</ul>{" "}
		</div>
	);
};
export default FilmList;
