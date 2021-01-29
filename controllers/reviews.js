const MealTicket = require('../models/mealticket');
const Review = require('../models/review');
const nodemailer = require('nodemailer');
const smtpTransport = require("nodemailer-smtp-transport");

module.exports.createReview = async(req, res)=>{
    const mealticket = await MealTicket.findOne({ticket_id:req.params.id});
    const review = new Review(req.body.review);
    review.owner = req.user._id;
    mealticket.reviews.push(review);
    await review.save(); //save the review
    await mealticket.save(); //save the review inside meal ticket using object Id
    //Notify admin of review
    const transporter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "loctechmealapp@gmail.com",
            pass: "locmealpudopc6"
        }
    }));

    const mailOptions = {
        from: "loctechmealapp@gmail.com",
        to: "joy.okwu@loctech.ng",
        subject:`${req.user.username} dropped a review`,
        html: `<b>Dear Admin,</b><br><br>${req.user.username} has dropped a review on a meal with the Id: ${mealticket.ticket_id}<br><a href="/mealtickets/${mealticket.ticket_id}">Click here to see this review</a><br><br>Best Regards,<br><i>Loctech Meal Ticketing App</i>`
    }

    await transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent: ");
        }
    });
    req.flash('success', 'Created new review');
    res.redirect(`/mealtickets/${mealticket.ticket_id}`); //redirect back to the particular meal ticket page
};

module.exports.deleteReview = async(req,res)=>{
    const{id, reviewId} = req.params; //destructure meal ticket id and review id
    await MealTicket.findOneAndUpdate(id, {$pull:{reviews:reviewId}}); //find the meal ticket assoc with a review and remove the object id 
    await Review.findByIdAndDelete(req.params.reviewId); //find the review by id and delete
    // await Review.findOneAndDelete(req.params.reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/mealtickets/${id}`); //redirect back to the particular ticket page
};