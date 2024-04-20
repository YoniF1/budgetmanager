const express = require('express');
const { loginUser, createUser, createUserDetails } = require('../controllers/user.controller.js');
const router = express.Router();

router.get('/login', (req, res) => {
  const isLoggedIn = req.session.userId !== undefined

  res.render("login", { message: '', success: '', isLoggedIn });
});
router.post('/login', loginUser);

router.get('/home', (req, res) => {
  const isLoggedIn = req.session.userId !== undefined;


  res.render('home', { message: req.session.message, isLoggedIn, details: req.session.details, user_details_completed: ''});
});

router.post('/home', createUserDetails)

router.get('/signup', (req, res) => {
  const isLoggedIn = req.session.userId !== undefined

  res.render('signup', { error: '', user_exists: '', success: '', isLoggedIn});
});
router.post('/signup', createUser);

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/login');
    });
});


module.exports = router;
