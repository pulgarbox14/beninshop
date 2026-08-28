import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { verifyPayment } from '../services/paymentService';
import { formatPrice } from '../utils';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { IconCheck, IconAlert } from '../components/Icons';

// Page de retour apres un paiement PAYCORE
const PaymentResult = ({ annule = false }) => {
  const [searchParams] = useSearchParams();
  const { state } = useLocation();
  const orderId = searchParams.get('order');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(orderId));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) return;

    verifyPayment(orderId)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <Loader text="Vérification du paiement..." />;

  const paye = data?.status === 'payée';

  return (
    <div className="container payment-result">
      <span className={`payment-icon ${annule || !paye ? 'attente' : 'ok'}`}>
        {annule || !paye ? <IconAlert size={34} /> : <IconCheck size={34} />}
      </span>

      <h1>
        {annule
          ? 'Paiement annulé'
          : paye
            ? 'Merci pour votre commande !'
            : 'Paiement en attente'}
      </h1>

      <Alert type="error">{error || state?.message}</Alert>

      {data && (
        <>
          <p>
            Commande n&deg; {String(data.orderId).slice(-8).toUpperCase()} —{' '}
            <strong>{formatPrice(data.total)} FCFA</strong>
          </p>
          <p className="payment-status">
            {annule
              ? 'Votre commande est conservée, vous pouvez régler le paiement plus tard.'
              : paye
                ? 'Votre paiement a bien été reçu, votre commande est en préparation.'
                : "Le paiement n'est pas encore confirmé. Cette page se met à jour dès que PAYCORE valide la transaction."}
          </p>
        </>
      )}

      {!orderId && <p>Aucune commande à afficher.</p>}

      <div className="payment-actions">
        <Link to="/mes-commandes" className="btn btn-navy">
          Voir mes commandes
        </Link>
        <Link to="/produits" className="btn btn-outline">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
};

export default PaymentResult;
