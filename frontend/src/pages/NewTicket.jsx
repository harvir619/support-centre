import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTicket,reset } from "../features/ticket/ticketSlice"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
function NewTicket() {
    const { user } = useSelector((state) => state.auth)
    const {isLoading,isError,isSuccess,message} = useSelector((state)=>state.ticket)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    
    const [ formData, setFormData ] = useState({ product: 'iPhone', description: ''})
    const { product, description } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onChange = (e) => {
        setFormData((prevState) => (
            {
                ...prevState,
                [e.target.id]:e.target.value
            }
        ))
    }
    
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            toast.success('Ticket Created')
            dispatch(reset())
            navigate('/tickets')
        }
        
        dispatch(reset())
        
     },[isError,isSuccess,message,navigate,dispatch])
    
    const onSubmit = (e) => { 
        e.preventDefault()
        
        const ticketData = { product, description }
        
        dispatch(createTicket(ticketData))
        dispatch(reset())
    }
    
    if (isLoading) {
        return <Spinner/>
    }
    
  return (
      <>
          <BackButton url = '/'/>
          <section className="heading">
              <h1>Create New Ticket</h1>
              <p>Please fill out the form below</p>  
          </section>
          
          <section className="form">
              <div className="form-group">
                  <label htmlFor="name">Customer Name</label>
                  <input type="text" className="form-control" value={name} disabled />
              </div>
              <div className="form-group">
                  <label htmlFor="name">Customer Email</label>
                  <input type="email" className="form-control" value={email} disabled />
              </div>
              <form onSubmit={onSubmit}>
                  <div className="form-group">
                  <label htmlFor="product">Product</label>
                  <select name="product" id="product" value={product} onChange={onChange}>
                      <option value="iPhone">iPhone</option>
                      <option value="MacbookPro">Macbook Pro</option>
                      <option value="iMac">iMac</option>
                      <option value="iPad">iPad</option>
                  </select>
                  </div>
                  <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea name="description" id="description" value={description} onChange={onChange} className="form-control" cols="30" rows="10"></textarea>
                  </div>
                  <div className="form-group">
                      <button className="btn btn-block">Submit</button>
                  </div>
              </form>
          </section>
      </>
  )
}

export default NewTicket