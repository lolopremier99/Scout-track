// server.js
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import os from "os";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const app = express();

// --- Middleware ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
}));

// --- Supabase ---
const SUPABASE_URL = 'https://msccoudtbwmgtvwhksfm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zY2NvdWR0YndtZ3R2d2hrc2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDM0MDMsImV4cCI6MjA3ODc3OTQwM30.bmP5Y1oXSu38Mxc_1SruGTgV3zVNUs1YB47qWZwPEgs';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Routes ---

// Page de login
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// Test serveur
app.get("/hello", (req, res) => {
  res.send("Bonjour Grand Maître 👑 depuis ton serveur !");
});

// Route POST pour login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Chercher l'utilisateur par login ou email
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .or(`login.eq.${username},email.eq.${username}`)
      .single();

    if (fetchError) {
      return res.send("Utilisateur non trouvé ❌");
    }

    // Vérifier le mot de passe
    const match = await bcrypt.compare(password, user.password_hash);
    if (match) {
      req.session.user = user;
      res.redirect("/dashboard");
    } else {
      res.send("Mot de passe incorrect ❌");
    }
  } catch (err) {
    console.error(err);
    res.send("Erreur serveur ❌");
  }
});

// Dashboard protégé
app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send(`Bienvenue ${req.session.user.login} sur ton dashboard 👑`);
  } else {
    res.redirect("/");
  }
});

// --- Lancer le serveur ---
const PORT = process.env.PORT || 3000;
const ip = Object.values(os.networkInterfaces())
  .flat()
  .filter(i => i?.family === "IPv4" && !i.internal)[0]?.address;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  if (ip) console.log(`Réseau local: http://${ip}:${PORT}`);
});
