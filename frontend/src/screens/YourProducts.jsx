import React, { useEffect, useState } from 'react'
import { apiHelper } from '../utils/utils';
import { BackgroundImg, NavLogo } from '../assets/images';
import YourProductsCard from '../components/YourProductsCard';

function YourProducts() {
  const [msg,setMsg] = useState("Loading...");
  
  
  const [agro,setAgro] = useState([]);
  useEffect(()=>{

    fetchProducts()

  },[]);

  const fetchProducts = ()=>{
    apiHelper.get("/api/products/myproducts")
      .then((response) => {
        setAgro(response.data);
        if(response.data.length == 0){
          setMsg("No Product Found...")
        }
      })
      .catch((err) => { console.log(err) });

      
  }

  if(agro.length == 0)
    return <h1 className='w-full flex items-center justify-center text-2xl font-semibold' style={{ width:"100%",height:"70vh"}}>{msg}</h1>

  return (
    <div className="pr-40 pl-40 mt-5 mb-10 ">
      <div className="grid  grid-cols-4 gap-3">
        {
          agro.map((agrol)=>{
            return(
             <YourProductsCard onDelete={()=>{
                fetchProducts();
             }} key={agrol._id} agrol={agrol} />
            );
          })

        }
        
      </div>
    </div>
  )
}

export default YourProducts