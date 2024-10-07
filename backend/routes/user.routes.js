const express=require('express')
const {jwtVerify}=require('../middleware/auth.middleware')
const { registerUser,loginUser,updateUserPassword } = require('../controllers/user.controller')
const router=express.Router()
router.route("/changepassword").post(jwtVerify, updateUserPassword)
router.route("/Register").post(registerUser);
router.route("/Login").post(loginUser)

module.exports=router