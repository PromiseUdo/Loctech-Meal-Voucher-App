const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utilities/catchAsync');
const MealTicket = require('../models/mealticket');
const {isLoggedIn, validateMealTicket, isOwner, hasEatenAlready} = require('../middleware');
const mealtickets= require('../controllers/mealtickets');


router.route('/')
    .get(catchAsync(mealtickets.index))
    .post(isLoggedIn, validateMealTicket, catchAsync(mealtickets.createMealTicket));
//go to the index page via controller

router.get('/new', isLoggedIn, mealtickets.renderNewForm);

router.route('/:id')
    .get(catchAsync(mealtickets.showMealTickets))
    .put(isLoggedIn, isOwner, validateMealTicket, catchAsync(mealtickets.updateMealtickets))
    .delete(isLoggedIn, isOwner, catchAsync(mealtickets.deleteMealticket));

//route to display the meal ticket details
router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(mealtickets.renderEditForm));
 

module.exports = router;