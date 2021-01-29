const mongoose = require('mongoose');
const meals = require('./meals');
const {firstname, lastname} = require('./seedhelpers');
const MealTicket = require('../models/mealticket');

//establish connection to the database
mongoose.connect('mongodb://localhost:27017/loc-meal', {
    useNewUrlParser: true, 
    useCreateIndex:true,
    useUnifiedTopology: true

});

const db = mongoose.connection; //bing mongoose.connection to a shorter variable name

//pick a random number out of the seedhelpers array
const sampleHolders = array => array[Math.floor(Math.random()* array.length)];

//send success or message to console trying to connect to database
db.on('error', console.error.bind(console,'Connection Error:'));
db.once('open', ()=>{
    console.log('Database Connected!');
});

const seedDB = async () => {
    await MealTicket.deleteMany({});
    for(let i = 0; i < 10; i++){
        const random10 = Math.floor(Math.random() *10);
        const meal = new MealTicket({
            owner: '60083705f78f6a0604864494',
            ticket_id: `LOC${meals[random10].ticket_id}`,
            holder: `${sampleHolders(firstname)} ${sampleHolders(lastname)}`,
            requestDate: `${meals[random10].requestDate}`
        });
        await meal.save();
    }
}

seedDB()
    .then(()=>{
        mongoose.connection.close();
    })