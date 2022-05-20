
const Enseignant = require('../models/enseignant.model');

//Enseignant 
exports.addEnseig = (req, res)=>{
    Enseignant.find()
    .then((enseignant)=>{
      res.render('ajout-enseignant',{enseignants: enseignant})
    })
    .catch(()=>{
      res.redirect('/ajout-enseignant');
    })
  }
 
  //Créer enseignant
 exports.addEnseignant = (req, res)=>{
    var enseignant = new Enseignant({
      ...req.body,
   });
    enseignant.save()
    .then(()=>{
      res.render('ajout-enseignant', {success: "La catégorie est bien rajoutée"});
    })
    .catch(()=>{
      res.render('ajout-enseignant', {error: "La categorie n'est pas rajoutée, testez une autre fois"});
    });
   //console.log(categorie);
 }

 