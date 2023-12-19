import React, { useEffect } from 'react'
import { apiHelper } from '../utils/utils'

function Dashboard() {
    useEffect(()=>{
        apiHelper.get("/api/admin/test").then((res)=>{})
    })
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard