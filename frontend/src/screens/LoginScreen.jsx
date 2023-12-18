import { useEffect, useState } from "react"
import { LoginBanner } from "../assets/images"
import apiHelper from "../utils/utils"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginScreen() {

  const navigate = useNavigate();
  const [form,setForm] = useState({
    email: "",
    pass: "",
  });


  const handleSubmit = (e) =>{

    e.preventDefault();
    apiHelper.post("/api/login",{
      email: form.email,
      pass: form.pass,
    })
    .then((response)=>{
      localStorage.setItem("token",response.data);
      toast.success("Login Successfully");
      navigate("/");
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
  }

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setForm((prevData)=>({
      ...prevData,
      [name]:value,
    }));
  }

  return (
    <div className="w-full flex justify-center items-center h-[100vh]">
      <form className="w-1/4 h-[70vh] p-4 rounded-md shadow-xl bg-white"  onSubmit={handleSubmit}>
        <img className="w-full" src={LoginBanner} alt="" />
        <div className="row mt-3 w-full flex flex-col gap-1">
          <label htmlFor="" className="text-green-600 font-medium text-md">Email Address</label>
          <input
            name="email"
            value={form.email}
            type="text"
            className="input"
            placeholder="name@email.com"
            onChange={handleChange}
          required />
        </div>
        <div className="row mt-3 w-full flex flex-col gap-1">
          <label htmlFor="" className="text-green-600 font-medium text-md">Password</label>
          <input
            name="pass"
            type="password"
            value={form.pass}
            className="input flex items-center justify-center"
            placeholder="********"
            onChange={handleChange} required
          />
        </div>

        <div className="row mt-3 w-full flex flex-col gap-1">
          <button className="button">Login</button>
        </div>
        <hr className="w-full mt-3 border-gray-300 h-[2px]"/>
      </form>
    </div>
  )
}

export default LoginScreen