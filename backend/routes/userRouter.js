const router =  require('express').Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { validUser } = require('../utils/middleware');
const upload = multer();

router.post('/register',upload.single('image'),async(req,res)=>{

    try{
        
        const ImageData = {
            file_name: req.file.originalname,
            file_type: req.file.mimetype,
            file_data: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            file_size: req.file.size,
        }
        const { name, email, pass, city, contact_no, state } = req.body;
        const hash_pass = await bcrypt.hash(pass,10);
        
        const user = new User({
            image: ImageData,
            name: name,
            email: email,
            pass: hash_pass,
            city: city,
            state: state,
            contact_no: contact_no,
        });

        const result = await user.save();
        return res.status(201).send({
            message: 'File uploaded successfully',
        });
    }
    catch(error){
        if (error.code === 11000) {
            return res.status(409).json({ 
                error: "This Email already Exists"
            });
        }
        console.log(error);
    } 

});
router.get("/username",validUser,async(req,res)=>{
    
    res.json({name:req.user.name,image:req.user.image.file_data})
})

router.post("/login",async(req,res)=>{

    const { email, pass } = req.body;
       
    
    try{

        const emailExists = await User.findOne({
            email:email
        });
    
        if(!emailExists){
            return res.status(400).json("Email doesn't Exists");
        }

        const valid =  await bcrypt.compare(pass, emailExists.pass);

        if(!valid){
            return res.status(400).json("Password was incorrect. ");
        }

        const userToken = jwt.sign({ email: email,role:"USER" }, process.env.PRIVATE_KEY);
        return res.header('auth',userToken).send(userToken); 
         
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            error: err
        });
    }
});



router.get("/user",validUser,async (req,res)=>{
 
    return res.send(req.user)
})

router.put("/user",validUser,async (req,res)=>{
    try{
        await User.updateOne({email:req.user.email},{
            name:req.body.name
        })
        return res.send(req.user)
    }catch(err){
        return res.sendStatus(404)
    }
})


router.get("/getAll",validUser,async(req,res)=>{
    // console.log(req.token)
   const userDatas = await User.find().select(["-pass","-image"]);
   return res.send(userDatas)

});



module.exports = router;
