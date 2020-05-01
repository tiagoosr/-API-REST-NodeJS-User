const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

require('./controllers/tarefaController')(app);
require('./controllers/authController')(app);
require('./controllers/projectController')(app);
module.exports = app; 
