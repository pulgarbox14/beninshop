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
- Commande : formulaire de livraison, paiement en ligne et historique des commandes
- Paiement Mobile Money ou carte bancaire via la passerelle PAYCORE
- Inscription / connexion avec JWT
- Mot de passe oublié : lien de réinitialisation envoyé par email (Resend)
- Interface entièrement responsive (mobile, tablette, ordinateur)

### Administration (`/admin`, réservée au rôle `admin`)
- Tableau de bord : nombre de produits, commandes, utilisateurs et chiffre d'affaires
- CRUD complet des produits (ajout, modification, suppression)
- Plusieurs images par produit : téléversement depuis l'ordinateur ou ajout d'un lien
- Consultation des catégories, des utilisateurs et des commandes
- Modification de ses propres informations (nom, email, mot de passe)
- Modification des liens vers les réseaux sociaux affichés dans le pied de page
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
│   ├── seed/            # données de départ (24 produits, compte admin)
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
npm run seed              # crée la base mini_ecommerce (24 produits + compte admin)
```

Contenu de `.env` :

Le fichier `.env.example` est séparé en deux blocs : ce qui se garde tel quel,
et les 4 lignes à remplir vous-même.

| Variable | À faire | Rôle |
| --- | --- | --- |
| `PORT` | garder | Port du serveur Express |
| `MONGO_URI` | garder | Connexion MongoDB locale |
| `JWT_EXPIRES_IN` | garder | Durée de validité du token |
| `CLIENT_URL` | garder | Origine autorisée pour le CORS |
| `JWT_SECRET` | **à remplir** | Clé de signature des JWT, longue et aléatoire |
| `ADMIN_NAME` | **à remplir** | Votre nom d'administrateur |
| `ADMIN_EMAIL` | **à remplir** | Votre email de connexion au tableau de bord |
| `ADMIN_PASSWORD` | **à remplir** | Votre mot de passe (6 caractères minimum) |
| `PAYCORE_SECRET_KEY` | facultatif | Clé secrète PAYCORE (`sk_live_…`) |
| `PAYCORE_WEBHOOK_SECRET` | facultatif | Secret de signature des webhooks (`whsec_…`) |
| `RESEND_API_KEY` | facultatif | Clé Resend pour l'envoi des emails (`re_…`) |
| `MAIL_FROM` | facultatif | Expéditeur des emails |

### Sécurité

- Mots de passe hachés avec bcrypt, jamais renvoyés par l'API
- JWT obligatoire sur les routes privées, rôle `admin` vérifié séparément
- L'inscription publique crée toujours un compte `user` : un administrateur ne peut
  être créé que par le seed
- 10 tentatives par quart d'heure sur connexion, inscription et mot de passe oublié
- En-têtes de sécurité (helmet), corps de requête limité à 200 ko
- Jeton de réinitialisation stocké haché, valable 1 heure et utilisable une seule fois
- Validation serveur : email, téléphone béninois, prix et stock positifs, adresse complète

### Paiement en ligne

Le règlement passe par **PAYCORE** (Mobile Money et carte bancaire) :

1. La commande est enregistrée avec le statut `en attente`.
2. `POST /api/payments/checkout` crée le paiement et redirige le client vers PAYCORE.
3. Au retour, `/paiement/merci` interroge l'API et passe la commande en `payée`.
4. En parallèle, le webhook `payment.succeeded` fait la même mise à jour côté serveur.

Sans `PAYCORE_SECRET_KEY`, la commande est quand même enregistrée : le client peut
la régler plus tard depuis « Mes commandes ».

Aucun identifiant n'est écrit dans le code : le serveur refuse de démarrer sans
`JWT_SECRET` et le seed s'arrête si une variable de compte manque.
Le fichier `.env` n'est jamais versionné (`.gitignore`), seul `.env.example` l'est.

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
| `npm run seed` (backend) | Remplit la base avec les 24 produits et le compte admin |
| `npm run seed:destroy` (backend) | Vide la base `mini_ecommerce` |
| `npm run build` (frontend) | Génère la version de production dans `dist/` |

---

## Comptes

`npm run seed` enregistre **le compte administrateur en base**, à partir des
valeurs de votre `.env` — c'est cette écriture dans MongoDB qui rend la connexion
possible. Aucun identifiant n'apparaît dans le code ni dans le dépôt.

Le seed peut être relancé sans risque : il réinitialise le catalogue, met à jour
l'administrateur (mot de passe re-haché) et **conserve les comptes clients et
leurs commandes**. Pour tout effacer : `npm run seed:destroy`.

Les comptes clients ne sont pas créés par le seed : ils s'inscrivent depuis la
page **Inscription** du site et sont enregistrés en base (mot de passe haché avec
bcrypt).

Pendant le développement, renseigner `VITE_DEMO_ADMIN` dans `frontend/.env`
affiche un rappel du compte admin sur la page de connexion. La variable est vide
par défaut et le build de production n'affiche jamais cet encart.

---

## API REST

Base : `http://localhost:5000/api`

### Authentification

| Méthode | Route | Accès | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | Inscription (mot de passe chiffré avec bcrypt) |
| POST | `/auth/login` | Public | Connexion, renvoie un JWT |
| GET | `/auth/me` | JWT | Profil de l'utilisateur connecté |
| PUT | `/auth/me` | JWT | Modifie son nom, son email ou son mot de passe |
| POST | `/auth/forgot-password` | Public | Envoie le lien de réinitialisation |
| POST | `/auth/reset-password` | Public | Applique le nouveau mot de passe |
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
| POST | `/upload` | Admin | Téléverse jusqu'à 6 images (5 Mo max, formats image) |

### Commandes et statistiques

| Méthode | Route | Accès | Description |
| --- | --- | --- | --- |
| POST | `/orders` | JWT | Enregistre une commande depuis le panier |
| GET | `/orders/mine` | JWT | Commandes de l'utilisateur connecté |
| GET | `/orders` | Admin | Toutes les commandes |
| PUT | `/orders/:id` | Admin | Change le statut d'une commande |
| GET | `/stats` | Admin | Statistiques du tableau de bord |
| POST | `/payments/checkout` | JWT | Crée le paiement PAYCORE et renvoie l'URL de checkout |
| GET | `/payments/:orderId` | JWT | Vérifie le statut du paiement auprès de PAYCORE |
| POST | `/payments/webhook` | PAYCORE | Notification signée (HMAC SHA-256) |
| GET | `/settings` | Public | Liens des réseaux sociaux |
| PUT | `/settings` | Admin | Modifie les liens des réseaux sociaux |

Les routes protégées attendent l'en-tête :

```
Authorization: Bearer <token>
```

---

## Modèles de données

**User** — `name`, `email` (unique), `password` (haché bcrypt), `role` (`user` \| `admin`), dates.

**Product** — `name`, `description`, `price`, `images[]` (galerie), `image` (visuel
principal, synchronisé sur la première image), `category`, `stock`, `rating`,
`numReviews`, `featured`, `createdAt` (date de création).

**Order** — `user`, `items[]` (produit, nom, prix, quantité), `total`, `shippingAddress`,
`status` (`en attente`, `payée`, `expédiée`, `livrée`, `annulée`), dates.

**Setting** — document unique contenant les liens `facebook`, `instagram`, `whatsapp`
et `youtube`, modifiables depuis le tableau de bord.

---

## Images des produits

Le catalogue compte 24 produits répartis en 5 catégories (Informatique, Accessoires,
Téléphonie, Impression, Réseau). En attendant les vraies photos, le seed réutilise
les visuels de la bannière (`frontend/public/images/imgban*.png`).

Pour mettre une vraie photo : tableau de bord → Produits → Modifier → bloc
« Images du produit », soit en téléversant un fichier, soit en collant un lien.

---

## Notes

- Toutes les données affichées proviennent de l'API : aucune donnée n'est codée en dur
  dans le frontend.
- Les appels HTTP sont centralisés dans `frontend/src/services/api.js` (instance Axios avec
  ajout automatique du JWT et gestion des erreurs).
- Les images des produits sont des illustrations SVG servies depuis `frontend/public/images`.
