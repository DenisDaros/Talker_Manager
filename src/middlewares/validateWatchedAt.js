function validName(req, res, next) {
    const { talk } = req.body;
    const { watchedAt } = talk;

    const validation = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/i;

    if (!watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }

    if (!validation.test(watchedAt)) {
      return res.status(400).json(
        { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
      );
    }

    next();
  }

  module.exports = validName;