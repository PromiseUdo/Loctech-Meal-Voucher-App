const MealTicket = require('../models/mealticket');
const nodemailer = require('nodemailer');
const smtpTransport = require("nodemailer-smtp-transport");

let newMealTicket = "";

module.exports.index = async (req, res)=>{
    
    const mealTickets = await MealTicket.find({}).sort('-requestDate'); //retrieve all the meal tickets
    res.render('mealtickets/index', {mealTickets}); //render all the meal tickets page    
}; 

module.exports.renderNewForm = async(req, res) => {
    res.render('mealtickets/new');
};

module.exports.createMealTicket = async (req, res)=>{
    newMealTicket = new MealTicket({...req.body.mealticket, requestDate:req.requestDate});

    console.log(req.body.mealticket);
    newMealTicket.owner = req.user._id;
    await newMealTicket.save();
    // const transporter = nodemailer.createTransport(smtpTransport({
    //     service: "gmail",
    //     host: "smtp.gmail.com",
    //     auth: {
    //         user: "loctechmealapp@gmail.com",
    //         pass: "locmealpudopc6"
    //     }
    // }));

    // const mailOptions = {
    //     from: "loctechmealapp@gmail.com",
    //     to: "joy.okwu@loctech.ng, hope.israel@loctech.ng, jenzeal3@gmail.com",
    //     subject:`${req.user.username} Meal Ticket Request Id`,
    //     html: `<b>Dear Admin,</b><br><br>${req.user.username} has generated a new Meal Ticket with an Id: ${newMealTicket.ticket_id}<br><br>Best Regards,<br><i>Loctech Meal Ticketing App</i>`
    // }

    // await transporter.sendMail(mailOptions, function(error, info){
    //     if(error) console.log(error); else console.log("Email sent: ");
        
    // });
    req.flash('success', 'Successfully created a new ticket');
    res.redirect(`/mealtickets/${newMealTicket.ticket_id}`);
};

module.exports.showMealTickets = async (req, res)=>{
    const { id } = req.params; //deconstruct the meal ticket id from the params
    const mealTicket = await MealTicket.findOne({ticket_id: id}).populate({
        path:'reviews',
    populate: {
        path:'owner'
    }}).populate('owner'); //find the first meal ticket that matches the id
    console.log(mealTicket);
    if(!mealTicket){
        req.flash('error', 'Cannot find that meal ticket!');
        return res.redirect('/mealtickets');
    }
    res.render('mealtickets/details', {mealTicket}); //render the details page and pass the found meal ticket object
};

module.exports.renderEditForm = async(req, res)=>{
    const { id } = req.params; //deconstruct the meal ticket id from the params
    const mealTicket = await MealTicket.findOne({ticket_id: id}); //find the first meal ticket that matches the id
    if(!mealTicket){
        req.flash('error', 'Cannot find that meal ticket!');
        return res.redirect('/mealtickets');
    }
    const filter = {ticket_id: id};
    
    res.render('mealtickets/edit', {mealTicket}); //render the details page and pass the found meal ticket object
};

module.exports.updateMealtickets = async(req, res)=>{
    const {id} = req.params;
    const mealticket = await MealTicket.findOneAndUpdate({filter, ...req.body.mealticket, requestDate:req.requestDate});
    req.flash('success', 'Successfully updated meal ticket');
    res.redirect(`/mealtickets/${mealticket.ticket_id}`);
};

module.exports.deleteMealticket = async (req, res)=>{
    
    const{id} = req.params;
    // await MealTicket.findOneAndDelete(id);
    await MealTicket.findOneAndDelete({ticket_id:id});
    // await MealTicket.findByIdAndDelete()

    // const transporter = nodemailer.createTransport(smtpTransport({
    //     service: "gmail",
    //     host: "smtp.gmail.com",
    //     auth: {
    //         user: "loctechmealapp@gmail.com",
    //         pass: "locmealpudopc6"
    //     }
    // }));

    // const mailOptions = {
    //     from: "loctechmealapp@gmail.com",
    //     to: "joy.okwu@loctech.ng, hope.israel@loctech.ng, jenzeal3@gmail.com",
    //     subject:`${req.user.username} Deleted a Meal Ticket`,
    //     html: `<b>Dear Admin,</b><br><br>${req.user.username} has deleted a Meal Ticket (s)he created with an Id: ${newMealTicket.ticket_id}<br><br>Best Regards,<br><i>Loctech Meal Ticketing App</i>`
    // }

    // await transporter.sendMail(mailOptions, function(error, info){
    //     if(error) console.log(error); else console.log("Email sent: ");
        
    // });

    req.flash('success', 'Successfully deleted meal ticket');
    res.redirect('/mealtickets');
};