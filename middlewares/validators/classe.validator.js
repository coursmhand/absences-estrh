const { Validator } = require('node-input-validator');

const classeValidator = (req, res, next)=>{

    if(req.file){
        req.body.image = req.file.filename;
    }
    const v = new Validator(req.body, {
        nomclasse: 'required',
        niveau: 'required',
        filliere: 'required',
        categorie: 'required',
        image: 'required'
    });

    v.check().then((matched) => {
        if(!matched){
            //errors
            req.flash('errorFormClasse', v.errors);
            return res.redirect('/ajout-classe');
        }
        next();
    });
}

module.exports  = classeValidator;