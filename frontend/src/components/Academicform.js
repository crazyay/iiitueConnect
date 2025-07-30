import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faEnvelope, 
    faPhone, 
    faGraduationCap, 
    faCalendarAlt, 
    faDollarSign, 
    faFileUpload,
    faSpinner,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
const apiUrl = process.env.REACT_APP_API_BASE_URL;
export default function Branch(){
    const initialFormData = {
        rollno: "",
        email: "",
        name: "",
        phone: "",
        semester: "",
        branch: "",
        batch: "",
        feeamount: "",
        receiptno: "",
        file: null
    };

    const [data, setdata] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        
        if (!data.rollno.trim()) newErrors.rollno = "Roll number is required";
        if (!data.email.trim()) newErrors.email = "Email is required";
        if (!data.name.trim()) newErrors.name = "Name is required";
        if (!data.phone.trim()) newErrors.phone = "Phone number is required";
        if (!data.semester) newErrors.semester = "Semester is required";
        if (!data.branch) newErrors.branch = "Branch is required";
        if (!data.batch) newErrors.batch = "Batch is required";
        if (!data.feeamount.trim()) newErrors.feeamount = "Fee amount is required";
        if (!data.receiptno.trim()) newErrors.receiptno = "Receipt number is required";
        if (!data.file) newErrors.file = "Fee receipt file is required";
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (data.phone && !phoneRegex.test(data.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }
        
        setIsLoading(true);
        
        try {
            const formData = new FormData();
            formData.append("rollno", data.rollno);
            formData.append("email", data.email);
            formData.append("name", data.name);
            formData.append("phone", data.phone);
            formData.append("semester", data.semester);
            formData.append("branch", data.branch);
            formData.append("batch", data.batch);
            formData.append("feeamount", data.feeamount);
            formData.append("receiptno", data.receiptno);
            formData.append("file", data.file);
            
            const response = await fetch(`${apiUrl}/academic/academicform`, { 
                method: "POST",
                body: formData,
            });
            
            if (response.ok) {
                setdata(initialFormData);
                setErrors({});
                toast.success("Academic registration submitted successfully!");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Error submitting form");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
            console.error("Error uploading file", error);
        } finally {
            setIsLoading(false);
        }
    };
    function updatedata(event) {
        const { name, value, type } = event.target;
        setdata((prevData) => ({
            ...prevData,
            [name]: type === "file" ? event.target.files[0] : value,
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    }
//   useEffect(() => {
//     // Log the updated state whenever it changes
//     console.warn(data);
// }, [data]); // Run the effect only when the 'data' state changes

    // Function to toggle dropdown visibility
 
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-5xl mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Registration</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Complete your academic registration by filling out the form below
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form encType="multipart/form-data" onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FontAwesomeIcon icon={faUser} className="mr-3 text-blue-600" />
                                Personal Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Roll Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                                        Roll Number
                                    </label>
                                    <input
                                        type="text"
                                        name="rollno"
                                        value={data.rollno}
                                        onChange={updatedata}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.rollno ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your roll number"
                                        disabled={isLoading}
                                    />
                                    {errors.rollno && (
                                        <p className="mt-1 text-sm text-red-600">{errors.rollno}</p>
                                    )}
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={updatedata}
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
                                        value={data.email}
                                        onChange={updatedata}
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-500" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={data.phone}
                                        onChange={updatedata}
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

                        {/* Academic Information Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FontAwesomeIcon icon={faGraduationCap} className="mr-3 text-blue-600" />
                                Academic Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Semester */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                                        Semester
                                    </label>
                                    <select
                                        name="semester"
                                        value={data.semester}
                                        onChange={updatedata}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.semester ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={isLoading}
                                    >
                                        <option value="">Select Semester</option>
                                        <option value="1">1st Semester</option>
                                        <option value="2">2nd Semester</option>
                                        <option value="3">3rd Semester</option>
                                        <option value="4">4th Semester</option>
                                        <option value="5">5th Semester</option>
                                        <option value="6">6th Semester</option>
                                        <option value="7">7th Semester</option>
                                        <option value="8">8th Semester</option>
                                    </select>
                                    {errors.semester && (
                                        <p className="mt-1 text-sm text-red-600">{errors.semester}</p>
                                    )}
                                </div>

                                {/* Branch */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-blue-500" />
                                        Branch
                                    </label>
                                    <select
                                        name="branch"
                                        value={data.branch}
                                        onChange={updatedata}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.branch ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={isLoading}
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">Computer Science & Engineering</option>
                                        <option value="IT">Information Technology</option>
                                        <option value="ECE">Electronics & Communication</option>
                                    </select>
                                    {errors.branch && (
                                        <p className="mt-1 text-sm text-red-600">{errors.branch}</p>
                                    )}
                                </div>

                                {/* Batch */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                                        Batch Year
                                    </label>
                                    <select
                                        name="batch"
                                        value={data.batch}
                                        onChange={updatedata}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.batch ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={isLoading}
                                    >
                                        <option value="">Select Batch</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                    </select>
                                    {errors.batch && (
                                        <p className="mt-1 text-sm text-red-600">{errors.batch}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Fee Information Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FontAwesomeIcon icon={faDollarSign} className="mr-3 text-blue-600" />
                                Fee Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Fee Amount */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faDollarSign} className="mr-2 text-blue-500" />
                                        Fee Amount Paid
                                    </label>
                                    <input
                                        type="number"
                                        name="feeamount"
                                        value={data.feeamount}
                                        onChange={updatedata}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.feeamount ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter fee amount"
                                        disabled={isLoading}
                                    />
                                    {errors.feeamount && (
                                        <p className="mt-1 text-sm text-red-600">{errors.feeamount}</p>
                                    )}
                                </div>

                                {/* Receipt Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-blue-500" />
                                        Fee Receipt Number
                                    </label>
                                    <input
                                        type="text"
                                        name="receiptno"
                                        value={data.receiptno}
                                        onChange={updatedata}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.receiptno ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter receipt number"
                                        disabled={isLoading}
                                    />
                                    {errors.receiptno && (
                                        <p className="mt-1 text-sm text-red-600">{errors.receiptno}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Document Upload Section */}
                        <div className="pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FontAwesomeIcon icon={faFileUpload} className="mr-3 text-blue-600" />
                                Document Upload
                            </h2>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FontAwesomeIcon icon={faFileUpload} className="mr-2 text-blue-500" />
                                    Fee Receipt (PDF/Image)
                                </label>
                                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                                    errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                }`}>
                                    <FontAwesomeIcon icon={faFileUpload} className="text-4xl text-gray-400 mb-4" />
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={updatedata}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        className="hidden"
                                        id="file-upload"
                                        disabled={isLoading}
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <span className="text-blue-600 font-medium hover:text-blue-700">
                                            Click to upload
                                        </span>
                                        <span className="text-gray-500"> or drag and drop</span>
                                    </label>
                                    <p className="text-sm text-gray-500 mt-2">
                                        PDF, PNG, JPG up to 10MB
                                    </p>
                                    {data.file && (
                                        <p className="text-sm text-green-600 mt-2 font-medium">
                                            Selected: {data.file.name}
                                        </p>
                                    )}
                                </div>
                                {errors.file && (
                                    <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                                )}
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
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                        <span>Submit Registration</span>
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
