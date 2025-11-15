# 📝 NOTES_SERVEUR_NODE.JS

Dans le fichier package.json, il y a un script :  "scripts": {
    "dev": "node server.js"
  },
  il se lance en tapant dans un terminal : npm run dev. 
  qui se traduit par Node Package Management execute le script dev. 
  Il y a deux type de serveurs : production et dévelopement (voir si-dessous). Le serveur de développement se met à jour à chaque modification des fichiers. 
  
  ### 1. Serveur de développement
- Se met à jour automatiquement à chaque modification des fichiers (avec nodemon)  
- Affiche beaucoup de logs pour faciliter le debug  
- Non optimisé pour la production  

  ### 2. Serveur de production
- Stable et optimisé  
- Ne se redémarre pas automatiquement  
- Logs limités et erreurs cachées aux utilisateurs  


## 1. Types de serveur

### 🔹 Serveur de développement (Dev)
- Utilisé **pendant la phase de codage**
- Redémarre automatiquement dès qu’un fichier est modifié (**nodemon**)
- Affiche beaucoup de logs pour aider au debug
- Moins sécurisé, erreurs détaillées affichées
- Non optimisé pour les performances

### 🔹 Serveur de production (Prod)
- Utilisé **pour la mise en ligne**
- Ne redémarre pas automatiquement
- Logs limités, erreurs cachées pour les utilisateurs
- Optimisé pour les performances
- Sécurisé et stable
- Souvent lancé avec `node server.js` ou via un gestionnaire de processus (PM2, systemd, Docker…)

---

## 2. Scripts npm recommandés

| Nom du script | Commande réelle | Description |
|---------------|----------------|------------|
| `dev` | `nodemon server.js` | Lance le serveur en mode développement avec rechargement automatique |
| `start` | `node server.js` | Lance le serveur en mode production, stable et optimisé |

> **Remarque** : `dev` est une convention pour le développement. Tu peux mettre un autre nom si tu veux, mais `start` est spécial et peut être lancé avec `npm start` sans `run`.

---

## 3. Commandes à utiliser dans le terminal

### 🔹 Pour le développement
```bash
npm run dev
```

### 🔹 Pour la production
```bash
npm start
```

### 🔹 Pour arrêter le serveur en cours
```
Ctrl + C
```

### 🔹 Si tu veux garder le serveur actif et taper dans le terminal
- Ouvre un **nouveau terminal** dans VS Code  
  → `Terminal → Nouveau terminal`

---

## 4. Variables d’environnement

- `NODE_ENV` permet de savoir si tu es en développement ou en production  
```js
if (process.env.NODE_ENV === 'production') {
  // activer optimisations, cacher erreurs, etc.
}
```

- En dev, souvent `NODE_ENV=development`  
- En prod, souvent `NODE_ENV=production`

---

## 5. Astuces utiles

- Utiliser **nodemon** pour recharger automatiquement :  
```bash
npm install -g nodemon
nodemon server.js
```

- Pour lancer tout avec **une seule commande** : ajouter un script `"dev"` dans `package.json`

- Pour documenter tes scripts npm, utiliser ce fichier Markdown car **JSON ne supporte pas les commentaires**
