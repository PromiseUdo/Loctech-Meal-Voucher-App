const express = require('express');
const router = express.Router({mergeParams:true});
const Staff = require('../models/staff');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const staff = require('../controllers/staff');

router.route('/register')
    .get(staff.renderRegister)
    .post(catchAsync(staff.register));

router.route('/login')
    .get(staff.renderLogin)
    .post(passport.authenticate('local', {failureFlash:true,failureRedirect:'/login'}), staff.login)

router.get('/logout', staff.logout);

module.exports = router;