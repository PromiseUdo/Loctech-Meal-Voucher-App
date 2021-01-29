const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utilities/catchAsync');
const MealTicket = require('../models/mealticket');
const passport = require('passport');
const {isAdmin} = require('../middleware');
const staff = require('../controllers/staff');
const statistics = require('../controllers/statistics');



router.get('/statistics', isAdmin, statistics.index);



module.exports = router;
