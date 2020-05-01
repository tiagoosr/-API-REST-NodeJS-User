const mongoose = require('mongoose');
const Schema = mongoose.Schema;

TarefasSchema = new Schema({
    finalizada: {
        type: Boolean,
        require: false,
        default: false,
    },
    nome: {
        type: String,
        require: false,
        default: "",
    },
    descricao: {
        type: String,
        require: false,
        default: "",
    },
    date: {
        type: String,
        require: false,
        default: "",
    },
    icone: {
        type: Number,
        require: false,
        default: 0,
    },
    creatAt: {
        type:Date,
        default:Date.now
    }
}, {
    collection:'data'
})

const Tarefas = mongoose.model('Tarefas',TarefasSchema);

module.exports = Tarefas;