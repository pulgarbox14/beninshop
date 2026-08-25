import { useState } from 'react';
import { IconMail } from './Icons';

/** Bloc d'inscription a la newsletter */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(`Merci ! ${email} est inscrit a notre newsletter.`);
    setEmail('');
  };

  return (
    <section className="newsletter">
      <span className="newsletter-icon">
        <IconMail size={64} />
      </span>

      <div className="newsletter-text">
        <h3>Restez informé</h3>
        <p>
          Inscrivez-vous à notre newsletter et recevez nos offres spéciales
          <br />
          et nouveautés en avant-première.
        </p>
        {message && <p style={{ color: 'var(--yellow)', marginTop: 8 }}>{message}</p>}
      </div>

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Votre email"
          aria-label="Votre email"
          required
        />
        <button type="submit" className="btn btn-primary">
          S&apos;inscrire
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
