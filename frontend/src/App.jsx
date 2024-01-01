import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomeScreen, LoginScreen,  ProductsDetails, AddProducts, YourProducts, ComplaintScreen,NotFound, AdminScreen, Dashboard, AdminAgroProducts, AdminComplaints } from './screens';
import PrivateRoutes from "./auth/PrivateRoutes";
import AdminRoutes from "./auth/AdminRoutes";
import {useNavigate} from 'react-router-dom'


function App() {

 const nav =  useNavigate();
  window.nav = nav;
  const toastContainerOptions = {
    position: 'top-center',
    autoClose: 1000, 
  };
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' exact element={<HomeScreen/>} />
          <Route path='/agroproducts' exact element={<ProductsDetails/>} />
          <Route path='/products/add' exact element={<AddProducts/>} />
          <Route path='/products/myproducts' exact element={<YourProducts/>} />
          <Route path='/complaints' exact element={<ComplaintScreen/>} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path='/admin/dashboard' exact element={<Dashboard />} />
          <Route path='/admin/dashboard/allproducts' exact element={<AdminAgroProducts />} />
          <Route path='/admin/complaints' exact element={<AdminComplaints />} />

        </Route>
        <Route path='/admin' exact element={<AdminScreen/>} />
        <Route path='/login' exact element={<LoginScreen/>} />
        <Route path='/*' element={<NotFound/>}/>
      </Routes>

      <ToastContainer {...toastContainerOptions} />
    </>
  )
}

export default App