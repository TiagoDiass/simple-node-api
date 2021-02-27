const fs = require("fs");
const data = require("../../data.json");

exports.all = function (req, res) {
  res.send(data.patients);
};

exports.new = function (req, res) {
  const patientAmount = data.patients.length;

  if (patientAmount == 0) {
    id = 1;
  } else {
    let lastUsedId = data.patients[patientAmount - 1].id;
    id = lastUsedId + 1;
  }

  let newPatient = {
    id,
    name: req.body.name,
    email: req.body.email,
  };

  console.log(newPatient);

  data.patients.push(newPatient);

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send(`Write file error: ${err}`);
    }
  });

  return res.send(newPatient);
};

exports.show = function (req, res) {
  const id = req.params.id;

  const foundPatient = data.patients.find(function (patient) {
    return patient.id == id;
  });

  if (!foundPatient) {
    return res.status(404).json({ msg: "Patient not found!" });
  }

  return res.send(foundPatient);
};

exports.edit = function (req, res) {
  const id = req.params.id;

  const foundPatient = data.patients.find((patient) => id == patient.id);
  const index = foundPatient ? data.patients.findIndex((p) => p.id == foundPatient.id) : -1;

  if (!foundPatient) {
    return res.status(404).json({ message: "Patient not found!" });
  }

  let editedPatient = {
    ...foundPatient,
  };

  const keys = Object.keys(req.body);

  for (key of keys) {
    editedPatient[key] = req.body[key];
  }

  data.patients[index] = editedPatient;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send(`Write file error: ${err}`);
    }
  });

  return res.send(editedPatient);
};

exports.delete = function (req, res) {
  const id = req.params.id;

  const filteredPatients = data.patients.filter(function (patient) {
    return patient.id != id;
  });

  if (filteredPatients.length === data.patients.length) {
    return res.status(404).json({ message: "Patient not found!" });
  }

  data.patients = filteredPatients;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send(`Write file error: ${err}`);
    }
  });

  return res.json({ message: "Successfully deleted" });
};
