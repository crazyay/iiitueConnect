const express=require('express')
const { registerUser,loginUser,updateUserPassword } = require('../controllers/staff.controller')
const {jwtVerify}=require('../middleware/auth.middleware')
const router=express.Router()
router.route("/changepassword").post(jwtVerify,updateUserPassword)
router.route("/Register").post(registerUser);
router.route("/Login").post(loginUser)
module.exports=router