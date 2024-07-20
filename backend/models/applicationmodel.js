const mongoose=require('mongoose')
const applicationSchema=mongoose.Schema({
    rollno:Number,
    email:String,
    name:String,
    subject:String,
    message:String

}, { timestamps: true })
module.exports=mongoose.model('application',applicationSchema);