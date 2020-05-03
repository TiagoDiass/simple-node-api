const express = require('express');
const routes = express.Router();
const patients = require('./controllers/patients');

routes.get('/', (req, res) => {
    res.redirect('/patients');
});

routes.get('/patients', patients.all);

routes.post('/patients/new', patients.new);

routes.get('/patients/:id', patients.show);

routes.put('/patients/:id', patients.edit);

module.exports = routes;