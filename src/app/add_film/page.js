"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
// Assurez-vous d'importer votre fichier CSS ici pour qu'il soit pris en compte
import './LoginSignupForm.css';

const NouvellePage = () => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			if (typeof window !== "undefined") {
				const token = localStorage.getItem("token");
					const response = await axios.get("../../../api/user", {
						headers: { Authorization: `Bearer ${token}` },
					});
					const { id } = response.data;
					const userData = { id };
					setUser(userData);
			}
		};
		fetchData();
	}, []);

	const [titre, setTitre] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('titre', titre);
		formData.append('image', image);
		formData.append('description', description);

		const response = await axios.post("../../../api/add_film", formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		if (response.status === 201) {
			console.log("Film ajouté :", response.data);
		} else {
			console.error("Erreur lors de l'ajout du film");
		}
	};

	return (
		<div className="container">
			<div className="signup-container">
				<h1>Ajout de film</h1>
				<form onSubmit={handleFormSubmit} encType="multipart/form-data">
					<div className="form">
						<div className="label">Titre</div>
						<input
							className="input"
							type="text"
							value={titre}
							onChange={(e) => setTitre(e.target.value)}
						/>
						<div className="label">Image</div>
						<input
							className="input"
							type="file"
							onChange={handleImageChange}
						/>
						<div className="label">Description</div>
						<input
							className="input"
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<button className="button" type="submit">Ajouter</button>
				</form>
			</div>
		</div>
	);
};

export default NouvellePage;
