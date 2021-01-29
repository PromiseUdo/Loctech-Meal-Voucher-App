const TeleSignSDK = require('telesignsdk');

// const client = new TeleSignSDK("B102D7B7-9D3C-4C09-9009-952778DF859F", "z+piYiz3H1ZrZY9FRRj0eqGZwWHpVuvnbamqZN8qnaZs6UENJDHsDS8QPViY0DmrOoa14BISSlCnEyMC4BcGfQ==")


// callback = function(err, resBody){
//     if(err){
//         console.error(err);
//     }else{
//         console.log("Success!");
//         console.log(resBody);
//     }
// }

// client.sms.message(callback, "2348071287485", "Hello from meal App", "MKT");

// client.sms.message((err, resBody)=>{
//     if(err){
//         console.error(err);
//     }else{
//         console.log("success");
//     }
// });



const customerId = "B102D7B7-9D3C-4C09-9009-952778DF859F";
const apiKey = "z+piYiz3H1ZrZY9FRRj0eqGZwWHpVuvnbamqZN8qnaZs6UENJDHsDS8QPViY0DmrOoa14BISSlCnEyMC4BcGfQ==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

const phoneNumber = "+2348071287485";
const message = "You're scheduled for a dentist appointment at 2:30PM.";
const messageType = "MKT";

console.log("## MessagingClient.message ##");

function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}
client.sms.message(messageCallback, phoneNumber, message, messageType);
