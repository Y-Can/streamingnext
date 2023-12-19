"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import loupe from "/public/loupe.svg";
import axios from "axios";
import "../app/globals.css";
const Navbar = () => {
	const [search, setSearchTerm] = useState("");
	const [user, setUser] = useState(null);
	const [isOpen, setIsOpen] = useState(false); 	

	const token = localStorage.getItem("token");
	useEffect(() => {
	if (token) {
		const fetchData = async () => {
			try {
				const response = await axios.get("/api/user", {
					headers: { Authorization: `Bearer ${token}` },
				});
				const { id, pseudo, mail, type } = response.data;
				const userData = { id: id, pseudo: pseudo, email: mail, type: type };
				setUser(userData);
			} catch (error) {
				console.error("Erreur:", error);
			}
		};
		fetchData();
	}
})
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const closeMenu = () => {
		setIsOpen(false);
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		setUser(null);
		push("/");
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.get(
				`/api/films?search=${encodeURIComponent(search)}`
			);
			const data = res.data;
			console.log("Search results:", data.films);
			// Perform client-side navigation to the homepage with the search query
			window.location.href = `/?search=${encodeURIComponent(search)}`;
		} catch (error) {
			console.error("Error fetching search results", error);
		}
	};
	return (
		<nav className="navbar">
			<Link href="/">Accueil</Link>
			<div className="wrap">
				<form onSubmit={handleSearch}>
					<div className="search">
						<input
							type="text"
							className="searchTerm"
							placeholder="What are you looking for?"
							value={search}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button type="submit" className="searchButton">
							<Image className="loupe" src={loupe} alt="Loupe" />
						</button>
					</div>
				</form>
			</div>
			<div>
				{user ? (
					<div className="dropdown">
						<button onClick={toggleMenu} className="dropdown-toggle">
							Menu
						</button>
						{isOpen && (
							<ul className="dropdown-menu" onBlur={closeMenu} tabIndex="0">
								<li className="option">
									<Link href="/option2">Mon Profil</Link>
								</li>
								<li className="option">
									<Link href="/option1">Mes films</Link>
								</li>
								{user.type === "ADMIN" && (
									<Link href="/add_film">
										<li className="option">Ajout de film</li>
									</Link>
								)}
								<li onClick={handleLogout} className="option">
									Se deconnecter
								</li>
							</ul>
						)}
					</div>
				) : (
					<div>
						<Link href="/login">Se Connecter</Link>
					</div>
				)}
			</div>
		</nav>
	);
};
export default Navbar;
