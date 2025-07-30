import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFileAlt, 
    faUser, 
    faEnvelope, 
    faIdCard, 
    faTag, 
    faMessage,
    faSpinner,
    faPaperPlane,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function ApplicationForm() {
    const initialFormData = {
        rollno: '',
        subject: '',
        name: '',
        email: '',
        message: ''
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        
        if (!formData.rollno.trim()) {
            newErrors.rollno = 'Roll number is required';
        } else if (!/^[A-Za-z0-9]+$/.test(formData.rollno)) {
            newErrors.rollno = 'Roll number should contain only letters and numbers';
        }
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (formData.subject.trim().length < 5) {
            newErrors.subject = 'Subject must be at least 5 characters';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the errors before submitting');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const response = await fetch(`${apiUrl}/academic/application`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                console.log("Application submitted successfully!");
                setFormData(initialFormData);
                setErrors({});
                toast.success("Application submitted successfully! We'll get back to you soon.");
            } else {
                toast.error("Failed to submit application. Please try again.");
                console.error("Error submitting application");
            }
        } catch (error) {
            toast.error("Network error. Please check your connection and try again.");
            console.error("Error submitting application:", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FontAwesomeIcon icon={faFileAlt} className="text-5xl mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit Application</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Fill out the form below to submit your application to the administration
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Personal Information Section */}
                            <div className="space-y-6">
                                <div className="border-b border-gray-200 pb-4">
                                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                        <FontAwesomeIcon icon={faUser} className="text-blue-600 mr-3" />
                                        Personal Information
                                    </h3>
                                </div>

                                {/* Roll Number */}
                                <div>
                                    <label htmlFor="rollno" className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faIdCard} className="text-blue-600 mr-2" />
                                        Roll Number *
                                    </label>
                                    <input
                                        type="text"
                                        id="rollno"
                                        name="rollno"
                                        value={formData.rollno}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.rollno ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                        placeholder="Enter your roll number"
                                    />
                                    {errors.rollno && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                                            {errors.rollno}
                                        </p>
                                    )}
                                </div>

                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faUser} className="text-blue-600 mr-2" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 mr-2" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                        placeholder="Enter your email address"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Application Details Section */}
                            <div className="space-y-6">
                                <div className="border-b border-gray-200 pb-4">
                                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                        <FontAwesomeIcon icon={faFileAlt} className="text-blue-600 mr-3" />
                                        Application Details
                                    </h3>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faTag} className="text-blue-600 mr-2" />
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                        placeholder="Enter the subject of your application"
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faMessage} className="text-blue-600 mr-2" />
                                        Application Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none ${
                                            errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                        placeholder="Write your detailed application message here. Be clear and specific about your request..."
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        {errors.message ? (
                                            <p className="text-sm text-red-600 flex items-center">
                                                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                                                {errors.message}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500">
                                                Minimum 10 characters required
                                            </p>
                                        )}
                                        <span className="text-sm text-gray-400">
                                            {formData.message.length} characters
                                        </span>
                                    </div>
                                </div>

                                {/* Guidelines */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-800 mb-2">Application Guidelines:</h4>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>• Be clear and specific about your request</li>
                                        <li>• Provide all necessary details and context</li>
                                        <li>• Use formal and respectful language</li>
                                        <li>• Double-check all information before submitting</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 ${
                                    isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105'
                                } text-white shadow-lg`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-3" />
                                        Submitting Application...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} className="mr-3" />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default ApplicationForm;
