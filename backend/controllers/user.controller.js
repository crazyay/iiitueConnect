const User=require('../models/user');

const generateAccessAndRefreshToken=async(userId )=>{
    try {
      const user=await User.findById(userId);
    if(!user){
  
    throw new Error(500,"server error");
   }
   const accessToken=await user.generateAccessToken();
   const refreshToken=await user.generateRefreshToken();
   user.refreshToken=refreshToken;
   await user.save({validateBeforeSave:false})
  
   return {accessToken, refreshToken}
  
      
    } catch (error) {
      throw new Error(500,"error while generating tokens")
    }
  
   
  }

const registerUser=async(req,res)=>{
    const {email, password}=req.body;
    if([email,password].some((field)=>field?.trim()==="")){
       return Error(400,"All fields are required")
    }
    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'iiitu.ac.in') {
      return res.status(400).json({ success: false, message: "Only iiitu.ac.in email addresses are allowed" });
    }
  const existedUser=await User.findOne( {email})
   if(existedUser){
    return Error(409,"User already with username or email exist");
   }
  
  
  const user= await User.create({
      email,
      password,
  });
  const createduser=await User.findById(user._id).select(
    "-password -refreshToken")
  
    if(!createduser){
        throw new Error(500,"user is not registerd!! try again")
    }
  return res.status(201).json(
   { status:200,data:createduser,message:"user registered successfully"
   } )
}

const loginUser=async(req,res)=>{
    
console.log(req.body);
const {email,password}= req.body;
if(!(email)){
  return res.status(401).json({ success: false, message: 'Authentication failed' });
}

const user=await User.findOne({email})
if(!user){ 
console.log("1");

return res.status(401).json({ success: false, message: 'Authentication failed' });
 
 } 
const validuser=await user.isPasswordCorrect(password);
 if(!validuser){
console.log("2");

 return res.status(401).json({ success: false, message: 'Password or email is wrong' });

 }
 
const {accessToken,refreshToken} =await generateAccessAndRefreshToken(user._id);
const loggedInUser=await User.findById(user._id).select("-password -refreshToken") 
 //instead of one call to db just simply update the user object with the 
 // new refreshToken which is generated after user call 
// user.refreshToken=refreshToken 
//user.select("-password -refreshToken")
// await user.save(validateBeforeSave:false)// no need to save as u have already saved it while genereating it

//  cookie part

const options={       
                    // by using this options we can allows tokens to be
  httpOnly:true,  // only modifiable from server not from client side
  secure:true
}
 return res.status(200)
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json(loggedInUser)

}
module.exports = { registerUser,loginUser };
