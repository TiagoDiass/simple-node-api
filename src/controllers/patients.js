const fs = require('fs');
const data = require('../../data.json');

exports.all = function (req, res) {
    res.send(data.patients);
}

exports.new = function (req, res) {
    const patientAmount = data.patients.length;
    
    if (patientAmount == 0) {
        id = 1;
    } else {
        let lastUsedId = data.patients[patientAmount - 1].id;
        id = lastUsedId + 1;
    }

    const keys = Object.keys(req.body);

    for(key of keys){
        if (req.body[key] == '') {
            return res.send('Please, fill in all required fields');
        }
    }

    let newPatient =  { 
        id,
        name: req.body.name, 
        email: req.body.email, 
        age: req.body.age, 
        gender: req.body.gender,
        bloodType: req.body.bloodType, 
        weight: req.body.weight, 
        height: req.body.height 
    }

    data.patients.push(newPatient);

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send(`Write file error: ${err}`);
        }
    });

    return res.send(newPatient);
}

exports.show = function (req, res) {
    const id = req.params.id;

    const foundPatient = data.patients.find(function (patient) {
        return patient.id == id; 
    });

    if (!foundPatient) {
        return res.send('Patient not found!');
    }

    return res.send(foundPatient);
}

exports.edit = function (req, res) {
    const id = req.params.id;

    let index = 0;

    const foundPatient = data.patients.find(function (patient, foundIndex) {
        if (id == patient.id) {
            index = foundIndex;
            return true
        }
    });

    if (!foundPatient) {
        return res.send('Patient not found!');
    }

    let editedPatient = {
        ...foundPatient
    }

    const keys = Object.keys(req.body);

    for(key of keys){
        editedPatient[key] = req.body[key];
    }

    data.patients[index] = editedPatient;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send(`Write file error: ${err}`);
        }
    });

    return res.send(editedPatient);
}

exports.delete = function (req, res) {
    const id = req.params.id;

    const filteredPatients = data.patients.filter(function (patient) {
        return patient.id == id ? false : true;
    });

    data.patients = filteredPatients;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send(`Write file error: ${err}`);
        }
    });

    return res.send(data.patients);
}