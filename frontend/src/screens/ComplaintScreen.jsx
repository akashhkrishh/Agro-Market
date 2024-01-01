import React, { useEffect, useState } from 'react'
import { apiHelper } from '../utils/utils';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { MdDelete, MdModeEdit } from "react-icons/md";
import ComplaintCard from '../components/ComplaintCard';


function ComplaintScreen() {
  const [complaintlist,setComplaintList] = useState([]);
  const [isEdit,setEdit] = useState(false);
    const openModal = () => setEdit(true);
    const closeModal = () => setEdit(false);
    const [complaint,setComplaint] = useState({
      title: "",
      description: "",
      type: "",
  });

    const fetchComplaint = () =>{
      apiHelper.get("/api/complaints/mycomplaints").then((res)=>{
          setComplaintList(res.data);
      })
    }
    useEffect(()=>{  
        fetchComplaint();
    },[])
  

    
  const handleChange = (e) => {
      const { name, value, type } = e.target;
      setComplaint((prevData) => ({
        ...prevData,
        [name]: value,
          
      }));
      
    };
    
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    e.stopPropagation();
  
    if(complaint.type == "")
      return toast.error("Type must be Filled!")
    apiHelper.post("/api/complaints/add",complaint)
    .then((res)=>{
        toast.success(res.data);
        fetchComplaint();
        closeModal();

    }).catch((error)=>{
        toast.error(error.data)
    })
    
}




  
  return (
    <div className="flex w-[100vw] justify-center">
      <div className="pl-40 pr-40 w-full">
        <div className="flex justify-between mb-5 w-full ">
          <h1 className='text-2xl font-semibold'>Complaint Page</h1>
          <button className='py-2 bg-green-600 text-white rounded-md font-semibold px-4' onClick={openModal}>Add Complaint</button>
        </div>
        <table className="min-w-full text-center font-light">
          <thead
            className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th scope="col" className=" px-6 py-4">#</th>
              <th scope="col" className=" px-6 py-4">Type</th>
              <th scope="col" className=" px-6 py-4">Title</th>
              <th scope="col" className=" px-6 py-4">Description</th>
              <th scope="col" className=" px-6 py-4">Status</th>
              <th scope="col" className=" px-6 py-4">Date</th>
              <th scope="col" className=" px-6 py-4"><MdModeEdit/></th>
            </tr>
          </thead>
          <tbody>
            
            
             {complaintlist.map((item,i)=>{
               return(
                 <ComplaintCard onDelete={fetchComplaint} key={item._id} item={item} i={i}/>
                 
                 );
               })
            }
           
           
          </tbody>
        </table>
        {
        complaintlist.length ==0 &&
        <div className='w-full text-lg font-semibold flex items-center justify-center h-[50vh]'>You haven't register any complaints</div>
        }

      </div>

      <ReactModal isOpen={isEdit}  style={{
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 9
        },
        content: {
          width: '25%',
          minHeight:"60%",
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }
    }}>
      <form onSubmit={handleSubmit}>
      <div className="row mb-3 flex justify-between w-full">
        <p className='text-xl font-semibold'>Add New Complaints</p>
        <button className='px-4 py-1 rounded-md text-white bg-red-500 hover:bg-red-600' onClick={closeModal}> Close</button>
      </div>

      <div className="flex flex-col mb-3 justify-center items-start row">
        <label className="font-semibold" htmlFor="Type">Complaint Type</label>
        <select className='input mt-2' name="type" onChange={handleChange} id="" required>
        <option defaultValue="" >Select an option</option>
          <option style={{height:"100px"}} className='p-3' defaultValue="Technical">Technical</option>
          <option className='p-3' defaultValue="Delivery">Delivery Issue</option>
          <option className='p-3' defaultValue="Return and Refund">Return and Refund</option>
          <option className='p-3'defaultValue="Others">Others</option>
        </select>
       
      </div>
      <div className="flex flex-col mb-3 justify-center items-start row">
        <label className="font-semibold" htmlFor="Type">Complaint Title</label>
        <input type="text" className='input mt-2' name="title" id="" onChange={handleChange} autoComplete='off' required/>
      </div>
      <div className="flex flex-col mb-3 justify-center items-start row">
        <label className="font-semibold" htmlFor="Type">Description</label>
        <textarea name="description" autoComplete='off' className='input mt-2' id="" rows="2" onChange={handleChange} required/>
      </div>
      <div className="flex flex-col mt-5 justify-center items-start row">
        <button className='w-full text-md rounded-md font-semibold text-white  bg-green-600 py-3 hover:bg-green-700'>Register an Complaint</button>
       
       
      </div>
    
      </form>



      </ReactModal>

      


      

    </div>
  )
}

export default ComplaintScreen