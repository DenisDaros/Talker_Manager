function validToken(req, res, next) {
    const { authorization } = req.headers;
    const validation = /\w{16}/;

    if (!authorization) {
       return res.status(401)
       .json({ message: 'Token não encontrado' });
    }
    if (!validation.test(authorization)) {
       return res.status(401)
       .json({ message: 'Token inválido' });
    }
    return next();
   }
   
   module.exports = validToken;