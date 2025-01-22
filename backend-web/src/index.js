import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Staattinen html-sivusto tarjoillaan palvelimen juuressa
app.use(express.static('public'));

// middleware, joka lukee json-datan POST-pyyntöjen rungosta/hyötykuormasta(body)
app.use(express.json());

// REST-apin resurssit tarjoillaan muualla, tässä /api/-polun alla
app.get('/api', (req, res) => {
  console.log('get-pyyntö juureen');
  console.log(req.url);

  res.send('Welcome to my REST API! Ke 22.1.');
});

// Syötteen lukeminen reittiparametreista (route parameter(=params))
app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log(req.params);

  // testataan, että onko käyttäjän syötteistä jompikumpi ei-numero
  // esim. parseInt (etsii numeron 2def-> 2) / Number (desimaalit käy, js ei ole int)
  // virhetilakoodi ja viesti json-muodossa
  const num1 = parseInt(req.params.num1);
  const num2 = Number(req.params.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400);
    res.json({
      error: 'Molempien parametrien tulee olla numero',
    });
    return;
  }

  res.json({
    num1,
    num2,
    sum: num1 + num2,
  });
});

// Syötteen lukeminen kyselyparametreista (query parameter(=params))
app.get('/api/sum/', (req, res) => {
  console.log(req.query);
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);

  res.json({
    num1,
    num2,
    sum: num1 + num2,
  });
});

// POST-pyynnön käsittely ja datan lukeminen rungosta
app.post('/api/moro', (req, res) => {
  console.log(req.body);
  res.status(200);
  res.json({reply: 'No moro ' + req.body.sender});
  // res.send('Moro! Post version');
});

// TODO: lisää oma reitti ja toiminnallisuus

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
