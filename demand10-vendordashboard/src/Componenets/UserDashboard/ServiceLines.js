'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ServiceLines = ({ services = [], onServicesChange = () => {} }) => {
  // Service categories and services data
  const serviceCategories = useMemo(() => [
    {
      id: 'web-development',
      name: 'Web Development',
      services: [
        { id: 'frontend', name: 'Frontend Development' },
        { id: 'backend', name: 'Backend Development' },
        { id: 'fullstack', name: 'Full Stack Development' },
        { id: 'ecommerce', name: 'E-commerce Development' },
        { id: 'cms', name: 'CMS Development' }
      ]
    },
    {
      id: 'mobile-apps',
      name: 'Mobile App Development',
      services: [
        { id: 'ios', name: 'iOS App Development' },
        { id: 'android', name: 'Android App Development' },
        { id: 'cross-platform', name: 'Cross-platform Development' },
        { id: 'react-native', name: 'React Native' },
        { id: 'flutter', name: 'Flutter' }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      services: [
        { id: 'seo', name: 'SEO' },
        { id: 'sem', name: 'SEM' },
        { id: 'social-media', name: 'Social Media Marketing' },
        { id: 'content-marketing', name: 'Content Marketing' },
        { id: 'email-marketing', name: 'Email Marketing' }
      ]
    },
    {
      id: 'design',
      name: 'Design',
      services: [
        { id: 'ui-ux', name: 'UI/UX Design' },
        { id: 'graphic', name: 'Graphic Design' },
        { id: 'branding', name: 'Branding' },
        { id: 'web-design', name: 'Web Design' },
        { id: 'app-design', name: 'App Design' }
      ]
    },
    {
      id: 'it-support',
      name: 'IT Support',
      services: [
        { id: 'helpdesk', name: 'Helpdesk Support' },
        { id: 'network', name: 'Network Support' },
        { id: 'cloud', name: 'Cloud Support' },
        { id: 'security', name: 'Security Support' },
        { id: 'database', name: 'Database Support' }
      ]
    }
  ], []);

  // State for UI interactions
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [servicePercentages, setServicePercentages] = useState({});

  // Initialize service percentages from existing services
  useEffect(() => {
    const initialPercentages = {};
    services.forEach(service => {
      // Find the service in our categories to get the serviceId
      for (const category of serviceCategories) {
        const matchingService = category.services.find(s => s.name === service.serviceName);
        if (matchingService) {
          const serviceId = `${category.id}-${matchingService.id}`;
          initialPercentages[serviceId] = service.percentage;
          break;
        }
      }
    });
    setServicePercentages(initialPercentages);
  }, [services, serviceCategories]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle service percentage change
  const handleServicePercentageChange = (serviceId, categoryName, serviceName, percentage) => {
    // Validate percentage input
    const parsedPercentage = parseInt(percentage) || 0;
    const clampedPercentage = Math.max(0, Math.min(100, parsedPercentage));

    // Update local state immediately for this specific service
    setServicePercentages(prev => ({
      ...prev,
      [serviceId]: clampedPercentage
    }));

    // Update services in parent component with targeted approach
    updateServicesInParent(serviceId, categoryName, serviceName, clampedPercentage);
  };

  // Handle service checkbox toggle
  const toggleService = (serviceId, categoryName, serviceName) => {
    const currentPercentage = servicePercentages[serviceId] || 0;

    if (currentPercentage > 0) {
      // If service is already selected, deselect it
      handleServicePercentageChange(serviceId, categoryName, serviceName, 0);
    } else {
      // If service is not selected, select it with default 10%
      handleServicePercentageChange(serviceId, categoryName, serviceName, 10);
    }
  };

  // Update services in parent component
  const updateServicesInParent = (serviceId, categoryName, serviceName, percentage) => {
    // Create a completely new services array to ensure only the target service is updated
    const updatedServices = services.map(existingService => {
      if (existingService.serviceName === serviceName) {
        // Update only this specific service
        return {
          ...existingService,
          serviceName: serviceName,
          category: categoryName,
          percentage: percentage
        };
      }
      // Keep all other services exactly as they are
      return existingService;
    });

    // If percentage is 0, remove the service completely
    if (percentage === 0) {
      const filteredServices = updatedServices.filter(s => s.serviceName !== serviceName);
      onServicesChange(filteredServices);
    } else {
      // If it's a new service (not found in existing), add it
      const serviceExists = services.some(s => s.serviceName === serviceName);
      if (!serviceExists) {
        const newService = {
          serviceName: serviceName,
          category: categoryName,
          percentage: percentage
        };
        onServicesChange([...services, newService]);
      } else {
        onServicesChange(updatedServices);
      }
    }
  };

  // Calculate total percentage
  const totalPercentage = services.reduce((sum, service) => sum + service.percentage, 0);

  // Prepare chart data
  const chartData = {
    labels: services.map(service => service.serviceName),
    datasets: [
      {
        data: services.map(service => service.percentage),
        backgroundColor: [
          '#0249aa',
          '#0d5fd4',
          '#1a73e8',
          '#4285f4',
          '#669df6',
          '#8ab4f8',
          '#aecbfa',
          '#d2e3fc'
        ],
        borderColor: [
          '#0249aa',
          '#0d5fd4',
          '#1a73e8',
          '#4285f4',
          '#669df6',
          '#8ab4f8',
          '#aecbfa',
          '#d2e3fc'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    }
  };

  return (
    <div className="relative">
      <div className="space-y-6">
        {/* Header with Add Services Button */}
        <div className="bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Service Lines</h3>
              <p className="text-blue-100 text-sm">
                Manage your company&apos;s service offerings and allocate percentages
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSidebar();
              }}
              className="bg-white text-black px-10 py-3 rounded-xl font-semibold  cursor-pointer hover:bg-gray-100 transition-all duration-200  transform hover:scale-105 whitespace-nowrap"
            >
              
              Add Services
            </button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Service Distribution Chart</h4>
          <div className="flex items-center justify-center">
            {services.length > 0 ? (
              <div className="w-full max-w-md h-80">
                <Pie data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className="w-80 h-80 rounded-full border-2 border-dashed border-[#4897de] flex items-center justify-center">
                <div className="text-center text-[#4897de]">
                  <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div className="text-lg font-medium">No Services Selected</div>
                  <div className="text-sm">Choose services to see the chart</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Services Summary */}
        {services.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-[#4897de] rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Selected Services Summary</h4>
            <div className="space-y-3 mb-4">
              {services.map((service, index) => {
                // Find the serviceId for this service
                let serviceId = null;
                let serviceCategory = null;
                
                for (const category of serviceCategories) {
                  const matchingService = category.services.find(s => s.name === service.serviceName);
                  if (matchingService) {
                    serviceId = `${category.id}-${matchingService.id}`;
                    serviceCategory = category;
                    break;
                  }
                }
                
                return (
                  <div key={`${service.serviceName}-${index}`} className="bg-white p-4 rounded-lg flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900">{service.serviceName}</span>
                      <div className="text-xs text-gray-500 mt-1">{service.category}</div>
                    </div>
                            
                    {/* Percentage Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="5"
                          max="100"
                          value={service.percentage}
                          onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (serviceId && serviceCategory) {
                              handleServicePercentageChange(serviceId, serviceCategory.name, service.serviceName, e.target.value);
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="w-24 accent-[#4897de]"
                        />
                          
                        <input
                          type="number"
                          min="5"
                          max="100"
                          value={service.percentage}
                          onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (serviceId && serviceCategory) {
                              handleServicePercentageChange(serviceId, serviceCategory.name, service.serviceName, e.target.value);
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#4897de] focus:border-[#4897de] text-center"
                        />
                          
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                        
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (serviceId && serviceCategory) {
                            handleServicePercentageChange(serviceId, serviceCategory.name, service.serviceName, 0);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors group"
                        title="Remove service"
                      >
                        <svg className="w-4 h-4 text-red-600 group-hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[#4897de] pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total Services: {services.length}</span>
                <span className={`text-lg font-bold ${
                  totalPercentage === 100 ? 'text-green-600' : 
                  totalPercentage > 100 ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  Total: {totalPercentage}%
                </span>
              </div>
              {totalPercentage > 100 && (
                <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">
                    ⚠️ Total exceeds 100% - please reduce some percentages
                  </p>
                </div>
              )}
              {totalPercentage < 100 && services.length > 0 && (
                <div className="mt-2 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                  <p className="text-yellow-700 text-sm font-medium">
                    💡 Total is {100 - totalPercentage}% under 100% - you can increase percentages
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar for Service Selection */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0  bg-opacity-50 z-40"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSidebar();
            }}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-[#265ba3] to-[#1a365d]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Available Services</h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSidebar();
                  }}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-white text-sm mt-2">Select services and set percentages</p>
            </div>

            {/* Sidebar Content */}
            <div className="p-6">
              <div className="space-y-6">
                {serviceCategories.map((category) => (
                  <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-900">{category.name}</h4>
                    </div>
                    <div className="p-4 space-y-4">
                      {category.services.map((service) => {
                        const serviceId = `${category.id}-${service.id}`;
                        const currentPercentage = servicePercentages[serviceId] || 0;
                        const isSelected = currentPercentage > 0;

                        return (
                          <div key={serviceId} className="space-y-3">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                id={`sidebar-${serviceId}`}
                                checked={isSelected}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  toggleService(serviceId, category.name, service.name);
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="w-4 h-4 text-[#4897de] border-gray-300 rounded focus:ring-[#4897de]"
                              />
                              <label htmlFor={`sidebar-${serviceId}`} className="text-sm text-gray-900 cursor-pointer flex-1">
                                {service.name}
                              </label>
                            </div>
                            {isSelected && (
                              <div className="ml-7 space-y-2">
                                <div className="flex items-center gap-3">
                                  <input
                                    type="range"
                                    min="5"
                                    max="100"
                                    value={currentPercentage}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      handleServicePercentageChange(serviceId, category.name, service.name, e.target.value);
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                    className="flex-1 accent-[#4897de]"
                                  />
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="number"
                                      min="5"
                                      max="100"
                                      value={currentPercentage}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        handleServicePercentageChange(serviceId, category.name, service.name, e.target.value);
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                      className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#4897de] focus:border-[#4897de]"
                                    />
                                    <span className="text-sm text-gray-500">%</span>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                  Adjust the percentage for this service
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar Footer with Summary */}
              {services.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Current Selection</h4>
                  <div className="space-y-1 text-sm">
                    {services.map((service, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-700">{service.serviceName}</span>
                        <span className="text-[#4897de] font-medium">{service.percentage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-semibold">
                    <span>Total ({services.length} services)</span>
                    <span className={totalPercentage > 100 ? 'text-red-600' : 'text-gray-900'}>
                      {totalPercentage}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceLines;