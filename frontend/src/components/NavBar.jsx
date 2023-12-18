import { NavLink, useNavigate } from "react-router-dom";
import { BackgroundImg, NavLogo } from "../assets/images";
import { navLinks } from "../constants/index";
import { useEffect, useState } from "react";
import { apiHelper } from "../utils/utils";
import { toast } from "react-toastify";

function NavBar() {

  const [uname,setUname] = useState(null);
  const navigate = useNavigate(); 

  useEffect(()=>{
    apiHelper.get("/api/username").then((res)=>{setUname(res.data)})

  },[]);

  const handleLogout =()=>{
    localStorage.clear();
    toast.success("Logout Successfully")
    navigate("/login");
  }

  // if(uname == null)
  //   return <div>Loading...</div>
  

  return (
    <nav className="bg-[#ffffff] pl-40 pr-40 w-full top-0 fixed shadow-md">
    <div className="container h-[10vh] z-30 flex justify-between items-center">
      {/* <img src={NavLogo} width={80} alt="" /> */}
      <ul className="flex space-x-8">
       {
        navLinks.map((navList)=>{
          return(
            <NavLink className="cursor hover:text-green-600 font-semibold text-md" to={navList.navLink} key={navList.navLabel}>{navList.navLabel}</NavLink>
          )
        })
       }
      </ul>
      <div className="h-8 rounded-md flex items-center justify-center gap-3">
        <img  src={uname?.image} className="w-8 rounded-md" style={{height:"100%"}} alt="" />
        <p className="font-semibold">{"Hi, "}<span className="text-green-600">{uname?.name}</span></p>
        <button className="ml-5 py-2 pl-5 pr-5 rounded-md bg-green-600 text-white hover:bg-green-700" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  </nav>
  
  )
}

export default NavBar