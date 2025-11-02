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
    // Track status consistently: pending, approved, rejected
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }

    ,
    approved: {
        type: Boolean,
        default: false
    },
    comment: {
        type: String,
        default: ''
    },
    approvedAt: Date

}, { timestamps: true })
module.exports=mongoose.model('hostelreg',hostelSchema);