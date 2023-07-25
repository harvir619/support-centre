import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from '../ticket/ticketService'


//Initial States for the ticket
const initialState = {
    tickets: [],
    ticket:{},
    isLoading: false,
    isError: false,
    isSuccess:false,
    message: '',
}

//Create Ticket
export const createTicket = createAsyncThunk(
    'tickets/create',
    async (ticket, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.createTicket(ticket,token)          
        } catch (error) {
            const message = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Fetch Tickets
export const fetchTickets = createAsyncThunk(
    'tickets/fetchAll',
    async (_,thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.fetchTickets(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchTickets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message= action.payload
            })
    }
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer