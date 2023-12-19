import React, { useEffect, useState } from 'react'
import { apiHelper } from '../utils/utils'
import { adminNavLinks } from '../constants'
import { MdDelete } from 'react-icons/md';

function Dashboard() {
    const [Users,setUsers] = useState([]);
    useEffect(()=>{
        apiHelper.get("/api/admin/getUsers").then((res)=>{setUsers(res.data)})
    },[]);
    
  return (
    <div className="table w-full">


      <div className="flex w-full pr-40 pl-40 flex-col ">
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
                <tr  className='border rounded-md  mt-3 w-full flex bg-white items-center text-center' key={items._id}>
                  
                  <td className='w-[5%] flex  justify-center '>{i+1}</td>
                  <td className='w-[10%] flex justify-center items-center '><img src={items.image.file_data } width={80}/></td> 
                  <td className='w-[15%] text-green-600 font-semibold'>{items.name}</td>
                  <td className='w-[28%]'>{items.email}</td>
                  <td className='w-[15%]'>{items.contact_no}</td>
                  <td className='w-[10%]'>{items.city }</td>
                  <td className='w-[10%]'>{items.state}</td>
                  <td className='w-[8%] flex justify-center cursor-pointer text-red-500 hover:text-red-700'><MdDelete/></td>

                </tr>
              )
            })
          }
        </tbody>
      </div>




      
        
    
      

    </div>
  )
}

export default Dashboard