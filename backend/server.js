require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors=require("cors")
require('./db/config')
// const nodemailer = require('nodemailer');
// const User=require('./models/user');
// const hostelmodel=require('./models/hostelmodel');
// const academicmodel=require('./models/academicmodel').default;
// const applicationmodel=require('./models/applicationmodel')
// const complaintmodel=require('./models/complaintsmodel')
// const Stripe = require("stripe");
// const stripe = new Stripe("sk_test_51ON9vwSIUs4beRKmyBG9eMRRVQn53TT4lWBSOjk1VQe4k9qyCkVY4zsiDDyr0pK6kSR2fT1WqL5CK1umkL7NLDhz00SevryZle");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ 
    origin: '*',
    optionsSuccessStatus: 200,
}));


const path = require("path");
const mongoose= require("mongoose");
// const { error } = require("console");
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'hostelreceipt/'); // Specify the directory where files will be stored
//   },
//   filename: function (req, file, cb) {
   
//     cb(null,file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// const storage1 = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'academicreceipt/'); // Specify the directory where files will be stored`
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, file.originalname+ '-' + uniqueSuffix );
//     }
//   });
//   const upload1 = multer({ storage: storage1 });
// app.use(express.static(path.join(__dirname, '../frontend', 'build')));
// const generateAccessAndRefreshToken=async(userId )=>{
//   try {
//     const user=await User.findById(userId);
//   if(!user){

//   throw new Error(500,"server error");
//  }
//  const accessToken=await user.generateAccessToken();
//  const refreshToken=await user.generateRefreshToken();
//  user.refreshToken=refreshToken;
//  await user.save({validateBeforeSave:false})

//  return {accessToken, refreshToken}

    
//   } catch (error) {
//     throw new Error(500,"error while generating tokens")
//   }

 
// }
// app.post('/Register',async(req,res)=>{
//   const {email, password}=req.body;
//   if([email,password].some((field)=>field?.trim()==="")){
//      return Error(400,"All fields are required")
//   }
//   const emailDomain = email.split('@')[1];
//   if (emailDomain !== 'iiitu.ac.in') {
//     return res.status(400).json({ success: false, message: "Only iiitu.ac.in email addresses are allowed" });
//   }
// const existedUser=await User.findOne( {email})
//  if(existedUser){
//   return Error(409,"User already with username or email exist");
//  }


// const user= await User.create({
//     email,
//     password,
// });
// const createduser=await User.findById(user._id).select(
//   "-password -refreshToken")

//   if(!createduser){
//       throw new Error(500,"user is not registerd!! try again")
//   }
// return res.status(201).json(
//  { status:200,data:createduser,message:"user registered successfully"
//  } )

// })

// app.post('/Login', async (req, res) => {
//   // const { email, password } = req.body;
  
// // console.log(req.body);
// //   const user = userdata.find((student) => student.email === email && student.password === password);
// //   // console.log(user);
 
// //   if (user) {
// //     // Authentication successful
// //     res.send(user);
// //   } else {
// //     // Authentication failed
// //     res.status(401).json({ success: false, message: 'Authentication failed' });
// //   }


// console.log(req.body);
//   const {email,password}= req.body;
//   if(!(email)){
//     return res.status(401).json({ success: false, message: 'Authentication failed' });
//   }

//   const user=await User.findOne({email})
//   if(!user){ 
// console.log("1");

//  return res.status(401).json({ success: false, message: 'Authentication failed' });
   
//    } 
//   const validuser=await user.isPasswordCorrect(password);
//    if(!validuser){
// console.log("2");

//    return res.status(401).json({ success: false, message: 'Password or email is wrong' });

//    }
   
//   const {accessToken,refreshToken} =await generateAccessAndRefreshToken(user._id);
//  const loggedInUser=await User.findById(user._id).select("-password -refreshToken") 
//    //instead of one call to db just simply update the user object with the 
//    // new refreshToken which is generated after user call 
//   // user.refreshToken=refreshToken 
//   //user.select("-password -refreshToken")
//   // await user.save(validateBeforeSave:false)// no need to save as u have already saved it while genereating it

//   //  cookie part

//   const options={       
//                       // by using this options we can allows tokens to be
//     httpOnly:true,  // only modifiable from server not from client side
//     secure:true
//   }
//    return res.status(200)
//    .cookie("accessToken",accessToken,options)
//    .cookie("refreshToken",refreshToken,options)
//    .json(loggedInUser)

// });
   
// Use multer middleware for handling file uploads

// app.post("/hostelform", upload.single('file'), async (req, res) => {
//   try {
//     // Log form data and file data
//     console.log("Form Data:", req.body);
//     console.log("File Data:", req.file);
//     // Create a new hostelmodel instance with form data and file information
//     const data = new hostelmodel({
//         ...req.body, // Include form fields
//         feepdf: req.file.filename // Include the generated filename for the file
//     });

//     // Save the data to the database
//     const savedData = await data.save();

//     // Send a success response
//     res.status(200).send("File uploaded successfully!");
// } catch (error) {
//     // Handle errors
//     console.error("Error uploading file:", error);
//     res.status(500).send("Error uploading file: " + error.message);
// }
// });

// app.post("/feepayment",async(req,res)=>{
//   console.log(req.body);
//   res.json("payment successfully ")
// })

// app.post("/academicform", upload1.single('file'), async (req, res) => {
//   try {
//     // Log form data and file data
//     console.log("Form Data:", req.body);
//     console.log("File Data:", req.file);

//     // Create a new hostelmodel instance with form data and file information
//     const data = new academicmodel({
//         ...req.body, // Include form fields 
//         feepdf: req.file.filename // Include the generated filename for the file
//     });

//     // Save the data to the database
//     const savedData = await data.save();

//     // Send a success response
//     res.status(200).send("File uploaded successfully!");
// } catch (error) {
//     // Handle errors
//     console.error("Error uploading file:", error);
//     res.status(500).send("Error uploading file: " + error.message);
// }
// });

// app.post("/application", async (req,res)=>{
//   try{

//     console.log(req.body);
//     const data=new applicationmodel(req.body);
//     const datasaved= await data.save()
//     res.status(200).send("succes")
//   }
//   catch(error){
//     console.error(error);
//     res.status(500).send(error.message);
//   }

// })

  // app.get("/application", async (req, res) => {
  //   try {
  //     const applications = await applicationmodel.find().sort({ createdAt: 1});
  //     // console.log(applications);
  //     res.json(applications);
  //   } catch (error) {
  //     console.error("Error fetching applications:", error);
  //     res.status(500).json({ error: "Error fetching applications" });
  //   }
  // });

  // app.get("/Complaint/:page", async (req, res) => {
  //   try {
  //     const pa=req.params.page;
  //     console.log(pa);
  //     const complaint = await complaintmodel.find({type:{ $regex: new RegExp(req.params.page, "i") }}).sort({createdAt: 1 });
  //     console.log("complaint");
  //     console.log(complaint);
  //     res.json(complaint);  
  //   } catch (error) {
  //     console.error("Error fetching complaints:", error);
  //     res.status(500).json({ error: "Error fetching complaints" });
  //   }
  // });

// app.put("/resolve-complaint/:id",sendEmailMiddleware(complaintmodel), async(req,res)=>{
//        res.status(200).json("complaint resolved and deleted")
//        await complaintmodel.findByIdAndDelete(req.params.id);

//   // sendEmailMiddleware(req.params.id, complaintmodel)
//   // .then(response => {
//   //   console.log("Email sent successfully:", response);
//   // })
//   // .catch(error => {
//   //   console.error("Error sending email:", error);
//   // });
// })

  // app.put("/approve-application/:id",sendEmailMiddleware(applicationmodel), async (req, res) => {
   
  //   res.status(200).json("Application approved and deleted")
  //     await applicationmodel.findByIdAndDelete(req.params.id);
  //   // try {
  //     //     const applicationId = req.params.id;
  //     //     console.log(applicationId);
  //     //     const application = await applicationmodel.findByIdAndDelete(applicationId);
  //     //        console.log(application);
  //     //     if (!application) {
  //     //         return res.status(404).json({ error: "Application not found" });
  //     //     }
  //     //     res.status(200).json({message:"application approved and  deleted "});
  //     //     console.log(req.body.comment); 
  //     //     // Extract email address from the application
  //     //     const email = application.email;
  //     //     // Compose email message
  //     //     const mailOptions = {
  //     //         from:"ankuryadav8595@gmail.com",
  //     //         to:email,
  //     //         subject: 'Application Approved',  
  //     //         text:req.body?req.body.comment:'Your application has been approved. Congratulations!'
  //     //     };
  
  //     //     // Send email
  //     //     const transporter = nodemailer.createTransport({
  //     //         service: 'gmail',
  //     //         auth: {
  //     //             user: 'ankuryadav8595@gmail.com',
  //     //             pass: process.env.EMAIL_PASS
  //     //         }
  //     //     });
  //     //     transporter.sendMail(mailOptions,async function(error, info){
  //     //         if (error) {
  //     //             console.error("Error sending email:", error);
  //     //         } else {
  //     //             console.log('Email sent: ' + info.response);
  //     //         }
  //     //     });
  //     // } catch (error) {
  //     //     console.error("Error approving application:", error);
  //     //     res.status(500).json({ error: "Error approving application" });
  //     // }
  // });

// app.post("/complaint",async(req,res)=>{
//   const data=await req.body;
//   console.log(data);
//   const complaintdata=new complaintmodel(data);
//   const result=await complaintdata.save();
//   res.send("complaint registered");
// })

// app.get("/academicregistration",async(req,res)=>{
//   const registrations=await academicmodel.find();
//   const { batch, semester, rollno } = req.query;
//     if (batch) {
//       registrations = registrations.filter((registration) => registration.batch.toLowerCase().includes(batch.toLowerCase()));
//     }
//     if (semester) {
//       registrations = registrations.filter((registration) => registration.semester.toLowerCase().includes(semester.toLowerCase()));
//     }
//     if (rollno) {
//       registrations = registrations.filter((registration) => registration.rollno.toLowerCase().includes(rollno.toLowerCase()));
//     }
//   res.status(200).json(registrations);
// })

// app.get("/academicregistration", async (req, res) => {
//   try {
//     // Fetch all registrations from the database
//     let registrations = await academicmodel.find();
          
//     // Filter registrations based on query parameters (batch, semester, rollno)
//     const { batch, semester, rollno,branch } = req.query;
//     if (batch) {
//       registrations = registrations.filter((registration) => registration.batch.toLowerCase().includes(batch.toLowerCase()));
//     }
//     if (semester) {
//       registrations = registrations.filter((registration) => registration.semester.toLowerCase().includes(semester.toLowerCase()));
//     }
//     if (branch) {
//       registrations = registrations.filter((registration) => registration.branch.toLowerCase().includes(branch.toLowerCase()));
//     }
//     if (rollno) {
//       registrations = registrations.filter((registration) => registration.rollno.toLowerCase().includes(rollno.toLowerCase()));
//     }
//      console.log(registrations);
//     res.json(registrations);
//   } catch (error) {
//     console.error("Error fetching registrations:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// app.put("/academicregistrationapproval/:id",sendEmailMiddleware(academicmodel),async(req,res)=>{
//   console.log("hello");
//   console.log(req.params.id);
//      const response=await academicmodel.findByIdAndUpdate(req.params.id, {$set:{status:true}},{new:true})
//      console.log(response);     
//     res.json("Academic Registration approved")
// })


// app.put("/hostelregistrationapproval/:id",sendEmailMiddleware(hostelmodel),async(req,res)=>{
//   // console.log("hello");
//   console.log(req.params.id);
//      const response=await hostelmodel.findByIdAndUpdate(req.params.id, {$set:{status:true}},{new:true})
//      console.log(response);     
//     res.json("Hostel Registration approved")
// })

// app.get("/hostelregistration",async(req,res)=>{
//   const registeredStudents=await hostelmodel.find();
//   res.status(200).json(registeredStudents);
// })

// app.post("/payment",async(req,res)=>{
//   const { amount, email, semester,paymentMethod } = req.body;
//   console.log(req.body);
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//          {
//           price_data: { 
//             currency: 'inr',
//             product_data: {
//               name: `IIITU fees of ${semester}`,
//             },
//             unit_amount: amount*100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:3001/success', // Redirect URL after successful payment
//       cancel_url: 'http://localhost:3001/cancel', // Redirect URL if user cancels payment
//       customer_email: email,
//     });
//     res.json({ id: session.id });
//     console.log(session);
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ error: "Unable to create checkout session" });
//   }
// });

// app.post("/success", async (req, res) => {
//   const { sessionId } = req.body;
//   console.log("sessioid");
//     console.log(sessionId);
//   try {
//     // Retrieve the Checkout session using the session ID
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     console.log(session);
//     // Check if the payment was successful
//     // if (session.payment_status === 'paid') {
//       // Payment was successful, send email to the user
//       const emailData = {
//         from: "ankuryadav8595@gmail.com",
//         to: session.customer_details.email,// User's email
//         subject: 'Payment Confirmation',
//         text: 'Thank you for your payment. Your payment was successful.'
//       };
//         console.log(session.customer_details.email);

//       // Call your email sending middleware to send the email
//         await MailOnSuccessfulPayment(emailData);
//       // Respond to the client with a success message
//       res.status(200).json({ message: 'Payment successful. Email sent to the user.' });
//     // } else {
//       // Payment was not successful
//     //   res.status(400).json({ error: 'Payment not successful.' });
//     // }
//   } catch (error) {
//     console.error('Error processing payment:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });


const userRouter=require('./routes/user.routes.js')
const hostelRouter=require('./routes/hostel.routes.js')
const academicRouter=require('./routes/academic.routes.js')
const feesRouter=require('./routes/fees.routes.js')
app.use("/users",userRouter)
app.use('/hostel',hostelRouter)
app.use('/academic',academicRouter)
app.use('/fees',feesRouter)

app.listen(8000,(req,res)=>{
  console.log("backened server started");
})
