"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
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
	const handleImageChange = (event) => {
		const selectedImage = event.target.files[0];
		setImage(selectedImage);
	};
	const handleFormSubmit = async (event) => {
		event.preventDefault();

			const response = await axios.post("/api/add_film", {user:user.id,titre:titre,image:image,description:description});
			if (response.status === 201) {
				console.log("Film ajouté :", response.data);
			} else {
				console.error("Erreur lors de l'ajout du film");
			}
	};
	return (
		<div className="container-row">
			
			<div className="container-col">
				
				<h1>Ajout de film</h1>
				<form onSubmit={handleFormSubmit} encType="multipart/form-data">
					
					<div className="container-col">
						
						<label>
							
							Titre
							<input
								type="text"
								value={titre}
								onChange={(e) => setTitre(e.target.value)}
							/>
						</label>
						<label>
							
							Image
							<input
								value={image}
								type="text"
								onChange={(e) => setImage(e.target.value)}
							/>
						</label>
						<label>
							
							Description
							<input
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</label>
					</div>
					<button type="submit">Ajouter</button>
				</form>
			</div>
		</div>
	);
};
export default NouvellePage;
