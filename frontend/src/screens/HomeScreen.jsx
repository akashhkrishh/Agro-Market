
import React, { useEffect, useState } from 'react';
import ImageCarousel from '../components/ImageCarousel';

import { CarouselImages } from '../assets/images';
import { apiHelper } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const [uname,setUname] = useState(null);
  const nav = useNavigate();
  const content = " Agro Market is a web application that helps the farmer and businessman to interact with each other without any mediator.\n This system will help the farmer to get the actual price for his inputs (crops)."

  useEffect(()=>{
    apiHelper.get("/api/username").then((res)=>{setUname(res.data)})
  },[]);

  if(uname == null){
    return <h1>Loading..</h1>
  }
  

  return (
    <div className="App pl-40 h-[70vh] pr-40 w-full flex-col justify-center items-center flex" >
      
      <div className="flex mt-10  gap-3 w-full">
          <div className=" w-[35%] justify-between flex flex-col  ">
        
          <span className='text-3xl font-semibold'>Hi, 
          <span className='text-green-600  font-semibold'>{" "+uname.name}</span>
          <p className='text-4xl font-semibold'>Welcome to
          <span className='text-green-600  font-semibold'>{" Agro Market"}</span></p>
            
          
          </span>

          
            <p className='text-lg'>{content}</p>
            <button onClick={()=>{
              nav("/agroproducts")
            }} className='mb-3 px-5 py-3 border border-green-600 rounded-md text-xl font-semibold text-green-600 w-[45%] hover:bg-green-600 hover:text-white'>Agro Products</button>
          </div>
          <div className=" w-[65%] rounded-md">
          <ImageCarousel images={CarouselImages} />
          
        </div>
      </div>
      
      
     
    </div>
  );
};

export default HomeScreen;
