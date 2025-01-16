import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.get('/moro', (req, res) => {
  res.send('Moro!');
});

app.post('/moro', (req, res) => {
  res.send('Moro! Post version');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
