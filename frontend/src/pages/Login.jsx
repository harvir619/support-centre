import { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {login,reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Login() {
  const [form,setFormData]=useState({
    email: '',
    password: ''
  })
  const {email,password} = form
  const { user, isLoading, isSuccess,isError,message } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  },[user,isError,isSuccess,message,navigate,dispatch])
  
  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    
    const userData = {
      email,
      password
    }
    
    dispatch(login(userData))
    
  }
  
  if (isLoading) {
    return <Spinner/>
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
            <input type="email" className="form-control" id='email' value={email} onChange={onChange} placeholder='Email' autoComplete="" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password' value={password} onChange={onChange} placeholder='Password' autoComplete="" required />
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