// Chargement
const Loader = ({ text = 'Chargement en cours...' }) => (
  <div className="loader-wrap">
    <span className="loader" />
    <span>{text}</span>
  </div>
);

export default Loader;
