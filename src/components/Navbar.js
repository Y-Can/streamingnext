// pages/Navbar.js
"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import loupe from "/public/loupe.svg";
import "../app/globals.css";
import axios from "axios";
import User from "../models/user.js";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { push } = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const closeMenu = () => {
		setIsOpen(false);
	};

  const handleLogout = () => {  
      localStorage.removeItem('token');
      setUser(null);
      console.log(localStorage.getItem("token"));
      push('/'); 
    };
	const [user, setUser] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			if (typeof window !== "undefined") {
				const token = localStorage.getItem("token");
				try {
					const response = await axios.get("../../api/user", {
						headers: { Authorization: `Bearer ${token}` },
					});
					const { id, pseudo, mail, type } = response.data;
					const userData = new User({ id:id, pseudo:pseudo, email: mail, type: type });
					setUser(userData);
				} catch (error) {
					console.error("Erreur:", error);
				}
			}
      
		};
		fetchData();
	}, []);
	return (
		<nav className="navbar">
			<Link href="/">Accueil</Link>
			<div className="wrap">
				<div className="search">
					<input
						type="text"
						className="searchTerm"
						placeholder="What are you looking for?"
					/>
					<button type="submit" className="searchButton">
						<Image className="loupe" src={loupe} alt="Loupe" />
					</button>
				</div>
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
									<Link href="/option2">
									Mon	Profil
									</Link>
								</li>
								<li className="option">
									<Link href="/option1">
										Mes films
									</Link>
								</li>
                {user.type === 'ADMIN' && (   <li className="option">Ajout de film</li> )}
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
