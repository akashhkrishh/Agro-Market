import React, { useEffect, useState } from 'react'
import { apiHelper } from '../utils/utils';
import { toast } from 'react-toastify';

function AdminComplaints() {
  const [complaint,setComplaint] = useState([]);

  useEffect(()=>{

    apiHelper.get("/api/admin/complaints")
    .then((res)=>{setComplaint(res.data)})
    .catch((err)=>{toast.error("Internal Server Error !")});

    console.log(complaint)

  },[])
  return (
    <div className='table pl-40 pr-40 w-full'>
      <thead className='w-full'>
        <tr className='w-full mt-5 '>
          <th >Id</th>
          <th>Complain User</th>
          <th>Title</th>
          <th>Type</th>
          <th>Description</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {
          complaint.map((item,i)=>{
            return(
              <tr className='h-[8vh] mt-3 w-full text-center'>
                <td>{i+1}</td>
                <td>{item.owner.name}</td>
                <td>{item.title}</td>
                <td>{item.type}</td>
                <td>{item.description}</td>
                <td>{!item.status ? "Resolved":"Pending"}</td>
                <td>E</td>


              </tr>
            )
          })
        }
      </tbody>
      


    </div>
  )
}

export default AdminComplaints