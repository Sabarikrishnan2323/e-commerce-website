import React, { useContext, useState } from 'react'
import"./LoginPage.css"
import api from '../../api'
import Error from '../ui/Error'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


const LoginPage = () => {
  const {setIsAuthenticated,get_username}=useContext(AuthContext)
  
  const location=useLocation()
  const navigate=useNavigate()
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  const userinfo={username,password}

  function handlesubmit(e){
    e.preventDefault()
    setLoading(true)
    api.post("token/",userinfo).then(res => {console.log(res.data) 
      localStorage.setItem("access",res.data.access)
      localStorage.setItem("refresh",res.data.refresh)
      setUsername("")
      setPassword("")
      setLoading(false)
      get_username()
      setIsAuthenticated(true)
    setError("")
  const from =location?.state?.from.pathname || "/"
  navigate(from,{replace:true})
})
    .catch(err => {console.log(err.message)
      setLoading(false)
      setError(err.message)
    })
  }
  return (
    <div className="login-container my-5">
      <div className="login-card shadow">
        {error && <Error error={error} />}
        <h2 className='login-title'>Welcome Back</h2>
        <p className='login-subtitle'>Please login to continue</p>
        <form  onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="username" className='form-label'>Username</label>
            <input type="username" value={username} onChange={(e) => setUsername(e.target.value)}className='form-control' id='email' placeholder='Enter your username' required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' id='password' placeholder='Enter your password' required />
          </div>
          <button type='submit' className='btn btn-primary w-100' disabled={loading}>Login</button>
        </form>
        <div className="login-footer">
          <p><a href="#" >Forget Password</a></p>
          <p>Don't have a accoount? <a href="#">Sign up</a></p>
        </div>
      </div>

    </div>
  )
}

export default LoginPage