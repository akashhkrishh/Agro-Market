import React from 'react'
import { adminNavLinks } from '../constants'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function AdminNavBar() {
  const navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.clear();
    toast.success("Logout Successfully")
    navigate("/admin");
  }
  return (
    <div className="w-full fixed pl-44 pr-44 top-0 h-[10vh] bg-white shadow-md flex items-center justify-between">
    <ul className='flex items-center justify-center font-semibold  gap-10'>
    {
      adminNavLinks.map((items,i)=>{
        return(
          <NavLink key={i} to={items.navLink}>{items.navLabel}</NavLink>
          
        )
      })
    }
    </ul>

    <button className='bg-green-600 px-4 rounded-md text-white h-10' onClick={handleLogout}>Logout</button>
    
  </div>
  )
}

export default AdminNavBar