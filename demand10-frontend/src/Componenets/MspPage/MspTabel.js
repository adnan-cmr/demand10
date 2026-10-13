'use client'
import Image from 'next/image';
import { useState } from 'react';
const companies = [
  {
    name: "Axia Technology Partners",
    employees: 36,
    description: "Axia Technology Partners (AxiaTP) is an IT services and consulting firm based in Zionsville, Indiana, with a presence in Indianapolis. Established in 2008, the company employs around 47 professionals and focuses on providing secure, compliance-driven technology solutions to businesses across the Midwest.",
    foundedYear: 2008,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68663e7a8e744c0001acb1fc/picture"
  },
  {
    name: "Creospark",
    employees: 46,
    description: "Creospark is an IT consulting and services firm located in Ontario, Canada. The company specializes in business transformation through cloud solutions and hybrid workplace enablement.",
    foundedYear: 2018,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a733acedffdf0001ef660d/picture"
  },
  {
    name: "V2 Systems, Managed IT Services",
    employees: 21,
    description: "V2 Systems is an IT services firm based in Manassas Park, Virginia, with additional locations in Tyson's Corner, Bethesda, and Washington, D.C. Established in 1995.",
    foundedYear: 1995,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a6bf2e46cfa700012411b1/picture"
  },
  {
    name: "Systech MSP",
    employees: 42,
    description: "Systech MSP is a managed IT service provider based in Brooklyn, New York, established in 2014. The company focuses on delivering comprehensive IT solutions to small and medium-sized businesses across various sectors.",
    foundedYear: 2014,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/689e199bd48b9000010d880c/picture"
  },
  {
    name: "NuMSP",
    employees: 34,
    description: "NuMSP is a managed service provider that delivers comprehensive IT solutions to businesses, focusing on enhancing performance and ensuring operational efficiency and security.",
    foundedYear: 2018,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a1909bb2e2e2000167dc9e/picture"
  },
  {
    name: "Apex Technology Corporation",
    employees: 35,
    description: "Apex Technology Corporation, located in the Charlotte-metro area, is a prominent Managed IT Service Provider. The company focuses on delivering full-service, flat-rate managed IT services.",
    foundedYear: 1998,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a2b8a1b89a6200019d4d67/picture"
  },
  {
    name: "Corserva",
    employees: 47,
    description: "Corserva, Inc. is a managed IT services provider and cloud/colocation specialist based in Trumbull, Connecticut, with an additional data center in Orlando, Florida.",
    foundedYear: 1985,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/689f1daf73bcb50001ff4c2e/picture"
  },
  {
    name: "Zenotis Group",
    employees: 27,
    description: "Zenotis Group is a talent acquisition company with a strong presence in the United States, Canada, and India. It specializes in staffing and recruitment services across various sectors.",
    foundedYear: null,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a4ae1a90ef7e0001e1602b/picture"
  },
  {
    name: "CentraComm",
    employees: 45,
    description: "CentraComm Communications, LLC is a managed IT service provider based in Ohio, focusing on cybersecurity and network infrastructure solutions.",
    foundedYear: 2001,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/689471f4214e9000015519a6/picture"
  },
  {
    name: "Alliance InfoSystems, LLC",
    employees: 49,
    description: "Alliance InfoSystems, LLC, founded in 2004 and based in Cockeysville, Maryland, is a prominent provider of information technology management and security services across the United States.",
    foundedYear: 2004,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a2f8420b6df8000137b712/picture"
  },
  {
    // panding
    name: "ThrottleNet, Inc.",
    employees: 43,
    description: "ThrottleNet, Inc. is a managed IT services provider based in St. Louis, specializing in IT support, cybersecurity, and technology solutions for businesses.",
    foundedYear: 2000,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a0db01ae65360001026377/picture"
  },
  {
    name: "Simple Helix",
    employees: 28,
    description: "Simple Helix is an IT services provider based in Huntsville, Alabama, established in 2007. Originally focused on web hosting for e-commerce, the company shifted its focus in 2016 to offer comprehensive IT solutions.",
    foundedYear: 2007,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a5a7ff0ef090000136faf4/picture"
  },
  {
    name: "MonoSpear Technologies",
    employees: 37,
    description: "MonoSpear Technologies LLC is a provider of IT solutions, focusing on digital transformation, application development, and managed services.",
    foundedYear: 2018,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/689fd29471854c0001fa7986/picture"
  },
  {
    name: "TWE Solutions Inc.",
    employees: 45,
    description: "TWE Solutions Inc. is a prominent provider of IT and cybersecurity services, focusing on aligning technology with business goals.",
    foundedYear: 2014,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a5cd857807350001471c26/picture"
  },
  {
    name: "CenterGrid",
    employees: 37,
    description: "CenterGrid is a managed IT services and cloud infrastructure provider based in Hamilton, Ohio.",
    foundedYear: 2009,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a4854562d1660001aa8e8d/picture"
  },
  {
    name: "LATG",
    employees: 43,
    description: "LATG, Inc., also known as Louisiana Technology Group, is a technology solutions company based in New Orleans, founded in 1999.",
    foundedYear: 1999,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a543738705ce000199025c/picture"
  },
  {
    name: "WEBIT Services, Inc.",
    employees: 42,
    description: "WEBIT Services, Inc. is an IT services and consulting company located in Naperville, Illinois.",
    foundedYear: 1996,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a4d5315f70810001cce1d0/picture"
  },
  {
    name: "GDK Services LLC",
    employees: 41,
    description: "GDK Services™ is a leader in staffing solutions and technology-enabled services, with over ten years of industry experience.",
    foundedYear: 2015,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/68a5ca6d621e200001bec0aa/picture"
  },
  {
    name: "Framework IT",
    employees: 37,
    description: "Framework IT is a managed IT services provider located in Chicago, Illinois. Established in 2008.",
    foundedYear: 2008,
    logoUrl: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/689b216a92da2d00017acab6/picture"
  }
];

export default function ManagedServiceProviders() {
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const showMoreCompanies = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter companies based on search term
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort companies based on sortConfig
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Get the companies to display
  const companiesToDisplay = sortedCompanies.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#314158] mb-4">
            Top Managed Service Providers 2025
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Compare leading MSPs based on services, expertise, client size, and industry partnerships. 
            Find the perfect technology partner for your business IT needs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search managed service providers..."
              className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-[#314158] focus:ring-0 transition-all duration-300 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#314158]">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-[#253347] transition-colors duration-200"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Managed Service Provider
                      {sortConfig.key === 'name' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    MSP Services & Specializations
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-[#253347] transition-colors duration-200"
                    onClick={() => handleSort('employees')}
                  >
                    <div className="flex items-center">
                      Team Size
                      {sortConfig.key === 'employees' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-[#253347] transition-colors duration-200"
                    onClick={() => handleSort('foundedYear')}
                  >
                    <div className="flex items-center">
                      Est.
                      {sortConfig.key === 'foundedYear' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {companiesToDisplay.map((company, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 bg-white rounded-md border border-gray-200 p-1 shadow-sm">
                          <Image
                          width={100}
                          height={100}
                            className="h-10 w-10 object-contain" 
                            src={company.logoUrl} 
                            alt={company.name}
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwIiB5PSIyMCIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzY4Njg2OCI+TlAvTDwvdGV4dD4KPC9zdmc+';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{company.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-gray-700 max-w-md">{company.description}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {company.description.toLowerCase().includes('cloud') && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Cloud Solutions
                          </span>
                        )}
                        {company.description.toLowerCase().includes('security') || company.description.toLowerCase().includes('cyber') ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Cybersecurity
                          </span>
                        ) : null}
                        {company.description.toLowerCase().includes('managed') && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Managed IT
                          </span>
                        )}
                        {company.description.toLowerCase().includes('compliance') && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Compliance
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{company.employees}</div>
                      <div className="text-xs text-gray-500">IT professionals</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{company.foundedYear || 'N/A'}</div>
                      {company.foundedYear && (
                        <div className="text-xs text-gray-500">{new Date().getFullYear() - company.foundedYear} years experience</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {visibleCount < filteredCompanies.length && (
          <div className="mt-8 text-center">
            <button 
              onClick={showMoreCompanies}
              className="bg-[#314158] hover:bg-[#253347] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
            >
              Load More MSPs
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        )}

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow mt-6 border border-gray-200">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No MSPs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search term to find more managed service providers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}