import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../services/productService';
import { IconCheck } from '../components/Icons';

/** Presentation de la boutique */
const About = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const totalProducts = categories.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>À propos de BeninShop</h1>
          <p>Votre boutique en ligne au Bénin</p>
        </div>
      </div>

      <div className="container prose">
        <p>
          BeninShop est une boutique en ligne béninoise spécialisée dans le matériel informatique et
          les accessoires. Notre objectif est simple : rendre les produits technologiques accessibles
          à tous, partout au Bénin, à des prix imbattables.
        </p>

        <div className="stat-strip">
          <div>
            <strong>{totalProducts}</strong>
            <span>Produits au catalogue</span>
          </div>
          <div>
            <strong>{categories.length}</strong>
            <span>Catégories</span>
          </div>
          <div>
            <strong>24h</strong>
            <span>Livraison à Cotonou</span>
          </div>
          <div>
            <strong>7j/7</strong>
            <span>Support client</span>
          </div>
        </div>

        <h2>Notre mission</h2>
        <p>
          Proposer des produits sélectionnés avec soin, vérifiés avant expédition, et accompagnés
          d&apos;un service client réactif. Chaque commande est préparée et livrée dans les meilleurs
          délais.
        </p>

        <h2>Pourquoi nous choisir ?</h2>
        <ul>
          <li>
            <IconCheck />
            Des prix étudiés pour le marché béninois, sans intermédiaire inutile.
          </li>
          <li>
            <IconCheck />
            Le paiement mobile (Moov Money, MTN MoMo, Wave) et la carte bancaire.
          </li>
          <li>
            <IconCheck />
            Une livraison rapide à Cotonou et dans toutes les grandes villes du pays.
          </li>
          <li>
            <IconCheck />
            Une équipe joignable 7j/7 par téléphone et sur WhatsApp.
          </li>
        </ul>

        <p style={{ marginTop: 26 }}>
          <Link to="/produits" className="btn btn-primary">
            Découvrir nos produits
          </Link>
        </p>
      </div>
    </>
  );
};

export default About;
