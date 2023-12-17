"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Card from "../../components/Card";
import "../../app/globals.css";
const Films = () => {
	const router = useRouter();
	const searchTerm = router.query.searchTerm || "";
	const [films, setFilms] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				let apiUrl = "./api/films";
				if (searchTerm) {
					apiUrl += `?search=${encodeURIComponent(searchTerm)}`;
				} 
				const res = await axios.get(apiUrl);
				const data = res.data;
				setFilms(data.films || []);
			} catch (error) {
				console.error("Erreur lors de la récupération des films", error);
				setFilms([]);
			}
		};
		fetchData();
	}, [ searchTerm]);
	return (
		<div className="containerCol">
			{" "}
			<div className="rowCenter">
				{" "}
				<h1>Liste des Films</h1>{" "}
			</div>{" "}
			<div className="containerRow">
				{" "}
				<Card films={films} />{" "}
			</div>{" "}
		</div>
	);
};
export default Films;
