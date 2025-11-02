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
    // Track status consistently: pending, approved, rejected
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
    ,
    // Backwards-compatible approved flag and admin comment
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
module.exports=mongoose.model('academicreg',academicSchema);