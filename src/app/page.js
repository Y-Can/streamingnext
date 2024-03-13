// pages/index.js
"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Card from "./../components/Card";
import "./globals.css";
import Navbar from "@/components/Navbar";
const Home = () => {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const search = searchParams.get("search");
	const [films, setFilms] = useState([]);
	const [searchTerm, setSearchTerm] = useState(search);
	const [user, setUser] = useState(null); 
		
	useEffect(() => {
		const fetchData = async () => {
			try {
				let apiUrl = "./api/films";
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
		fetchData();
	}, [id, searchTerm]);
	const handleSearchTermChange = (newSearchTerm) => {
		setSearchTerm(newSearchTerm);
	};
	return (
		<div className="containerCol">
			
			<Navbar
				searchTerm={searchTerm}
				onSearchTermChange={handleSearchTermChange}
			/>
			<div className="rowCenter">
				
				<h1>Liste des Films</h1>
			</div>
			<div className="containerRow">
				<Card films={films} />
			</div>
		</div>
	);
};
export default Home;
