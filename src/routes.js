const express = require('express');
const routes = express.Router();
const patients = require('./controllers/patients');

routes.get('/', (req, res) => {
    res.redirect('/patients');
});

routes.get('/patients', patients.all);
routes.post('/patients/create', patients.create);

module.exports = routes;