"use client"
import React from "react";
import styles from "./styles/Loader.module.css";
// Assurez-vous d'avoir un fichier CSS pour styliser votre loader
export default function Loading(){
	return (
		<div className={styles.loaderContainer}>
			
			<div className={styles.loader}></div>
		</div>
	);
};
