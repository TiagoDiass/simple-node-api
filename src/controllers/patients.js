const fs = require('fs');
const data = require('../../data.json');

exports.all = function (req, res) {
    res.send(data.patients);
}

exports.create = function (req, res) {
    let id = data.patients.length + 1;

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
        bloodType: req.body.bloodType, 
        age: req.body.age, 
        weight: req.body.weight, 
        height: req.body.height 
    }

    data.patients.push(newPatient);

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) {
            throw `Write file error: ${err}`;
        }
    });

    return res.send(data.patients[id-1]);
}