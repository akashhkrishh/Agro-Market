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
        
        var user = await User.findOne({email:data.email})
        req.user = user;
    
    })
    next();
}

module.exports  = {
    validUser
}