const router =  require('express').Router();
const Admin = require('../models/adminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { validAdmin } = require('../utils/middleware');
const upload = multer();



router.post("/login",async(req,res)=>{

    const { email, pass } = req.body;
       
    
    try{

        const emailExists = await Admin.findOne({
            email:email
        });
    
        if(!emailExists){
            return res.status(400).json("Email doesn't Exists");
        }

        const valid =  await bcrypt.compare(pass, emailExists.pass);

        if(!valid){
            return res.status(400).json("Password was incorrect. ");
        }

        const userToken = jwt.sign({ email: email,role:"ADMIN" }, process.env.PRIVATE_KEY);
        return res.header('auth',userToken).send(userToken); 
         
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            error: err
        });
    }
});


router.get("/test",validAdmin,(req,res)=>{

    return res.send("OK")
})


module.exports = router;
