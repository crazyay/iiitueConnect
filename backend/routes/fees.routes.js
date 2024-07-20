const express =require("express")
const { feePayment, successPayment } = require("../controllers/fees.controller")
const router=express.Router()


router.route("/payment").post(feePayment)
router.route("/success").post(successPayment)
module.exports=router
