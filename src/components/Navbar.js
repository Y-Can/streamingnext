"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import loupe from "/public/loupe.svg";
import axios from "axios";

const Navbar = () => {
    const [search, setSearchTerm] = useState("");
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("/api/user", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const { id, pseudo, mail, type } = response.data;
                    const userData = { id: id, pseudo: pseudo, email: mail, type: type };
                    setUser(userData);
                } catch (error) {
                    console.error("Erreur:", error);
                    localStorage.clear("token");
                }
            }
        };
        fetchData();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/api/films?search=${encodeURIComponent(search)}`);
            const data = res.data;
            router.push(`/?search=${encodeURIComponent(search)}`);
        } catch (error) {
            console.error("Error fetching search results", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="menu-hamburger" onClick={toggleMenu}>
                {/* Icône ou texte pour le bouton du menu hamburger */}
                <span>Menu</span>
            </div>

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
                                    <Link href="/myprofil">Mon Profil</Link>
                                </li>
                                <li className="option">
                                    <Link href="/option1">Mes films</Link>
                                </li>
                                {user.type === "ADMIN" && (
                                    <li className="option">
                                        <Link href="/add_film">Ajout de film</Link>
                                    </li>
                                )}
                                <li onClick={handleLogout} className="option">
                                    Se déconnecter
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

            {/* Affichage conditionnel du menu basé sur l'état isOpen */}
            {isOpen && (
                <div className="menu-mobile">
                    {/* Structure de votre menu pour les petits écrans */}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
