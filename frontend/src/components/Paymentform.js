import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCreditCard, 
    faUser, 
    faGraduationCap, 
    faMapMarkerAlt, 
    faRupeeSign, 
    faSpinner,
    faLock,
    faCheckCircle,
    faInfoCircle,
    faHome,
    faGlobe
} from '@fortawesome/free-solid-svg-icons';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

// Student Details Form Component
const StudentDetailsForm = ({ formData, errors, onChange, onNext }) => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Information</h2>
        <p className="text-gray-600">Please provide your academic and personal details</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Roll Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-blue-600" />
            Roll Number *
          </label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.rollNo ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your roll number"
          />
          {errors.rollNo && <p className="text-red-500 text-sm mt-1">{errors.rollNo}</p>}
        </div>
        
        {/* Semester */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-blue-600" />
            Semester *
          </label>
          <select
            name="semester"
            value={formData.semester}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.semester ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Semester</option>
            {[1,2,3,4,5,6,7,8].map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
          {errors.semester && <p className="text-red-500 text-sm mt-1">{errors.semester}</p>}
        </div>
        
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-600" />
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        {/* Father's Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-600" />
            Father's Name *
          </label>
          <input
            type="text"
            name="fathersName"
            value={formData.fathersName}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.fathersName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter father's name"
          />
          {errors.fathersName && <p className="text-red-500 text-sm mt-1">{errors.fathersName}</p>}
        </div>
        
        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FontAwesomeIcon icon={faHome} className="mr-2 text-blue-600" />
            Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={onChange}
            rows="3"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your complete address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        
        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-600" />
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your city"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        
        {/* Country */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FontAwesomeIcon icon={faGlobe} className="mr-2 text-blue-600" />
            Country *
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your country"
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>
        
        {/* Amount */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FontAwesomeIcon icon={faRupeeSign} className="mr-2 text-blue-600" />
            Fee Amount *
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter fee amount"
            min="0"
            step="0.01"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>
      </div>
      
      <div className="mt-8">
        <button
          type="button"
          onClick={onNext}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg"
        >
          Continue to Payment
          <FontAwesomeIcon icon={faCreditCard} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

// Payment Details Form Component
const PaymentDetailsForm = ({ formData, onSubmit, onBack, isLoading, stripe }) => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Details</h2>
        <p className="text-gray-600">Review your information and complete the payment</p>
      </div>
      
      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Student:</span>
            <span className="font-semibold">{formData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Roll Number:</span>
            <span className="font-semibold">{formData.rollNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Semester:</span>
            <span className="font-semibold">{formData.semester}</span>
          </div>
          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between text-lg">
              <span className="font-semibold text-gray-800">Total Amount:</span>
              <span className="font-bold text-blue-600">
                <FontAwesomeIcon icon={faRupeeSign} className="mr-1" />
                {formData.amount}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <FontAwesomeIcon icon={faLock} className="text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-800">Secure Payment</h4>
            <p className="text-blue-700 text-sm">
              Your payment is secured with 256-bit SSL encryption. We do not store your card details.
            </p>
          </div>
        </div>
      </div>
      
      {/* Payment Method */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-blue-600" />
          Payment Method
        </label>
        <div className="border rounded-lg p-4">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#374151',
                  '::placeholder': {
                    color: '#9CA3AF',
                  },
                },
              },
            }}
          />
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!stripe || isLoading}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Pay ₹{formData.amount}
            </>
          )}
        </button>
      </div>
      
      {/* Payment Info */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <FontAwesomeIcon icon={faInfoCircle} />
          <span>You will be redirected to Stripe for secure payment processing</span>
        </div>
      </div>
    </div>
  );
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const initialData = {
    rollNo: '',
    semester: '',
    name: '',
    fathersName: '',
    address: '',
    city: '',
    country: 'India',
    amount: '',
    paymentMethod: 'card',
  };
  
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll number is required';
    if (!formData.semester.trim()) newErrors.semester = 'Semester is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.fathersName.trim()) newErrors.fathersName = "Father's name is required";
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateForm()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    if (!stripe || !elements) {
      toast.error('Payment system not ready. Please try again.');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${apiUrl}/fees/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }
      
      const session = await response.json();
      
      if (session.id) {
        toast.success('Redirecting to payment gateway...');
        
        const result = await stripe.redirectToCheckout({
          sessionId: session.id
        });
        
        if (result.error) {
          throw new Error(result.error.message);
        }
        
        // Success callback
        const successResponse = await fetch(`${apiUrl}/fees/success`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ sessionId: session.id })
        });
        
        if (successResponse.ok) {
          setPaymentSuccess(true);
          setFormData(initialData);
          toast.success('Payment completed successfully!');
        }
      } else {
        throw new Error('Invalid session response');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faCheckCircle} className="text-3xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your fee payment has been processed successfully.</p>
          <button
            onClick={() => {
              setPaymentSuccess(false);
              setStep(1);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Make Another Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faCreditCard} className="text-2xl text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Fee Payment</h1>
          </div>
          <p className="text-xl text-gray-600">
            Secure online payment for academic fees
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${
              step >= 1 ? 'text-blue-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                1
              </div>
              <span className="font-semibold">Details</span>
            </div>
            <div className={`w-16 h-1 ${
              step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center space-x-2 ${
              step >= 2 ? 'text-blue-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                2
              </div>
              <span className="font-semibold">Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {step === 1 ? (
            <StudentDetailsForm 
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onNext={nextStep}
            />
          ) : (
            <PaymentDetailsForm 
              formData={formData}
              onSubmit={handleSubmit}
              onBack={prevStep}
              isLoading={isLoading}
              stripe={stripe}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
