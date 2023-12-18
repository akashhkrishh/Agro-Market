import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { apiHelper } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

function YourProductsCard({agrol,onDelete}) {
  const [isEdit,setEdit] = useState(false);
  const openModal = () => setEdit(true);
  const closeModal = () => setEdit(false);
  const [isDelete,setDelete] = useState(false);
  const openDModal = () => setDelete(true);
  const closeDModal = () => setDelete(false);
  const navigate = useNavigate(); 



  const [form,setData] = useState({
    name: agrol.name,
    color: agrol.color,
    family: agrol.family,
    origin: agrol.origin,
    quantity: agrol.quantity,
    price: agrol.price,
    image: null,
    description :agrol.description,
  });
  

  const handleYes = () =>{
    apiHelper.delete(`/api/products/delete/${agrol._id}`)
    .then((response)=>{
       toast.success("Successfully Deleted "+agrol.name);
      onDelete()
      })
    .catch((err)=>toast.error("Delete Request Failed"))
    closeDModal()
  }
  

  const handleChange = (e) =>{
 
    const { name,type, value } = e.target;
    setData((prevData)=>({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value,
      
    }));
  }

  const handleUpdate = (e) =>{
    e.preventDefault();

    try {
      console.log()
      const formd = new FormData();
      formd.append('name', form.name);
      formd.append('origin', form.origin);
      formd.append('image', form.image);
      formd.append('quantity', form.quantity);
      formd.append('price', form.price);
      formd.append('family', form.family);
      formd.append('color', form.color);
      formd.append('description', form.description);
    

      apiHelper.put(`/api/products/${agrol._id}`, formd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response=>{
         toast.success('product Edited successfully!');
         onDelete()
         closeModal()
         
      })
    } catch (error) {
      toast.error(error.response.data.error);  
    }

  }


  return (
    <>
    <div key={agrol._id} className="p-3 rounded-md shadow-md border bg-white border-green-600">
    <div className="row flex gap-2">
        <div className="col">
            <img className='rounded-md' src={agrol.image.file_data} 
            height={100} style={{backgroundColor:"red"}} width={100} alt="" />
        </div>
        <div className="col flex-col flex justify-evenly">
          <p className="row w-full text-green-600 text-sm font-bold">
            <span className='text-black font-normal'>{"Name : "}</span>{agrol.name}</p>
          <p className="row w-full text-green-600 text-sm font-bold">
          <span className='text-black font-normal'>{"Family : "}</span>{agrol.family}</p>
          <p className="row w-full text-green-600  font-bold text-xl ">
          <span className='text-black text-sm  font-normal'>{"Price : "}</span>&#x20B9;{" "+agrol.price}</p>
          <p className="row w-full text-green-600 text-sm font-bold">
          <span className='text-black font-normal'>{"Available : "}</span>{" "+agrol.quantity+" kg"}</p>
          
        </div>
      </div>
      <hr className='mt-3 mb-3' />
      <div className="text-white flex justify-between gap-2 buttons">
        <button style={{width:"50%"}} className='bg-green-600 px-8 py-2 rounded-md hover:bg-green-700' onClick={openModal} >Edit</button>
        <button style={{width:"50%"}} className='bg-red-600 px-8 py-2 rounded-md hover:bg-red-700' onClick={openDModal}>Delete</button>
      </div>
    </div>
    <ReactModal isOpen={isEdit} style={{
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 9
        },
        content: {
          width: '50%',
          height: '70%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }
    }}>
      <div className="row mb-3 flex justify-between w-full">
        <p className='text-xl font-semibold'>Edit Product Detaills</p>
        <button className='px-4 py-1 rounded-md text-white bg-red-500' onClick={closeModal}> Close</button>
      </div>
     
      <div className="container gap-3 flex w-full h-[85%] ">
        <div className="flex flex-col justify-between w-[66%] ">
          <div className='flex flex-row gap-3 h-[60%] '>
            <div className='w-[50%] flex flex-col justify-between '>
            <div className="w-full mb-3 h-[33%] ">
                <p className='mb-2'>Product Name :</p>
                <input type="text"  
                defaultValue={form.name}
                name="name" className='input' onChange={handleChange} />
             </div>
             <div className="w-full mb-3 h-[33%]">
                <p className='mb-2'>Product Family :</p>
                <input type="text"  defaultValue={form.family}
                onChange={handleChange} name='family' className='input' />
             </div>
             <div className="w-full  h-[33%]">
                <p className='mb-2'>Product Price per Kg  :</p>
                <input type="number"  defaultValue={form.price} 
                onChange={handleChange} name='price' className='input' />
             </div>
            </div>
            <div className='w-[50%] '>
            <div className="w-full mb-3 h-[33%] ">
                <p className='mb-2'>Product Color :</p>
                <input type="text"  defaultValue={form.color} 
                onChange={handleChange} name='color' className='input' />
             </div>
             <div className="w-full mb-3  h-[33%]">
                <p className='mb-2'>Product Location :</p>
                <input type="text"  value={form.origin} 
                onChange={handleChange} name='origin' className='input' />
             </div>
             <div className="w-full  h-[33%]">
                <p className='mb-2'>Availabilty :</p>
                <input type="number"  value={form.quantity} 
                onChange={handleChange} name='quantity' className='input' />
             </div>
            
            </div>

          </div>
          <div className="w-full mb-3 flex flex-col justify-end h-[40%]">
            <p className='mb-2'>Description :</p>
            <textarea name="description" id="" style={{height:"60%"}} className='input' onChange={handleChange} defaultValue={form.description}>

            </textarea>
          </div>
        </div>
        <div className="flex flex-col h-[100%] justify-between w-[33%] ">
          <label style={{cursor:"pointer"}} htmlFor='imageFor' className='h-[60%] '>
            
            <img src={ form.image==null ? agrol.image.file_data : URL.createObjectURL(form.image)} className='rounded-md' style={{width:"100%",height:"100%"}} alt=""  />
          </label>
          <div className='mt-4 h-[20%]'>
            <label style={{cursor:"pointer"}} className='font-semibold flex justify-center border py-3 w-full' htmlFor="imageFor">Click Here to Change Image</label>
            <input hidden style={{cursor:"pointer"}} type="file" id='imageFor' name='image' className='input' onChange={handleChange} />
          </div>
          
          <div className='h-[20%] mt-5 py-3'>
            <button className='w-full rounded-md text-white text-lg font-semibold bg-green-600 h-[100%]'
            onClick={handleUpdate}
            >Update</button>
          </div>
        </div>
        
      </div>
    </ReactModal>
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
    }} >
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

export default YourProductsCard