/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { Inter } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
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
    <html lang="fr">
      <body className={inter.className}>
      <Navbar

				/>        {children}
        <Footer />
      </body>
    </html>
  );
}

