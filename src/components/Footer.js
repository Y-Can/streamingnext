// Footer.js
import React from "react";
import "../app/globals.css";
// Créez un fichier Footer.module.css pour les styles
const Footer = () => {
  return (
    <footer className="footer">
      <div className="column">
        <h4>Informations</h4>
        <ul>
          <li>À propos de nous</li> <li>Contactez-nous</li>
          <li>Politique de confidentialité</li>
        </ul>
      </div>
      {/* ... (autres colonnes) */}
      <div className="column">
        <h4>Contact</h4> <p>Email: contact@ZoneStream.com</p>
        <p>Téléphone: +1 234 567 890</p>
      </div>
      <div className="copyRight">
        <p>&copy; 2023 ZoneStream. Tous droits réservés.</p>
      </div>
    </footer>
  );
};
export default Footer;
