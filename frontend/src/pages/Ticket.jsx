import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleTicket, closeTicket } from "../features/ticket/ticketSlice"
import { fetchNote,createNote,reset } from "../features/note/noteSlice"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import NoteItem from "../components/NoteItem"
import { FaPlus } from "react-icons/fa"
import Modal from 'react-modal'

function Ticket() {
    const { ticket, isSuccess, isError, isLoading, message } = useSelector((state) => state.ticket)
    const {note,isLoading:isNotesLoading,isError:isNotesError,message:notesMessage} = useSelector((state) => state.note)
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText,setNoteText] = useState('')
    
    //React Modal
    const customStyles = {
        content: {
            width:'600px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            postion:'relative'
        },
    }
    
    Modal.setAppElement('#root')
    
    useEffect(() => { 
        if (isError) {
            toast.error(message)
        }
        dispatch(fetchSingleTicket(id))
        dispatch(fetchNote(id))
        // eslint-disable-next-line
    }, [id, isError, message])
    
    const onTicketClose = () => {
        dispatch(closeTicket(ticket._id))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }
    //Open/close modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)
    
    //Note Submit
    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({noteText, ticketId: ticket._id}))
        closeModal()
    }
    if (isLoading || isNotesLoading) {
        return <Spinner/>
    } 
    
    if (isError||isNotesError) {
        return <h3>Something Went Wrong</h3>
    }
    return (
        <div className="ticket-page">
            <header className="ticket-header">
            <BackButton url='/tickets' />
                <h2>Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>
            
            {ticket.status !== 'closed' && (
                <button onClick={openModal} className="btn"><FaPlus/> Add Note </button>
            )}
            
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Note">
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>X</button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea name="noteText" id="noteText" className="form-control" placeholder='Note text' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
                        
                    </div>
                    <div className="form-group">
                        <button className="btn" type='submit'>Submit</button>
                    </div>
                </form>
            </Modal>
            
            {note.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}
            {ticket.status !== 'closed' && (
                <button className="btn btn-block btn-danger"
                    onClick={onTicketClose}>Close Ticket</button>
           )}
        </div>
  )
}

export default Ticket