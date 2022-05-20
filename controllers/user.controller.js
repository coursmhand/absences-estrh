const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports = {
    login: (req, res, next)=>{
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
        req.login(user, (err)=>{
            if(err){
                req.flash('error', err.message);
                return res.redirect('/users/login');
            }
            //authentication
            passport.authenticate("local", 
            {failureRedirect: '/users/login', 
            failureFlash: 'Mot de passe ou username invalide !'
            })(req, res, (err, user)=>{
                if(err){
                    req.flash('error', err.message);
                    return res.redirect('/users/login');
                }
                req.flash('success', 'Très bien, vous ètes maintenant connecté !');
                    return res.redirect('/');
            })
        })
    },
    signup: (req, res, next)=>{
        const newUser = User({
            username: req.body.username,
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email
        })
        User.register(newUser, req.body.password, (err, user)=>{
            if(err){
                req.flash('error', err.message);
                return res.redirect('/users/signup');
            }
            //authentication
            passport.authenticate("local")(req, res, (err, newUser)=>{
                if(err){
                    req.flash('error', err.message);
                    return res.redirect('/users/signup');
                }
                req.flash('success', 'Très bien, vous ètes maintenant connecté !');
                    return res.redirect('/');
            })
            //console.log(user);
        })
    }
}

