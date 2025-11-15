const express = require("express");
const app = express();
const os = require("os");

// Dossier qui contient ton HTML, CSS, images
app.use(express.static("public"));

// Route de test
app.get("/hello", (req, res) => {
  res.send("Bonjour Grand Maître 👑 depuis ton serveur !");
});

const PORT = 3000;

// Obtenir l'adresse IP locale pour le réseau
const ip = Object.values(os.networkInterfaces())
  .flat()
  .filter(i => i?.family === "IPv4" && !i.internal)[0]?.address;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  if (ip) console.log(`Réseau local: http://${ip}:${PORT}`);
});
