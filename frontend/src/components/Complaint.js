import React, { useState } from 'react';
import { toast } from 'react-toastify';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

function ComplaintForm() {
  const initialFormData = {
    name: '',
    email: '',
    complaintdesc: '',
    phone:'',
    type:''
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // Handle form submission here
    try {
      // const formdata = new FormData();
      // formdata.append("name", formData.name);
      // formdata.append("email", formData.email);
      // formdata.append("complaint", formData.complaint);
      // formdata.append("phone", formData.phone);
      // const formDataJSON = {};
      // formdata.forEach((value, key) => {
      //   formDataJSON[key] = value;
      // });
      const response = await fetch(`${apiUrl}/hostel/complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Specify that the content type is JSON
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
     
        // console.log("Complaint submitted successfully!");
        setFormData(initialFormData);
        toast.success("Complaint sent")
      
      } else {
        toast.error("Oops! Error, Try Again")
        // console.error("Error submitting complaint"); 
        
      }
    } catch (error) {
      toast.error("Oops! Error, Try Again")
      console.error("Error submitting complaint", error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <form className="max-w-sm py-10 mx-auto flex flex-col" onSubmit={handleSubmit}>
     <h2 className="text-3xl font-bold text-center mb-6">Write  Complaint</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <label className="block mb-2 text-sm font-medium text-gray-900">Select Complaint Type</label>
        <select name="type"
          value={formData.type}
          onChange={handleChange}
          className="text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50  text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        >
          <option disabled  value="">Select Type</option>
          <option value="CIVIL">CIVIL</option>
          <option value="WIFI">WIFI</option>
          <option value="ELECTRICAL">ELECTRICAL</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="complaint" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complaint</label>
        <textarea
          id="complaint"
          name="complaintdesc"
          rows="4"
          value={formData.complaintdesc}
          onChange={handleChange}
          className="mt-1 block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your complaint..."
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="self-center w-40 py-2.5 px-4 text-sm text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit Complaint
      </button>
    </form>
  );
}

export default ComplaintForm;
