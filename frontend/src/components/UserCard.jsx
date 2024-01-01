import React, { useState } from 'react'
import { apiHelper } from '../utils/utils'
import { MdDelete } from 'react-icons/md'
import ReactModal from 'react-modal';

function UserCard({items,i,fetchData}) {
    const [isDelete,setDelete] = useState(false);
    const openDModal = () => setDelete(true);
    const closeDModal = () => setDelete(false);
    
    const handleDelete = () =>{
        apiHelper.delete(`/api/admin/user/${items._id}`).then((res)=>{
            closeDModal();
            fetchData();
        }).catch((err)=>{console.log(err)});
        
      }
  return (
    <>
    <tr  className='border rounded-md  mt-3 w-full flex bg-white items-center text-center' key={items._id}>
                  
                  <td className='w-[5%] flex  justify-center '>{i+1}</td>
                  <td className='w-[10%] flex justify-center items-center '><img src={items.image.file_data } width={80}/></td> 
                  <td className='w-[15%] text-green-600 font-semibold'>{items.name}</td>
                  <td className='w-[28%]'>{items.email}</td>
                  <td className='w-[15%]'>{items.contact_no}</td>
                  <td className='w-[10%]'>{items.city }</td>
                  <td className='w-[10%]'>{items.state}</td>
                  <td className='w-[8%] flex justify-center cursor-pointer text-red-500 hover:text-red-700'><MdDelete onClick={openDModal}/></td>
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
                    <p className='text-lg font-semibold'>Are You Sure Remove this User ?</p>
                  </div>
                  <div className="row text-white pl-16 pr-16 w-full flex gap-2 justify-between">
                    <button className='w-[50%] rounded-md py-2  hover:bg-green-700 bg-green-600' onClick={handleDelete}>Yes</button>
                    <button className='w-[50%] rounded-md py-2
                    hover:bg-red-700 bg-red-600' onClick={closeDModal}>No</button>
                  </div>
                  </ReactModal>
    </>
        
  )
}

export default UserCard