import React, { useState } from 'react';
import { json } from 'react-router-dom';

function ApplicationForm() {
  const initialFormData={
    rollno:'',
    subject: '',
    name: '',
    email: '',
    message: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission here
    try {
      const formdata = new FormData();
      formdata.append("rollno", formData.rollno);
      formdata.append("email", formData.email);
      formdata.append("name", formData.name);
      formdata.append("subject", formData.subject);
      formdata.append("message", formData.message);
     

      // const formDataJSONString = JSON.stringify(Object.fromEntries(formData));
      // const formDataJSON = JSON.parse(formDataJSONString);
      const formDataJSON = {};
formdata.forEach((value, key) => {
  formDataJSON[key] = value;
});
      const response = await fetch("http://localhost:8000/academic/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Specify that the content type is JSON
        },
        body: JSON.stringify(formDataJSON) // Convert JSON object to string
      });
      
      if (response.ok) {
        console.log("File uploaded successfully!");
        setFormData(initialFormData);
        // You can handle success here (e.g., show a success message)
      } else {
        console.error("Error uploading file"); 
        // Handle the error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error uploading file", error);
      // Handle the error (e.g., show an error message)
    }
};


    // You can send the formData to your backend API for processing

 
  return (
    <form className="max-w-sm py-10 mx-auto flex flex-col" onSubmit={handleSubmit}>
     <h2 className="text-3xl font-bold text-center mb-6">Write your application</h2>
      <div className="mb-4">
        <label htmlFor="rollno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Roll no</label>
        <input type="text" id="rollno" name="rollno" value={formData.rollno} onChange={handleChange} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter rollno" />
      </div>
      <div className="mb-4">
        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter subject" />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Message</label>
        <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your message..."></textarea>
      </div>
      <button type="submit" className="self-center w-40 py-2.5 px-4 text-sm text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit Application</button>
    </form>
  );
}

export default ApplicationForm;
