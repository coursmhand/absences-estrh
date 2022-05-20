const Modules = require('../models/module.model');

//modules
exports.addmod = (req, res)=>{
    Modules.find()
      .then((modules)=>{
        res.render('ajout-module',{modules: modules})
      })
      .catch(()=>{
        res.redirect('/');
      });
  }
  
   exports.addmodule = (req, res)=>{
    var module = new Modules({
      ...req.body,
   });
    module.save()
    .then(()=>{
      res.render('ajout-module', {success: "La catégorie est bien rajoutée"});
    })
    .catch(()=>{
      res.render('ajout-module', {error: "La categorie n'est pas rajoutée, testez une autre fois"});
    });
   //console.log(categorie);
  }