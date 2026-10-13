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

const Industries = ({ industries, onIndustriesChange }) => {
  // Predefined industries data
  const industryOptions = useMemo(() => [
    { id: 'ecommerce', name: 'eCommerce' },
    { id: 'financial-services', name: 'Financial Services' },
    { id: 'business-services', name: 'Business Services' },
    { id: 'energy-resources', name: 'Energy & Natural Resources' },
    { id: 'information-technology', name: 'Information Technology' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'education', name: 'Education' },
    { id: 'real-estate', name: 'Real Estate' },
    { id: 'transportation-logistics', name: 'Transportation & Logistics' },
    { id: 'legal-cannabis', name: 'Legal Cannabis' }
  ], []);

  // State for UI interactions
  const [expanded, setExpanded] = useState(true);
  const [industryPercentages, setIndustryPercentages] = useState({});

  // Initialize industry percentages from existing industries
  useEffect(() => {
    const initialPercentages = {};
    industries.forEach(industry => {
      const matchingIndustry = industryOptions.find(opt => opt.name === industry.industryName);
      if (matchingIndustry) {
        initialPercentages[matchingIndustry.id] = industry.percentage;
      }
    });
    setIndustryPercentages(initialPercentages);
  }, [industries, industryOptions]);

  // Handle industry percentage change
  const handleIndustryPercentageChange = (industryId, industryName, percentage) => {
    // Validate percentage input
    const parsedPercentage = parseInt(percentage) || 0;
    const clampedPercentage = Math.max(0, Math.min(100, parsedPercentage));

    setIndustryPercentages(prev => ({
      ...prev,
      [industryId]: clampedPercentage
    }));

    // Update industries in parent component
    updateIndustriesInParent(industryId, industryName, clampedPercentage);
  };

  // Handle industry checkbox toggle
  const toggleIndustry = (industryId, industryName) => {
    const currentPercentage = industryPercentages[industryId] || 0;

    if (currentPercentage > 0) {
      // If industry is already selected, deselect it
      handleIndustryPercentageChange(industryId, industryName, 0);
    } else {
      // If industry is not selected, select it with default 10%
      handleIndustryPercentageChange(industryId, industryName, 10);
    }
  };

  // Update industries in parent component
  const updateIndustriesInParent = (industryId, industryName, percentage) => {
    // Remove existing entry for this industry if it exists
    const filteredIndustries = industries.filter(i => i.industryName !== industryName);

    // Add new entry if percentage > 0
    let updatedIndustries;
    if (percentage > 0) {
      updatedIndustries = [
        ...filteredIndustries,
        {
          industryName: industryName,
          percentage: percentage
        }
      ];
    } else {
      updatedIndustries = filteredIndustries;
    }

    onIndustriesChange(updatedIndustries);
  };

  // Calculate total percentage
  const totalPercentage = industries.reduce((sum, industry) => sum + industry.percentage, 0);

  // Prepare chart data
  const chartData = {
    labels: industries.map(industry => industry.industryName),
    datasets: [
      {
        data: industries.map(industry => industry.percentage),
        backgroundColor: [
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
          '#bfdbfe',
          '#dbeafe',
          '#eff6ff'
        ],
        borderColor: [
          '#1d4ed8',
          '#2563eb',
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
          '#bfdbfe'
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
 <div className="space-y-6">
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-gray-800">Industries</h3>
    <p className="text-blue-600 text-sm">
      Select industries your company operates in and allocate percentages
    </p>
  </div>

  {/* Layout Wrapper */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Industries List (Left Side) */}
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div
        className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <h4 className="font-medium text-gray-800">Select Industries</h4>
        <svg
          className={`w-5 h-5 text-blue-600 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Industries List (Expanded) */}
      {expanded && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="space-y-3">
            {industryOptions.map((industry) => {
              const currentPercentage = industryPercentages[industry.id] || 0;
              const isSelected = currentPercentage > 0;

              return (
                <div key={industry.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <input
                    type="checkbox"
                    id={industry.id}
                    checked={isSelected}
                    onChange={() => toggleIndustry(industry.id, industry.name)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={industry.id} className="flex-1 text-sm text-gray-700">
                    {industry.name}
                  </label>
                  {isSelected && (
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={currentPercentage}
                        onChange={(e) =>
                          handleIndustryPercentageChange(industry.id, industry.name, e.target.value)
                        }
                        className="w-24 accent-blue-600"
                      />
                      <input
                        type="number"
                        min="10"
                        max="100"
                        value={currentPercentage}
                        onChange={(e) =>
                          handleIndustryPercentageChange(industry.id, industry.name, e.target.value)
                        }
                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>

    {/* Industry Distribution Preview (Right Side) */}
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm">
      <h4 className="font-bold text-gray-800 mb-4">Industry Distribution</h4>

      <div className="flex flex-col gap-6">
        {/* Chart */}
        <div className="flex items-center justify-center">
          {industries.length > 0 ? (
            <div className="w-full max-w-[220px]">
              <Pie data={chartData} options={chartOptions} />
            </div>
          ) : (
            <div className="w-full max-w-[200px] h-[200px] rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-sm">No industries</div>
                <div className="text-xs">selected yet</div>
              </div>
            </div>
          )}
        </div>

        {/* Industry List */}
        <div>
          {industries.length > 0 ? (
            <div className="space-y-3">
              <div className="flex justify-between font-medium text-gray-800 border-b border-gray-200 pb-2">
                <span>Industry</span>
                <span>Percentage</span>
              </div>
              {industries.map((industry, index) => (
                <div key={index} className="flex justify-between text-sm py-1">
                  <span className="text-gray-700">{industry.industryName}</span>
                  <span className="font-medium text-blue-600">{industry.percentage}%</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-gray-800 border-t border-gray-200 pt-2 mt-2">
                <span>Total</span>
                <span>{totalPercentage}%</span>
              </div>
              {totalPercentage > 100 && (
                <div className="text-red-500 text-sm mt-2">
                  Total exceeds 100% - please adjust percentages
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm py-8">
              Select industries above to see distribution
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Industries;