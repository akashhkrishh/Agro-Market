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
    
    <tr key={item._id} className='flex text-center items-center justify-center  h-[50px] '>
              <td className='w-[5%] text-black font-bold   '>{i+1}</td>
              <td className='w-[15%] '>{item.type}</td>
              <td className='w-[20%] '>{item.title}</td>
              <td className='w-[27%] '>{item.description}</td>
              <td className='w-[15%] '>{item.status ? "Pending" :"Resolved"}</td>
              <td className='w-[10%] '>{item.date}</td>
              <td className='w-[8%] '>
                <button className='text-xl hover:text-red-500 text-red-800' onClick={openDModal}><MdDelete /></button>
                </td>
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