# 1. Image de base Node (LTS)
FROM node:18

# 2. Dossier de travail dans le conteneur
WORKDIR /app

# 3. Copier les fichiers package pour installer les dépendances
COPY package*.json ./

# 4. Installation des dépendances
RUN npm install

# 5. Copier tout le reste du projet dans le conteneur
COPY . .

# 6. Exposer le port 3000 (serveur Express)
EXPOSE 3000

# 7. Lancer ton serveur Node
CMD ["node", "server.js"]
