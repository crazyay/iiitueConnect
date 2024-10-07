require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require('cookie-parser');


const cors=require("cors")
require('./db/config')
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ 
  origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}));


const path = require("path");
const mongoose= require("mongoose");
// const { error } = require("console");
app.use(bodyParser.urlencoded({ extended: true }));


const userRouter=require('./routes/user.routes.js')
const hostelRouter=require('./routes/hostel.routes.js')
const academicRouter=require('./routes/academic.routes.js')
const feesRouter=require('./routes/fees.routes.js')
const staffRouter=require('./routes/staff.routes.js')
app.use("/staff",staffRouter);
app.use("/users",userRouter)
app.use('/hostel',hostelRouter)
app.use('/academic',academicRouter)
app.use('/fees',feesRouter)

app.listen(8000,(req,res)=>{
  console.log("backened server started");
})
