var express = require('express');
const userController = require('../controllers/user.controller');
const userValidator = require('../middlewares/validators/user.validator');
const loginValidator = require('../middlewares/validators/login.validator');
const { guard } = require('../middlewares/guard');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//Login
router.get('/login', (req, res)=>{
  res.render('login');
})

router.post('/login', loginValidator, userController.login);

//SignUp
router.get('/signup', (req, res)=>{
  res.render('signup');
  
})

router.post('/signup', userValidator,userController.signup);

//Dashboard
router.get('/dashboard',guard,(req, res)=>{
  res.render('dashboard');
})

//LogOut
router.get('/logout', (req, res)=>{
  req.logout();
  req.flash('success', 'Vous étes déconnecté !');
  res.redirect('/');
})

module.exports = router;
