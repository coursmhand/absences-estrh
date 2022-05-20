const mongoose = require('mongoose');

const campusSchema = mongoose.Schema({
    nomcampus: String,
    adresse: String,
    siteweb: String,
    email: String,
    tel: String
});

module.exports = mongoose.model('Campus', campusSchema);