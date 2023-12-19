const User = require('../models/userSchema');
const jwt = require('jsonwebtoken')

const validUser = async (req,res,next) =>{
    var token = req.header('Authorization');
    // console.log(req)
    req.token = token;
    await jwt.verify(req.token, process.env.PRIVATE_KEY, async (err, data)=>{
        if(err){
            return res.sendStatus(401);
        }

         if(data.role != "USER"){
            return res.send({role:"USER"},403);
        }
        
        var user = await User.findOne({email:data.email})
        req.user = user;
        next();
    })
    
}

const validAdmin = async (req,res,next) =>{
    var token = req.header('Authorization');
    // console.log(req)
    req.token = token;
    await jwt.verify(req.token, process.env.PRIVATE_KEY, async (err, data)=>{
        if(err){
            return res.sendStatus(401);
        }
        console.log(data)
        if(data.role != "ADMIN"){
           return res.send({role:"ADMIN"},403);
        }
        
        var user = await User.findOne({email:data.email})
        req.user = user;
    
        next();
    })
}

module.exports  = {
    validUser,
    validAdmin,
}