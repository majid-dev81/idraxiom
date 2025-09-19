// /src/app/ai-demo/page.tsx

"use client"; // This directive is necessary for Recharts

import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { ArrowRight, Cpu, Database, BarChart2, CheckCircle } from 'lucide-react';

// --- TYPE DEFINITIONS ---
// Defines the structure for each KPI card's data
interface KpiCardData {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

// Defines the structure for the line chart data points
interface LineChartData {
  name: string;
  inputs: number;
}

// Defines the structure for the bar chart data points
interface BarChartData {
  name: string;
  outputs: number;
}


// --- DUMMY DATA ---
// This data simulates what you would fetch from an API.
const kpiData: KpiCardData[] = [
  { title: "Inputs Processed", value: "1.2M", icon: Database, color: "text-blue-500" },
  { title: "Outputs Generated", value: "980K", icon: BarChart2, color: "text-green-500" },
  { title: "Model Accuracy", value: "98.5%", icon: CheckCircle, color: "text-teal-500" },
  { title: "Active Models", value: "12", icon: Cpu, color: "text-purple-500" },
];

const lineChartData: LineChartData[] = [
  { name: 'Jan', inputs: 4000 },
  { name: 'Feb', inputs: 3000 },
  { name: 'Mar', inputs: 5000 },
  { name: 'Apr', inputs: 4500 },
  { name: 'May', inputs: 6000 },
  { name: 'Jun', inputs: 5500 },
];

const barChartData: BarChartData[] = [
  { name: 'Classification', outputs: 2400 },
  { name: 'Generation', outputs: 1398 },
  { name: 'Extraction', outputs: 4800 },
  { name: 'Summarization', outputs: 3908 },
  { name: 'Translation', outputs: 2800 },
];

/**
 * AI Analytics Dashboard Page
 * A responsive dashboard displaying key AI metrics, workflow, and trends.
 */
export default function AiDemoPage() {
  return (
    <main className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-gray-50/50 dark:bg-gray-900/50">
      {/* Page Header */}
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
          AI Analytics Dashboard
        </h1>
      </div>

      {/* KPI Cards Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <div key={kpi.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center space-x-4 transition-transform hover:scale-105">
            <kpi.icon className={`w-10 h-10 ${kpi.color}`} />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{kpi.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Workflow Diagram Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">AI Workflow</h2>
        <div className="flex flex-col md:flex-row items-center justify-around space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center flex-col space-y-2 text-center">
            <Database className="w-12 h-12 text-blue-500" />
            <p className="font-medium text-gray-700 dark:text-gray-300">Input Data</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Raw data sources</p>
          </div>
          <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-500 hidden md:block" />
          <div className="flex items-center flex-col space-y-2 text-center">
            <Cpu className="w-12 h-12 text-purple-500" />
            <p className="font-medium text-gray-700 dark:text-gray-300">AI Model</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Processing & Analysis</p>
          </div>
          <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-500 hidden md:block" />
          <div className="flex items-center flex-col space-y-2 text-center">
            <BarChart2 className="w-12 h-12 text-green-500" />
            <p className="font-medium text-gray-700 dark:text-gray-300">Insights & Actions</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Results & Decisions</p>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Line Chart for Inputs Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Inputs Trend (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.8)', // bg-gray-800 with opacity
                  borderColor: '#4b5563' // border-gray-600
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="inputs" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Outputs by Type */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Outputs by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#9ca3af" angle={-15} textAnchor="end" height={50} />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  borderColor: '#4b5563' 
                }}
              />
              <Legend />
              <Bar dataKey="outputs" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}