const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const mealTicketSchema = new Schema({
    ticket_id:String,
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    requestDate: Date,
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

mealTicketSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{$in:doc.reviews}
        })
    }else{

    }
})

module.exports = mongoose.model('MealTicket', mealTicketSchema);