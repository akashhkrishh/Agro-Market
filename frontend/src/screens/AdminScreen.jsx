import React, { useEffect } from 'react'
import { apiHelper } from '../utils/utils'
import { useNavigate } from 'react-router-dom'


function AdminScreen() {
    const nav = useNavigate();
    const handle = () =>{
        apiHelper.post("/api/admin/login",{
            email:"merin@gmail.com",
            pass:"merin@123"
        }).then((res)=>{
            localStorage.setItem("token",res.data);
            nav("/admin/dashboard");
        })
    }
  return (
    <div>AdminScreen
        <button onClick={handle}>Click</button>
    </div>
  )
}

export default AdminScreen