import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../../api'
import Spinner from "./Spinner"
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const location=useLocation()
  
    const [isAuthorized,setIsAuthorized]=useState(null)
    useEffect(function(){
        auth().catch(() => setIsAuthorized(false) )
    },[])
    async function refreshtoken() {
        const refreshtoken=localStorage.getItem("refresh")
        try{
            const res=await api.post("/token/refresh/",{refresh:refreshtoken,})
            if(res.status === 200){
                localStorage.setItem("access",res.data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }
        }
        catch(error){
            console.log(error)
            setIsAuthorized(false)
        }
        
    }
    async function auth(){

        const token=localStorage.getItem("access")
        if(!token){
            setIsAuthorized(false)
            return
        }
        const decoded=jwtDecode(token)
        const expiry_date=decoded.exp
        const current_time=Date.now() /1000
        if (current_time > expiry_date)
{
    await refreshtoken()
}
else{
    setIsAuthorized(true)
}
    }
    if(isAuthorized === null){
        return <Spinner />
    }
 
    return (
        isAuthorized ? children: <Navigate to="/login" state={{from: location}} replace/>
  )
}

export default ProtectedRoute