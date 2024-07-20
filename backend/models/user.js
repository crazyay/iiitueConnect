
const mongoose=require('mongoose')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
const userSchema=mongoose.Schema({
    rollno:Number,
    email:String,
    password:String,
    refreshToken:{
    type:String
}
}, { timestamps: true })

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next();
 })
 
 userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
 }
 userSchema.methods.generateAccessToken= async function(){
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
 userSchema.methods.generateRefreshToken= async function(){
    return await jwt.sign({
       _id:this._id,
    },
       process.env.REFRESH_TOKEN_SECRET,
    {
       expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
 }
 

module.exports=mongoose.model('user',userSchema);
    