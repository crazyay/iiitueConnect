const academicmodel=require('../models/academicmodel')
const applicationmodel=require('../models/applicationmodel')
const multer=require('multer')
const {asyncHandler}=require('../utils/asyncHandler')
const {uploadOnCloudinary}=require('../utils/cloudinary')
const { apiError } = require('../utils/apiError')
const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'academicreceipt/'); // Specify the directory where files will be stored`
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.originalname+ '-' + uniqueSuffix );
    }
  });

  const upload = multer({ storage: storage1 });

const academicRegistration=async(req,res)=>{
    try {
        // Log form data and file data
        console.log("Form Data:", req.body?req.body:null);
        console.log("File Data:", req.file);
        if(!req.file){
          throw new apiError(404,"Reciept is missing");
        }
        // Create a new hostelmodel instance with form data and file information
          const fileurl=await uploadOnCloudinary(req.file.path);
          if(!fileurl){
            throw new apiError(500,"Reciept uploadation failed! Try Again")
          }
        const data = new academicmodel({
            ...req.body, // Include form fields 
            feepdf: fileurl.secure_url // Include the generated filename for the file
        });
        
        // Save the data to the database
        const savedData = await data.save();
    
        // Send a success response
        res.status(200).send("File uploaded successfully!");
    } catch (error) {
        // Handle errors
        console.log(req.body);
        
        console.error("Error uploading file:", error);
       return res.status(500).send("Error uploading file: " + error.message);
    }
}
const getAcademicRegistrations = asyncHandler(async (req, res) => {
    try {
        // Get pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Build query based on filters
        const query = {};
        const { batch, semester, rollno, branch } = req.query;
        
        if (batch) query.batch = { $regex: new RegExp(batch, 'i') };
        if (semester) query.semester = { $regex: new RegExp(semester, 'i') };
        if (branch) query.branch = { $regex: new RegExp(branch, 'i') };
        if (rollno) query.rollno = { $regex: new RegExp(rollno, 'i') };
        
        // Get total count and paginated results in parallel
        const [total, registrations] = await Promise.all([
            academicmodel.countDocuments(query),
            academicmodel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
        ]);
        
        const totalPages = Math.ceil(total / limit);
        
        res.json({
            success: true,
            data: registrations,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        console.error('Error in getAcademicRegistrations:', error);
        res.status(500).json({ 
            success: false,
            error: "Error fetching academic registrations",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
})
const academicRegApproved=asyncHandler(async(req,res)=>{
    // console.log("hello");
    // console.log(req.params.id);
       const response=await academicmodel.findByIdAndUpdate(req.params.id, {$set:{status:true}},{new:true})
      //  console.log(response);     
      res.json("Academic Registration approved")
})

const applicationform=asyncHandler(async(req,res)=>{
    try{

        // console.log(req.body);
        const data=new applicationmodel(req.body);
        const datasaved= await data.save()
        res.status(200).send("succes")
      }
      catch(error){
        // console.error(error);
        res.status(500).send(error.message);
      }
})
const getApplications=asyncHandler(async(req,res)=>{
    try {
            const applications = await applicationmodel.find().sort({ createdAt: 1});
            // console.log(applications);
            res.json(applications);
          } catch (error) {
            // console.error("Error fetching applications:", error);
            res.status(500).json({ error: "Error fetching applications" });
          }
})

const applicationApproved=asyncHandler(async(req,res)=>{
    res.status(200).json("Application approved and deleted")
    await applicationmodel.findByIdAndDelete(req.params.id);
})

module.exports={academicRegistration,upload,getAcademicRegistrations,academicRegApproved,applicationform,getApplications,applicationApproved}