 // if(!req.body.mealticket) throw new ExpressError('Invalid Meal Ticket Data', 400);
 const Joi = require('joi');

 module.exports.mealTicketSchema = Joi.object({
    mealticket:Joi.object({
        ticket_id: Joi.string().required(),
        // holder: Joi.string().required(),
        requestDate: Joi.string()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})