// pages/Navbar.js
import React from "react";
import Link from "next/link";
import Image from "next/image";
import loupe from "/public/loupe.svg";
import "../app/globals.css";
// Assurez-vous que le chemin de l'image est correct
const Navbar = () => {
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
            <Image src={loupe} alt="Loupe" height={25} width={25} />
          </button>
        </div>
      </div>
      <div>
        <Link href="/login">Se Connecter </Link>
      </div>
    </nav>
  );
};
export default Navbar;
