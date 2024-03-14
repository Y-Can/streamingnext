// Navbar.js
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import loupe from "/public/loupe.svg";
import axios from "axios";
import { FiAlignRight, FiXCircle, FiChevronDown } from "react-icons/fi";
import User from '../models/user';

const Navbar = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

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

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
    };

    return (
        <nav className="navbar">
            {/* Contenu de la Navbar, y compris les liens de navigation, le logo, etc. */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Recherche..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">
                    <Image src={loupe} alt="Search" />
                </button>
            </form>
            {user ? (
                <>
                    {/* Liens utilisateurs connectés */}
                    <Link href="/dashboard">Tableau de bord</Link>
                    {user.type === "ADMIN" && <Link href="/add_film">Ajouter un film</Link>}
                    <button onClick={handleLogout}>Déconnexion</button>
                </>
            ) : (
                <>
                    {/* Liens utilisateurs non connectés */}
                    <Link href="/login">Connexion</Link>
                    <Link href="/register">Inscription</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
