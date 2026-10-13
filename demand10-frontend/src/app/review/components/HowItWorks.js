import { FaSearch, FaUserLock, FaStar } from 'react-icons/fa';

export default function HowItWorks() {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white py-10 px-6 relative overflow-hidden rounded-3xl shadow-lg">
    
      
      <div className="absolute bottom-0 right-0 w-72 h-72">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full opacity-5"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#265ba3"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="#265ba3"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            How It <span className="text-[#265ba3]">Works</span>
          </h2>
          <p className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
            Writing a review is simple and straightforward. Follow these easy steps to share your experience and help others make informed decisions.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 relative overflow-hidden group 
            hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
            flex flex-col h-full">
            {/* Step Number */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] flex items-center justify-center text-white font-bold text-xl shadow-lg">
              1
            </div>
            
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center 
                bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                <FaSearch className="text-[#265ba3] text-3xl" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Search Company
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed flex-grow">
              Find the company you want to review using our search feature. Browse through categories or directly search by name.
            </p>
            
            {/* CTA */}
            <div className="mt-6">
              <div className="inline-flex items-center text-[#265ba3] font-medium">
                Get Started
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 relative overflow-hidden group 
            hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
            flex flex-col h-full">
            {/* Step Number */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] flex items-center justify-center text-white font-bold text-xl shadow-lg">
              2
            </div>
            
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center 
                bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                <FaUserLock className="text-[#265ba3] text-3xl" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Sign In
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed flex-grow">
              Authenticate to verify your identity and prevent spam reviews. Your information is secure with us.
            </p>
            
            {/* CTA */}
            <div className="mt-6">
              <div className="inline-flex items-center text-[#265ba3] font-medium">
                Secure Process
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 relative overflow-hidden group 
            hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
            flex flex-col h-full">
            {/* Step Number */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] flex items-center justify-center text-white font-bold text-xl shadow-lg">
              3
            </div>
            
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center 
                bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                <FaStar className="text-[#265ba3] text-3xl" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Write Review
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed flex-grow">
              Share your detailed experience with the company you worked with. Your review helps others make better decisions.
            </p>
            
            {/* CTA */}
            <div className="mt-6">
              <div className="inline-flex items-center text-[#265ba3] font-medium">
                Share Experience
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:from-[#1e4a86] hover:to-[#1a365d]   text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
            Start Writing Your Review
          </button>
          <p className="mt-4 text-gray-600">
            Your review can make a difference. Join our community of 770,000+ professionals.
          </p>
        </div>
      </div>
    </div>
  );
}