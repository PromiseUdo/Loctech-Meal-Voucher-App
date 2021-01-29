
const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utilities/catchAsync');
const MealTicket = require('../models/mealticket');
const Review = require('../models/review');
const {validateReview, isLoggedIn, isReviewOwner} = require('../middleware');
const reviews = require('../controllers/reviews');


//validate review middleware

//route to save the review into Review and into document.review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

//route to delete reviews
router.delete('/:reviewId', isLoggedIn, isReviewOwner, catchAsync(reviews.deleteReview));

module.exports = router;