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
        isOpen === true ? setIsOpen(false) : setIsOpen(true);
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
            <Link href="/">Accueil</Link>
            <div className="wrap-search">
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
            <div className="dropdown-toggle" onClick={toggleMenu}>
                {/* Icône ou texte pour le bouton du menu hamburger */}
                <span>Menu</span>
            </div>
                        {isOpen && (
                                    <nav className="navbar">
                                        <div onClick={toggleMenu} className="right">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
<path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 12.21875 10.78125 L 10.78125 12.21875 L 14.5625 16 L 10.78125 19.78125 L 12.21875 21.21875 L 16 17.4375 L 19.78125 21.21875 L 21.21875 19.78125 L 17.4375 16 L 21.21875 12.21875 L 19.78125 10.78125 L 16 14.5625 Z"></path>
</svg>
                                        </div>
                                    <a href="/" className="nav-logo">Logo</a>
                                        <ul className="menu__box" tabIndex="">
                                    <li className="menu__item">
                                        <Link href="/myprofil">Mon Profil</Link>
                                    </li>
                                    <li className="menu__item">
                                        <Link href="/option1">Mes films</Link>
                                    </li>
                                    {user.type === "ADMIN" && (
                                        <li className="menu__item">
                                            <Link href="/add_film">Ajout de film</Link>
                                        </li>
                                    )}
                                    <li onClick={handleLogout} className="menu__item">
                                        Se déconnecter
                                    </li>
                                </ul>
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

