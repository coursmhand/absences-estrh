const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    UE: String,
    intitule: String,
    credit: String,
    nombreheures: String

});

module.exports = mongoose.model('Module', moduleSchema);