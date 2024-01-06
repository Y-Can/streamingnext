/* eslint-disable no-undef */
// pages/inscription.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from 'next/link';
import styles from "../../styles/login.module.css";
import { useEffect } from "react"; 
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const { push } = useRouter();
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
      await new Promise(resolve => setTimeout(resolve,3000))
      const response = await axios.post("./../../api/register", {
        email,
        password,
        pseudo,
      });
      localStorage?.setItem("token", response.data.token); 			
      sessionStorage?.setItem("token", response.data.token);
      push('/');
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };
  return (
    <div className="container">
      <div className="login-container">
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
                    <div className={styles.btn}>
                      <button className={styles["unlink maxwidth"]} type="submit">
                        S'Inscrire
                      </button>
                    </div>
                    <Link className={styles.btn} href="/login">
											
											<button className="unlink maxwidth" type="button">
												
												Se Connecter
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
