// PaymentForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const initialdata={
    rollNo:'',
    semester:'',
    name:'',
    fathersName:'',
    address: '', // Add address field
    city: '',    // Add city field
    country: '', 
    amount:'',
    paymentMethod: 'card', // Default payment method
  };
  const [formData, setFormData] = useState(initialdata);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    // const cardElement = elements.getElement(CardElement);
    // if (!cardElement) {
    //   console.error('Card element not found');
    //   return;
    // }
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: cardElement,
    // }); 
  
    // if (error) {
    //   console.error(error.message);
    //   // Handle error (e.g., display error message to the user)
    //   return;
    // }
    
    try {
      const response = await fetch(`${apiUrl}/fees/payment`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Specify that the content type is JSON
        },
        body: JSON.stringify(formData)
      });
    //   console.log(response.data.message);
    // console.log(response);
    // const session =await response.json();
    const session = await response.json();
    console.log(session);

      setFormData(initialdata);
      const result = await stripe.redirectToCheckout({
        sessionId:session.id
      })
      
      const res = await fetch(`${apiUrl}/fees/success`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Specify that the content type is JSON
        },
        body: JSON.stringify({sessionId:session.id})
      });
        console.log(res);
        console.log(result);   
      

      // window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
      // Here you can handle the response from the server
    }catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <input
        type="text" 
        name="rollNo"
        value={formData.rollNo}
        onChange={handleChange}
        placeholder="Roll Number"
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="semester"
        value={formData.semester}
        onChange={handleChange}
        placeholder="Semester" 
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="fathersName"
        value={formData.fathersName}
        onChange={handleChange}
        placeholder="Father's Name"
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
        <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />  <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />  <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
       <input
        type="text"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      {/* <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      >
        <option value="card">Credit/Debit Card</option>
        <option value="upi">UPI</option>
        <option value="netbanking">Netbanking</option>
      </select> */}
      {/* <CardElement className="p-2 mb-4 border border-gray-300 rounded-md" /> */}
      <button
        type="submit"
        disabled={!stripe}
       
        className="block w-full p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
      >
        Submit 
      </button>
    </form>
  );
};

export default PaymentForm;
