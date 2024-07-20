import React from 'react';
import { Link } from 'react-router-dom';

const PaymentPage = ({ isSuccess }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-8">
        {/* {isSuccess ? (
          <>
            <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-lg text-gray-700 mb-6">Thank you for your payment. Your transaction was successful.</p>
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"> Go back </button>
            </div>
          </>
        ) : ( */}
          <>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h2>
            <p className="text-lg text-gray-700 mb-6">We're sorry, but your payment was unsuccessful. Please try again later.</p>
            <div className="flex justify-center">
           <Link to='/fees' >   <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md">Try Again</button></Link>
            </div>
          </>
        {/* )} */}
      </div>
    </div>
  );
};

export default PaymentPage;
