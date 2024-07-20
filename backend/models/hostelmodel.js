const mongoose=require('mongoose')
const hostelSchema=mongoose.Schema({
    rollno:String,
    email:String,
    name:String,
    phone:String,
    messname:String,
    hostelname:String,
    feeamount:String,
    feerec:String,
    feepdf:String,
    status:{
        type:String,
        default:false
    }

}, { timestamps: true })
module.exports=mongoose.model('hostelreg',hostelSchema);