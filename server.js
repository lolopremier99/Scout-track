const express = require("express");
const path = require("path");
const app = express();

// Sert les fichiers statiques (HTML, CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Route par défaut
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Utilise le port fourni par Render ou 3000 en local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur du Grand Maître en écoute sur le port ${PORT}`);
});
