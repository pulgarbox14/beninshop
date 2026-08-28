const crypto = require('crypto');

// Client de la passerelle PAYCORE
class PayCore {
  constructor(secretKey, baseUrl = 'https://paycore.space') {
    this.secretKey = secretKey;
    this.baseUrl = baseUrl;
  }

  get configured() {
    return Boolean(this.secretKey);
  }

  async request(method, path, body) {
    if (!this.configured) {
      throw new Error("Le paiement en ligne n'est pas configuré (PAYCORE_SECRET_KEY manquante)");
    }

    const response = await fetch(`${this.baseUrl}/api${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `PAYCORE a répondu ${response.status}`);
    }

    return data;
  }

  createPayment(payload) {
    return this.request('POST', '/v1/payments', payload);
  }

  getPayment(id) {
    return this.request('GET', `/v1/payments/${id}`);
  }

  refund(paymentId) {
    return this.request('POST', '/v1/refund', { paymentId });
  }

  // Verifie la signature d'un webhook
  verifyWebhook(rawBody, signature, secret) {
    if (!signature || !secret) return false;

    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

    try {
      return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    } catch {
      return false;
    }
  }
}

module.exports = new PayCore(
  process.env.PAYCORE_SECRET_KEY,
  process.env.PAYCORE_BASE_URL || 'https://paycore.space'
);
module.exports.PayCore = PayCore;
