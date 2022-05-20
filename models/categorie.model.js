const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
    nomcategorie: String,
});

module.exports = mongoose.model('Categorie', categorieSchema);