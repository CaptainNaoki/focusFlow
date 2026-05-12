# 📅 Mon Planning

Application de planning personnel hebdomadaire — PWA installable, fonctionne hors ligne.

## 🚀 Déploiement (GitHub + Vercel)

### Étape 1 — GitHub

1. Va sur [github.com](https://github.com) → **New repository**
2. Nom : `mon-planning` (ou ce que tu veux)
3. Visibilité : **Public** (requis pour Vercel gratuit)
4. **Ne pas** cocher "Add README" (il est déjà inclus)
5. Clique **Create repository**
6. Ensuite sur ta machine (ou GitHub Desktop) :

```bash
git init
git add .
git commit -m "🚀 Initial commit — Mon Planning PWA"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/mon-planning.git
git push -u origin main
```

### Étape 2 — Vercel

1. Va sur [vercel.com](https://vercel.com) → **Sign up with GitHub**
2. Clique **Add New → Project**
3. Sélectionne ton repo `mon-planning`
4. Framework preset : **Other**
5. Laisse tout par défaut → **Deploy**
6. Ton URL sera `mon-planning.vercel.app` ✅

### Étape 3 — Installer sur smartphone

#### Android (Chrome)
1. Ouvre l'URL Vercel dans Chrome
2. Menu ⋮ → **Ajouter à l'écran d'accueil**
3. L'app s'installe comme une vraie appli

#### iOS (Safari)
1. Ouvre l'URL dans Safari
2. Bouton Partager → **Sur l'écran d'accueil**

### Mises à jour

Chaque `git push` sur `main` redéploie automatiquement sur Vercel.
Le Service Worker met à jour l'app automatiquement au prochain chargement.

## 📁 Structure

```
mon-planning/
├── index.html      ← Application complète
├── sw.js           ← Service Worker (offline)
├── manifest.json   ← Config PWA
├── icon-192.png    ← Icône app
├── icon-512.png    ← Icône app HD
├── vercel.json     ← Config Vercel
└── README.md
```
