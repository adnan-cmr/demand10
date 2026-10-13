"use client";

import React, { useState } from 'react';
import { DataSetRequest } from "@/services/api";
import { toast } from "react-toastify";

const MspForm = ({ city = 'Miami', employeeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" }
] }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companySize: '',
    city: city,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add note that this is from the specific city page
    const formDataWithNote = {
      fullName: formData.name,
      email: formData.email,
      companySize: formData.companySize,
      city: formData.city,
      message: `[${formData.city} Page Form Submission] Company Size: ${formData.companySize}\n\n${formData.message}`
    };
    
    try {
      const response = await DataSetRequest(formDataWithNote);
      
      if (response.ok) {
        toast.success(`Thank you! We will send you ${formData.city} MSP recommendations shortly.`);
        setFormData({ name: '', email: '', companySize: '', city: city, message: '' });
      } else {
        // Log more detailed error information
        const errorText = await response.text();
        console.error('Form submission failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
        toast.error(`There was an error submitting your form. Please try again.`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(`There was an error submitting your form. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-form" className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 mb-8 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-[#265ba3] pl-2">Get Free MSP Recommendations</h3>
      <p className="text-gray-700 mb-6">
        Tell us about your business and we&apos;ll match you with top-rated managed service providers in {city}.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <span className="w-2 h-2 bg-[#265ba3] rounded-full mr-2"></span>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-transparent transition-all"
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <span className="w-2 h-2 bg-[#265ba3] rounded-full mr-2"></span>
            Business Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-transparent transition-all"
            placeholder="Enter your business email"
            required
          />
        </div>
        
        <div>
          <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <span className="w-2 h-2 bg-[#265ba3] rounded-full mr-2"></span>
            Company Size
          </label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-transparent transition-all"
            required
          >
            <option value="">Select company size</option>
            {employeeOptions.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <span className="w-2 h-2 bg-[#265ba3] rounded-full mr-2"></span>
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-transparent transition-all"
            required
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <span className="w-2 h-2 bg-[#265ba3] rounded-full mr-2"></span>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-transparent transition-all"
            placeholder="Tell us about your specific IT needs or questions..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-bold py-3 rounded-lg shadow-md hover:from-[#1e4a86] hover:to-[#265ba3] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Get All List'
          )}
        </button>
      </form>
    </div>
  );
};

export default MspForm;