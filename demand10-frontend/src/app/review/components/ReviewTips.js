import { FaFileAlt, FaBalanceScale, FaList, FaShieldAlt } from 'react-icons/fa';

export default function ReviewTips() {
  const tips = [
    {
      id: 1,
      title: "Be Specific",
      description: "Include details about your experience, project scope, and outcomes. Specific examples make reviews more valuable and help others understand the context better.",
      icon: <FaFileAlt className="h-6 w-6" />
    },
    {
      id: 2,
      title: "Stay Objective",
      description: "Focus on facts and your actual experience rather than emotions. Balance positive and negative aspects to provide a fair assessment.",
      icon: <FaBalanceScale className="h-6 w-6" />
    },
    {
      id: 3,
      title: "Include Key Details",
      description: "Mention project timeline, budget, communication quality, and any challenges faced during the engagement for a comprehensive review.",
      icon: <FaList className="h-6 w-6" />
    },
    {
      id: 4,
      title: "Be Honest",
      description: "Provide truthful feedback based on your experience. Honest reviews help both businesses improve and future clients make informed decisions.",
      icon: <FaShieldAlt className="h-6 w-6" />
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] rounded-3xl p-8 md:p-12 border border-gray-200 relative overflow-hidden">
      

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Writing Guidelines
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Tips for Writing a <span className="text-[#265ba3]">Helpful</span> Review
          </h2>
          <p className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
            Follow these guidelines to create meaningful reviews that benefit the entire community and help businesses improve their services.
          </p>
        </div>
        
        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div 
              key={tip.id} 
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="flex items-start">
                {/* Icon Container */}
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mr-5 shadow-sm 
                  group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300 flex-shrink-0">
                  <div className="text-[#265ba3]">
                    {tip.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
              
              {/* Number Badge */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[#265ba3] font-bold text-sm">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:from-[#1e4a86] hover:to-[#1a365d] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
            Write Your Review Now
          </button>
          <p className="mt-4 text-gray-600">
            Your thoughtful review can make a real difference in someone else&apos;s decision.
          </p>
        </div>
      </div>
    </div>
  );
}