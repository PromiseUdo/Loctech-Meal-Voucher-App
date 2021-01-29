const generateID = document.querySelector('#generateID');
const ticketId = document.querySelector('#ticket_id');

generateID.addEventListener('click', function(e){
    e.preventDefault();
    const mealTicketId = ticketId => Math.floor(Math.random() * 10000) + 10000;
    ticketId.value = `LOC${mealTicketId()}`;
    
});