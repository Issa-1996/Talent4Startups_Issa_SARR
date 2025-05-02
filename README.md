# Talent4Startups

Une plateforme de mise en relation entre startups et talents.

## Structure du Projet

Le projet est composé de deux parties principales :
- `frontend/` : Application frontend en Vue.js
- `src/` : Backend Node.js avec Express

## Prérequis

- Node.js (version 16 ou supérieure)
- npm (gestionnaire de paquets Node.js)
- PostgreSQL (pour la base de données)

## Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
cd Talent4Startups
```

2. Configuration de l'environnement :
   - Copier `.env.example` en `.env`
   - Configurer les variables d'environnement dans `.env`

3. Installation des dépendances backend :
```bash
npm install
```

4. Installation des dépendances frontend :
```bash
cd frontend
npm install
```

## Démarrage du Projet

1. Démarrer le serveur backend :
```bash
npm run dev
```

2. Dans un autre terminal, démarrer le frontend :
```bash
cd frontend
npm run dev
```

## Structure des Dossiers

- `/frontend` : Application Vue.js
  - `src/components/` : Composants Vue
  - `src/App.vue` : Composant principal

- `/src` : Backend Node.js
  - `config/` : Configuration
  - `models/` : Modèles de données
  - `migrations/` : Migrations de la base de données
  - `seeders/` : Données de test

## Fonctionnalités

- Authentification (inscription/connexion)
- Gestion des produits
- Interface utilisateur moderne avec Vue.js

## Contribuer

1. Créer une branche pour votre fonctionnalité :
```bash
git checkout -b feature/NomDeLaFonctionnalité
```

2. Commit vos changements :
```bash
git commit -m 'Ajout de la fonctionnalité X'
```

3. Pousser vers la branche :
```bash
git push origin feature/NomDeLaFonctionnalité
```

