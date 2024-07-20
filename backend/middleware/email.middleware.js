const nodemailer = require('nodemailer');

const MailOnSuccessfulPayment =async (email) => {
  try {
    // const { id } = req.params;

    // Find the application from the provided model
    // const application = await model.findById(id);
    
    // Return a 404 response if the application is not found
    // if (!application) {
    //   return res.status(404).json({ error: "Data not found" });
    // }
    // console.log(req.body);
    // Send email to the applicant
    // const email = application.email;
    // const mailOptions = {
    //   from: "ankuryadav8595@gmail.com",
    //   to: email,
    //   subject: 'Application Response',
    //   text:req.body.comment?req.body.comment:"Congratulations your query is resolved"
    // };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ankuryadav8595@gmail.com',
        pass: process.env.EMAIL_PASS
      }
    });
    console.log("email part");
    const info = await transporter.sendMail(email);
    console.log('Email sent: ' + info.response);

    // Continue to the next middleware
    // next();
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Error sending email" });
  }
};
module.exports = MailOnSuccessfulPayment;
