// Regles de validation partagees par les controleurs

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEPHONE_BJ = /^(?:\+229)?\s?0?[0-9]{8,10}$/;

// Neutralise les caracteres speciaux d'une recherche avant le regex Mongo
const echapperRegex = (valeur) => String(valeur).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const estEmail = (valeur) => typeof valeur === 'string' && EMAIL.test(valeur.trim());

const estTelephone = (valeur) =>
  typeof valeur === 'string' && TELEPHONE_BJ.test(valeur.replace(/[\s.-]/g, ''));

const estNombrePositif = (valeur) => Number.isFinite(Number(valeur)) && Number(valeur) >= 0;

const texteRequis = (valeur, min = 2) =>
  typeof valeur === 'string' && valeur.trim().length >= min;

module.exports = { echapperRegex, estEmail, estTelephone, estNombrePositif, texteRequis };
