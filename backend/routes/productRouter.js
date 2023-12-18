const router =  require('express').Router();
const Product = require('../models/productSchema');
const multer = require('multer');
const upload = multer();

router.delete("/delete/:id",async(req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    console.log(result)
    res.status(201).json("Done");
});


router.post('/add',upload.single('image'),async(req,res)=>{
    

    try{
        
        const ImageData = {
            file_name: req.file.originalname,
            file_type: req.file.mimetype,
            file_data: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            file_size: req.file.size,
        }
        const { name, family, origin, quantity, price, color, description } = req.body;
     
        const product = new Product({
            image: ImageData,
            name: name,
            color: color,
            family: family,
            origin: origin,
            quantity: quantity,
            owner: req.user,
            price: price,
            description: description,
        });

    

        const result = await product.save();
        return res.status(201).send({
            message: 'product Details Added successfully',
        });
    }
    catch(error){
        if (error.code === 11000) {
            return res.status(409).json({ 
                error: "product Already Registered"
            });
        }
        console.log(error);
    } 
});

router.get("/getall",async(req,res)=>{
    
    const productDetails = await Product.find().populate('owner',{name:true,contact_no:true,email:true,city:true,state:true,image:true});
    res.status(200).json(productDetails);

})

router.get("/myproducts",async(req,res)=>{
    const productData =  await Product.find({owner:req.user})
    
    res.send(productData)
})

router.get("/:id",async(req,res)=>{
    const id = req.params.id;
    const productDetails = await Product.find().populate('owner',{name:true,contact_no:true,email:true,city:true,state:true,});
    res.send(productDetails);
})

router.put('/:id',upload.single('image'),async (req,res)=>{

    try{
        let ImageData = null;
        if(req.file){
             ImageData = {
                        file_name: req.file.originalname,
                        file_type: req.file.mimetype,
                        file_data: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                        file_size: req.file.size,
                    }
        }
       
        const { name, family, origin, quantity, price, color, description} = req.body;
     


    
        var product = {
           description, name,family,origin,quantity,price,color, image:ImageData
        };

        if(ImageData==null){
            const {image,...data} = product;
            product = data;
        }
        

        const result = await Product.updateOne({_id:req.params.id},product);

      

        return res.status(201).send({
            message: 'product Details Added successfully',
        });
    }
    catch(error){
        if (error.code === 11000) {
            return res.status(409).json({ 
                error: "product Already Registered"
            });
        }
        console.log(error);
    } 

    res.send("OK")
})


module.exports = router;
