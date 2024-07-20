import React from 'react';
import { Link } from 'react-router-dom';
const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-8">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
        <p className="text-lg text-gray-700 mb-6">Thank you for your payment. Your transaction was successful.</p>
        <div className="flex justify-center">
       <Link  to='/' ><button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Go to Home Page</button></Link>  
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
