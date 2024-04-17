"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/addfilm.module.css"; 

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

        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('image', image);
        formData.append('description', description);

        const response = await axios.post("../../../api/series", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.status === 201) {
            console.log("Serie ajouté :", response.data);
        } else {
            console.error("Erreur lors de l'ajout de la Serie");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Ajout de Serie</h1>
                <form className={styles.form} onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div className={styles.form}>
                        <div className={styles.label}>Titre</div>
                        <input
                            className={styles.input}
                            type="text"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                        />
                        <div className={styles.label}>Image</div>
                        <input
                            className={styles.input}
                            type="text"
                            onChange={(e) => setImage(e.target.value) }
                        />
                        <div className={styles.label}>Description</div>
                        <input
                            className={styles.input}
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button className={styles.button} type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};

export default NouvellePage;
