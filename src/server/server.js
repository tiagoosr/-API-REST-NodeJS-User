const app = require('../../app');
const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' })
const URI = process.env.DATABASE
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; //posso usar promessas
mongoose.connection.on('error', (error) => {
    console.error("ERRO: " + error.message)
});

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    console.log("servidor rodando na porta: " + server.address().port);
});