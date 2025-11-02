const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    rollno:String,
    name:String,
    email:String,
    complaintdesc:String,
    phone:String,
    type:String
    ,
    // Track status instead of deleting: pending, resolved, rejected
    status: {
        type: String,
        enum: ['pending', 'resolved', 'rejected'],
        default: 'pending'
    },
    // Backwards-compatible boolean used by frontend
    resolved: {
        type: Boolean,
        default: false
    },
    // Resolution details
    resolutionNotes: {
        type: String,
        default: ''
    },
    resolvedAt: Date
}, { timestamps: true })
module.exports=mongoose.model('complaints',userSchema);
  