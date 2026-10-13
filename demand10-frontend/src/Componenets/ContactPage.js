"use client";
import React, { useState } from "react";
import { Mail, Phone, MessageCircle, User, Building, Send } from "lucide-react";
import { DataSetRequest } from "@/services/api";
import { toast } from "react-toastify";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const ContactPage = () => {
 const [fullName, setFullName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [message, setMessage] = useState("");
   const [isLoading, setIsLoading] = useState(false);
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     setIsLoading(true);
 
     const data = {
       fullName,
       email,
       phone,
       message,
     };
 
     try {
       const response = await DataSetRequest(data);
 
       if (response.ok) {  
         toast.success("Successfully submitted!");
         setFullName("");
         setEmail("");
         setPhone("");
         setMessage("");
       } else {
         toast.error("Failed to submit form.");
       } 
     } catch (error) {
       console.error("Error:", error);
       toast.error("An error occurred. Please try again.");
     } finally {
       setIsLoading(false);
     }
   };

  return (
    <div>
  {/* Hero Section */}
  <section className="relative bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] overflow-hidden min-h-[70vh] flex items-center">
 
    {/* Main Content */}
    <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                Get In <span className="text-white/90">Touch</span>
              </h1>
              <div className="w-20 h-1 bg-white/80 mx-auto lg:mx-0 rounded-full mb-6"></div>
              <h4 className="text-xl sm:text-2xl text-white/90 font-light">
                with Demand10
              </h4>
            </div>
            {/* Description */}
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              We&apos;re here to assist you with all your IT and cybersecurity needs. Whether you&apos;re seeking a reliable Managed Service Provider (MSP) or a robust Managed Security Service Provider (MSSP), our team is ready to help you navigate the complexities of modern technology.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="flex items-center justify-center px-8 py-4 bg-[#265ba3] text-white font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Conversation
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#314158] transition-all duration-300">
                View Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  {/* Contact Form Section */}
  <div className="min-h-screen bg-white">
      {/* Contact Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Section - Support Info */}
          <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-2xl p-8 shadow-lg text-white">
            <h2 className="text-3xl font-bold mb-8">
              We&apos;re Here To Support You Always!
            </h2>

            <div className="space-y-6">
              {/* Phone */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center space-x-4 border border-white/20">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FaPhone className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-1">Need Help!</h3>
                  <p className="text-white text-xl font-semibold">+971 56 229 4858</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center space-x-4 border border-white/20">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FaEnvelope className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-1">E-Mail</h3>
                  <p className="text-white text-xl font-semibold">support@demand10.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-start space-x-4 border border-white/20">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">Location</h3>
                  <p className="text-white text-lg font-semibold leading-relaxed">
                    Office: #304, Goldcrest Executive, Cluster C, JLT, Dubai, UAE
                  </p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="mt-8">
              <h3 className="font-semibold text-white text-xl mb-4">Follow Us:</h3>
              <div className="flex space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/20 transition group">
                  <FaFacebookF className="text-white group-hover:text-white transition" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/20 transition group">
                  <FaInstagram className="text-white group-hover:text-white transition" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/20 transition group">
                  <FaLinkedinIn className="text-white group-hover:text-white transition" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-white">
            <h2 className="text-4xl font-bold mb-2 text-gray-900">
              Get in <span className="text-[#314158]">touch</span> with us
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Have questions or need assistance? Our team is here to help! Send us a message, and we&apos;ll respond promptly to assist you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-[#314158]" />
                  Full Name <span className="text-[#314158] ml-1">●</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-4 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#314158] focus:border-transparent placeholder-gray-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#314158]" />
                  E-Mail Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-4 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#314158] focus:border-transparent placeholder-gray-500"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#314158]" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full p-4 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#314158] focus:border-transparent placeholder-gray-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="6"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full p-4 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#314158] focus:border-transparent placeholder-gray-500 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#265ba3] text-white font-semibold py-4 px-8 rounded-lg hover:from-[#253347] hover:to-[#1a2533] transition text-lg shadow-md flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
</div>
  );
};

export default ContactPage;