const express = require("express");
const app = express();

// Dossier qui contient ton HTML, CSS, images
app.use(express.static("public"));

app.get("/hello", (req, res) => {
  res.send("Bonjour Grand Maître 👑 depuis ton serveur !");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
