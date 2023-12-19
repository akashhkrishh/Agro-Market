import { Outlet, Navigate } from 'react-router-dom'
import NavBar from "../components/NavBar";
import AdminNavBar from '../components/AdminNavBar';
const AdminRoutes = () => {

    const token = localStorage.getItem('token')

    let auth = {'token':token!=null && token!=""}
    return(
        auth.token ? <main >
            <AdminNavBar />
            <div style={{marginTop:"12vh"}}></div>
           
            <Outlet /> 
        </main>: <Navigate to="/admin"/>
    )
}

export default AdminRoutes