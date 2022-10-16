function validEmail(req, res, next) {
    const { email } = req.body;
    const validation = /\S+@\S+\.\S+/;
    if (!email) {
       return res.status(400)
       .json({ message: 'O campo "email" é obrigatório' });
    }
    if (!validation.test(email)) {
       return res.status(400)
       .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
   }
   
   module.exports = validEmail;