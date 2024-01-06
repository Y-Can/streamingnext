"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/profil.module.css";
import { useSearchParams } from "next/navigation";
const Profil = ({ params }) => {
	const id = params.id;
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`../../api/userprofil?id=${id}`);
				setUser(response.data);
			} catch (error) {
				setError(error.response.data.error || "Erreur lors de la requête.");
			}
		};
		fetchUserData();
	}, [id]);
	// Corrected dependency array
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
		
					</div>
				</>
			) : (
				<div>En chargement...</div>
			)}
		</div>
	);
};
export default Profil;
