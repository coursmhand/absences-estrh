const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    username: {type: String, required :true},
    email: {type: String, required: true},
    password: String,
    dateCreation: {type: Date, default: Date.now()}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);