
exports.guard = (req, res, next)=>{
    if(!req.user){
        req.flash('warning', 'Désolé, vous devez vous authentifier pour accéder à la page !')
        return res.redirect('/users/login');
    }
    next();
}