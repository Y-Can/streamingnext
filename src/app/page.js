// pages/index.js
"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Card from "./../components/Card";
import "./globals.css";
import Navbar from "@/components/Navbar";
const Home = () => {
	const router = useRouter();

	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const search = searchParams.get("search");
	const [films, setFilms] = useState([]);
	const [searchTerm, setSearchTerm] = useState(search);
	const [user, setUser] = useState(null); 
	
		
	useEffect(() => {
		
		// const fetchData = async () => {
		// 	try {
		// 		let apiUrl = "./api/films";
		// 		if (id !== null) {
		// 			apiUrl += `?id=${encodeURIComponent(id)}`;
		// 		} else if (searchTerm !== null) {
		// 			apiUrl += `?search=${encodeURIComponent(searchTerm)}`;
		// 		}
		// 		const res = await axios.get(apiUrl);
		// 		const data = res.data;
		// 		setFilms(data.films || []);
		// 	} catch (error) {
		// 		console.error("Erreur lors de la récupération des films", error);
		// 		setFilms([]);
		// 	}
			
		//};
			// test
			const fetchFilm = async () => {
				try {
					let apiUrl = "/../api/films";
					if (id !== null) {
						apiUrl += `?id=${encodeURIComponent(id)}`;
					} else if (searchTerm !== null) {
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
		fetchFilm()
		// fetchData();
	}, [id, searchTerm]);
	const handleSearchTermChange = (newSearchTerm) => {
		setSearchTerm(newSearchTerm);
	};
	return (

			<div className="containerCol">
					<Card films={films} />
					{/* <Card series={series} /> */}
			</div>

	);
};
export default Home;
