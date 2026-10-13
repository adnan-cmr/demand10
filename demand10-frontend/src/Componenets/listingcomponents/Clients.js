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

const Clients = ({ clients = [], onClientsChange }) => {
  // Predefined client segments
  const clientOptions = useMemo(() => [
    { id: 'small-business', name: 'Small Business (< $10M)' },
    { id: 'midmarket', name: 'Midmarket ($10M – $1B)' },
    { id: 'enterprise', name: 'Enterprise (> $1B)' }
  ], []);

  // State for UI interactions
  const [clientPercentages, setClientPercentages] = useState({});

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

    setClientPercentages(prev => ({
      ...prev,
      [clientId]: clampedPercentage
    }));

    // Update clients in parent component
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
    // Remove existing entry for this client if it exists
    const filteredClients = (clients || []).filter(c => c.clientSegment !== clientName);

    // Add new entry if percentage > 0
    let updatedClients;
    if (percentage > 0) {
      updatedClients = [
        ...filteredClients,
        {
          clientSegment: clientName,
          percentage: percentage
        }
      ];
    } else {
      updatedClients = filteredClients;
    }

    onClientsChange(updatedClients);
  };

  // Calculate total percentage
  const totalPercentage = (clients || []).reduce((sum, client) => sum + (client.percentage || 0), 0);

  // Prepare chart data
  const chartData = {
    labels: (clients || []).filter(client => client.percentage >= 10).map(client => client.clientSegment),
    datasets: [
      {
        data: (clients || []).filter(client => client.percentage >= 10).map(client => client.percentage),
        backgroundColor: [
          '#3b82f6',
          '#60a5fa',
          '#93c5fd'
        ].slice(0, (clients || []).filter(client => client.percentage >= 10).length),
        borderColor: [
          '#1d4ed8',
          '#2563eb',
          '#3b82f6'
        ].slice(0, (clients || []).filter(client => client.percentage >= 10).length),
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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Client Segments</h2>
        <p className="text-blue-600">
          Select your primary client segments and allocate percentages to each
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Client Distribution</h3>
          
          {(clients || []).filter(client => client.percentage >= 10).length > 0 ? (
            <div className="flex justify-center items-center h-64">
              <Pie data={chartData} options={chartOptions} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center text-blue-600">
                <div className="text-sm mb-2">No client segments selected</div>
                <div className="text-xs">Select segments to see distribution</div>
              </div>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Allocation</span>
              <span className={`text-sm font-bold ${totalPercentage > 100 ? 'text-red-600' : 'text-blue-600'}`}>
                {totalPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Client segments */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Client Segments</h3>
            <p className="text-sm text-blue-600 mb-6">
              Select one or more client segments and allocate percentages (minimum 10% each)
            </p>
            
            <div className="space-y-4">
              {clientOptions.map((client) => {
                const currentPercentage = clientPercentages[client.id] || 0;
                const isSelected = currentPercentage > 0;
                
                return (
                  <div 
                    key={client.id} 
                    className={`border rounded-lg p-4 transition-all duration-200 ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex items-center h-5 mt-0.5">
                        <input
                          id={`client-${client.id}`}
                          name={`client-${client.id}`}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleClient(client.id, client.name)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <label 
                          htmlFor={`client-${client.id}`} 
                          className={`block text-sm font-medium ${
                            isSelected ? 'text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          {client.name}
                        </label>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="mt-3 pl-8">
                        <div className="flex items-center justify-between">
                          <label 
                            htmlFor={`percentage-${client.id}`}
                            className="block text-sm text-blue-600"
                          >
                            Percentage
                          </label>
                          <span className="text-sm font-medium text-blue-600">
                            {currentPercentage}%
                          </span>
                        </div>
                        <div className="mt-1 flex items-center space-x-2">
                          <input
                            type="range"
                            id={`percentage-${client.id}`}
                            min="10"
                            max="100"
                            value={currentPercentage}
                            onChange={(e) => handleClientPercentageChange(client.id, client.name, e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <input
                            type="number"
                            min="10"
                            max="100"
                            value={currentPercentage}
                            onChange={(e) => handleClientPercentageChange(client.id, client.name, e.target.value)}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                          <span className="text-sm text-gray-500">%</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;