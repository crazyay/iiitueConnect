const mongoose=require('mongoose')
const applicationSchema=mongoose.Schema({
    rollno:Number,
    email:String,
    name:String,
    subject:String,
    message:String
        ,
        // Status values: pending, approved, rejected
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        // Backwards-compatible boolean flag used in frontend
        approved: {
            type: Boolean,
            default: false
        },
        // Optional admin comment added when approving/rejecting
        comment: {
            type: String,
            default: ''
        },
        approvedAt: Date
}, { timestamps: true })
module.exports=mongoose.model('application',applicationSchema);