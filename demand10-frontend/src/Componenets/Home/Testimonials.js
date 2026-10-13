'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      text: "SaaSworthy transformed how we evaluate software solutions. Their comprehensive scoring system and detailed analysis saved us countless hours of research. The platform is intuitive and the information is presented in a way that made our decision-making process much easier.",
      author: "Sarah Johnson",
      role: "CTO, TechSolutions Inc.",
      image: "/sarah-johnson.jpg"
    },
    {
      id: 2,
      text: "As a business leader, I needed a tool that could deliver actionable insights quickly. SaaSworthy exceeded my expectations with their detailed software comparisons and industry benchmarks. We've made better purchasing decisions and saved significantly on software costs.",
      author: "Michael Chen",
      role: "Operations Director, GrowthCorp",
      image: "/michael-chen.jpg"
    },
    {
      id: 3,
      text: "The depth of analysis provided by SaaSworthy is unmatched in the industry. Their team clearly understands the challenges businesses face when selecting software. Since using their platform, our team productivity has increased significantly due to better software choices.",
      author: "Emma Rodriguez",
      role: "Product Manager, InnovateX",
      image: "/emma-rodriguez.jpg"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Manual navigation functions
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-white px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#265ba3] mb-4">What Our Users Say</h2>
          <p className="text-lg text-black max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Hear from businesses that have transformed their decision-making process.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#265ba3]"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#265ba3]/5"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[#265ba3]/5"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            {/* Author Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] flex items-center justify-center">
                    <span className="text-white text-5xl font-bold">{testimonials[currentSlide].author.charAt(0)}</span>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d]  text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="relative mb-8">
                <svg className="absolute -top-8 -left-4 w-20 h-20 text-[#265ba3]/10 transform -rotate-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-black text-xl leading-relaxed italic relative z-10">
                  &quot;{testimonials[currentSlide].text}&quot;
                </p>
              </div>
              
              <div className="mt-6">
                <h3 className="font-bold text-black text-2xl mb-1">
                  {testimonials[currentSlide].author}
                </h3>
                <p className="text-[#265ba3] font-semibold text-lg">
                  {testimonials[currentSlide].role}
                </p>
                
                <div className="flex justify-center lg:justify-start mt-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-[#265ba3]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-6">
          {/* Dots */}
          <div className="flex space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-[#265ba3] w-10' 
                    : 'bg-gray-300 hover:bg-[#f59e0b]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex space-x-4">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white shadow-md  focus:outline-none transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-black  transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white shadow-md  focus:outline-none transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-black  transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-black mb-4">Ready to make informed business decisions?</h3>
          <p className="text-black mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust us to connect with the right service providers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <button className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d]  text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                Get Started Free
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white border-2 border-[#265ba3] text-[#265ba3] hover:bg-[#265ba3] hover:text-white hover:border-[#265ba3] font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;