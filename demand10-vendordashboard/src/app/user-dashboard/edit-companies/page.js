"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserClaims } from '@/services/userApi';
import CompanyEditForm from '@/Componenets/UserDashboard/CompanyEditForm';



export default function EditCompanies() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanySlug, setSelectedCompanySlug] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const claimsData = await getUserClaims();
        if (claimsData.ok) {
          // Filter only approved claims
          const approvedClaims = claimsData.claims.filter(claim => claim.status === 'approved');
          setClaims(approvedClaims);
        }
      } catch (error) {
        console.error('Error fetching claims:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const handleEditCompany = (slug) => {
    setSelectedCompanySlug(slug);
  };

const handleBackToList = () => {
    setSelectedCompanySlug(null);
  };

  // Skeleton Card Component for Company Claims
  
  const SkeletonCompanyCard = () => (
    <div className="border border-gray-200 rounded-lg p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </div>
      
      <div className="mb-6">
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
      </div>
      
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );

  // If a company is selected, show the edit form directly
  if (selectedCompanySlug) {
    return <CompanyEditForm slug={selectedCompanySlug} onBack={handleBackToList} />;
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
        
        {/* Company Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <SkeletonCompanyCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (claims.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Companies</h2>
        <div className="text-center py-12">
          <p className="text-gray-500">You don{`'`}t have any approved company claims yet.</p>
          <button 
            onClick={() => router.push('/user-dashboard')}
            className="mt-4 bg-[#265ba3]  text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Your Companies</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {claims.map((claim) => (
          <div key={claim._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{claim.companyName}</h3>
                <p className="text-sm text-gray-500 mt-1">Claim approved</p>
              </div>
              <span className="bg-[#265ba3] text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                Approved
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 line-clamp-2">{claim.issue}</p>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => handleEditCompany(claim.company.slug)}
                className="w-full bg-[#265ba3]  text-white py-2 rounded-lg transition-colors"
              >
                Edit Company
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}