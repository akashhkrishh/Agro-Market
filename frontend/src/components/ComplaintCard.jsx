import { useState } from "react";
import { MdDelete } from "react-icons/md";
import ReactModal from "react-modal"
import { apiHelper } from "../utils/utils";
import { toast } from "react-toastify";


function ComplaintCard({item,i,onDelete}) {
    const [isDelete,setDelete] = useState(false);
    const openDModal = () => setDelete(true);
    const closeDModal = () => setDelete(false);


    const handleYes = () =>{
        apiHelper.delete(`/api/complaints/delete/${item._id}`)
        .then((response)=>{
           toast.success("Successfully Deleted "+item._id);
           onDelete()
          })
        .catch((err)=>toast.error("Delete Request Failed"))
        closeDModal();
      }

        
  return (
    <>
     <tr className="border-b bg-white text-md dark:border-neutral-500">
        <td className="whitespace-nowrap  px-6 py-4 ">{i+1}</td>
        <td className="whitespace-nowrap  px-6 py-4">{item.type}</td>
        <td className="whitespace-nowrap  px-6 py-4">{item.title}</td>
        <td className="whitespace-nowrap  px-6 py-4">{item.description}</td>
        <td className={`font-semibold whitespace-nowrap  px-6 py-4 text-${(!item.status) ? 'green':'yellow'}-500 `}>{item.status ? "Pending" :"Resolved"}</td>
        <td className="whitespace-nowrap  px-6 py-4">{item.date}</td>
        <td className="whitespace-nowrap  px-6 py-4"><button className='text-xl hover:text-red-500 text-red-800' onClick={openDModal}><MdDelete /></button></td>
    </tr>

     <ReactModal isOpen={isDelete} style={{
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 9
        },
        content: {
          width: '30%',
          height: '20%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }
    }}>
        <div className="row flex justify-center mb-5 w-full">
          <p className='text-lg font-semibold'>Are You Sure Remove this Product ?</p>
        </div>
        <div className="row text-white pl-16 pr-16 w-full flex gap-2 justify-between">
          <button className='w-[50%] rounded-md py-2  hover:bg-green-700 bg-green-600' onClick={handleYes}>Yes</button>
          <button className='w-[50%] rounded-md py-2
          hover:bg-red-700 bg-red-600' onClick={closeDModal}>No</button>
        </div>
        </ReactModal>
    </>
    
      
    
  )
}

export default ComplaintCard