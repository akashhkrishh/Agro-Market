const router =  require('express').Router();
const Complaint = require('../models/complaintSchema');

router.post("/add",async(req,res)=>{
    try{
        const { title, description, type} = req.body;
    const date = new Date();
    const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    
    const complaint = new Complaint({
        title: title,
        description: description,
        date:currentDate,
        type: type,
        owner:req.user,
        status:true,
    });
    await complaint.save();
    res.status(201).json("Complained Registered");
    }catch(e){
        res.status(401).json("Server Error")
    }
});

router.get("/getall",async(req,res)=>{
    const complaintData = await Complaint.find();
    res.json(complaintData) 
})

router.get("/mycomplaints",async(req,res)=>{
    const complaintData = await Complaint.find({owner:req.user});
    res.json(complaintData) 
})
router.delete("/delete/:id",async(req,res)=>{
    const result = await Complaint.deleteOne({_id:req.params.id});
    res.status(201).json("Done");
})

module.exports = router;