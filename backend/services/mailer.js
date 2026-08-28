const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const expediteur = () => process.env.MAIL_FROM || 'BeninShop <onboarding@resend.dev>';

// Envoi d'un email via Resend
const envoyerEmail = async ({ to, subject, html }) => {
  if (!resend) {
    throw new Error("L'envoi d'emails n'est pas configuré (RESEND_API_KEY manquante)");
  }

  const { error } = await resend.emails.send({ from: expediteur(), to, subject, html });

  if (error) {
    throw new Error(error.message || "L'email n'a pas pu être envoyé");
  }
};

// Message de reinitialisation du mot de passe
const emailReinitialisation = ({ to, name, lien }) =>
  envoyerEmail({
    to,
    subject: 'Réinitialisation de votre mot de passe BeninShop',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#1f2937">
        <h2 style="color:#0f2557">Réinitialisation de votre mot de passe</h2>
        <p>Bonjour ${name},</p>
        <p>Vous avez demandé un nouveau mot de passe pour votre compte BeninShop.
        Ce lien est valable 1 heure :</p>
        <p style="margin:28px 0">
          <a href="${lien}"
             style="background:#fbbf24;color:#0f2557;padding:13px 24px;border-radius:8px;
                    text-decoration:none;font-weight:bold">
            Choisir un nouveau mot de passe
          </a>
        </p>
        <p style="font-size:13px;color:#6b7280">
          Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email :
          votre mot de passe reste inchangé.
        </p>
        <p style="font-size:13px;color:#6b7280">BeninShop — Cotonou, Bénin</p>
      </div>
    `,
  });

module.exports = { envoyerEmail, emailReinitialisation, configure: Boolean(resend) };
