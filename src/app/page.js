// pages/index.js
"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Card from "./../components/Card";
import "./../app/globals.css";
const Home = () => {

	return (
		<div className="containerCol">
			
			{/* <Navbar
				searchTerm={searchTerm}
				onSearchTermChange={handleSearchTermChange}
			/> */}
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
