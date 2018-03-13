const fs = require('fs');
const express = require('express');
const compression = require('compression');

const indexTemplate = fs.readFileSync('./dist/index.html').toString();

const app = express();

const PORT = 1305;
const HOST = '0.0.0.0';

if (process.env.REDIRECT_TO_HTTPS) {
  console.log('Redirecting all non-HTTPS traffic to HTTPS');
  app.use((req, res, next) => {
    if (req.secure) return next();
    if (req.headers['x-forwarded-proto'] === 'https') {
      return next();
    }
    if (req.protocol === 'http' && req.headers.host) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    return next();
  });
}

app.use(compression());
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.send(indexTemplate);
});

app.listen(PORT, HOST, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  const devServerUrl = `http://${HOST}:${PORT}`;
  console.log(`\r\n\r\n🐬  Prod server listening at ${devServerUrl} 🐬\r\n\r\n`);
});
