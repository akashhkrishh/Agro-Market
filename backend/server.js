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
const { validUser } = require('./utils/middleware');
const complaintSchema = require('./models/complaintSchema');
const complaintRouter = require("./routes/complainRouter")
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(morgan('dev'));

app.use("/api",userRouter);
app.use('/api/products',validUser,productRouter);
app.use("/api/complaints",validUser,complaintRouter);


app.get('/',(req,res)=>{
    res.send("Helllo")
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
