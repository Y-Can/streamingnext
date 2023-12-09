// pages/inscription.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
const SignupForm = () => {
	const [email, setEmail] = useState("");
	const [pseudo, setPseudo] = useState("");
	const [password, setPassword] = useState("");
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePseudoChange = (e) => {
		setPseudo(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/signup", {
				email,
				password,
				pseudo,
			});
			console.log("Token:", response.data.token);
		} catch (error) {
			console.error("Erreur lors de l'inscription:", error);
		}
	};
	return (
		<div className="container">
			
			<div className="login-container">
				
				<h1>Inscription</h1>
				<form onSubmit={handleSignup}>
					
					{
						<div className="container">
							<div className="login-container">
								
								<h1>Inscription</h1>
								<form onSubmit={handleSignup}>
									
									<div className="container-col-left">
										
										<p>Email:</p>
										<input
											type="email"
											value={email}
											onChange={handleEmailChange}
											required
										/>
									</div>
									<div className="container-col-left">
										
										<p>Pseudo:</p>
										<input
											type="text"
											value={pseudo}
											onChange={handlePseudoChange}
											required
										/>
									</div>
									<div className="container-col-left">
										
										<p>Mot de passe:</p>
										<input
											type="password"
											value={password}
											onChange={handlePasswordChange}
											required
										/>
									</div>
									<div className="container-col-left">
										
										<p>Confirmer le Mot de passe:</p>
										<input
											type="password"
											value={password}
											onChange={handlePasswordChange}
											required
										/>
									</div>
									<div className=" arround">
										
										{/* <Link className="btn" to="/login">
											
											<button className="unlink maxwidth" type="button">
												
												Se Connecter
											</button>
										</Link> */}
										<div className="btn">
											
											<button className="unlink maxwidth" type="submit">
												S'Inscrire
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					}
				</form>
			</div>
		</div>
	);
};
export default SignupForm;
