import { FaShieldAlt, FaBolt, FaUsers, FaChartBar } from 'react-icons/fa';

export default function WhyReviewMatters() {
  return (
    <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] rounded-3xl p-8 md:p-12 border border-gray-200 relative overflow-hidden">
  
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            Community Impact
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Why Your Review <span className="text-[#265ba3]">Matters</span>
          </h2>
          <p className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
            Your honest feedback helps businesses improve and helps others make informed decisions. Every review contributes to building a stronger, more transparent business community.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1 */}
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 relative overflow-hidden group 
            hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
            flex flex-col h-full">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                <FaShieldAlt className="h-8 w-8 text-[#265ba3]" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Build Trust
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed flex-grow">
              Verified reviews help establish credibility for businesses and create a trustworthy environment for all users.
            </p>
            
            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-2xl font-bold text-[#265ba3]">87%</div>
              <div className="text-sm text-gray-500">of users trust reviews</div>
            </div>
          </div>
          
          {/* Benefit 2 */}
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 relative overflow-hidden group 
            hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
            flex flex-col h-full">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                <FaBolt className="h-8 w-8 text-[#265ba3]" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Drive Growth
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed flex-grow">
              Positive reviews can significantly impact business growth by increasing visibility and attracting new customers.
            </p>
            
            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-2xl font-bold text-[#265ba3]">2x</div>
              <div className="text-sm text-gray-500">more conversions with reviews</div>
            </div>
          </div>
          
          {/* Benefit 3 */}
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 relative overflow-hidden group 
            hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
            flex flex-col h-full">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                <FaUsers className="h-8 w-8 text-[#265ba3]" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Community Impact
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed flex-grow">
              Your review helps build a stronger business community by sharing valuable experiences and insights.
            </p>
            
            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-2xl font-bold text-[#265ba3]">770K+</div>
              <div className="text-sm text-gray-500">community members</div>
            </div>
          </div>
          
          {/* Benefit 4 */}
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 relative overflow-hidden group 
            hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
            flex flex-col h-full">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                <FaChartBar className="h-8 w-8 text-[#265ba3]" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Data Insights
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed flex-grow">
              Reviews provide valuable insights for business improvement and help companies understand customer needs.
            </p>
            
            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-2xl font-bold text-[#265ba3]">92%</div>
              <div className="text-sm text-gray-500">of businesses use feedback</div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:from-[#265ba3] hover:to-[#1a365d] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
            Write a Review Now
          </button>
          <p className="mt-4 text-gray-600">
            Join our community of reviewers and help businesses grow with your valuable feedback.
          </p>
        </div>
      </div>
    </div>
  );
}