
const Campus = require('../models/campus.model');


//categorie classe
exports.addCamp = (req, res)=>{
    Campus.find()
    .then((campus)=>{
      res.render('ajout-campus',{campus: campus})
    })
    .catch(()=>{
      res.redirect('/ajout-campus');
    })
  }
 
 exports.addCampus = (req, res)=>{
    var campus = new Campus({
      ...req.body,
   });
    campus.save()
    .then(()=>{
      res.render('ajout-campus', {success: "La catégorie est bien rajoutée"});
    })
    .catch(()=>{
      res.render('ajout-campus', {error: "La categorie n'est pas rajoutée, testez une autre fois"});
    });
   //console.log(categorie);
 }

 