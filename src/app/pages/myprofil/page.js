"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./../../styles/myprofil.module.css";
const Profil = () => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const response = await axios.get("../api/user", {
						headers: { Authorization: `Bearer ${token}` },
					});
					const { id, pseudo, mail, type } = response.data;
					const userData = { id: id, pseudo: pseudo, email: mail, type: type };
					console.log("les logs user", userData);
					setUser(userData);
				} catch (error) {
					console.error("Erreur:", error);
				}
			}
		};
		fetchData();
	}, []);
	// Empty dependency array to run the effect only once
	return (
		<div className={styles.body}>
			
			{user ? (
				<>
					
					<div className={styles.main}>
						
						<div className={styles["profile-info"]}>
							
							<div className={styles["profile-picture"]}>
								
								<img src="profile-picture.jpg" alt="Profile Picture" />
							</div>
							<div className={styles["user-details"]}>
								
								<h2>Pseudo : {user.pseudo}</h2> <p>Email: {user.mail}</p>
								<p>Country: France</p> <p>Member Since: January 2020</p>
							</div>
						</div>
						<div className={styles["edit-profile"]}>
							
							<a href="#">Modifier le Profil</a>
						</div>
					</div>
				</>
			) : (
				<div>En chargement...</div>
			)}
		</div>
	);
};
export default Profil;
