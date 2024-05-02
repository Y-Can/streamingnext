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
    const [video, setVideo] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleVideoChange = (event) => {
        setVideo(event.target.files[0]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token"); // Utiliser le token depuis le localStorage
        const fileSize = video.size; // Obtenir la taille du fichier vidéo

        // Créer un placeholder pour la vidéo sur Vimeo
        const placeholderResponse = await axios.post(
            "https://api.vimeo.com/me/videos",
            {
                upload: {
                    approach: "tus",
                    size: fileSize
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.vimeo.*+json;version=3.4'
                }
            }
        );

        if (placeholderResponse.status === 200) {
            const uploadLink = placeholderResponse.data.upload.upload_link;

            // Envoyer la vidéo à l'URL fournie par Vimeo
            const uploadResponse = await axios.patch(
                uploadLink,
                video,
                {
                    headers: {
                        'Tus-Resumable': '1.0.0',
                        'Upload-Offset': 0,
                        'Content-Type': 'application/offset+octet-stream'
                    }
                }
            );

            if (uploadResponse.status === 204) {
                console.log("Video uploaded successfully");

                // Ajouter les autres informations à votre API
                const formData = new FormData();
                formData.append('titre', titre);
                formData.append('image', image);
                formData.append('description', description);
                formData.append('videoUrl', placeholderResponse.data.uri);

                const response = await axios.post("../../../api/add_film", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 201) {
                    console.log("Film ajouté avec succès :", response.data);
                } else {
                    console.error("Erreur lors de l'ajout du film");
                }
            } else {
                console.error("Erreur lors du téléchargement de la vidéo sur Vimeo");
            }
        } else {
            console.error("Erreur lors de la création du placeholder vidéo sur Vimeo");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Ajout de film</h1>
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <label className={styles.label}>Titre</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                    />
                    <label className={styles.label}>Image</label>
                    <input
                        className={styles.input}
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label className={styles.label}>Vidéo</label>
                    <input
                        className={styles.input}
                        type="file"
                        onChange={handleVideoChange}
                    />
                    <label className={styles.label}>Description</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className={styles.button} type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
};

export default NouvellePage;
