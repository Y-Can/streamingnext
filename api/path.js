// api/[...path].js

export default function handler(req, res) {
    // Définir l'en-tête Permissions-Policy pour autoriser 'ch-ua-form-factor'
    res.setHeader('Permissions-Policy', 'ch-ua-form-factor');
    res.end('Hello from the API');
  }
  