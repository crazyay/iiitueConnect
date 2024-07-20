const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    rollno:String,
    name:String,
    email:String,
    complaintdesc:String,
    phone:String,
    type:String
}, { timestamps: true })
module.exports=mongoose.model('complaints',userSchema);
  