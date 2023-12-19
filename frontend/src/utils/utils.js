import axios from 'axios';
import { toast } from 'react-toastify';


axios.defaults.baseURL = "http://localhost:9000"
axios.defaults.validateStatus = (s)=>{
    return s<300 || s==401 || s == 403
}

axios.interceptors.request.use((config)=>{

    config.headers.setAuthorization(localStorage.getItem('token'))
    return config;

})


axios.interceptors.response.use((res)=>{
    if(res.status==401){
        localStorage.removeItem('token')
        alert("Invalid")
    }


    if(res.status == 403){
        // TODO: Toast to show "You are not allowed to preform this actions"
    
        toast.error("Unauthorized")
        
        if(res.data.role=="USER"){
            window.nav('/admin/dashboard')
        }else{
            window.nav('/')
        }

        // window.nav("/unauthorized")
        
        
    }
  
    return res;
  })

export default axios
export {
    axios as apiHelper
}