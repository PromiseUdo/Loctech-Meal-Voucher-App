//generate random meal ticket ID
const mealTicketId = ticketId => Math.floor(Math.random() * 10000) + 10000;

module.exports = [
    {
        ticket_id: mealTicketId(),
        requestDate:'2012-12-08'
    },
    {
        ticket_id: mealTicketId(),
        requestDate:'2020-12-09'
    },
    {
        ticket_id: mealTicketId(),
        requestDate:'2015-12-29'
    },
    {
        ticket_id: mealTicketId(),
        requestDate:'2011-12-19'
    },
    {
        ticket_id: mealTicketId(),
        requestDate:'2002-12-09'
    },
    {
        ticket_id: mealTicketId(),
        requestDate:'2015-12-01'
    },
    {
        ticket_id: mealTicketId(),
        requestDate:'2020-12-09'
    },
    {
        ticket_id: mealTicketId(),
        requestDate:'2018-12-14'
    },
    {
        ticket_id: mealTicketId(),
        requestDate:'2021-12-09'
    },
    {
        ticket_id: mealTicketId(),
        requestDate:'2019-12-18'
    }

]