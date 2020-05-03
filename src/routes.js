const express = require('express');
const routes = express.Router();
const patients = require('./controllers/patients');

routes.get('/', (req, res) => {
    res.redirect('/patients');
});

// Listagem de todos os pacientes
routes.get('/patients', patients.all);

// Adição de um novo paciente
routes.post('/patients/new', patients.new);

// Mostrar um paciente específico
routes.get('/patients/:id', patients.show);

// Alteração dos dados de um paciente
routes.put('/patients/:id', patients.edit);

// Exclusão de um paciente
routes.delete('/patients/:id', patients.delete);

module.exports = routes;