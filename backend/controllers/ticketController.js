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

//@desc Get Single Ticket
//@route GET /api/tickets/:id
//@access Private
const getTicket = asyncHandler(async (req, res) => {
    
    //Get ticket using the id
    const ticket = await Ticket.findById(req.params.id)
    
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    
    return res.status(200).json(ticket)
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
    
    if (ticket) { return res.status(201).json(ticket)}   
    else {
        res.status(400)
        throw new Error('Invalid ticket data')
    }
})

//@desc Delete a Ticket
//@route DELETE /api/tickets/:id
//@access Private
const deleteTicket = asyncHandler(async (req, res) => {
    
    // Get the ticket
    const ticket = await Ticket.findById(req.params.id)
    
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    
    //Confirm the user
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    
    await ticket.deleteOne()
    
    return res.status(200).json({success:true})
})

//@desc Update a Ticket
//@route PUT /api/tickets/:id
//@access Private
const updateTicket = asyncHandler(async (req, res) => {
    //Get ticket using id
    const ticket = await Ticket.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    )
    
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    //To do it without findbyidandupdate
    // ticket.product = req.body.product
    // ticket.description = req.body.description
    // 
    // const updatedTicket = await ticket.save();
    
    return res.status(200).json(ticket)
    
})






module.exports = { getTickets,createTicket,getTicket, deleteTicket, updateTicket }
