const {mealTicketSchema, reviewSchema} = require('./schemas');
const ExpressError = require('./utilities/ExpressError');
const MealTicket = require('./models/mealticket');
const Review = require('./models/review');
//we are not from here
const todayDate = new Date().getDate();


module.exports.isLoggedIn = (req,res,next) => {
    console.log('LoggedInUser:', req.user);
    if(!req.isAuthenticated()){
        //store a url to redirect to in the session 
        req.session.redirectTo = req.originalUrl;
        req.flash('error', "You must be signed in!"); //flash when there error signing in
        return res.redirect('/login');
    }
    next();
}

module.exports.validateMealTicket = (req, res, next)=>{
     
    const {error}= mealTicketSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

//check if Admin
module.exports.isAdmin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectTo = req.originalUrl;
        req.flash('error', "You must be signed in!"); //flash when there error signing in
        return res.redirect('/login');
    }else if(req.user.role != "admin"){
        req.flash('error', `Sorry ${req.user.username} only admin can have access to Statistics`);
        const redirectUrl = req.session.redirectTo || '/mealtickets';
        delete req.session.redirectTo;
        return res.redirect(redirectUrl);
    }else{
        next();
    }
}

module.exports.isOwner = async(req,res,next)=>{
    const {id} = req.params;
    const mealTicket = await MealTicket.findOne({ticket_id:id});
    const filter = {ticket_id: id};
    if(!mealTicket.owner.equals(req.user._id)){
        req.flash('error', 'Sorry, You do not have permission to do that');
        return res.redirect(`/mealtickets/${id}`);
    }else{
        next();
    }
}

module.exports.hasEatenAlready = async(req, res, next)=>{
    //confirm if the person has already requested for meal ticket
      //we are not from here

      const results = await MealTicket.find({owner:req.user._id});
      if(results.length == 0){
          console.log('This person has not eaten yet');
          next();
      }else{
          for(oneResult of results){
              if(oneResult.requestDate.getDate() == todayDate){
                    console.log(oneResult.requestDate.getDate(), 'oneresu date');
                    console.log(todayDate, 'todayDate');
                    console.log('True');
                    req.flash('error', `Sorry ${req.user.username}, you can only make one request per day`);
                    const redirectUrl = req.session.redirectTo || '/mealtickets';
                    delete req.session.redirectTo;
                    return res.redirect(redirectUrl);
                  
              }else{
                  console.log(todayDate);
                  console.log('False');
                  next();
              }
            //   console.log(todayDate, 'todayDate');    
          }
      }
  //we are not from here
}



module.exports.validateReview = (req, res, next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

module.exports.isReviewOwner = async(req,res,next)=>{
    const {id, reviewId} = req.params;
    const review = await Review.findOne({ticket_id:reviewId});
    // const filter = {ticket_id: reviewId};
    if(!review.owner.equals(req.user._id)){
        req.flash('error', 'Sorry, You do not have permission to do that');
        return res.redirect(`/mealtickets/${id}`);
    }else{
        next();
    }
}
