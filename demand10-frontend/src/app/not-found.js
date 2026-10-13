import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-[#1a365d] bg-opacity-10 rounded-full p-6">
            <svg className="h-24 w-24 text-[#1a365d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.334M12 3v12m0 0l-3-3m3 3l3-3" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you{`'`}re looking for doesn{`'`}t exist or has been moved. Let{`'`}s get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#1a365d] hover:bg-[#1a365d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d] shadow-md hover:shadow-lg transition-all duration-200 text-center"
          >
            Back to Home
          </Link>
          
          <Link 
            href="/contact" 
            className="px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d] shadow-sm hover:shadow transition-all duration-200 text-center"
          >
            Contact Support
          </Link>
        </div>
        
      </div>
    </div>
  );
}