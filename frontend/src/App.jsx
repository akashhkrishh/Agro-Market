import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomeScreen, LoginScreen,  ProductsDetails, AddProducts, YourProducts, ComplaintScreen, ProfileScreen, NotFound } from './screens';
import PrivateRoutes from "./auth/PrivateRoutes";

function App() {
  const toastContainerOptions = {
    position: 'top-center',
    autoClose: 1000, 
  };
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path='/' exact element={<HomeScreen/>} />
          <Route path='/agroproducts' exact element={<ProductsDetails/>} />
          <Route path='/products/add' exact element={<AddProducts/>} />
          <Route path='/products/myproducts' exact element={<YourProducts/>} />
          <Route path='/complaints' exact element={<ComplaintScreen/>} />
          <Route path='/profile' exact element={<ProfileScreen/>} />
        </Route>
        <Route path='/login' exact element={<LoginScreen/>} />
        <Route path='/*' element={<NotFound/>}/>
      </Routes>

      <ToastContainer {...toastContainerOptions} />
    </>
  )
}

export default App