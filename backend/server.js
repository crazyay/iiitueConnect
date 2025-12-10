require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require('cookie-parser');
const {apiError}=require('./utils/apiError.js')

const cors=require("cors")
require('./db/config')
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ 
  origin: ['https://iiitue-connect-student-frontend.vercel.app','https://iiitue-connect-staff-frontend.vercel.app'],
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
app.use((err, req, res, next) => {
  if (err instanceof apiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      error: err.error,
    });
  }

  // If it's not an instance of apiError, return a generic 500 error
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});
app.listen(8000,(req,res)=>{
  console.log("backened server started");
})
