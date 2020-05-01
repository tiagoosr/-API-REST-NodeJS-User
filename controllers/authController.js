const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');
const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.serect, {
        expiresIn: 86400,
    });
}
router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: ' Usuário já existe' });
        }

        const user = await User.create(req.body);

        user.password = undefined;

        const token = generateToken({ _id: user._id })
        return res.send({
            user,
            token
        });
    }
    catch (err) {
        return res.status(400).send({ error: 'Erro ao Registrar' })
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).send({ error: 'Usuário não encontrado' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Password invalido' });
    }

    user.password = undefined;

    const token = generateToken({ _id: user._id })
    res.send({
        user,
        token
    });
});

module.exports = (app) => app.use(router)