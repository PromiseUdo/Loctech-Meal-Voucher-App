const MealTicket = require('../models/mealticket');
const Staff = require('../models/staff');
const ISODate = require("isodate");

    //get the current day's date
const todayDate = new Date().getDate();
const thisMonth = new Date().getMonth() + 1;
let billThisMonth = '';
let billForToday ='';
let todayRequest = '';
let requestThisMonth = '';
let firstFive = {};
// const allStaff = await MealTicket.find({}).populate('owner');
// console.log(allStaff);


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
    // console.log(billPerMonth);


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

    // const billPerStaff = await MealTicket.aggregate(
    //     [
    //         {
    //             $group:{
    //                 _id: "$owner",
    //                 totalBillAmount:{$sum : 1 * 250}
    //             }
    //         }
    //     ]
    // )

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


// const results = await MealTicket.find({owner:req.user._id});
// if(results.length == 0){
//     console.log('This person has not eaten yet');
// }else{
//     for(oneResult of results){
//         if(oneResult.requestDate.getDate() == todayDate){
//             console.log(oneResult.requestDate.getDate(), 'oneresu date');
//             console.log(todayDate, 'todayDate');
//             console.log('True');
//         }else{
//             console.log(todayDate);
//             console.log('False');
//         }
//         console.log(todayDate, 'todayDate');
    
    
//     }


// }






// console.log(req.user._id,'jjh')





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
        // console.log(billThisMonth);
    }


    res.render('statistics/index', {firstFive, requestPerDay, billPerDay, requestThisMonth, billThisMonth, requestPerStaff, todayRequest, billForToday})
};

    
    // res.render('statistics/index', {mealTickets}); //render all the meal tickets page

