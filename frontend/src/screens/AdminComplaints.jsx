import React, { useEffect, useState } from 'react'
import { apiHelper } from '../utils/utils';
import { toast } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
import AdminComplaintCard from '../components/AdminComplaintCard';

function AdminComplaints() {
  const [complaint,setComplaint] = useState([]);

  useEffect(()=>{
    fetchComplaint();
  },[]);
  
  const fetchComplaint = () =>{
    apiHelper.get("/api/admin/complaints")
    .then((res)=>{setComplaint(res.data)})
    .catch((err)=>{toast.error("Internal Server Error !")});
  }
  return (
    <div className="flex pl-40 pr-40 flex-col items-center w-full">
      <table className="min-w-full text-center font-light">
          <thead
            className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th scope="col" className=" px-6 py-4">#</th>
              <th scope="col" className=" px-6 py-4">Complaint User</th>
              <th scope="col" className=" px-6 py-4">Type</th>
              <th scope="col" className=" px-6 py-4">Title</th>
              <th scope="col" className=" px-6 py-4">Description</th>
              <th scope="col" className=" px-6 py-4">Status</th>
              <th scope="col" className=" px-6 py-4">Date</th>
              <th scope="col" className=" px-6 py-4">Edit</th>
            </tr>
          </thead>
          <tbody>
           
     
        {
          complaint.map((item,i)=>{
            return(
              <AdminComplaintCard item={item} fetchComplaint={fetchComplaint} key={i} i={i} />
            )
          })
        }
      </tbody>
      


    </table>

    </div>
  )
}

export default AdminComplaints