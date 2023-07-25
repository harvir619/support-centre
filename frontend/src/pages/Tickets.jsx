import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import { fetchTickets, reset } from "../features/ticket/ticketSlice"
import BackButton from "../components/BackButton"
import TicketItem from "../components/TicketItem"


function Tickets() {
    const {tickets,isLoading,isError,isSuccess,message} = useSelector((state)=>state.ticket)
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchTickets())
        if (isError) {
            toast.error(message)
        }
    },[dispatch])
    
    useEffect(() => { 
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    },[isSuccess])
    
    if (isLoading) {
        return <Spinner/>
    }
  return (
      <>
            <BackButton url="/"/>
          <h1>Tickets</h1>
          <div className="tickets">
              <div className="ticket-headings">
                  <div>Date</div>
                  <div>Product</div>
                  <div>Status</div>
                  <div></div>
                  </div>
                  {tickets.map((ticket) => (
                      <TicketItem key={ticket._id} ticket={ticket}/>
                  ))}
          </div>
      </>
  )
}

export default Tickets