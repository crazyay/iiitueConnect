const MailOnSuccessfulPayment =require("../middleware/email.middleware.js")
const Stripe = require("stripe");
const {asyncHandler}=require('../utils/asyncHandler')

const stripe = new Stripe(process.env.STRIPE_KEY);

const feePayment=asyncHandler(async(req,res)=>{
    const { name,amount, email, semester,paymentMethod } = req.body;
  // console.log(req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      
      
      payment_method_types: ['card'],
      line_items: [
         {
          price_data: { 
            currency: 'inr',
            product_data: {
              name: `IIITU fees of ${semester}`,
            },
            unit_amount: amount*100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://iiitue-connect-student-frontend.vercel.app/success', // Redirect URL after successful payment
      cancel_url: 'https://iiitue-connect-student-frontend.vercel.app/cancel', // Redirect URL if user cancels payment
      customer_email: email,
      metadata: {
        customer_name: name, // Add customer name here
      },
      shipping_address_collection: {
        allowed_countries: ['IN'], // Specify country, if you are accepting payments from specific countries
      },
    });
    // console.log(session);
   return res.json({ id: session.id });

  } catch (error) {
    // console.error("Error creating checkout session:", error);
   return res.status(500).json({ error: "Unable to create checkout session" });
  }
})

const successPayment=asyncHandler(async(req,res)=>{
    const { sessionId } = req.body;
    // console.log("sessioid");
      console.log(sessionId);
    try {
      // Retrieve the Checkout session using the session ID
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      // console.log(session);
      // Check if the payment was successful
      // if (session.payment_status === 'paid') {
        // Payment was successful, send email to the user
        const emailData = {
          from: "ankuryadav8595@gmail.com",
          to: session.customer_details.email,// User's email
          subject: 'Payment Confirmation',
          text: 'Thank you for your payment. Your payment was successful.'
        };
          // console.log(session.customer_details.email);
  
        // Call your email sending middleware to send the email
          await MailOnSuccessfulPayment(emailData);
        // Respond to the client with a success message
        res.status(200).json({ message: 'Payment successful. Email sent to the user.' });
      // } else {
        // Payment was not successful
      //   res.status(400).json({ error: 'Payment not successful.' });
      // }
    } catch (error) {
      // console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
})

module.exports={feePayment,successPayment}