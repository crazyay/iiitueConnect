import dotenv from "dotenv";
dotenv.config({path:"../.env"});

import {v2 as cloudinary} from "cloudinary"

import fs from "fs";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_DB_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, // Ensure this is correctly set
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
       
      //uploading data on cloudinary
    //   console.log(localFilePath);
       const response=await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"  //automatically detects data type like videos pdf photos etc
       })
       console.log("file uploaded on cloudinary",response.url);
       return response;
    } catch (error){
        fs.unlink(localFilePath, (err) => {
            if (err){
                console.error("Error deleting file:", err);
            }else{
                console.log("File deleted successfully");
            }
        });
        // console.log(error);
        return null;
        
        // deleting files from ur server if file uploads fails
       
    }
}
module.exports= {uploadOnCloudinary}