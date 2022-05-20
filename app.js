var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var flash = require('connect-flash');
const passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//const Classe = require('./models/classe.model');
//const Categorie = require('./models/categorie.model');
//const Module = require('./models/module.model');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const req = require('express/lib/request');
const User = require('./models/user.model');
var app = express();

//initialisation de la session
app.use(session({
  secret: 'fdrsedzc3456321jhsefhjmp',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}))

//prise en charge de JSON
app.use(bodyParser.json());
//prise en charge de formulaires HTML
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb://127.0.0.1:27017/absencesetud',
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>console.log("Connexion à mongodb réussie"))
  .catch(()=>console.log("Connexion a echouée à mongodb"));
  
// //Créer une classe maintenant ici
   //var categorie = new Categorie({
    //   nomcategorie: "E4"
// // //     niveau: "1",
// // //     filliere: "Informatique",
// // //     categorie: "A"
  // })
  // categorie.save()
  // .then(()=>console.log("Sauvegarde de la classe réussie"))
//   .catch(()=>console.log("Sauvegarde de la classe echouée"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Initialisation flash
//app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//initialisation passport
app.use(passport.initialize());
app.use(passport.session());

//passport local mongoose
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middlewere pour erreurs flash
app.use((req, res, next)=>{
  if(req.user){
    res.locals.user = req.user;
  }
  res.locals.error = req.flash('error');
  res.locals.warning = req.flash('warning');
  res.locals.success = req.flash('success');
  res.locals.errorForm = req.flash('errorForm');
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
