import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faEnvelope, 
    faPhone, 
    faExclamationTriangle, 
    faWrench, 
    faWifi, 
    faBolt,
    faSpinner,
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

function ComplaintForm() {
    const initialFormData = {
        name: '',
        email: '',
        complaintdesc: '',
        phone: '',
        type: ''
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.type) newErrors.type = "Complaint type is required";
        if (!formData.complaintdesc.trim()) newErrors.complaintdesc = "Complaint description is required";
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }
        
        setIsLoading(true);
        
        try {
            const response = await fetch(`${apiUrl}/hostel/complaint`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                setFormData(initialFormData);
                setErrors({});
                toast.success("Complaint submitted successfully!");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Error submitting complaint");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
            console.error("Error submitting complaint", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-5xl mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit Complaint</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Report issues and concerns to help us improve our services
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FontAwesomeIcon icon={faUser} className="mr-3 text-blue-600" />
                                Personal Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your full name"
                                        disabled={isLoading}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your email address"
                                        disabled={isLoading}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-500" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your phone number"
                                        disabled={isLoading}
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Complaint Information Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3 text-blue-600" />
                                Complaint Details
                            </h2>
                            
                            <div className="space-y-6">
                                {/* Complaint Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faWrench} className="mr-2 text-blue-500" />
                                        Complaint Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.type ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={isLoading}
                                    >
                                        <option value="">Select Complaint Type</option>
                                        <option value="CIVIL">
                                            🏗️ CIVIL - Construction & Infrastructure Issues
                                        </option>
                                        <option value="WIFI">
                                            📶 WIFI - Internet & Network Problems
                                        </option>
                                        <option value="ELECTRICAL">
                                            ⚡ ELECTRICAL - Power & Electrical Issues
                                        </option>
                                    </select>
                                    {errors.type && (
                                        <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                                    )}
                                </div>

                                {/* Complaint Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 text-blue-500" />
                                        Complaint Description
                                    </label>
                                    <textarea
                                        name="complaintdesc"
                                        rows={6}
                                        value={formData.complaintdesc}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none ${
                                            errors.complaintdesc ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Please describe your complaint in detail. Include location, time, and any other relevant information..."
                                        disabled={isLoading}
                                    />
                                    {errors.complaintdesc && (
                                        <p className="mt-1 text-sm text-red-600">{errors.complaintdesc}</p>
                                    )}
                                    <p className="mt-2 text-sm text-gray-500">
                                        Minimum 10 characters required. Be as specific as possible to help us resolve your issue quickly.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        <span>Submit Complaint</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default ComplaintForm;
