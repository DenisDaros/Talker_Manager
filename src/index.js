const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readTalkers,
   writeNewTalkers,
   upDateTalker,
   deleteTalker,
   searchTalker } = require('./utils/fsUtils');
const routeTalkers = require('../talker.json');
const validEmail = require('./middlewares/validateEmail');
const validPassword = require('./middlewares/validatePassword');
const validToken = require('./middlewares/validateToken');
const validName = require('./middlewares/validateName');
const validAge = require('./middlewares/validateAge');
const validTalk = require('./middlewares/validateTalk');
const validWatchedAt = require('./middlewares/validateWatchedAt');
const validRate = require('./middlewares/validateRate');

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

app.get('/talker/search', validToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await searchTalker(q);
  res.status(200).json(talkers);
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

app.post('/login', validEmail, validPassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.post('/talker',
 validToken,
 validName,
 validAge,
 validTalk,
 validWatchedAt,
 validRate,
 async (req, res) => {
const writeTalker = req.body;
const newWriteTalker = await writeNewTalkers(writeTalker);
res.status(201).json(newWriteTalker);
}); 

app.put('/talker/:id',
validToken,
 validName,
 validAge,
 validTalk,
 validWatchedAt,
 validRate, async (req, res) => {
  const editTalker = req.body;
  const { id } = req.params;
   const newTalker = await upDateTalker(editTalker, Number(id));
  res.status(200).json(newTalker);
});

app.delete('/talker/:id', validToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(Number(id));
  res.status(204).json();
});

module.exports = app;