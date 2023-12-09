import React, { useState } from "react";
import "../app/globals.css";
const Card = ({ films, onMouseEnter = null, onMouseLeave = null }) => {
	const [hoveredItemId, setHoveredItemId] = useState(null);
	const handleMouseEnter = (filmId) => {
		setHoveredItemId(filmId);
		if (onMouseEnter) {
			onMouseEnter();
		}
	};
	const handleMouseLeave = () => {
		setHoveredItemId(null);
		if (onMouseLeave) {
			onMouseLeave();
		}
	};
	return (
		<div className="containerRow">
			{" "}
			<div className={"containerCol maxheight"}>
				{" "}
				<ul className={"containerRow"}>
					{" "}
					{films.map((film) => (
						<li
							key={film.id}
							onMouseEnter={() => handleMouseEnter(film.id)}
							onMouseLeave={handleMouseLeave}
							className={`li ${hoveredItemId === film.id ? "lihovered" : ""}`}
							id={`li-${film.id}`}
						>
							{" "}
							<img src={film.image} alt={film.titre} /> <h3>{film.titre}</h3>{" "}
							<p key={film.id}
              id={`li-${film.id}`}
               className={`p ${hoveredItemId === film.id ? "phover" : ""}`}
              >{film.description}</p>{" "}
						</li>
					))}{" "}
				</ul>{" "}
			</div>{" "}
		</div>
	);
};
export default Card;
