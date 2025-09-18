const hostelmodel=require('../models/hostelmodel')
const complaintmodel=require('../models/complaintsmodel')
const {asyncHandler}=require('../utils/asyncHandler')
const {uploadOnCloudinary}=require('../utils/cloudinary')
const multer = require('multer')
const { apiError } = require('../utils/apiError')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'hostelreceipt/'); // Specify the directory where files will be stored
//     },
//     filename: function (req, file, cb) {
     
//       cb(null,file.originalname);
//     }
//   });
// const upload = multer({ storage: storage });

const hostelRegistration=asyncHandler(async(req,res)=>{
    try {
        // Log form data and file data
        // console.log("Form Data:", req.body);
        // console.log("File Data:", req.file);
        // Create a new hostelmodel instance with form data and file information
        if(!req.file){
          throw new apiError(404,"Reciept is missing");
        }

       
        const fileurl=await uploadOnCloudinary(req.file.path);
        if(!fileurl){
          throw new apiError(500,"Reciept uploadation failed! Try Again")
        }
        const data = new hostelmodel({
            ...req.body, // Include form fields
            feepdf: fileurl.secure_url // Include the generated filename for the file
        });
    
        // Save the data to the database
        const savedData = await data.save();
    
        // Send a success response
        res.status(200).send("File uploaded successfully!");
    } catch (error) {
        // Handle errors
        // console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file: " + error.message);
    }
})
const getHostelRegistration = asyncHandler(async (req, res) => {
    try {
        console.log('Received request with query params:', req.query);
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        console.log(`Fetching page ${page} with limit ${limit}, skip ${skip}`);
        
        // Get total count and paginated results in parallel
        const [total, registeredStudents] = await Promise.all([
            hostelmodel.countDocuments(),
            hostelmodel.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .lean()
        ]);
        
        const totalPages = Math.ceil(total / limit);
        
        console.log(`Found ${total} total records, ${registeredStudents.length} in this page`);
        
        const response = {
            success: true,
            data: registeredStudents,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit
            }
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Error in getHostelRegistration:', error);
        res.status(500).json({ 
            success: false,
            error: "Error fetching hostel registrations",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
})
const complaints=asyncHandler(async(req,res)=>{
    const data=await req.body;
  // console.log(data);
  const complaintdata=new complaintmodel(data);
  const result=await complaintdata.save();
  res.send("complaint registered");
})
const getComplaints = asyncHandler(async (req, res) => {
    try {
        console.log('Received complaints request with params:', req.params, 'query:', req.query);
        
        const type = req.params.page;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const query = type ? { type: { $regex: new RegExp(type, "i") } } : {};
        
        console.log('Querying complaints with:', { type, page, limit, skip, query });
        
        // Get total count and paginated results in parallel
        const [total, complaints] = await Promise.all([
            complaintmodel.countDocuments(query),
            complaintmodel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
        ]);
        
        const totalPages = Math.ceil(total / limit);
        
        console.log(`Found ${total} complaints, returning ${complaints.length} items`);
        
        res.json({
            success: true,
            data: complaints,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit
            }
        });  
    } catch (error) {
        console.error('Error in getComplaints:', error);
        res.status(500).json({ 
            success: false,
            error: "Error fetching complaints",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
})
const hostelRegistrationApproved=asyncHandler(async(req,res)=>{
    // console.log(req.params.id);
    const response=await hostelmodel.findByIdAndUpdate(req.params.id, {$set:{status:true}},{new:true})
    // console.log(response);     
   res.json("Hostel Registration approved")
})
const complaintResolved=asyncHandler(async(req,res)=>{
    res.status(200).json("complaint resolved and deleted")
    await complaintmodel.findByIdAndDelete(req.params.id);
}
)

module.exports={hostelRegistration,complaints,getComplaints,getHostelRegistration,hostelRegistrationApproved,complaintResolved}