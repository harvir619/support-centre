import axios from 'axios'

const API_URL = '/api/tickets/'


//Create Note
const createNote = async (noteData, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    }
    const response = await axios.post(API_URL +id+'/notes', {'text':noteData}, config)
    return response.data
}

//Fetch Notes
const fetchNote = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL +id+'/notes', config)
    return response.data
}

const noteService = {
    createNote,fetchNote
}

export default noteService