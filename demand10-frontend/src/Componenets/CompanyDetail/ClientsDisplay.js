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

const ClientsDisplay = ({ clients = [] }) => {
  
  // If no clients, show empty state
  if (!clients || clients.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-black mb-4">Client Segments</h3>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
            <div className="text-center text-gray-400">
              <div className="text-sm">No client segments</div>
              <div className="text-xs">added yet</div>
            </div>
          </div>
          <p className="text-gray-500 text-center">
            This company hasn&apos;t specified their client segments yet.
          </p>
        </div>
      </div>
    );
  }

  // Chart data - show all clients in graph with names and percentages in labels
  const chartData = {
    labels: clients.map(client => `${client.clientSegment} ${client.percentage}%`),
    datasets: [
      {
        data: clients.map(client => client.percentage),
        backgroundColor: [
          '#4897de', // Primary button color
          '#0249aa', // Secondary color
          '#3b82f6', // Replaced #a6871c with blue shade
          '#60a5fa',
          '#93c5fd',
          '#059669',
          '#10b981',
          '#34d399'
        ].slice(0, clients.length),
        borderColor: [
          '#0f1e35',
          '#4897de',
          '#0249aa',
          '#3b82f6',
          '#60a5fa',
          '#059669',
          '#10b981',
          '#34d399'
        ].slice(0, clients.length),
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
      <h3 className="text-xl font-bold text-black mb-6">Client Segments</h3>
      
      <div className="flex flex-col items-center">
        {/* Chart */}
        <div className="w-full max-w-[300px]">
          <Pie data={chartData} options={chartOptions} />
        </div>
        
        {/* Client segments list */}
        <div className="w-full mt-8">
          <h4 className="text-lg font-semibold text-black mb-4">Client Segments Distribution</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clients.map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-medium text-black">{client.clientSegment}</span>
                <span className="font-bold text-[#4897de]">{client.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsDisplay;