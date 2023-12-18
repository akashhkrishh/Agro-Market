import { useEffect, useState } from "react"
import { LoginBanner, Logo } from "../assets/images"
import apiHelper from "../utils/utils"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactModal from "react-modal";

function LoginScreen() {

  const navigate = useNavigate();
  const [form,setForm] = useState({
    email: "",
    pass: "",
  });

  const [sform,setSForm] = useState({
    email: "",
    fname: "",
    lname: "",
    contact: "",
    city: "",
    state: "",
    pass: "",
    cpass:"",
    image: null,

  });

  const handleSChange = (e) =>{
    const { name, value, type } = e.target;
    setSForm((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value,
        
    }));
    if(type === 'file'){
     
    }
  }

  const [isModel,setModel] = useState(false);

  const openModel = () => setModel(true);
  const closeModel = () => setModel(false);


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

  const handleRegister = (e) =>{
    e.preventDefault();

    console.log(sform);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
  
 
  

    if(!emailRegex.test(sform.email))
      return toast.error("Email not Valid")
    
    if(!phoneRegex.test(sform.contact))
      return toast.error("Contact no not Valid")

    if(sform.pass != sform.cpass)
      return toast.error("Password Doesn't Match")

    if(sform.image == null){
      return toast.error("Image Required !")
    }

    try{
      const dform = new FormData();
      dform.append('name', sform.fname+" "+sform.lname);
      dform.append('email', sform.email);
      dform.append('image', sform.image);
      dform.append('city', sform.city);
      dform.append('state', sform.state);
      dform.append('contact_no', sform.contact);
      dform.append('pass', sform.pass);

      apiHelper.post('/api/register', dform, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response=>{
         toast.success('Account Created successfully!');
         localStorage.clear();
         closeModel();
      })
    } catch (error) {
      toast.error(error.response.data.error);  
    }

  }
  return (
    <div className="w-full flex justify-center items-center h-[100vh]">
      <form className="w-[350px] p-4 rounded-md shadow-xl bg-white"  onSubmit={handleSubmit}>
        <img className="w-full" src={LoginBanner} alt="" />
        <div className="row mt-3 w-full flex flex-col gap-1">
          <label htmlFor="" className="text-green-600 font-medium text-md">Email Address</label>
          <input
          autoComplete="off"
            name="email"
            value={form.email}
            type="email"
            className="input"
            placeholder="name@email.com"
            onChange={handleChange}
          required />
        </div>
        <div className="row mt-3 w-full flex flex-col gap-1">
          <label htmlFor="" className="text-green-600 font-medium text-md">Password</label>
          <input
            autoComplete="off"
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
        <div className=" mt-3 flex text-lg items-center gap-2 w-full justify-center">
          <p>Create a New Account?</p>
          <span  onClick={openModel} className="cursor-pointer underline text-green-600">Signup</span>
        </div>
      </form>


      <ReactModal isOpen={isModel} style={{
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 9
        },
        content: {
          width: '50%',
          height: '60%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }
    }}>
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Join to Agro Market</p>
          <button className="bg-red-500 rounded-md px-4 py-1 text-white hover:bg-red-600 " onClick={closeModel}>Close</button>
        </div>

        <form onSubmit={handleRegister} className="flex justify-between w-[100%] mt-5 gap-3">
          <div className="flex flex-col gap-2 w-[70%] ">
        
            <div className="flex gap-2 ">    
              <div className="flex gap-1 flex-col w-full">
                  <label htmlFor="fname">First Name</label>
                  <input autoComplete="off"
                  value={sform.fname} 
                  name="fname"
                  onChange={handleSChange}
                  type="text" id="fname" className="input" required/>
                </div>
              <div className="flex gap-1 flex-col w-full">
                <label htmlFor="lname">Last Name</label>
                <input autoComplete="off"
                value={sform.lname} 
                name="lname"
                onChange={handleSChange}
                type="text" id="lname" className="input" required />
              </div>
            </div>

            <div className="flex gap-2 w-[100%]">    
              <div className="flex gap-1 flex-col w-full">
                  <label htmlFor="email">Email Address</label>
                  <input autoComplete="off"
                  value={sform.email} 
                  name="email"
                  onChange={handleSChange}
                  type="email" id="email" className="input" required/>
                </div>
              <div className="flex gap-1 flex-col w-full">
                <label htmlFor="contact">Contact No</label>
                <input autoComplete="off" 
                value={sform.contact} 
                onChange={handleSChange}
                name="contact"
                type="number" id="contact" className="input" required />
              </div>
            </div>

            <div className="flex gap-2 w-[100%]">    
              <div className="flex gap-1 flex-col w-full">
                  <label htmlFor="city">City</label>
                  <input autoComplete="off"
                  value={sform.city} 
                  onChange={handleSChange}
                  name="city"
                  type="text" id="city" className="input" required />
                </div>
              <div className="flex gap-1 flex-col w-full">
                <label htmlFor="state">State</label>
                <input autoComplete="off" 
                value={sform.state} 
                name="state"
                onChange={handleSChange}
                type="text" id="state" className="input" required/>
              </div>
            </div>

            <div className="flex gap-2 w-[100%]">    
              <div className="flex gap-1 flex-col w-full">
                  <label htmlFor="password">Password</label>
                  <input autoComplete="off"
                  value={sform.pass} 
                  name="pass"
                  onChange={handleSChange}
                  type="text" id="password" className="input" required/>
                </div>
              <div className="flex gap-1 flex-col w-full">
                <label htmlFor="cpassword">Confirm Password</label>
                <input autoComplete="off" 
                value={sform.cpass} 
                name="cpass"
                onChange={handleSChange}
                type="text" id="cpassword" className="input" required/>
              </div>
            </div>
            
          </div>
          <div className="flex-col flex justify-between w-[30%] ">
            <label className="text-center cursor-pointer rounded-md border-green-600 py-2 border text-green-600" htmlFor="simage">Upload Your Picture</label>
            <label htmlFor="simage" className="w-full">
              <img className="border rounded-md border-green-600  " src={sform.image!=null ?URL.createObjectURL(sform.image)
                :Logo} alt="" />
            </label>
            <input hidden type="file" name="image"  id="simage" className="w-full" onChange={handleSChange} />
            <button className="text-center py-2 hover:bg-green-700 border bg-green-600 text-white rounded-md" htmlFor="simage">Register</button>
            
          </div>

        </form>
        

      </ReactModal>
    </div>
  )
}

export default LoginScreen