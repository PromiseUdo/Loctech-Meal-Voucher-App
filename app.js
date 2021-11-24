const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const ExpressError = require('./utilities/ExpressError');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport =  require('passport');
const LocalStrategy = require('passport-local');
const Staff = require('./models/staff');
require('dotenv').config()

// const Review = require('./models/review');

//require the routes
const staffRoutes = require('./routes/staff');
const mealticketRoutes = require('./routes/mealtickets');
const reviewRoutes = require('./routes/reviews');
const statisticRoutes = require('./routes/statistics');


//establish connection to the database
// mongoose.connect('mongodb://localhost:27017/loc-meal', {

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

const db = mongoose.connection; //bind mongoose.connection to a shorter variable name

//send success or message to console trying to connect to database
db.on('error', console.error.bind(console,'Connection Error:'));
db.once('open', ()=>{
    console.log('Database Connected!');
});

//create an express application
const app = express();

//tell app to use ejs mate
app.engine('ejs', ejsMate);

//set the views engine to ejs
app.set('view engine', 'ejs');

//define the absolute path to the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true})); //middleware to parse the body
app.use(methodOverride('_method')); //use method override for RESTful routes
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

//passport middleware -consistent login
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Staff.authenticate()));  //generate a function in LocalStrategy for authentication

//how to store and unstore staff from the session
passport.serializeUser(Staff.serializeUser());
passport.deserializeUser(Staff.deserializeUser());
//middleware to save the time of request in the request object
app.use((req, res, next)=>{
    req.requestDate = Date.now()
    next()
});

//generate random meal ticket ID
const mealTicketId = ticketId => Math.floor(Math.random() * 10000) + 10000;

//middleware to handle flash.
app.use((req, res, next)=>{
    res.locals.currentStaff = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
//middleware to use the routes
app.use('/', staffRoutes);
app.use('/mealtickets', mealticketRoutes);
app.use('/mealtickets/:id/reviews', reviewRoutes);
app.use('/', statisticRoutes);
 
//route to serve the home page
app.get('/', (req, res) => {
    res.render('home'); //render the home page 
});



//route to handle 404
app.all('*', (req, res, next)=>{
    next(new ExpressError('Page Not Found', 404));
})

//async error handler
app.use((err, req, res, next)=>{
    const{statusCode =500} = err;
    if(!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error', {err});
});

//set app to listen on a port
let port = process.env.PORT;

if(port == null || port == ""){
    port = 3000;
}

app.listen(port, ()=>{
    console.log('App serving on port 3000');
});