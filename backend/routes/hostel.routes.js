const express=require('express');
const { hostelRegistration, complaints, getComplaints, getHostelRegistration, hostelRegistrationApproved, complaintResolved } = require('../controllers/hostel.controller');
const sendEmailMiddleware = require('../middleware/mail.middleware');
const hostelmodel = require('../models/hostelmodel');
const complaintsmodel = require('../models/complaintsmodel');
const {upload}=require('../middleware/fileupload.middleware')

const router=express.Router()

router.route("/hostelform").post(upload.single('file'), hostelRegistration);
router.route("/hostelregistration").get(getHostelRegistration)
router.route("/hostelregistrationapproval/:id").put(sendEmailMiddleware(hostelmodel),hostelRegistrationApproved)
router.route("/complaint").post(complaints)
router.route("/Complaint/:page").get(getComplaints)
router.route("/resolve-complaint/:id").put(sendEmailMiddleware(complaintsmodel),complaintResolved)



module.exports=router