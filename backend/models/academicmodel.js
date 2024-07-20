const mongoose=require('mongoose')
const academicSchema=mongoose.Schema({
    rollno:String,
    email:String,
    name:String,
    phone:String,
    semester:String,
    branch:String,
    batch:String,
    feeamount:String,
    feerec:String,
    feepdf:String,
    status:{
        type:String,
        default:false
    }

}, { timestamps: true })
module.exports=mongoose.model('academicreg',academicSchema);