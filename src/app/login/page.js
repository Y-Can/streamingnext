/* eslint-disable no-undef */
// pages/inscription.js
"use client";
import React, { useState } from "react";
import axios from "axios";

import styles from "../styles/login.module.css";

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
      const response = await axios.post("./../pages/api/signup", {
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
        <h1 className={styles.h1}>Inscription</h1>
          {
            <div className={styles.container}>
              <div className={styles["login-container"]}>
                <h1 className={styles.h1}>Inscription</h1>
                <form onSubmit={handleSignup}>
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
                    <p className={styles.p}>Pseudo:</p>
                    <input
                      className={styles.input}
                      type="text"
                      value={pseudo}
                      onChange={handlePseudoChange}
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
                  <div className={styles["container-col-left"]}>
                    <p className={styles.p}>Confirmer le Mot de passe:</p>
                    <input
                    className={styles.input}
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className= {styles.arround}>
                    {/* <Link className="btn" to="/login">
											
											<button className="unlink maxwidth" type="button">
												
												Se Connecter
											</button>
										</Link> */}
                    <div className={styles.btn}>
                      <button className={styles["unlink maxwidth"]} type="submit">
                        S'Inscrire
                      </button>
                    </div>
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
