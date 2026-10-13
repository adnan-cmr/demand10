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

const FocusLines = ({ focus, onFocusChange }) => {
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
  const [expandedCategories, setExpandedCategories] = useState(new Set());
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

  // Handle category expansion/collapse
  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Handle focus percentage change
  const handleFocusPercentageChange = (focusId, categoryName, focusName, percentage) => {
    // Validate percentage input
    const parsedPercentage = parseInt(percentage) || 0;
    const clampedPercentage = Math.max(0, Math.min(100, parsedPercentage));

    setFocusPercentages(prev => ({
      ...prev,
      [focusId]: clampedPercentage
    }));

    // Update focus in parent component
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
    // Remove existing entry for this focus if it exists
    const filteredFocus = focus.filter(f => f.focusName !== focusName);

    // Add new entry if percentage > 0
    let updatedFocus;
    if (percentage > 0) {
      updatedFocus = [
        ...filteredFocus,
        {
          focusName: focusName,
          category: categoryName,
          percentage: percentage
        }
      ];
    } else {
      updatedFocus = filteredFocus;
    }

    onFocusChange(updatedFocus);
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
  {/* Section Header */}
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-gray-800">Focus Areas</h3>
    <p className="text-blue-600 text-sm">
      Select your company&apos;s focus areas and allocate percentages
    </p>
  </div>

  {/* Main Layout: Categories Left | Preview Right */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Focus Categories (Left) */}
    <div className="space-y-3">
      {focusCategories.map((category) => (
        <div
          key={category.id}
          className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Category Header */}
          <div
            className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-colors"
            onClick={() => toggleCategory(category.id)}
          >
            <h4 className="font-medium text-gray-800">{category.name}</h4>
            <svg
              className={`w-5 h-5 text-blue-600 transition-transform ${
                expandedCategories.has(category.id) ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Focus Options List (Expanded) */}
          {expandedCategories.has(category.id) && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="space-y-3">
                {category.options.map((option) => {
                  const focusId = `${category.id}-${option.id}`;
                  const currentPercentage = focusPercentages[focusId] || 0;
                  const isSelected = currentPercentage > 0;

                  return (
                    <div key={focusId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                      <input
                        type="checkbox"
                        id={focusId}
                        checked={isSelected}
                        onChange={() =>
                          toggleFocus(focusId, category.name, option.name)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={focusId}
                        className="flex-1 text-sm text-gray-700"
                      >
                        {option.name}
                      </label>
                      {isSelected && (
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={currentPercentage}
                            onChange={(e) =>
                              handleFocusPercentageChange(
                                focusId,
                                category.name,
                                option.name,
                                e.target.value
                              )
                            }
                            className="w-24 accent-blue-600"
                          />
                          <input
                            type="number"
                            min="10"
                            max="100"
                            value={currentPercentage}
                            onChange={(e) =>
                              handleFocusPercentageChange(
                                focusId,
                                category.name,
                                option.name,
                                e.target.value
                              )
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
      ))}
    </div>

    {/* Focus Distribution Preview (Right) */}
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm">
      <h4 className="font-bold text-gray-800 mb-4">Focus Distribution</h4>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Chart */}
        <div className="flex-1 flex items-center justify-center">
          {focus.length > 0 ? (
            <div className="w-full max-w-[200px]">
              <Pie data={chartData} options={chartOptions} />
            </div>
          ) : (
            <div className="w-full max-w-[200px] h-[200px] rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-sm">No focus areas</div>
                <div className="text-xs">selected yet</div>
              </div>
            </div>
          )}
        </div>

        {/* Focus List */}
        <div className="flex-1">
          {focus.length > 0 ? (
            <div className="space-y-3">
              <div className="flex justify-between font-medium text-gray-800 border-b border-gray-200 pb-2">
                <span>Focus Area</span>
                <span>Percentage</span>
              </div>
              {focus.map((focusItem, index) => (
                <div key={index} className="flex justify-between text-sm py-1">
                  <span className="text-gray-700">{focusItem.focusName}</span>
                  <span className="font-medium text-blue-600">
                    {focusItem.percentage}%
                  </span>
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
              Select focus areas above to see distribution
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default FocusLines;