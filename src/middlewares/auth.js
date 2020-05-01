const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'O token não foi informado' });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ error: 'Erro no token' });
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).send({ error: 'Token mal formatado' });
    }

    jwt.verify(token, authConfig.serect, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token invalido' });
        }

        req.userId = decoded._id;
        return next();
    });

};