const mongoose = require('mongoose');

const classeSchema = mongoose.Schema({
    nomclasse: {type: String, required: true},
    niveau: {type: String, required: true},
    filliere: {type: String, required: true},
    categorie: {type: String, required: true},
    image: {type: String, required: true}
});

module.exports = mongoose.model('Classe', classeSchema);