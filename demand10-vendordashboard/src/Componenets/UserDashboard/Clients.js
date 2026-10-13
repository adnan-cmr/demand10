'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Clients = ({ clients = [], onClientsChange = () => {} }) => {
  // Predefined client segments
  const clientOptions = useMemo(() => [
    { id: 'small-business', name: 'Small Business (&lt; $10M)' },
    { id: 'midmarket', name: 'Midmarket ($10M – $1B)' },
    { id: 'enterprise', name: 'Enterprise (&gt; $1B)' }
  ], []);

  // State for UI interactions
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clientPercentages, setClientPercentages] = useState({});

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Initialize client percentages from existing clients
  useEffect(() => {
    const initialPercentages = {};
    (clients || []).forEach(client => {
      const matchingClient = clientOptions.find(opt => opt.name === client.clientSegment);
      if (matchingClient) {
        initialPercentages[matchingClient.id] = client.percentage;
      }
    });
    setClientPercentages(initialPercentages);
  }, [clients, clientOptions]);

  // Handle client percentage change
  const handleClientPercentageChange = (clientId, clientName, percentage) => {
    // Validate percentage input
    const parsedPercentage = parseInt(percentage) || 0;
    const clampedPercentage = Math.max(0, Math.min(100, parsedPercentage));

    // Update local state immediately for this specific client
    setClientPercentages(prev => ({
      ...prev,
      [clientId]: clampedPercentage
    }));

    // Update clients in parent component with targeted approach
    updateClientsInParent(clientId, clientName, clampedPercentage);
  };

  // Handle client checkbox toggle
  const toggleClient = (clientId, clientName) => {
    const currentPercentage = clientPercentages[clientId] || 0;

    if (currentPercentage > 0) {
      // If client is already selected, deselect it
      handleClientPercentageChange(clientId, clientName, 0);
    } else {
      // If client is not selected, select it with default 10%
      handleClientPercentageChange(clientId, clientName, 10);
    }
  };

  // Update clients in parent component
  const updateClientsInParent = (clientId, clientName, percentage) => {
    // Create a completely new clients array to ensure only the target client is updated
    const updatedClients = (clients || []).map(existingClient => {
      if (existingClient.clientSegment === clientName) {
        // Update only this specific client
        return {
          ...existingClient,
          clientSegment: clientName,
          percentage: percentage
        };
      }
      // Keep all other clients exactly as they are
      return existingClient;
    });

    // If percentage is 0, remove the client completely
    if (percentage === 0) {
      const filteredClients = updatedClients.filter(c => c.clientSegment !== clientName);
      onClientsChange(filteredClients);
    } else {
      // If it's a new client (not found in existing), add it
      const clientExists = (clients || []).some(c => c.clientSegment === clientName);
      if (!clientExists) {
        const newClient = {
          clientSegment: clientName,
          percentage: percentage
        };
        onClientsChange([...clients, newClient]);
      } else {
        onClientsChange(updatedClients);
      }
    }
  };

  // Calculate total percentage
  const totalPercentage = (clients || []).reduce((sum, client) => sum + (client.percentage || 0), 0);

  // Prepare chart data
  const chartData = {
    labels: (clients || []).map(client => client.clientSegment),
    datasets: [
      {
        data: (clients || []).map(client => client.percentage),
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
        {/* Header with Add Clients Button */}
        <div className="bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Client Segments</h3>
              <p className="text-blue-100 text-sm">
                Define your company&apos;s client segments and focus distribution
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSidebar();
              }}
              className="bg-white whitespace-nowrap text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              Add Clients
            </button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Client Distribution Chart</h4>
          <div className="flex items-center justify-center">
            {clients.length > 0 ? (
              <div className="w-full max-w-md h-80">
                <Pie data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className="w-80 h-80 rounded-full border-2 border-dashed border-[#4897de] flex items-center justify-center">
                <div className="text-center text-[#4897de]">
                  <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div className="text-lg font-medium">No Client Segments Selected</div>
                  <div className="text-sm">Choose client segments to see the chart</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Clients Summary */}
        {clients.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-[#4897de] rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Selected Client Segments Summary</h4>
            <div className="space-y-3 mb-4">
              {clients.map((client, index) => {
                // Find the clientId for this client more reliably
                let clientId = null;
                
                const matchingClient = clientOptions.find(opt => opt.name === client.clientSegment);
                if (matchingClient) {
                  clientId = matchingClient.id;
                }
                
                return (
                  <div key={`${client.clientSegment}-${index}`} className="bg-white p-4 rounded-lg flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900">{client.clientSegment}</span>
                      <div className="text-xs text-gray-500 mt-1">Client Segment</div>
                    </div>
                          
                    {/* Percentage Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="5"
                          max="100"
                          value={client.percentage}
                          onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (clientId) {
                              handleClientPercentageChange(clientId, client.clientSegment, e.target.value);
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
                          value={client.percentage}
                          onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (clientId) {
                              handleClientPercentageChange(clientId, client.clientSegment, e.target.value);
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
                          if (clientId) {
                            handleClientPercentageChange(clientId, client.clientSegment, 0);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors group"
                        title="Remove client segment"
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
                <span className="text-lg font-bold text-gray-900">Total Segments: {clients.length}</span>
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
              {totalPercentage < 100 && clients.length > 0 && (
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

      {/* Right Sidebar for Client Selection */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/1 bg-opacity-50 z-40"
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
                <h3 className="text-lg font-bold text-white">Available Client Segments</h3>
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
              <p className="text-white text-sm mt-2">Select client segments and set percentages</p>
            </div>

            {/* Sidebar Content */}
            <div className="p-6">
              <div className="space-y-4">
                {clientOptions.map((client) => {
                  const currentPercentage = clientPercentages[client.id] || 0;
                  const isSelected = currentPercentage > 0;

                  return (
                    <div key={client.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`sidebar-${client.id}`}
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleClient(client.id, client.name);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="w-4 h-4 text-[#4897de] border-gray-300 rounded focus:ring-[#4897de]"
                          />
                          <label htmlFor={`sidebar-${client.id}`} className="text-sm text-gray-900 cursor-pointer flex-1 font-medium">
                            {client.name}
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
                                  handleClientPercentageChange(client.id, client.name, e.target.value);
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
                                    handleClientPercentageChange(client.id, client.name, e.target.value);
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
                              Adjust the percentage for this client segment
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sidebar Footer with Summary */}
              {clients.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Current Selection</h4>
                  <div className="space-y-1 text-sm">
                    {clients.map((client, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-700">{client.clientSegment}</span>
                        <span className="text-[#4897de] font-medium">{client.percentage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-semibold">
                    <span>Total ({clients.length} segments)</span>
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

export default Clients;