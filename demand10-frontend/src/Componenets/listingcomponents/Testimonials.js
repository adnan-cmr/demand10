'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Testimonials() {
  // State for testimonial carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Sample testimonial data (5 testimonials)
  const testimonials = [
    {
      id: 1,
      name: "Steven Gabbard",
      role: "Founder",
      content: "Demand10 listed our product, increasing our visibility and lead generation, resulting in more customers.",
      rating: 5,
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-13/feg4FpDyKX.png"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Marketing Director",
      content: "The platform helped us reach our target audience effectively. Our conversion rates improved by 40% in just three months.",
      rating: 5,
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-13/feg4FpDyKX.png"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "CTO",
      content: "As a tech company, we needed a platform that understood our industry. Demand10 delivered beyond expectations.",
      rating: 5,
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-13/feg4FpDyKX.png"
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      role: "Product Manager",
      content: "The detailed analytics and customer insights we gained helped us refine our product strategy significantly.",
      rating: 5,
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-13/feg4FpDyKX.png"
    },
    {
      id: 5,
      name: "David Wilson",
      role: "CEO",
      content: "Our partnership with Demand10 has been transformative for our business growth and market expansion.",
      rating: 5,
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-13/feg4FpDyKX.png"
    }
  ];

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Navigation functions for testimonials
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Handle dot indicator click
  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center mb-7">
        <h2 className="text-2xl font-bold text-[#1a365d] mb-1">
          Hear From Our Customers
        </h2>
        <p className="text-[#0249aa] mb-4">Discover how we&apos;ve helped businesses grow</p>
      </div>

      {/* Testimonial Carousel */}
      <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        {/* Navigation Arrows */}
        <button 
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1a365d] shadow-lg flex items-center justify-center text-white hover:bg-[#0249aa] transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d]"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1a365d] shadow-lg flex items-center justify-center text-white hover:bg-[#0249aa] transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d]"
          aria-label="Next testimonial"
        >
          <FaChevronRight />
        </button>

        {/* Testimonial Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#1a365d] shadow-lg">
              <Image
              height={100}
              width={100}
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-2">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-lg" />
              ))}
            </div>
            <h3 className="text-xl font-bold text-[#1a365d] mb-1">
              {testimonials[currentTestimonial].name}
            </h3>
            <p className="text-[#0249aa] font-medium mb-3">
              {testimonials[currentTestimonial].role}
            </p>
            <p className="text-[#1a365d] italic text-lg">
              &quot;{testimonials[currentTestimonial].content}&quot;
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-lg font-bold text-[#0249aa]">
                {testimonials[currentTestimonial].company || "Demand10"}
              </h4>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d] ${
                index === currentTestimonial
                  ? 'bg-[#1a365d] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Skeleton component for loading state
export function TestimonialsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center mb-7">
        <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
      </div>

      <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        {/* Navigation Arrows - Skeleton */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>

        {/* Testimonial Content - Skeleton */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image - Skeleton */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
          
          {/* Content - Skeleton */}
          <div className="flex-1">
            <div className="flex justify-center md:justify-start mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Dot Indicators - Skeleton */}
        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-3 h-3 rounded-full bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}