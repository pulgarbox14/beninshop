import { useState } from 'react';
import Alert from '../components/Alert';
import { IconClock, IconMail, IconMapPin, IconPhone } from '../components/Icons';

// Contact
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Contactez-nous</h1>
          <p>Une question ? Notre équipe vous répond rapidement.</p>
        </div>
      </div>

      <div className="container contact-layout">
        <section className="contact-card">
          <h2 style={{ fontSize: 20, marginBottom: 18 }}>Envoyer un message</h2>

          {sent && <Alert type="success">Merci ! Votre message a bien été pris en compte.</Alert>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subject">
                Sujet
              </label>
              <input
                id="subject"
                name="subject"
                className="form-control"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-navy btn-block">
              Envoyer le message
            </button>
          </form>
        </section>

        <section className="contact-card">
          <h2 style={{ fontSize: 20, marginBottom: 18 }}>Nos coordonnées</h2>

          <ul className="footer-contact" style={{ color: 'var(--text-muted)' }}>
            <li>
              <IconPhone />
              <span>+229 01 23 45 67 89</span>
            </li>
            <li>
              <IconMail />
              <span>contact@beninshop.bj</span>
            </li>
            <li>
              <IconMapPin />
              <span>Cotonou, Bénin</span>
            </li>
            <li>
              <IconClock />
              <span>Lundi - Samedi : 8h - 18h</span>
            </li>
          </ul>

          <div className="product-reassurance" style={{ marginTop: 24 }}>
            <div>Service commercial : commandes et devis</div>
            <div>Service après-vente : suivi et retours</div>
            <div>Réponse sous 24h ouvrées</div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
