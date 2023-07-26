import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

//Initial States for the ticket
const initialState = {
    note: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:'',
}


//Create Note
export const createNote = createAsyncThunk(
    'notes/create',
    async ({ noteText, id }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.createNote(noteText,id,token)
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

//Fetch Notes
export const fetchNote = createAsyncThunk(
    'notes/fetchAll',
    async (ticket, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.fetchNote(ticket,token)            
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

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state)=>initialState
    },
    extraReducers: (builder) => {
        builder
        //Create Note
        .addCase(createNote.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createNote.fulfilled, (state,action) => {
            state.isSuccess = true
            state.isLoading = false
            state.note.push(action.payload)
        })
        .addCase(createNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        //Get Notes
        .addCase(fetchNote.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchNote.fulfilled, (state,action) => {
            state.isLoading = false
            state.isSuccess = true
            state.note = action.payload
        })
        .addCase(fetchNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer