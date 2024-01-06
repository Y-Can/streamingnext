# Utilisation d'une image Node.js 
FROM node:18
# Création et définition du répertoire de travail 
WORKDIR /app  
# Copie des fichiers package.json et package-lock.json 
COPY package*.json ./  
# Installation des dépendances 
RUN npm install  
# Copie des fichiers de l'application 
COPY . .  
# Build de l'application Next.js 
RUN npm run build  
# Expose le port sur lequel l'application écoute 
EXPOSE 3000  
# Commande pour démarrer l'application 
CMD ["npm", "start"]