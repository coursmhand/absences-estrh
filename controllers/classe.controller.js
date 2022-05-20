const Classe = require('../models/classe.model');
const Categorie = require('../models/categorie.model');
const fs = require('fs');


//affichage classes
exports.listClasse = (req,res)=>{
    Classe.find()
  .then((classes=>{
    //req.flash('success', 'test OK'); c'est message flash à afficher n'importe où
    res.render('index', { title: 'Classes', 'classes': classes });
    //res.status(200).json(classes);
  }))
  .catch((err)=>{
    res.status(200).json(err);
  });
}

exports.showClasse = (req, res)=>{
    //console.log(req.params.id);
    Classe.findOne({_id: req.params.id})
    .then((classe)=>{
      res.render('single-classe', {classe: classe });
      //console.log(classe);
    })
    .catch((err)=>{
      res.redirect('/');
      //console.log(err);
    });
  }

exports.addClasse = (req, res)=>{
    //afficher la page contenant le formulaire
    Categorie.find()
    .then((categories)=>{
        res.render('ajout-classe',{categories: categories});
    })
    .catch(()=>{
        res.redirect('/');
    });
    //res.render('ajout-classe', {categories: Categorie});
}

exports.addOneClasse = (req, res)=>{
  var classe = new Classe({
    ...req.body,
    image: `${req.protocol}://${req.get('host')}/images/classes/${req.file.filename}`
  });
   classe.save((err, classe)=>{
    if(err){
      req.flash('error', err.message)
      return res.redirect('ajout-classe');
    }
    req.flash('success', 'Merci, votre classe est bien rajoutée')
    return res.redirect('ajout-classe');
   });
}

exports.editClasse = (req,res)=>{
  const id = req.params.id;
  Classe.findOne({_id: id}, (err, classe)=>{
    if(err){
      req.flash('error', err.message);
      return req.redirect('/');
    }
    Categorie.find((err, categories)=>{
      if(err){
        req.flash('error', err.message)
        return res.redirect('/');
      }
      return res.render('edit-classe', {categories: categories, classe: classe});
    })
  })
  
}

exports.editOneClasse = (req, res) =>{
  const id = req.params.id;
  Classe.findOne({_id: id}, (err, classe)=>{
    if(err){
      req.flash('error', err.message);
      return res.redirect("/edit-classe/"+id);
    }
    
    if(req.file){
      const filename = classe.image.split('/classes/');
      fs.unlink(`public/images/classes/${filename}` ,(err)=>{
        if (err) throw err;
            console.log('error', error.message);


      })
    }

    classe.nomclasse = req.body.nomclasse ? req.body.nomclasse : classe.nomclasse;
    classe.niveau = req.body.niveau ? req.body.niveau : classe.niveau;
    classe.filliere = req.body.filliere ? req.body.filliere : classe.filliere;
    classe.categorie = req.body.categorie ? req.body.categorie : classe.categorie;
    classe.image = req.file ? `${req.protocol}://${req.get('host')}/images/classes/${req.file.filename}` : classe.image;
    
  
    classe.save((err, classe)=>{
      if(err){
        req.flash('error', err.message)
        return res.redirect("/edit-classe/"+id);
      }
      console.log(classe);
      req.flash('success', "Très bien, la classe a bien été modifiée !");
      return res.redirect('/edit-classe/'+id);
    })
  })
}
 