# FretXpress Website

Site web professionnel pour FretXpress - Transport et logistique.

## Déploiement sur Gandi.net

### Prérequis
- Compte Gandi.net avec Simple Hosting activé
- Clé SSH configurée dans votre compte Gandi
- Git installé localement

### Instructions de déploiement

1. **Préparer le projet :**
```bash
cd project
npm install
npm run build
```

2. **Initialiser Git (si pas déjà fait) :**
```bash
git init
git add .
git commit -m "Initial commit"
```

3. **Ajouter le remote Gandi :**
```bash
git remote add gandi git+ssh://961ac15e-4525-11f0-9146-00163eada87b@git.sd6.gpaas.net/default.git
```

4. **Déployer :**
```bash
./deploy.sh
```

### Structure du projet
- `src/` - Code source React/Vite
- `dist/` - Fichiers buildés (générés automatiquement)
- `.gandi.yml` - Configuration de déploiement Gandi (à la racine du dépôt)

### Commandes utiles
- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualiser le build

### Support
Pour toute question technique, contactez l'équipe de développement.