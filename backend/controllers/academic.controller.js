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
    const { status, search } = req.query;
        
        if (batch) query.batch = { $regex: new RegExp(batch, 'i') };
        if (semester) query.semester = { $regex: new RegExp(semester, 'i') };
        if (branch) query.branch = { $regex: new RegExp(branch, 'i') };
        if (rollno) query.rollno = { $regex: new RegExp(rollno, 'i') };
    if (status && status !== 'all') query.status = status;
    if (search) {
      const s = new RegExp(search, 'i');
      query.$or = [
        { name: s },
        { rollno: s },
        { email: s },
        { branch: s }
      ];
    }
        
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
  // Approve academic registration by updating status instead of deleting
  const update = { status: 'approved', approved: true, approvedAt: new Date() };
  if (req.body && req.body.comment) update.comment = req.body.comment;

  const response = await academicmodel.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  res.json({ success: true, message: 'Academic registration approved', data: response });
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Support simple search/status filters
    const query = {};
    const { status, search } = req.query;
    if (status && status !== 'all') query.status = status;
    if (search) {
      const s = new RegExp(search, 'i');
      query.$or = [
        { name: s },
        { rollno: s },
        { email: s },
        { subject: s },
        { message: s }
      ];
    }

    const [total, applications] = await Promise.all([
      applicationmodel.countDocuments(query),
      applicationmodel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    const totalPages = Math.ceil(total / limit);

    // Return a consistent paginated response similar to other endpoints
    res.json({
      success: true,
      data: applications,
      total,
      page,
      pages: totalPages,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Error fetching applications" });
  }
})

const applicationApproved=asyncHandler(async(req,res)=>{
  // Mark application as approved instead of deleting it
  const update = {
    status: 'approved',
    approved: true,
    approvedAt: new Date(),
    comment: req.body?.comment || ''
  };

  const updated = await applicationmodel.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  res.status(200).json({ success: true, message: 'Application approved', data: updated });
})

module.exports={academicRegistration,upload,getAcademicRegistrations,academicRegApproved,applicationform,getApplications,applicationApproved}