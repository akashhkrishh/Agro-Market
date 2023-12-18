import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { apiHelper } from '../utils/utils';
import { FaUser } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import AgroProductsCard from '../components/AgroProductsCard';

function ProductsDetails() {
  const [msg,setMsg] = useState("Loading...");

  const [agro,setAgro] = useState([]);
  useEffect(()=>{

    apiHelper.get("/api/products/getall")
      .then((response)=>{
        setAgro(response.data);
        if(response.data.length == 0){
          setMsg("No Product Found...")
        }
      })
      .catch((err)=>{console.log(err)});
      

  },[]);

  if(agro.length == 0)
    return <h1 className='w-full flex items-center justify-center text-2xl font-semibold' style={{ width:"100%",height:"70vh"}}>{msg}</h1>


  return (
    <div className="pr-40 pl-40 mt-5 mb-10 ">
      <div className="grid  grid-cols-4 gap-3">
          {
            agro.map((agroP)=>{
              return (
                <AgroProductsCard key={agroP._id} agroP={agroP} />
              )
            })
          }
          
      </div>
    </div>
  )
}

export default ProductsDetails