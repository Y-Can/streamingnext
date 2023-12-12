/* eslint-disable no-undef */
// pages/inscription.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/login.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

const SignupForm = () => {
	const { push } = useRouter();
	const [email, setEmail] = useState("");
	const [pseudo, setPseudo] = useState("");
	const [password, setPassword] = useState("");
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("./../api/login", {
				email,
				password,
			});
			localStorage?.setItem("token", response.data.token);
			sessionStorage?.setItem("token", response.data.token);
			console.log("Token:", response.data.token);
			push("/");
		} catch (error) {
			console.error("Erreur lors de la connexion:", error);
		}
	};
	return (
		<div className="container">
			<div className="login-container">
				{
					<div className={styles.container}>
						<div className={styles["login-container"]}>
							<h1 className={styles.h1}>Connexion</h1>
							<form onSubmit={handleLogin}>
								<div className={styles["container-col-left"]}>
									<p className={styles.p}>Email:</p>
									<input
										className={styles.input}
										type="email"
										value={email}
										onChange={handleEmailChange}
										required
									/>
								</div>

								<div className={styles["container-col-left"]}>
									<p className={styles.p}>Mot de passe:</p>
									<input
										className={styles.input}
										type="password"
										value={password}
										onChange={handlePasswordChange}
										required
									/>
								</div>

								<div className={styles.arround}>
									<div className={styles.btn}>
										<button className={styles["unlink maxwidth"]} type="submit">
											Se connecter
										</button>
									</div>
									<Link className={styles.btn} href="/register">
										
										<button className="unlink maxwidth" type="button">
											
											S'inscrire
										</button>
									</Link>
								</div>
							</form>
						</div>
					</div>
				}
			</div>
		</div>
	);
};
export default SignupForm;
