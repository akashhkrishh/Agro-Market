import { useState } from "react"
import { Logo } from "../assets/images"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiHelper } from "../utils/utils";

function AddProducts() {

  const navigate = useNavigate();
  const [productsDetails, setProducts] = useState({
    name: "",
    family: "",
    color:"",
    image : null,
    origin : "",
    quantity: "",
    price: "",
    description:""

  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    if(productsDetails.image == null){
      toast.error("Image Required");
      return ;
    }
    
   

    try {
      
      
      const form = new FormData();
      form.append('name', productsDetails.name);
      form.append('origin', productsDetails.origin);
      form.append('image', productsDetails.image);
      form.append('quantity', productsDetails.quantity);
      form.append('price', productsDetails.price);
      form.append('family', productsDetails.family);
      form.append('color', productsDetails.color);
      form.append('description', productsDetails.description);

      apiHelper.post('/api/products/add', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response=>{
         toast.success('product Added successfully!');
         navigate("/agroproducts")
         
      })
    } catch (error) {
      toast.error(error.response.data.error);  
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProducts((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));

  };

  return (
    <div className="flex flex-col justify-center pr-40 mt-5 mb-5 pl-40">
     
          <div className="flex justify-between  mb-4 items-center w-full">
            <p className='text-2xl font-semibold'>Add New Product</p>
            <button className='bg-green-600 rounded-md text-white  font-semibold hover:bg-green-700  px-4 py-2'
            onClick={()=>{navigate("/agroproducts")}}>Agro Products</button>
          </div>

          <form onSubmit={handleSubmit} className=" flex gap-3 ">
            
          <div  className="flex flex-col justify-between w-[72%] gap-3">
            <div className="flex w-[100%] gap-3">
                <div className="w-[50%] flex flex-col gap-2 ">
                  <label htmlFor="">Product Name</label>
                  <input value={productsDetails.name} onChange={handleChange} id='name' name='name' className='input' autoComplete="off" required/>
                </div>
                <div className="w-[50%] flex flex-col gap-2 ">
                  <label htmlFor="">Product Color</label>
                  <input type="text" name="color" onChange={handleChange} autoComplete="off" className='input' required />
                </div>
              </div>
              <div className="flex w-[100%] gap-3">
                <div className="w-[50%] flex flex-col gap-2 ">
                  <label htmlFor="">Product Family</label>
                  <input  id='family' onChange={handleChange} name='family' autoComplete="off" type="text" className='input' required  />
                </div>
                <div className="w-[50%] flex flex-col gap-2 ">
                  <label htmlFor="">Product Origin</label>
                  <input type="text" name="origin"  onChange={handleChange} autoComplete="off" className='input' id="" required/>
                </div>
              </div>
              <div className="flex w-[100%] gap-3">
                <div className="w-[50%] flex flex-col gap-2 ">
                  <label htmlFor="">Product Quantity</label>
                  <input type="number" name="quantity" className='input' onChange={handleChange} autoComplete="off" required />
                </div>
                <div className="w-[50%] flex flex-col gap-2 ">
                  <label htmlFor="">Product Price Per Kg</label>
                  <input type="number" autoComplete="off" name="price" onChange={handleChange} className='input' id="" />
                </div>
              </div>
              <div className="flex flex-col w-[100%] gap-3">
                <label  htmlFor="">Product Description</label>
                <textarea className='w-full input'  autoComplete="off" name="description" onChange={handleChange} rows={6}required></textarea>
              </div>
          
            </div>
            <div className="flex w-[28%]">
              <div className="flex flex-col gap-5 justify-between">
                <label htmlFor="image" className="text-center border cursor-pointer border-green-600 rounded-md py-3">Upload Product Image</label>
                <label htmlFor="image" className="img">
                <img src={productsDetails.image ==null ? Logo : URL.createObjectURL(productsDetails.image)} className="border w-full border-green-600 rounded-md" alt="" />
                </label>
                <input type="file" onChange={handleChange}  name="image" id="image" hidden/>
                <button className="py-3 text-white font-semibold rounded-md hover:bg-green-700 bg-green-600"
                
                type="submit">Update</button>

              </div>
            </div>
          </form>


  
    </div>
  )
}

export default AddProducts