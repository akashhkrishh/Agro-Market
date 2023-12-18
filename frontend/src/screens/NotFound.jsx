import React from 'react'
import { NotFoundImg } from '../assets/images'

function NotFound() {
  return (
    <div className='flex items-center justify-center' style={{width:"100vw",height:"100vh"}}>
        <img style={{height:"60%"}} src={NotFoundImg} alt="" />
    </div>
  )
}

export default NotFound