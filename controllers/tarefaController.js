const express = require('express');
const Tarefa = require('../models/tarefas');

const router = express.Router();

router.post('/tarefa', async (req, res) => {
    try {
        const tarefas = await Tarefa.create(req.body);
        return res.send({ tarefas })
    }
    catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar' })
    }
});

// /:id serve para passar id para o endpoind
router.get('/tarefa', async (req, res) => {
    const tarefas = await Tarefa.find(req.body, function (err, obj) {
        console.log(obj)
    });
    return res.send({ tarefas })
});

router.put('/tarefa/:id', async (req, res) => {
    const tarefas = await Tarefa.findOneAndUpdate({ _id: req.params.id }, req.body)
    return res.send({ tarefas })
});

module.exports = (app) => app.use(router)