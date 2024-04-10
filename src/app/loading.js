"use client"
import React from "react";
import styles from "./styles/Loader.module.css";
export default function Loading(){
	return (
		<div className={styles.loaderContainer}>
			
			<div className={styles.loader}></div>
		</div>
	);
};
