import { Users, CheckSquare, Unlock } from "lucide-react";

export default function GartnerReviews() {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white py-10 px-6 relative overflow-hidden">
      {/* Decorative Elements */}
    
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
            <Users className="w-4 h-4 mr-2" />
            Trusted by 770,000+ Professionals
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Verified Technology Ratings & <span className="text-[#265ba3]">Reviews</span>
          </h1>
          <p className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
            Unlock trusted insights from real users to confidently make informed technology decisions with peer-reviewed feedback and expert reviews.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card Template */}
          {[
            {
              icon: <Unlock className="w-8 h-8 text-[#265ba3]" />,
              title: "Actionable Insights for Technology Decisions",
              desc: "Gain real-time access to peer insights and explore detailed market trends in innovative technologies to keep your business ahead of the curve.",
            },
            {
              icon: <CheckSquare className="w-8 h-8 text-[#265ba3]" />,
              title: "Compare Technology Solutions Effectively",
              desc: "Use verified peer ratings, detailed reviews, and in-depth comparison reports to evaluate and choose the best software vendors and products.",
            },
            {
              icon: <Users className="w-8 h-8 text-[#265ba3]" />,
              title: "Reliable Peer Reviews & Ratings",
              desc: "Access user feedback directly from trusted sources to help you make well-informed tech decisions with confidence.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 text-center border border-gray-200 relative overflow-hidden group 
              hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
              flex flex-col h-full"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center 
                  bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 shadow-sm 
                  group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300"
                >
                  {card.icon}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {card.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed flex-grow">
                {card.desc}
              </p>
              
              {/* CTA Button */}
              <button className="mt-6 w-full py-3 bg-[#265ba3] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
                Learn More
              </button>
            </div>
          ))}
        </div>
        
      
      </div>
    </div>
  );
}