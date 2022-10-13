const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers } = require('./utils/fsUtils');

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

module.exports = app;