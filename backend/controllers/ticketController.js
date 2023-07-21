const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')



//@desc Get Tickets
//@route GET /api/tickets
//@access Private
const getTickets = asyncHandler(async(req,res) => {
    
    //get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    if (!user) { 
        res.status(401)
        throw new Error('User not found')   
    }
    
    
    const tickets = await Ticket.find({user:req.user.id})
    
    
   return res.status(200).json(tickets)
})

//@des Create a new ticket
//@route POST /api/tickets
//@access Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description} = req.body
    
        //Validation
    if (!product, !description) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.create({
        user: req.user.id, product, description, status:'new'
    })
    
    if (ticket) {
        res.status(201).json(ticket)
    }   
    else {
        res.status(400)
        throw new Error('Invalid ticket data')
    }
})






module.exports = { getTickets,createTicket }
