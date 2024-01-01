import React, { useEffect, useState } from 'react'
import { apiHelper } from '../utils/utils'
import { adminNavLinks } from '../constants'
import { MdDelete } from 'react-icons/md';
import UserCard from '../components/UserCard';

function Dashboard() {
    const [Users,setUsers] = useState([]);
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = () =>{
      apiHelper.get("/api/admin/getUsers").then((res)=>{setUsers(res.data)})
    }

    
    
  return (
    <div className="table w-full mb-6">
      <table className="flex w-full pr-40 pl-40 flex-col ">
        <thead > 
          <tr className='w-full h-[5vh] flex   items-center'>
            <th className='w-[5%]' >Id</th>
            <th className='w-[10%]'>Image</th>
            <th className='w-[15%]'>Name</th>
            <th className='w-[28%]'>Email</th>
            <th className='w-[15%]'>Contact</th>
            <th className='w-[10%]'>City</th>
            <th className='w-[10%]'>State</th>
            <th className='w-[8%]'> Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            Users.map((items,i)=>{
              return(
                <UserCard key={i} items={items} fetchData={fetchData} i={i}/>
              )
            })
          }
        </tbody>
      </table >

    </div>
  )
}

export default Dashboard