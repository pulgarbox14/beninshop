// Produits de depart. Les 8 premiers sont ceux du sujet.
const image = (slug) => `/images/products/${slug}.png`;

module.exports = [
  // ---------- Informatique ----------
  {
    name: 'Ordinateur HP',
    description:
      "Ordinateur portable HP 15 pouces, processeur Intel Core i5, 8 Go de RAM et 512 Go de SSD. Idéal pour le travail, les études et la bureautique au quotidien.",
    price: 350000,
    image: image('ordinateur-hp'),
    category: 'Informatique',
    stock: 20,
    rating: 5,
    numReviews: 24,
    featured: true,
  },
  {
    name: 'Disque SSD',
    description:
      "Disque SSD Samsung 1 To, vitesse de lecture jusqu'à 560 Mo/s. Boostez le démarrage et les performances de votre ordinateur.",
    price: 55000,
    image: image('disque-ssd'),
    category: 'Informatique',
    stock: 15,
    rating: 5,
    numReviews: 27,
    featured: true,
  },
  {
    name: 'Écran Samsung',
    description:
      "Écran Samsung 24 pouces Full HD, dalle IPS et sorties HDMI/VGA. Des couleurs fidèles pour le travail comme pour le divertissement.",
    price: 110000,
    image: image('ecran-samsung'),
    category: 'Informatique',
    stock: 10,
    rating: 4.5,
    numReviews: 19,
    featured: true,
  },
  {
    name: 'PC Portable Lenovo',
    description:
      "Lenovo IdeaPad 14 pouces, processeur Intel Celeron, 4 Go de RAM et 256 Go de SSD. Un premier ordinateur fiable pour les étudiants.",
    price: 150000,
    image: image('pc-lenovo'),
    category: 'Informatique',
    stock: 12,
    rating: 4,
    numReviews: 8,
  },
  {
    name: 'Unité centrale Dell',
    description:
      "Tour Dell Vostro, Intel Core i3, 8 Go de RAM et 500 Go de stockage. Livrée prête à brancher pour un poste de bureau complet.",
    price: 220000,
    image: image('unite-centrale-dell'),
    category: 'Informatique',
    stock: 7,
    rating: 4.5,
    numReviews: 6,
  },
  {
    name: 'Barrette RAM 8 Go',
    description:
      "Mémoire DDR4 8 Go 2666 MHz. Doublez la fluidité de votre ordinateur pour un budget réduit.",
    price: 28000,
    image: image('barrette-ram'),
    category: 'Informatique',
    stock: 24,
    rating: 4.5,
    numReviews: 11,
  },

  // ---------- Accessoires ----------
  {
    name: 'Souris Logitech',
    description:
      "Souris sans fil Logitech, capteur optique précis et autonomie longue durée. Connexion USB immédiate, prise en main confortable pour droitiers et gauchers.",
    price: 8000,
    image: image('souris-logitech'),
    category: 'Accessoires',
    stock: 50,
    rating: 4.5,
    numReviews: 56,
    featured: true,
  },
  {
    name: 'Clavier Gamer',
    description:
      "Clavier mécanique rétro-éclairé RGB, touches anti-ghosting et repose-poignets. Conçu pour le gaming comme pour la saisie intensive.",
    price: 25000,
    image: image('clavier-gamer'),
    category: 'Accessoires',
    stock: 30,
    rating: 4.5,
    numReviews: 34,
    featured: true,
  },
  {
    name: 'Casque Bluetooth',
    description:
      "Casque audio Bluetooth avec réduction de bruit, micro intégré et 20 heures d'autonomie. Son puissant et coussinets confortables.",
    price: 45000,
    image: image('casque-bluetooth'),
    category: 'Accessoires',
    stock: 25,
    rating: 4.5,
    numReviews: 18,
    featured: true,
  },
  {
    name: 'Webcam HD',
    description:
      "Webcam HD 1080p avec micro intégré et correction automatique de la luminosité. Parfaite pour les visioconférences et les cours en ligne.",
    price: 30000,
    image: image('webcam-hd'),
    category: 'Accessoires',
    stock: 18,
    rating: 4.5,
    numReviews: 11,
    featured: true,
  },
  {
    name: 'Clé USB 64 Go',
    description:
      "Clé USB 3.0 de 64 Go, transfert rapide et boîtier métallique résistant. Emportez tous vos documents partout avec vous.",
    price: 12000,
    image: image('cle-usb'),
    category: 'Accessoires',
    stock: 40,
    rating: 5,
    numReviews: 42,
    featured: true,
  },
  {
    name: 'Sacoche pour ordinateur',
    description:
      "Sacoche rembourrée 15,6 pouces, compartiment pour chargeur et documents. Protège votre ordinateur pendant vos déplacements.",
    price: 9000,
    image: image('sacoche'),
    category: 'Accessoires',
    stock: 35,
    rating: 4,
    numReviews: 14,
  },
  {
    name: 'Hub USB-C 6 en 1',
    description:
      "Adaptateur USB-C vers HDMI, 2 ports USB 3.0, lecteur de cartes SD et micro SD. Indispensable pour les ordinateurs récents.",
    price: 18000,
    image: image('hub-usb-c'),
    category: 'Accessoires',
    stock: 22,
    rating: 4.5,
    numReviews: 9,
  },
  {
    name: 'Tapis de souris XXL',
    description:
      "Grand tapis de bureau 80 x 30 cm, surface tissée et base antidérapante. Confortable pour le clavier et la souris.",
    price: 6000,
    image: image('tapis-souris'),
    category: 'Accessoires',
    stock: 45,
    rating: 4,
    numReviews: 21,
  },

  // ---------- Téléphonie ----------
  {
    name: 'Smartphone Tecno Spark',
    description:
      "Écran 6,6 pouces, 128 Go de stockage, 4 Go de RAM et batterie 5000 mAh. Un smartphone complet à petit prix.",
    price: 95000,
    image: image('smartphone-tecno'),
    category: 'Téléphonie',
    stock: 16,
    rating: 4.5,
    numReviews: 31,
  },
  {
    name: 'Écouteurs sans fil',
    description:
      "Écouteurs Bluetooth 5.3 avec boîtier de charge, commandes tactiles et micro intégré. Jusqu'à 6 heures d'écoute.",
    price: 15000,
    image: image('ecouteurs-sans-fil'),
    category: 'Téléphonie',
    stock: 38,
    rating: 4,
    numReviews: 27,
  },
  {
    name: 'Batterie externe 20000 mAh',
    description:
      "Power bank 20000 mAh, charge rapide et deux ports USB. De quoi recharger votre téléphone plusieurs fois, même en cas de coupure.",
    price: 22000,
    image: image('batterie-externe'),
    category: 'Téléphonie',
    stock: 28,
    rating: 4.5,
    numReviews: 18,
  },
  {
    name: 'Chargeur rapide 33W',
    description:
      "Chargeur secteur 33W avec câble USB-C. Recharge votre téléphone jusqu'à trois fois plus vite qu'un chargeur classique.",
    price: 11000,
    image: image('chargeur-rapide'),
    category: 'Téléphonie',
    stock: 42,
    rating: 4,
    numReviews: 12,
  },

  // ---------- Impression ----------
  {
    name: 'Imprimante HP DeskJet',
    description:
      "Imprimante jet d'encre couleur avec scanner et copie, connexion Wi-Fi et USB. Idéale pour la maison et le petit bureau.",
    price: 85000,
    image: image('imprimante-hp'),
    category: 'Impression',
    stock: 9,
    rating: 4,
    numReviews: 7,
  },
  {
    name: 'Cartouche encre noire',
    description:
      "Cartouche d'origine compatible avec la gamme DeskJet. Environ 300 pages imprimées.",
    price: 14000,
    image: image('cartouche-encre'),
    category: 'Impression',
    stock: 30,
    rating: 4,
    numReviews: 5,
  },
  {
    name: 'Rame de papier A4',
    description:
      "500 feuilles de papier blanc A4 80 g. Compatible avec toutes les imprimantes et photocopieuses.",
    price: 4500,
    image: image('papier-a4'),
    category: 'Impression',
    stock: 60,
    rating: 4.5,
    numReviews: 16,
  },

  // ---------- Réseau ----------
  {
    name: 'Routeur Wi-Fi 4G',
    description:
      "Routeur 4G LTE avec emplacement SIM, jusqu'à 32 appareils connectés. Partagez votre connexion dans toute la maison.",
    price: 65000,
    image: image('routeur-wifi'),
    category: 'Réseau',
    stock: 11,
    rating: 4.5,
    numReviews: 13,
  },
  {
    name: 'Répéteur Wi-Fi',
    description:
      "Amplificateur de signal 300 Mbps, installation en deux minutes. Supprime les zones sans réseau chez vous.",
    price: 17000,
    image: image('repeteur-wifi'),
    category: 'Réseau',
    stock: 20,
    rating: 4,
    numReviews: 10,
  },
  {
    name: 'Câble Ethernet 10 m',
    description:
      "Câble réseau RJ45 catégorie 6, 10 mètres. Connexion stable et rapide pour votre ordinateur ou votre décodeur.",
    price: 5000,
    image: image('cable-ethernet'),
    category: 'Réseau',
    stock: 50,
    rating: 4,
    numReviews: 8,
  },
];
