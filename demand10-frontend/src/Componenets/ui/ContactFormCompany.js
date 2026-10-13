"use client";
import React, { useState } from "react";
import { User, Mail, Phone, Send } from "react-feather";
import { DataSetRequest } from "@/services/api";
import { toast } from "react-toastify";

const ContactFormCompany = ({ subCategory }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      categoryName: subCategory || "",
    };

    try {
      const response = await DataSetRequest(data);

      if (response.ok) {
        toast.success("Successfully submitted!", {
          style: {
            backgroundColor: '#4897de',
            color: 'white'
          }
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
        setShowPopup(true)
      } else {
        toast.error("Failed to submit form.", {
          style: {
            backgroundColor: '#4897de',
            color: 'white'
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        style: {
          backgroundColor: '#4897de',
          color: 'white'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <div>
     <div className="bg-white/80 backdrop-blur-xl rounded-3xl  border border-white/20 p-8 sticky top-8">
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Your Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full border-2 border-gray-200 rounded-xl focus:ring-2  px-4 py-4 pr-12 text-sm transition-all duration-300 hover:border-gray-300"
              required
            />
            <User className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="w-full border-2 border-gray-200 rounded-xl  px-4 py-4 pr-12 text-sm transition-all duration-300 hover:border-gray-300"
              required
            />
            <Mail className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              className="w-full border-2 border-gray-200 rounded-xl  px-4 py-4 pr-12 text-sm transition-all duration-300 hover:border-gray-300"
              required
            />
            <Phone className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your project or inquiry..."
            rows={4}
            className="w-full   rounded-xl border-2 border-gray-200  resize-none px-4 py-4 text-sm  "
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="group w-full bg-[#314158] text-white cursor-pointer py-4 rounded-xl font-semibold  transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
              Send Message
            </>
          )}
        </button>
      </div>
    </div>
    {showPopup && (
  <div className="fixed inset-0  bg-black/10 bg-opacity-50 flex pt-50 items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6  w-[500px] h-[250px] shadow-lg text-center relative">
      <button
        className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-gray-800"
        onClick={() => setShowPopup(false)}
      >
        ✖
      </button>
      <h2 className="text-2xl font-bold mb-3">🎉 Thanks for submitting!</h2>
      <p className="text-gray-700 mb-4 ">
        Please check your <strong>email</strong> and also your <strong>spam/junk folder</strong>. Make sure to reply to our message to complete the process.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        You’ve shown interest in: <strong>{subCategory}</strong><br />
        We consider you a <span className="text-[#1a365d] font-semibold">trusted lead</span> for this category.
      </p>
      <button
        className="mt-2 bg-[#1a365d] text-white px-6 py-2 cursor-pointer rounded-xl hover:bg-[#3dbcb3] transition"
        onClick={() => setShowPopup(false)}
      >
        Got it!
      </button>
    </div>
  </div>
)}
   </div>

  );
};

export default ContactFormCompany;