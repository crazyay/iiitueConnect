// PaymentPage.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './Paymentform';

const stripePromise = loadStripe('pk_test_51ON9vwSIUs4beRKm9XpV2w7oRTQAVcncynpgjX4N1Qg7Yxcjan324ouzMWF3LSnUn6ZTLMDUApVilMuUyqWXgEGA00337PuuqA');

const Fees = () => {
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
