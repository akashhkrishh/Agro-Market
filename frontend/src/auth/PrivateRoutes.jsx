import { Outlet, Navigate } from 'react-router-dom'
import NavBar from "../components/NavBar";
const PrivateRoutes = () => {

    const token = localStorage.getItem('token')

    let auth = {'token':token!=null && token!=""}
    return(
        auth.token ? <main >
            <NavBar/>
            <div style={{marginTop:"12vh"}}></div>
           
            <Outlet /> 
        </main>: <Navigate to="/login"/>
    )
}

export default PrivateRoutes