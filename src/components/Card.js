import React, { useState } from "react";
import "../app/globals.css";
import Link from "next/link";
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
						<Link  href={{     pathname: '/detail-film/' + film.id,  }}>
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
						</Link>
					))}{" "}
				</ul>{" "}
			</div>{" "}
		</div>
	);
};
export default Card;
