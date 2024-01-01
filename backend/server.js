const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const bodyParser = require('body-parser')
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
const multer = require('multer');
const upload = multer();

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const { validUser, validAdmin } = require('./utils/middleware');
const complaintRouter = require("./routes/complainRouter");
const adminRouter = require("./routes/adminRouter")
const port = process.env.PORT || 9000;
const complaint = require("./models/complaintSchema");
const User= require('./models/userSchema');
const Product= require('./models/productSchema');

app.use(express.json());
app.use(morgan('dev'));

app.use("/api",userRouter);
app.use('/api/products',validUser,productRouter);
app.use("/api/complaints",validUser,complaintRouter);
app.use("/api/admin",adminRouter);


app.put('/api/complaint/:id',validAdmin,async(req,res)=>{
    const {status} = req.body;
    
    const complaints = await complaint.updateOne({_id:req.params.id},{ $set: { status: status}});
    console.log(complaints)
    res.send("Updated")
})

app.delete("/api/admin/user/:id",validAdmin,async(req,res)=>{
    console.log(req.params.id)
    const user = await User.deleteOne({_id:req.params.id});
    
    const productData =  await Product.deleteMany({owner:req.params.id})
    const Complaint =  await complaint.deleteMany({owner:req.params.id})
    res.send("Deleted")
})

app.post("/check",upload.single('image'),(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    res.send(req.body);
})


app.listen(9000,()=>{
    console.log(`Server listening...\nhttp://localhost:${port}`)
});

mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>{console.log("Database Connected ...")})
    .catch((error)=>{console.error(error)});
