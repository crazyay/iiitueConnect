const academicmodel=require('../models/academicmodel')
const applicationmodel=require('../models/applicationmodel')
const multer=require('multer')

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
        // console.log("Form Data:", req.body);
        // console.log("File Data:", req.file);
    
        // Create a new hostelmodel instance with form data and file information
        const data = new academicmodel({
            ...req.body, // Include form fields 
            feepdf: req.file.filename // Include the generated filename for the file
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
}
const getAcademicRegistrations=async(req,res)=>{
    try {
        // Fetch all registrations from the database
        let registrations = await academicmodel.find();
              
        // Filter registrations based on query parameters (batch, semester, rollno)
        const { batch, semester, rollno,branch } = req.query;
        if (batch) {
          registrations = registrations.filter((registration) => registration.batch.toLowerCase().includes(batch.toLowerCase()));
        }
        if (semester) {
          registrations = registrations.filter((registration) => registration.semester.toLowerCase().includes(semester.toLowerCase()));
        }
        if (branch) {
          registrations = registrations.filter((registration) => registration.branch.toLowerCase().includes(branch.toLowerCase()));
        }
        if (rollno) {
          registrations = registrations.filter((registration) => registration.rollno.toLowerCase().includes(rollno.toLowerCase()));
        }
        //  console.log(registrations);
        res.json(registrations);
      } catch (error) {
        // console.error("Error fetching registrations:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}
const academicRegApproved=async(req,res)=>{
    // console.log("hello");
    // console.log(req.params.id);
       const response=await academicmodel.findByIdAndUpdate(req.params.id, {$set:{status:true}},{new:true})
      //  console.log(response);     
      res.json("Academic Registration approved")
}

const applicationform=async(req,res)=>{
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
}
const getApplications=async(req,res)=>{
    try {
            const applications = await applicationmodel.find().sort({ createdAt: 1});
            // console.log(applications);
            res.json(applications);
          } catch (error) {
            // console.error("Error fetching applications:", error);
            res.status(500).json({ error: "Error fetching applications" });
          }
}

const applicationApproved=async(req,res)=>{
    res.status(200).json("Application approved and deleted")
    await applicationmodel.findByIdAndDelete(req.params.id);
}

module.exports={academicRegistration,getAcademicRegistrations,academicRegApproved, upload,applicationform,getApplications,applicationApproved}