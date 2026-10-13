'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const IndustriesDisplay = ({ industries = [] }) => {
  
  // If no industries, show empty state
  if (!industries || industries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-black mb-4">Industries</h3>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
            <div className="text-center text-gray-400">
              <div className="text-sm">No industries</div>
              <div className="text-xs">added yet</div>
            </div>
          </div>
          <p className="text-gray-500 text-center">
            This company hasn&apos;t specified their industries yet.
          </p>
        </div>
      </div>
    );
  }

  // Chart data - show all industries in graph with names and percentages in labels
  const chartData = {
    labels: industries.map(industry => `${industry.industryName} ${industry.percentage}%`),
    datasets: [
      {
        data: industries.map(industry => industry.percentage),
        backgroundColor: [
          '#4897de', // Primary button color
          '#0249aa', // Secondary color
          '#3b82f6', // Replaced #a6871c with blue shade
          '#60a5fa',
          '#93c5fd',
          '#059669',
          '#10b981',
          '#34d399'
        ].slice(0, industries.length),
        borderColor: [
          '#0f1e35',
          '#4897de',
          '#0249aa',
          '#3b82f6',
          '#60a5fa',
          '#059669',
          '#10b981',
          '#34d399'
        ].slice(0, industries.length),
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
          },
          color: 'black'
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
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-black mb-6">Industries</h3>
      
      <div className="flex flex-col items-center">
        {/* Chart */}
        <div className="w-full max-w-[300px]">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default IndustriesDisplay;