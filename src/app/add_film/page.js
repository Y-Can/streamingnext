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
    const [video, setVideo] = useState(null); // Ajout de l'état pour la vidéo

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const handleVideoChange = (event) => {
        const selectedVideo = event.target.files[0];
        setVideo(selectedVideo); // Gérer le changement de la vidéo
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Créer FormData pour Vimeo
        const videoFormData = new FormData();
        videoFormData.append('file_data', video);
        videoFormData.append('name', titre);
        videoFormData.append('description', description);

        // Envoyer la vidéo à Vimeo et obtenir l'URL
        const vimeoResponse = await axios.post("https://api.vimeo.com/me/videos", videoFormData, {
            headers: {
                'Authorization': `8835816b62f0f4fc06a438d43407348d`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (vimeoResponse.status === 200) {
            const videoUrl = vimeoResponse.data.link;

            // Créer FormData pour l'API interne
            const formData = new FormData();
            formData.append('titre', titre);
            formData.append('image', image);
            formData.append('description', description);
            formData.append('videoUrl', videoUrl); // Ajouter l'URL de la vidéo à formData

            // Envoyer formData à l'API interne
            const response = await axios.post("../../../api/add_film", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 201) {
                console.log("Film ajouté avec vidéo :", response.data);
            } else {
                console.error("Erreur lors de l'ajout du film");
            }
        } else {
            console.error("Erreur lors du téléchargement de la vidéo sur Vimeo");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Ajout de film</h1>
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
                            type="file"
                            onChange={handleImageChange}
                        />
                        <div className={styles.label}>Vidéo</div>
                        <input
                            className={styles.input}
                            type="file"
                            onChange={handleVideoChange}
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
