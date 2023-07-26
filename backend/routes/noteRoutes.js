const express = require('express')
const router = express.Router({mergeParams:true})
const { protect } = require('../middleware/authMiddleware')
const {getNotes,addNote,deleteNote} = require('../controllers/noteController') 


router.route('/').get(protect, getNotes).post(protect, addNote).delete(protect, deleteNote)
module.exports = router