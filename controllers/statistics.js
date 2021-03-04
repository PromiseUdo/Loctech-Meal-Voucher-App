const MealTicket = require('../models/mealticket');
const Staff = require('../models/staff');
const ISODate = require("isodate");
const mealticket = require('../models/mealticket');

    //get the current day's date
const todayDate = new Date().getDate();
const thisMonth = new Date().getMonth() + 1;
const thisYear = new Date().getFullYear();
let billThisMonth = '';
let billForToday ='';
let todayRequest = '';
let requestThisMonth = '';
let firstFive = {};

module.exports.index = async(req, res)=>{
   
    const requestPerDay = await MealTicket.aggregate(
        [

            {
                $group:{
                    _id:{month:{$month:"$requestDate"}, day:{$dayOfMonth:"$requestDate"}, year:{$year:"$requestDate"}},
                    count:{$sum:1}
                }
            },

        ]
    )
    for(let item of requestPerDay){
        firstFive[item._id.day] = item.count;
    }

    console.log(firstFive);
    // array1 = [];

    // console.log(requestPerDay);

    const billPerDay = await MealTicket.aggregate(
        [
            {
                $group:{
                    _id:{month:{$month:"$requestDate"}, day:{$dayOfMonth:"$requestDate"}, year:{$year:"$requestDate"}},
                    count:{$sum:1 * 75}
                }
            }
        ]
    )

    const requestPerMonth = await MealTicket.aggregate(
        [
            {
                $group:{
                    _id:{month:{$month:"$requestDate"}},
                    count:{$sum:1}
                }
            }
        ]
    )

    //get reqeust this month
    for(i = 0; i < requestPerMonth.length; i++){
        if(requestPerMonth[i]._id.month==thisMonth){
            requestThisMonth = requestPerMonth[i].count;

        }
        // console.log(billThisMonth);
    }




    const billPerMonth = await MealTicket.aggregate(
        [
            {
                $group:{
                    _id:{month:{$month:"$requestDate"}},
                    count:{$sum:1 * 75}
                }
            }
        ]

        
    )
    console.log(billPerMonth);
    


    const requestPerStaff = await MealTicket.aggregate(
        [
            {
                $group:{
                            _id: "$owner",
                            totalBillAmount:{$sum : 1}
                }
            }
        ]
    )


    const numOfTodayRequest = await MealTicket.aggregate(
        [
            {
                $group:{
                    _id:{month:{$month:"$requestDate"}, day:{$dayOfMonth:"$requestDate"}, year:{$year:"$requestDate"}},
                    count:{$sum:1}
                }
            }
        ]
    )


   for(i = 0; i < numOfTodayRequest.length; i++){
        if(numOfTodayRequest[i]._id.day==todayDate){
            todayRequest = numOfTodayRequest[i].count;
        }
    }

    const dailyBills = await MealTicket.aggregate(
        [
            {
                $group:{
                    _id:{month:{$month:"$requestDate"}, day:{$dayOfMonth:"$requestDate"}, year:{$year:"$requestDate"}},
                    count:{$sum:1 * 75}
                }
            }
        ]
    )

    for(i = 0; i < dailyBills.length; i++){
        if(dailyBills[i]._id.day==todayDate){
            billForToday = dailyBills[i].count;
            // console.log(dailyBills[i].count);
        }
    }

    console.log(billForToday);

    for(i = 0; i < billPerMonth.length; i++){
        if(billPerMonth[i]._id.month==thisMonth){
            billThisMonth = billPerMonth[i].count;
        }

        console.log(todayDate);
    }

    //clear previous month data
    // if(todayDate === 1){
        mealticket.deleteMany({ requestDate: { $lt: new Date(thisYear, thisMonth-1, todayDate ) } }).then(function(){ 
            console.log("Data deleted"); // Success 
        }).catch(function(error){ 
            console.log(error); // Failure 
        })
    // }
    


    res.render('statistics/index', {firstFive, requestPerDay, billPerDay, requestThisMonth, billThisMonth, requestPerStaff, todayRequest, billForToday})
};

    
    // res.render('statistics/index', {mealTickets}); //render all the meal tickets page

