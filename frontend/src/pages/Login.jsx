import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Login() {
  const [form,setFormData]=useState({
    email: '',
    password: ''
  })
  const {email,password} = form
  
  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    
  }
  
  return (
    <>
      <section className='heading'>
        <h1>
        <FaSignInAlt /> Login  
        </h1>
        <p>Please log in to get support</p>
      </section>
      
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" className="form-control" id='email' value={email} onChange={onChange} placeholder='Email' required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password' value={password} onChange={onChange} placeholder='Password' required />
          </div>      
          <div className="form-group">
          <button className="btn btn-block">Login</button>
          </div>          
        </form>
      </section>
    </>
  )
}

export default Login