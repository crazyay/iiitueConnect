const hostelmodel=require('../models/hostelmodel')
const complaintmodel=require('../models/complaintsmodel')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'hostelreceipt/'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
     
      cb(null,file.originalname);
    }
  });
const upload = multer({ storage: storage });

const hostelRegistration=async(req,res)=>{
    try {
        // Log form data and file data
        console.log("Form Data:", req.body);
        console.log("File Data:", req.file);
        // Create a new hostelmodel instance with form data and file information
        const data = new hostelmodel({
            ...req.body, // Include form fields
            feepdf: req.file.filename // Include the generated filename for the file
        });
    
        // Save the data to the database
        const savedData = await data.save();
    
        // Send a success response
        res.status(200).send("File uploaded successfully!");
    } catch (error) {
        // Handle errors
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file: " + error.message);
    }
}
const getHostelRegistration=async(req,res)=>{
    const registeredStudents=await hostelmodel.find();
  res.status(200).json(registeredStudents);
}
const complaints=async(req,res)=>{
    const data=await req.body;
  console.log(data);
  const complaintdata=new complaintmodel(data);
  const result=await complaintdata.save();
  res.send("complaint registered");
}
const getComplaints=async(req,res)=>{
    try {
        const pa=req.params.page;
        console.log(pa);
        const complaint = await complaintmodel.find({type:{ $regex: new RegExp(req.params.page, "i") }}).sort({createdAt: 1 });
        console.log("complaint");
        console.log(complaint);
        res.json(complaint);  
      } catch (error) {
        console.error("Error fetching complaints:", error);
        res.status(500).json({ error: "Error fetching complaints" });
      }
}
const hostelRegistrationApproved=async(req,res)=>{
    console.log(req.params.id);
    const response=await hostelmodel.findByIdAndUpdate(req.params.id, {$set:{status:true}},{new:true})
    console.log(response);     
   res.json("Hostel Registration approved")
}
const complaintResolved=async(req,res)=>{
    res.status(200).json("complaint resolved and deleted")
    await complaintmodel.findByIdAndDelete(req.params.id);
}


module.exports={hostelRegistration, upload,complaints,getComplaints,getHostelRegistration,hostelRegistrationApproved,complaintResolved}