# BeninShop — Mini site e-commerce MERN

Application web complète de vente en ligne (boutique béninoise) développée avec la stack **MERN** :
**MongoDB · Express · React · Node.js**.

Les visiteurs consultent le catalogue et remplissent leur panier, les administrateurs gèrent
le catalogue depuis un tableau de bord protégé par JWT.

---

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Arborescence du projet](#arborescence-du-projet)
- [Installation](#installation)
- [Lancement](#lancement)
- [Comptes de démonstration](#comptes-de-démonstration)
- [API REST](#api-rest)
- [Modèles de données](#modèles-de-données)

---

## Fonctionnalités

### Boutique
- Page d'accueil : bannière défilante, liste des produits, services, newsletter
- Catalogue : recherche, filtre par catégorie, tri et pagination
- Fiche produit : image, description, prix, catégorie, stock, ajout au panier
- Panier : quantités, suppression d'une ligne, vidage complet, total
- Commande : formulaire de livraison et historique des commandes
- Inscription / connexion avec JWT
- Interface entièrement responsive (mobile, tablette, ordinateur)

### Administration (`/admin`, réservée au rôle `admin`)
- Tableau de bord : nombre de produits, commandes, utilisateurs et chiffre d'affaires
- CRUD complet des produits (ajout, modification, suppression)
- Consultation des catégories, des utilisateurs et des commandes
- Mise à jour du statut d'une commande

---

## Technologies

| Backend | Frontend |
| --- | --- |
| Node.js / Express | React 18 (Vite) |
| MongoDB / Mongoose | React Router v6 |
| bcrypt (chiffrement) | Axios |
| jsonwebtoken (JWT) | CSS (design system maison) |
| cors, dotenv | Context API (auth + panier) |

---

## Arborescence du projet

```
beninshop/
├── backend/
│   ├── config/          # connexion MongoDB
│   ├── controllers/     # logique métier (auth, produits, commandes, stats)
│   ├── middleware/      # JWT, rôle admin, gestion des erreurs
│   ├── models/          # schémas Mongoose (User, Product, Order)
│   ├── routes/          # routes Express
│   ├── seed/            # jeu de données de départ (8 produits)
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/images/   # illustrations des produits et de la bannière
    ├── src/
    │   ├── components/  # Navbar, Footer, ProductCard, layouts, etc.
    │   ├── context/     # AuthContext, CartContext
    │   ├── pages/       # pages boutique + pages/admin
    │   ├── services/    # appels Axios centralisés (api.js)
    │   ├── styles/      # feuilles de style
    │   ├── App.jsx      # routage React Router
    │   └── main.jsx
    └── package.json
```

---

## Installation

Prérequis : **Node.js 18+** et **MongoDB** installé et démarré localement.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # puis ajuster les valeurs si besoin
npm run seed              # crée la base mini_ecommerce et insère 8 produits
```

Contenu de `.env` :

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini_ecommerce
JWT_SECRET=beninshop_secret_key_a_changer
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

# Comptes créés par le seed
ADMIN_NAME=Admin BeninShop
ADMIN_EMAIL=admin@beninshop.bj
ADMIN_PASSWORD=admin123
CLIENT_NAME=Client Test
CLIENT_EMAIL=client@beninshop.bj
CLIENT_PASSWORD=client123
```

Le fichier `.env` n'est jamais versionné (`.gitignore`), seul `.env.example` l'est.
Changer `JWT_SECRET` et les mots de passe avant toute mise en ligne.

### 2. Frontend

```bash
cd frontend
npm install
```

Le frontend appelle l'API via le proxy Vite (`/api` → `http://localhost:5000`).
Pour viser une autre adresse, créer un fichier `.env` avec `VITE_API_URL=...`.

---

## Lancement

Deux terminaux :

```bash
# Terminal 1 — API
cd backend && npm run dev        # http://localhost:5000

# Terminal 2 — Interface
cd frontend && npm run dev       # http://localhost:5173
```

Scripts utiles :

| Commande | Effet |
| --- | --- |
| `npm run seed` (backend) | Remplit la base avec 8 produits, 2 comptes et 3 commandes |
| `npm run seed:destroy` (backend) | Vide la base `mini_ecommerce` |
| `npm run build` (frontend) | Génère la version de production dans `dist/` |

---

## Comptes de démonstration

Créés par `npm run seed` à partir des variables du `.env` :

| Rôle | Email | Mot de passe |
| --- | --- | --- |
| Administrateur | `admin@beninshop.bj` | `admin123` |
| Client | `client@beninshop.bj` | `client123` |

Ces identifiants sont rappelés sur la page de connexion **en mode développement
uniquement** (`npm run dev`). Le build de production ne les affiche pas.

---

## API REST

Base : `http://localhost:5000/api`

### Authentification

| Méthode | Route | Accès | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | Inscription (mot de passe chiffré avec bcrypt) |
| POST | `/auth/login` | Public | Connexion, renvoie un JWT |
| GET | `/auth/me` | JWT | Profil de l'utilisateur connecté |
| GET | `/auth/users` | Admin | Liste des utilisateurs |

### Produits

| Méthode | Route | Accès | Description |
| --- | --- | --- | --- |
| GET | `/products` | Public | Liste (filtres `search`, `category`, `sort`, `page`, `limit`) |
| GET | `/products/:id` | Public | Détail d'un produit |
| POST | `/products` | Admin | Création |
| PUT | `/products/:id` | Admin | Modification |
| DELETE | `/products/:id` | Admin | Suppression |
| GET | `/products/categories/all` | Public | Catégories et nombre de produits |

### Commandes et statistiques

| Méthode | Route | Accès | Description |
| --- | --- | --- | --- |
| POST | `/orders` | JWT | Enregistre une commande depuis le panier |
| GET | `/orders/mine` | JWT | Commandes de l'utilisateur connecté |
| GET | `/orders` | Admin | Toutes les commandes |
| PUT | `/orders/:id` | Admin | Change le statut d'une commande |
| GET | `/stats` | Admin | Statistiques du tableau de bord |

Les routes protégées attendent l'en-tête :

```
Authorization: Bearer <token>
```

---

## Modèles de données

**User** — `name`, `email` (unique), `password` (haché bcrypt), `role` (`user` \| `admin`), dates.

**Product** — `name`, `description`, `price`, `image`, `category`, `stock`, `rating`,
`numReviews`, `featured`, `createdAt` (date de création).

**Order** — `user`, `items[]` (produit, nom, prix, quantité), `total`, `shippingAddress`,
`status` (`en attente`, `payée`, `expédiée`, `livrée`, `annulée`), dates.

---

## Notes

- Toutes les données affichées proviennent de l'API : aucune donnée n'est codée en dur
  dans le frontend.
- Les appels HTTP sont centralisés dans `frontend/src/services/api.js` (instance Axios avec
  ajout automatique du JWT et gestion des erreurs).
- Les images des produits sont des illustrations SVG servies depuis `frontend/public/images`.
