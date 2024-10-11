// PaymentPage.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './Paymentform';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Fees = () => {
  console.log(stripePromise);
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Pay your fee</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Fees;
