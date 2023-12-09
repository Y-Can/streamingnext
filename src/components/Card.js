// components/FilmList.js
"use client"
import React from "react";
import "../app/globals.css";
const Card = ({ films }) => (
	console.log('les données', films),
	<div className="containerRow">
		
		<div className={"containerCol"}>
			
			<ul className={"containerRow"}>
				
				{films.map((film) => (
					<li key={film.id}>
						
						<img src={film.image} alt={film.titre} /> <h3>{film.titre}</h3>
						<p>{film.description}</p>
					</li>
				))}
			</ul>
		</div>
	</div>
);
export default Card;
