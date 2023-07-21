const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')



//@desc Get Tickets
//@route GET /api/tickets
//@access Private
const getTickets = asyncHandler(async(req,res) => {
    
    const tickets = Ticket.find({})
    
    
    res.status(200).json({message:'getTickets'})
})

//@des Create a new ticket
//@route POST /api/tickets
//@access Private
const createTicket = asyncHandler(async (req, res) => {
    const { user, product, description, status } = req.body
    
        //Validation
    if (!user, !product, !description, !status) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    const ticket = await Ticket.create({ user, product, description, status })
    
    if (ticket) {
        res.status(201).json(ticket)
    }   
    else {
        res.status(400)
        throw new Error('Invalid ticket data')
    }
})






module.exports = { getTickets,createTicket }
