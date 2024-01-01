import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import ReactModal from 'react-modal'
import { apiHelper } from '../utils/utils';

function AdminComplaintCard({item,i,fetchComplaint}) {
    const [isEdit,setEdit] = useState(false);
    const openModal = () => setEdit(true);
    const closeModal = () => setEdit(false);
    const [status,setStatus] = useState(item.status);

    const handleUpdate = () =>{
        apiHelper.put(`/api/complaint/${item._id}`,{status}).then((res)=>{
            closeModal()
            fetchComplaint();
        }).catch((err)=>console.log(err));

    }
  
  return (
    <>
    <tr className="border-b bg-white text-md dark:border-neutral-500">
        <td className="whitespace-nowrap  px-6 py-4 ">{i+1}</td>
        <td className="whitespace-nowrap font-semibold  px-6 py-4">{item.owner.name}</td>
        <td className="whitespace-nowrap  px-6 py-4">{item.type}</td>
        <td className="whitespace-nowrap  px-6 py-4">{item.title}</td>
        <td className="whitespace-nowrap  px-6 py-4">{item.description}</td>
        <td className={`font-semibold whitespace-nowrap  px-6 py-4 text-${(!item.status) ? 'green':'yellow'}-500 `}>{item.status ? "Pending" :"Resolved"}</td>
        <td className="whitespace-nowrap  px-6 py-4">{item.date}</td>
        <td className="whitespace-nowrap  px-6 py-4"><button className='text-xl ' onClick={openModal}><MdEdit /></button></td>
    </tr>
    <ReactModal isOpen={isEdit} style={{
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 9
        },
        content: {
          width: '20%',
          height:"20%",
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }
    }}>

        <div className="flex justify-center h-[100%] items-center gap-5 flex-col w-full">
            <div className="flex  gap-10">
            <div className="flex justify-center items-center gap-2">
                <input  onChange={(e)=>setStatus(true)}  type="radio" id="pend" name="status"  checked={status == true} />
                <label htmlFor="pend">Pending</label>
            </div>
            <div className="flex justify-center items-center gap-2">
                <input onChange={(e)=>setStatus(false)} type="radio" id="resolve" name="status" checked={status == false} />
                <label htmlFor="resolve">Resolved</label>
            </div>
            </div>
            <button className='button' onClick={handleUpdate}>Update</button>
        </div>

    </ReactModal>
    </>
  )
}

export default AdminComplaintCard