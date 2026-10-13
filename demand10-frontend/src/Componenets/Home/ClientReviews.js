import Image from 'next/image';
import Link from 'next/link';

const ReviewSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Decorative SVG Background Elements */}
      {/* Top Left Decorative Element */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 opacity-5">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" fill="#265ba3" fillOpacity="0.1"/>
          <circle cx="200" cy="200" r="160" fill="#265ba3" fillOpacity="0.15"/>
          <circle cx="200" cy="200" r="120" fill="#265ba3" fillOpacity="0.2"/>
          <circle cx="200" cy="200" r="80" fill="#265ba3" fillOpacity="0.25"/>
          <circle cx="200" cy="200" r="40" fill="#265ba3" fillOpacity="0.3"/>
        </svg>
      </div>

      {/* Top Right Decorative Element */}
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 opacity-5">
        <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="125" cy="125" r="125" fill="#265ba3" fillOpacity="0.1"/>
          <circle cx="125" cy="125" r="100" fill="#265ba3" fillOpacity="0.15"/>
          <circle cx="125" cy="125" r="75" fill="#265ba3" fillOpacity="0.2"/>
          <circle cx="125" cy="125" r="50" fill="#265ba3" fillOpacity="0.25"/>
          <circle cx="125" cy="125" r="25" fill="#265ba3" fillOpacity="0.3"/>
        </svg>
      </div>

      {/* Bottom Right Decorative Element */}
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-10">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 0C232.843 0 300 67.157 300 150C300 232.843 232.843 300 150 300C67.157 300 0 232.843 0 150C0 67.157 67.157 0 150 0Z" fill="#265ba3"/>
          <path d="M150 40C210.751 40 260 89.249 260 150C260 210.751 210.751 260 150 260C89.249 260 40 210.751 40 150C40 89.249 89.249 40 150 40Z" fill="#265ba3" fillOpacity="0.8"/>
          <path d="M150 80C183.137 80 210 106.863 210 140C210 173.137 183.137 200 150 200C116.863 200 90 173.137 90 140C90 106.863 116.863 80 150 80Z" fill="#dbeafe"/>
        </svg>
      </div>

      {/* Bottom Left Decorative Element */}
      <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 opacity-5">
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="280" fill="#265ba3" fillOpacity="0.05"/>
          <path d="M0 0L280 280M280 0L0 280" stroke="#265ba3" strokeWidth="2"/>
          <circle cx="140" cy="140" r="80" fill="#265ba3" fillOpacity="0.1"/>
          <circle cx="140" cy="140" r="60" fill="#265ba3" fillOpacity="0.1"/>
          <circle cx="140" cy="140" r="40" fill="#265ba3" fillOpacity="0.1"/>
          <circle cx="140" cy="140" r="20" fill="#265ba3" fillOpacity="0.1"/>
        </svg>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-1/4 right-1/4 opacity-5">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="50" height="50" rx="8" transform="rotate(15 15 15)" fill="#265ba3"/>
        </svg>
      </div>

      <div className="absolute bottom-1/3 left-1/3 opacity-5">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="30,8 52,30 30,52 8,30" fill="#265ba3"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* 5 Star Rating */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-[#265ba3] fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-bold text-[#265ba3] leading-tight">
              Share your experience and make B2B buying more transparent
            </h2>

            {/* Supporting Text */}
            <p className="text-lg text-black leading-relaxed">
              Leave a review of the business partners you&apos;ve worked with over the years. Make your voice heard and help other business leaders make a confident choice.
            </p>

            {/* CTA Button */}
            <Link href='/review'>
              <button className="inline-flex cursor-pointer items-center px-6 py-3 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-semibold rounded-lg  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Write a Review
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </Link>
          </div>

          {/* Right Column - Image with SVG Overlay */}
          <div className="space-y-6 w-full">
            {/* Full-width Handshake Image Container */}
            <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-xl">
              <Image
                width={100}
                height={100}
                src="/images/reviewhero.jpg"
                alt="Business handshake"
                className="object-cover w-full h-full"
              />
              
              {/* Overlay with brand color */}
              <div className="absolute inset-0 bg-[#265ba3]/30"></div>
              
              {/* Decorative SVG Elements */}
              <div className="absolute top-0 right-0 w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white/20">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>
              
              <div className="absolute bottom-0 left-0 w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white/10">
                  <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
                  <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm"></div>
              <div className="absolute bottom-1/3 right-1/3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm"></div>
            </div>
            
            {/* Additional User-friendly Elements */}
            <div className="text-center">
              <p className="text-black font-medium">
                Join 10,000+ businesses sharing their experiences
              </p>
              <div className="flex justify-center mt-3 space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-[#265ba3]/10 flex items-center justify-center">
                    <span className="text-[#265ba3] font-bold text-sm">
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-[#265ba3] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    +9k
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;