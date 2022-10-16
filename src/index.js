const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readTalkers } = require('./utils/fsUtils');
const routeTalkers = require('../talker.json');
const validEmail = require('./middlewares/validateEmail');
const validPassword = require('./middlewares/validatePassword');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
const talkers = await readTalkers();

return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', (req, res) => {
  const id = Number(req.params.id);
  const talker = routeTalkers.find((t) => t.id === id);
  if (talker) {
    res.json(talker);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', validEmail, validPassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = app;