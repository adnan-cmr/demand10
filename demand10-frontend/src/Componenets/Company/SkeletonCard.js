import React from 'react';

const SkeletonCard = () => {
  return (
    <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="p-6">
        {/* Header section with logo and basic info */}
        <div className="flex items-start gap-4 mb-4">
          {/* Company Logo */}
          <div className="w-16 h-16 rounded-xl bg-gray-200 flex-shrink-0"></div>
          
          {/* Company Name and Details */}
          <div className="flex-1 min-w-0">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
        
        {/* Description */}
        <div className="space-y-2 mb-5">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        {/* Company Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
          <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
        </div>
      </div>
    </article>
  );
};

export default SkeletonCard;