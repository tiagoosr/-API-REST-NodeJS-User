const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

require('./src/controllers/tarefaController')(app);
require('./src/controllers/authController')(app);
require('./src/controllers/projectController')(app);
module.exports = app; 
