
const mongoose=require('mongoose')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
const {asyncHandler}=require('../utils/asyncHandler')

const staffSchema=mongoose.Schema({ 
    email:String,
    password:String,
    refreshToken:{
    type:String
}
}, { timestamps: true })

staffSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next();
 })
 
 staffSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
 }
 staffSchema.methods.generateAccessToken=async function(){
 return await jwt.sign({
       _id:this._id,
        email:this.email,
        
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
 }
 staffSchema.methods.generateRefreshToken=async function(){
    return await jwt.sign({
       _id:this._id,
    },
       process.env.REFRESH_TOKEN_SECRET,
    {
       expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
 }
 

module.exports=mongoose.model('staff',staffSchema);
    