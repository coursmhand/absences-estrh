const Categories = require('../models/categorie.model');


//categorie classe
exports.addCateg = (req, res)=>{
    Categories.find()
    .then((categories)=>{
      res.render('ajout-categorie',{categories: categories})
    })
    .catch(()=>{
      res.redirect('/ajout-categorie');
    })
  }
 
 exports.addCat = (req, res)=>{
    var categorie = new Categories({
      ...req.body,
   });
    categorie.save()
    .then(()=>{
      res.render('ajout-categorie', {success: "La catégorie est bien rajoutée"});
    })
    .catch(()=>{
      res.render('ajout-categorie', {error: "La categorie n'est pas rajoutée, testez une autre fois"});
    });
   //console.log(categorie);
 }

 