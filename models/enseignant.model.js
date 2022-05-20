const mongoose = require('mongoose');

const enseignantSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    tel: String
});

module.exports = mongoose.model('Enseignant', enseignantSchema);