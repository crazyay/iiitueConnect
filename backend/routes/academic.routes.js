const express=require('express');
const {academicRegistration,upload, applicationform, getApplications, getAcademicRegistrations, academicRegApproved, applicationApproved}=require('../controllers/academic.controller');
const sendEmailMiddleware = require('../middleware/mail.middleware');
const academicmodel = require('../models/academicmodel');
const applicationmodel = require('../models/applicationmodel');
const router=express.Router()

router.route("/academicform").post(upload.single('file'),academicRegistration);
router.route("/academicregistration").get(getAcademicRegistrations)
router.route("/academicregistrationapproval/:id").put(sendEmailMiddleware(academicmodel),academicRegApproved)
router.route("/application").post(applicationform)
router.route("/application").get(getApplications)
router.route("/approve-application/:id").put(sendEmailMiddleware(applicationmodel),applicationApproved)

module.exports=router