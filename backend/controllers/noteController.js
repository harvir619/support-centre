const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const Note = require('../models/noteModel')



//@desc Get Notes
//@route GET /api/tickets/:id/notes
//@access Private
const getNotes = asyncHandler(async (req, res) => {
    //get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    //Get ticket using the id
    const ticket = await Ticket.findById(req.params.id)
    
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    
    const notes = await Note.find({ ticket: req.params.id })
    res.status(200).json(notes)
}
)


//@desc Post Notes
//@route POST /api/tickets/:id/notes
//@access Private
const addNote = asyncHandler(async (req, res) => {
    //get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    //Get ticket using the id
    const ticket = await Ticket.findById(req.params.id)
    
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    
    const notes = await Note.create(
        {
            ticket: req.params.id, text: req.body.text, user: req.user.id
        })
    res.status(200).json(notes)    
    
})

//@desc DELETE Notes
//@route DELETE /api/tickets/:id/notes
//@access Private
const deleteNote = asyncHandler(async (req, res) => {
    
    
})


module.exports = {deleteNote,getNotes,addNote}