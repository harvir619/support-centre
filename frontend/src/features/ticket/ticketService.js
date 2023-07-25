import axios from 'axios'

const API_URL = '/api/tickets'


//Create Ticket
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ticketData,config) 
    return response.data
}

const fetchTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

//Fetch a Single Ticket
const fetchSingleTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + `/${ticketId}`,config)    
    return response.data
}

//Close a Ticket
const closeTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + `/${ticketId}`,{status:'closed'},config)    
    return response.data

}

const ticketService = {createTicket,fetchTickets,fetchSingleTicket,closeTicket}

export default ticketService