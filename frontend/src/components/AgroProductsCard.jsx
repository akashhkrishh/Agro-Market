import React, { useEffect, useState } from 'react'
import { FaLocationArrow, FaUser } from 'react-icons/fa'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import ReactModal from 'react-modal'
import { NavLink } from 'react-router-dom'
import { IoMdMail } from "react-icons/io";

function AgroProductsCard({agroP}) {
    const [isShow,setShow] = useState(false);
    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);
    
    
    const bana = "Bananas hold cultural significance in various regions, often being a staple food in many tropical diets. They are also associated with certain rituals, festivals, and traditions in different cultures.";
    
  return (
   <>
   <div key={agroP._id} onClick={openModal} className="p-3 cursor-pointer  transition-transform rounded-md shadow-md border bg-white border-green-600">
                  <div className="row flex gap-2">
                    <div className="col">
                      <img className='rounded-md' src={agroP.image.file_data} width={100} alt="" />
                    </div>
                    <div className="col flex-col flex justify-evenly">
                      <p className='flex items-center text-xs gap-1 text-green-600'><FaLocationCrosshairs/><span>{agroP.origin}</span></p>
                      <p className="row w-full text-[1.2rem] font-semibold">{agroP.name+" - "+agroP.color}</p>
                      <p className="row w-full text-xl font-bold">&#x20B9;{" "+agroP.price}
                      <span className='text-green-600 text-sm font-semibold'>{" / Kg"}</span></p>
                      <p className="row w-full text-xs flex gap-1 items-center"><FaUser color='green'/>
                        <span className='text-green-600 text-sm  font-semibold'>{agroP.owner.name}</span>
                      </p>
                     
                      
                    </div>
                    
                  </div>
                  <hr className='mt-3 mb-3' />
                  <div className='flex justify-between gap-1'>
                    <span>{"Availability : "}<span className='text-green-600 font-bold'>{agroP.quantity+" Kg"}</span></span>
                    <NavLink onClick={openModal} style={{color:"red",fontWeight:"normal",}}>view</NavLink>
                  </div>
                  
                </div>

                <ReactModal isOpen={isShow} style={{
                    overlay:{
                       
                        backgroundColor:"rgba(0,0,0,0.4)"
                    },
                    content:{
                        width: '40%',
                        minHeight: '90%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }
                    }}>

        <div className="row mb-3 flex justify-between w-full">
            <p className='text-xl font-semibold'>Product Details</p>
           <button className='px-4 py-1 rounded-md text-white bg-red-500 hover:bg-red-600' onClick={closeModal}> Close</button>
        </div>
      
            <div className="flex text-lg mt-5 gap-2">
                <div className="flex gap-1 justify-between text-gray-700 flex-col w-[30%]">
                    
                    <p>Name  </p>
                    <p>Color  </p>
                    <p>Family </p>
                    <p>Origin </p>
                    
                    <p>Availbility </p>
                    <p>Price </p>
                </div>
                <div className="flex gap-1 text-green-600 font-semibold justify-between flex-col w-[40%]">
                    
                    <p>{": "+agroP.name}</p>
                    <p>{": "+agroP.color}</p>
                    <p>{": "+agroP.family}</p>
                    <p>{": "+agroP.origin}</p>
                    
                    <p>{": "}{agroP.quantity+" Kg"}</p>
                    <p>{": "}&#x20B9;{agroP.price}<span className='text-xs'>{" / kg"}</span></p>
                    
                </div>
                <div className="flex flex-col items-end  w-[30%]">
                    <img src={agroP.image.file_data} style={{
                        width:"100%"
                    
                    }} className='rounded-md' alt="" />

                </div>
            </div>
            <div className="row mt-4 flex justify-between w-full">
                <p className='text-xl font-semibold'>Description</p>
            </div>
            <div className="row mt-4  flex flex-col w-full">
                <p className='text-md'><span className='ml-8'></span>{agroP.description}</p>
            </div>
            <div className="row mt-3 flex item-center justify-between w-full">
                <p className='flex items-center text-xl font-semibold'>Seller Details</p>
                <div className="row  flex justify-center items-center">
            
                <a 
                className='px-4 py-2 text-white rounded-md flex justify-center items-center gap-2 bg-green-600'
                href={`mailto:${agroP.owner.email}`}><IoMdMail size={20}/>Send Email</a>
            </div>
            </div>
            <div className="row mt-4 flex justify-center w-full">
                <div className='p-4 flex gap-6 bg-green-600 w-[100%] rounded-md '>
                    <div cl style={{height:"100%"}} className="flex flex-col w-[30%] rounded-md">
                        <img className='rounded-md' style={{width:"100%"}}
                        src={agroP.owner.image.file_data} alt="" />
                    </div>
                    <div className="text-md justify-center  flex flex-col gap-1 w-[70%] text-white">
                    
                    <p className='font-bold'>{agroP.owner.name}</p>
                    <p>{"ID : "+agroP.owner._id}</p>
                    <p>{agroP.owner.email}</p>
                    <p>{"+91 "+agroP.owner.contact_no}</p>
                    <p>{agroP.owner.city+", "+ agroP.owner.state}</p>

                    </div>

                </div>
                
            </div>
            
                    
                    
        </ReactModal>


   </>
  )
}

export default AgroProductsCard