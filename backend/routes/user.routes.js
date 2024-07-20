const express=require('express')
const { registerUser,loginUser } = require('../controllers/user.controller')
const router=express.Router()

router.route("/Register").post(registerUser);
router.route("/Login").post(loginUser)

module.exports=router