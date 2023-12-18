import axios from 'axios';

axios.defaults.baseURL = "http://localhost:9000"
axios.defaults.validateStatus = (s)=>{
    return s<300 || s==401
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
  
    return res;
  })

export default axios
export {
    axios as apiHelper
}