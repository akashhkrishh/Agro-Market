import React, { useEffect, useState } from 'react'
import { apiHelper } from '../utils/utils'
import { useNavigate } from 'react-router-dom';
import {AdminBanner} from "../assets/images"
import { toast } from 'react-toastify';


function AdminScreen() {
    const [aform,setFrom] = useState({
        aemail:"",
        apass: "",
    });

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFrom((prevData)=>({
            ...prevData,
            [name]:value,
        }))
    }
    console.log(aform);

    const nav = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        e.stopPropagation();

        apiHelper.post("/api/admin/login",{
            email:aform.aemail,
            pass: aform.apass,
        }).then((res)=>{
            toast.success("Login Successfully")
            localStorage.setItem("token",res.data);
            nav("/admin/dashboard");
        }).catch((err)=>{toast.error(err.response.data)})
    }
  return (
    <form onSubmit={handleSubmit} className='w-full h-[100vh] bg-white flex justify-center items-center pt-20 pb-20 pr-40 pl-40'>
        <div className="flex w-[370px] flex-col  gap-5 rounded-md border p-5 shadow-md">
        
            <img className='border shadow-md rounded-md' src={AdminBanner} alt="" />
            <div className="flex gap-2 flex-col">
                <label htmlFor="aname" className='font-semibold'>Email Address </label>
                <input className="input" name='aemail' onChange={handleChange} value={aform.aemail} type="email" required/>
            </div>

            <div className="flex gap-2 flex-col">
                <label htmlFor="apass" className='font-semibold'>Password </label>
                <input className="input" name='apass' onChange={handleChange} value={aform.apass} type="password" required/>
            </div>

            <div className="flex gap-2 flex-col">
                <button className='text-center font-semibold  py-3 hover:bg-green-700 bg-green-600 rounded-md text-white'>Login</button>
            </div>

        </div>
        
    </form>
  )
}

export default AdminScreen