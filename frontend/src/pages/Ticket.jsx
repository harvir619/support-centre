import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleTicket,reset,closeTicket } from "../features/ticket/ticketSlice"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"


function Ticket() {
    const {ticket,isSuccess,isError,isLoading,message}= useSelector((state)=>state.ticket)
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => { 
        if (isError) {
            toast.error(message)
        }
        dispatch(fetchSingleTicket(id))
        // eslint-disable-next-line
    }, [id, isError, message])
    
    const onTicketClose = () => {
        dispatch(closeTicket(ticket._id))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }
    
    if (isLoading) {
        return <Spinner/>
    } 
    
    if (isError) {
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
            </header>
            {ticket.status !== 'closed' && (
                <button className="btn btn-block btn-danger"
                    onClick={onTicketClose}>Close Ticket</button>
           )}
        </div>
  )
}

export default Ticket