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

const FocusLines = ({ focus = [], onFocusChange = () => {} }) => {
  // Focus categories and options data
  const focusCategories = useMemo(() => [
    {
      id: 'application-platforms',
      name: 'Application Platforms',
      options: [
        { id: 'google-app-engine', name: 'Google App Engine' },
        { id: 'linux-server', name: 'Linux Server' },
        { id: 'windows-server', name: 'Windows Server' },
        { id: 'apache-tomcat', name: 'Apache Tomcat' },
        { id: 'nginx', name: 'Nginx' },
        { id: 'microsoft-net', name: '.NET Framework' }
      ]
    },
    {
      id: 'cms-focus',
      name: 'CMS Focus',
      options: [
        { id: 'wordpress', name: 'WordPress CMS' },
        { id: 'adobe-experience', name: 'Adobe Experience Manager' },
        { id: 'drupal', name: 'Drupal' },
        { id: 'joomla', name: 'Joomla' },
        { id: 'magento', name: 'Magento' },
        { id: 'shopify', name: 'Shopify' }
      ]
    },
    {
      id: 'cloud-providers',
      name: 'Cloud Providers',
      options: [
        { id: 'aws', name: 'AWS' },
        { id: 'azure', name: 'Azure' },
        { id: 'gcp', name: 'Google Cloud Platform' },
        { id: 'digital-ocean', name: 'Digital Ocean' },
        { id: 'ibm-cloud', name: 'IBM Cloud' },
        { id: 'oracle-cloud', name: 'Oracle Cloud' }
      ]
    },
    {
      id: 'databases',
      name: 'Databases',
      options: [
        { id: 'mysql', name: 'MySQL' },
        { id: 'postgresql', name: 'PostgreSQL' },
        { id: 'mongodb', name: 'MongoDB' },
        { id: 'oracle', name: 'Oracle Database' },
        { id: 'sql-server', name: 'Microsoft SQL Server' },
        { id: 'redis', name: 'Redis' }
      ]
    },
    {
      id: 'devops-tools',
      name: 'DevOps Tools',
      options: [
        { id: 'docker', name: 'Docker' },
        { id: 'kubernetes', name: 'Kubernetes' },
        { id: 'jenkins', name: 'Jenkins' },
        { id: 'gitlab', name: 'GitLab CI/CD' },
        { id: 'github-actions', name: 'GitHub Actions' },
        { id: 'ansible', name: 'Ansible' }
      ]
    }
  ], []);

  // State for UI interactions
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [focusPercentages, setFocusPercentages] = useState({});

  // Initialize focus percentages from existing focus
  useEffect(() => {
    const initialPercentages = {};
    focus.forEach(focusItem => {
      // Find the focus item in our categories to get the focusId
      for (const category of focusCategories) {
        const matchingFocus = category.options.find(f => f.name === focusItem.focusName);
        if (matchingFocus) {
          const focusId = `${category.id}-${matchingFocus.id}`;
          initialPercentages[focusId] = focusItem.percentage;
          break;
        }
      }
    });
    setFocusPercentages(initialPercentages);
  }, [focus, focusCategories]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle focus percentage change
  const handleFocusPercentageChange = (focusId, categoryName, focusName, percentage) => {
    // Validate percentage input
    const parsedPercentage = parseInt(percentage) || 0;
    const clampedPercentage = Math.max(0, Math.min(50, parsedPercentage));

    // Update local state immediately for this specific focus
    setFocusPercentages(prev => ({
      ...prev,
      [focusId]: clampedPercentage
    }));

    // Update focus in parent component with targeted approach
    updateFocusInParent(focusId, categoryName, focusName, clampedPercentage);
  };

  // Handle focus checkbox toggle
  const toggleFocus = (focusId, categoryName, focusName) => {
    const currentPercentage = focusPercentages[focusId] || 0;

    if (currentPercentage > 0) {
      // If focus is already selected, deselect it
      handleFocusPercentageChange(focusId, categoryName, focusName, 0);
    } else {
      // If focus is not selected, select it with default 10%
      handleFocusPercentageChange(focusId, categoryName, focusName, 10);
    }
  };

  // Update focus in parent component
  const updateFocusInParent = (focusId, categoryName, focusName, percentage) => {
    // Create a completely new focus array to ensure only the target focus is updated
    const updatedFocus = focus.map(existingFocus => {
      if (existingFocus.focusName === focusName) {
        // Update only this specific focus
        return {
          ...existingFocus,
          focusName: focusName,
          category: categoryName,
          percentage: percentage
        };
      }
      // Keep all other focus areas exactly as they are
      return existingFocus;
    });

    // If percentage is 0, remove the focus completely
    if (percentage === 0) {
      const filteredFocus = updatedFocus.filter(f => f.focusName !== focusName);
      onFocusChange(filteredFocus);
    } else {
      // If it's a new focus (not found in existing), add it
      const focusExists = focus.some(f => f.focusName === focusName);
      if (!focusExists) {
        const newFocus = {
          focusName: focusName,
          category: categoryName,
          percentage: percentage
        };
        onFocusChange([...focus, newFocus]);
      } else {
        onFocusChange(updatedFocus);
      }
    }
  };

  // Calculate total percentage
  const totalPercentage = focus.reduce((sum, focusItem) => sum + focusItem.percentage, 0);

  // Prepare chart data
  const chartData = {
    labels: focus.map(focusItem => focusItem.focusName),
    datasets: [
      {
        data: focus.map(focusItem => focusItem.percentage),
        backgroundColor: [
          '#265ba3',
          '#0d5fd4',
          '#1a73e8',
          '#4285f4',
          '#669df6',
          '#8ab4f8',
          '#aecbfa',
          '#d2e3fc'
        ],
        borderColor: [
          '#265ba3',
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
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      }
    }
  };

  return (
    <div className="relative">
      <div className="space-y-6">
        {/* Header with Add Focus Button */}
        <div className="bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Focus Areas</h3>
              <p className="text-blue-100 text-sm">
                Manage your companys technology focus areas and allocate percentages
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSidebar();
              }}
              className="bg-white whitespace-nowrap text-black px-6 py-3 rounded-xl cursor-pointer font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none"
            >
              
              Available Focus Areas
            </button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Focus Distribution Chart</h4>
          <div className="flex items-center justify-center">
            {focus.length > 0 ? (
              <div className="w-full max-w-md h-80">
                <Pie data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className="w-80 h-80 rounded-full border-2 border-dashed border-[#4897de] flex items-center justify-center">
                <div className="text-center text-[#4897de]">
                  <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div className="text-lg font-medium">No Focus Areas Selected</div>
                  <div className="text-sm">Choose focus areas to see the chart</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Focus Summary */}
        {focus.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-[#4897de] rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Selected Focus Areas Summary</h4>
            <div className="space-y-3 mb-4">
              {focus.map((focusItem, index) => {
                // Find the focusId for this focus area more reliably
                let focusId = null;
                let focusCategory = null;
                
                for (const category of focusCategories) {
                  const matchingFocus = category.options.find(f => f.name === focusItem.focusName);
                  if (matchingFocus) {
                    focusId = `${category.id}-${matchingFocus.id}`;
                    focusCategory = category;
                    break;
                  }
                }
                
                return (
                  <div key={`${focusItem.focusName}-${index}`} className="bg-white p-4 rounded-lg flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900">{focusItem.focusName}</span>
                      <div className="text-xs text-gray-500 mt-1">{focusItem.category}</div>
                    </div>
                          
                    {/* Percentage Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="5"
                          max="50"
                          value={focusItem.percentage}
                          onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (focusId && focusCategory) {
                              handleFocusPercentageChange(focusId, focusCategory.name, focusItem.focusName, e.target.value);
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
                          max="50"
                          value={focusItem.percentage}
                          onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (focusId && focusCategory) {
                              handleFocusPercentageChange(focusId, focusCategory.name, focusItem.focusName, e.target.value);
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
                          if (focusId && focusCategory) {
                            handleFocusPercentageChange(focusId, focusCategory.name, focusItem.focusName, 0);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors group"
                        title="Remove focus area"
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
                <span className="text-lg font-bold text-gray-900">Total Focus Areas: {focus.length}</span>
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
              {totalPercentage < 100 && focus.length > 0 && (
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

      {/* Right Sidebar for Focus Selection */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/1 bg-opacity-50 z-40"
            onClick={toggleSidebar}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-[#265ba3] to-[#1a365d]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Available Focus Areas</h3>
                <button
                  onClick={toggleSidebar}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-2">Select focus areas and set percentages</p>
            </div>

            {/* Sidebar Content */}
            <div className="p-6">
              {focusCategories.map((category) => (
                <div key={category.id} className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    {category.name}
                  </h4>
                  <div className="space-y-3">
                    {category.options.map((option) => {
                      const focusId = `${category.id}-${option.id}`;
                      const currentPercentage = focusPercentages[focusId] || 0;
                      const isSelected = currentPercentage > 0;

                      return (
                        <div key={option.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                id={`sidebar-${focusId}`}
                                checked={isSelected}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  toggleFocus(focusId, category.name, option.name);
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="w-4 h-4 text-[#4897de] border-gray-300 rounded focus:ring-[#4897de]"
                              />
                              <label htmlFor={`sidebar-${focusId}`} className="text-sm text-gray-900 cursor-pointer flex-1 font-medium">
                                {option.name}
                              </label>
                            </div>
                            {isSelected && (
                              <div className="ml-7 space-y-2">
                                <div className="flex items-center gap-3">
                                  <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    value={currentPercentage}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      handleFocusPercentageChange(focusId, category.name, option.name, e.target.value);
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
                                      max="50"
                                      value={currentPercentage}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        handleFocusPercentageChange(focusId, category.name, option.name, e.target.value);
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
                                  Adjust the percentage for this focus area
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Sidebar Footer with Summary */}
              {focus.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Current Selection</h4>
                  <div className="space-y-1 text-sm">
                    {focus.map((focusItem, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-700">{focusItem.focusName}</span>
                        <span className="text-[#4897de] font-medium">{focusItem.percentage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-semibold">
                    <span>Total ({focus.length} areas)</span>
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

export default FocusLines;