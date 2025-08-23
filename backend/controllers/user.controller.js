const User=require('../models/user');
const {apiError}=require('../utils/apiError')
const {asyncHandler}=require('../utils/asyncHandler')
const generateAccessAndRefreshToken=async(userId )=>{
    try {
      const user=await User.findById(userId);
    if(!user){

    throw new apiError(500,"server error");
   }
   
   
   const accessToken=await user.generateAccessToken();
   const refreshToken=await user.generateRefreshToken();
   
  //  console.log(accessToken);
   
   user.refreshToken=refreshToken;
   await user.save({validateBeforeSave:false})
  
   return {accessToken, refreshToken}
  
      
    } catch (error) {
      throw new apiError(500,"error while generating tokens")
    }
  }

const registerUser=asyncHandler(async(req,res)=>{
    const {rollno,email, password}=req.body;
    if([email,password].some((field)=>field?.trim()==="")){
       throw new apiError(400,"All fields are required")
    }
    // console.log(email);
    // console.log(password);

    if (email && typeof email === 'string') {
      const emailDomain = email.split('@')[1];
      if (emailDomain !== 'iiitu.ac.in') {
        throw new apiError(500,"Only iiitu.ac.in email addresses are allowed" );
      }
  } else {
    throw new apiError(500,"Invalid or undefined email address")
  }
  
  
  const existedUser=await User.findOne( {email})
   if(existedUser){

    throw new apiError(500,"User is already registered")
   }
  const user= await User.create({
      rollno,
      email,
      password,
  });
  const createduser=await User.findById(user._id).select(
    "-password -refreshToken")
  
    if(!createduser){
        throw new apiError(500,"user is not registerd!! try again")
    }
  return res.status(201).json(
   { status:200,data:createduser,message:"user registered successfully"
   } )
}
)
const updateUserPassword=asyncHandler(async(req,res)=>{
  const {oldPassword,newPassword}=req.body;
  
  if(!oldPassword||!newPassword){ 
    throw new apiError(400,"details are must");
  }
  
  const user=await User.findById(req.user?._id)
  if(!user){
    throw new apiError(401,"User not found");
  }
  const isPasswordCorrect=await user.isPasswordCorrect(oldPassword);
  if(!isPasswordCorrect){
    throw new apiError(400,"Password is wrong")
  }
  // console.log(isPasswordCorrect);
  if(user.email=="22110@gmail.com"){
    return res.status(403).json({success:false,message:"You are not allowed to update password"})
  }
  user.password=newPassword;
    await user.save({validateBeforeSave:false});
    return res.status(200)
    .json("password updated")
})

const loginUser=asyncHandler(async(req,res)=>{
      
console.log(req.body);
const {email,password}= req.body; 
if(!(email)){
  return res.status(401).json({ success: false, message: 'Authentication failed' });
}


const user=await User.findOne({email})
if(!user){ 
// console.log("1");

return res.status(401).json({ success: false, message: 'Authentication failed' });
 
 } 
const validuser=await user.isPasswordCorrect(password);
 if(!validuser){
// console.log("2");

 return res.status(401).json({ success: false, message: 'Password or email is wrong' });
 }
const {accessToken,refreshToken} =await generateAccessAndRefreshToken(user._id);
// console.log(accessToken);
// console.log(refreshToken);
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
  secure:true,
  sameSite: 'Lax',
}
 return res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(loggedInUser)
})

module.exports = { registerUser,loginUser,updateUserPassword };
