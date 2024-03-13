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
        setIsOpen(true);
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
                    
                    <div >
                        <button onClick={toggleMenu} className="dropdown-toggle">
                            Menu
                        </button>
                        {isOpen && (
                                    <nav className="navbar">
                                    <a href="/" className="nav-logo">Logo</a>
                                    <div className="nav-items">
                                        <a href="/about">À propos</a>
                                        <a href="/services">Services</a>
                        
                                        {/* Dropdown */}
                                        <div className="nav-item dropdown">
                                            <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>Dropdown</button>
                                            {isOpen && (
                                                <div className="dropdown-content">
                                                    <a href="/link1">Lien 1</a>
                                                    <a href="/link2">Lien 2</a>
                                                    <a href="/link3">Lien 3</a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </nav>
                            // <ul className="menu__box" onBlur={closeMenu} tabIndex="0">
                            //     <li className="menu__item">
                            //         <Link href="/myprofil">Mon Profil</Link>
                            //     </li>
                            //     <li className="menu__item">
                            //         <Link href="/option1">Mes films</Link>
                            //     </li>
                            //     {user.type === "ADMIN" && (
                            //         <li className="menu__item">
                            //             <Link href="/add_film">Ajout de film</Link>
                            //         </li>
                            //     )}
                            //     <li onClick={handleLogout} className="menu__item">
                            //         Se déconnecter
                            //     </li>
                            // </ul>
                        )}
                    </div>
                ) : (
                    <div>
                        <Link href="/login">Se Connecter</Link>
                    </div>
                )}
            </div>

            {isOpen &&(
                
					<div className="menu-mobile">
						<ul>
							<li><Link href="/">Accueil</Link></li>
							{user && (
								<>
									<li><Link href="/myprofil">Mon Profil</Link></li>
									<li><Link href="/mesfilms">Mes Films</Link></li>
									{user.type === "ADMIN" && <li><Link href="/admin">Admin</Link></li>}
								</>
							)}
							<li onClick={handleLogout}>Se déconnecter</li>
						</ul>
					</div>
				
            )}
        </nav>
    );
};

export default Navbar;

