import axios from 'axios'

const API_URL = '/api/tickets/'


//Create Note
const createNote = async (noteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL +noteData.ticket._id+'/notes', noteData, config)
    return response.data
}

//Fetch Notes
const fetchNote = async (ticket,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL +ticket+'/notes', config)
    return response.data
}

const noteService = {
    createNote,fetchNote
}

export default noteService