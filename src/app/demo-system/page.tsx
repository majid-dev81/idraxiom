// /src/app/demo-system/page.tsx

"use client"; // This is a client component to allow for state and interactivity

import React, { useState } from 'react';
import type { FC } from 'react';
import { motion, type Transition } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Layers, Activity, Clock, AlertTriangle, Cpu, Database, Server, ChevronRight } from 'lucide-react';

// --- MOCK DATA FOR CHARTS ---

const responseTimeData = [
  { name: '10:00', time: 120 },
  { name: '10:05', time: 150 },
  { name: '10:10', time: 130 },
  { name: '10:15', time: 210 },
  { name: '10:20', time: 180 },
  { name: '10:25', time: 250 },
  { name: '10:30', time: 220 },
];

const requestsData = [
  { name: 'Service A', requests: 4200 },
  { name: 'Service B', requests: 3100 },
  { name: 'Service C', requests: 5300 },
];


// --- REUSABLE COMPONENTS ---

/**
 * Prop types for the KpiCard component.
 */
interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  borderColor: string;
}

/**
 * KPI Card Component
 * A reusable card to display key performance indicators with an icon and animations.
 */
const KpiCard: FC<KpiCardProps> = ({ title, value, icon: Icon, borderColor }) => (
  <motion.div
    className="relative p-6 rounded-xl bg-[#161B22] border border-transparent overflow-hidden"
    whileHover={{ y: -5, boxShadow: `0 0 20px ${borderColor}` }}
    style={{
      // Creates a glowing gradient border effect
      backgroundImage: `
        linear-gradient(to right, #161B22, #161B22), 
        linear-gradient(90deg, #00A9FF, #A076F9, #16a34a)
      `,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
    }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <Icon className="h-8 w-8 text-cyan-400" />
    </div>
  </motion.div>
);

/**
 * Prop types for the Block component.
 */
interface BlockProps {
  icon: React.ElementType;
  label: string;
  delay: number;
}

/**
 * Architecture Diagram Component
 * A visual representation of the system pipeline with animated elements.
 */
const ArchitectureDiagram = () => {
  const glowAnimation = {
    boxShadow: [
      "0 0 15px rgba(0, 169, 255, 0.4)",
      "0 0 25px rgba(160, 118, 249, 0.6)",
      "0 0 15px rgba(0, 169, 255, 0.4)",
    ],
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
  };

  // Explicitly typing the transition object fixes the TypeScript error.
  const transition: Transition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  };

  const Arrow = () => (
    <motion.div
      animate={pulseAnimation}
      transition={{ ...transition, duration: 1.5 }}
      className="flex items-center"
    >
      <ChevronRight className="h-10 w-10 text-gray-500 mx-2 sm:mx-4" />
    </motion.div>
  );

  const Block: FC<BlockProps> = ({ icon: Icon, label, delay }) => (
    <motion.div
      animate={glowAnimation}
      transition={{ ...transition, delay }}
      className="flex flex-col items-center justify-center text-center p-4 rounded-lg bg-[#161B22] border border-gray-700 w-full"
    >
      <Icon className="h-10 w-10 mb-2 text-cyan-400" />
      <span className="font-semibold text-sm sm:text-base">{label}</span>
    </motion.div>
  );

  return (
    <div className="flex items-center justify-between bg-[#0D1117] p-6 rounded-lg border border-gray-800">
      <Block icon={Cpu} label="Client" delay={0} />
      <Arrow />
      <Block icon={Server} label="API Gateway" delay={0.5} />
      <Arrow />
      <Block icon={Layers} label="Microservices" delay={1} />
      <Arrow />
      <Block icon={Database} label="Database" delay={1.5} />
    </div>
  );
};


/**
 * Main Page Component
 * This is the primary component for the /demo-system route.
 */
export default function SystemAnalysisPage() {
  // State to simulate changing response time for the alert
  const [avgResponseTime, setAvgResponseTime] = useState(220);
  
  // A simple toggle to demonstrate the conditional alert
  const toggleLatency = () => {
    setAvgResponseTime(prev => (prev > 500 ? 220 : 650));
  };

  return (
    <div className="bg-[#0D1117] min-h-screen text-white p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* --- HEADER --- */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent pb-2">
            System Analysis – Demo
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mt-2">
            Analyzing and defining system requirements to build robust and scalable software architecture.
          </p>
        </header>

        {/* --- KPI CARDS --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Active Modules" value="42" icon={Layers} borderColor="rgba(0, 169, 255, 0.5)" />
          <KpiCard title="System Health" value="98%" icon={Activity} borderColor="rgba(22, 163, 74, 0.5)" />
          <KpiCard title="Avg Response Time" value={`${avgResponseTime}ms`} icon={Clock} borderColor="rgba(160, 118, 249, 0.5)" />
          <KpiCard title="Errors Detected" value="7" icon={AlertTriangle} borderColor="rgba(239, 68, 68, 0.5)" />
        </section>

        {/* --- ARCHITECTURE DIAGRAM --- */}
        <section>
          <h2 className="text-2xl font-bold mb-4">System Architecture</h2>
          <ArchitectureDiagram />
        </section>

        {/* --- CONDITIONAL ALERT --- */}
        {avgResponseTime > 500 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex items-center justify-center p-4 bg-red-900/50 border border-red-500 rounded-lg"
          >
            <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
            <p className="font-semibold text-red-300">High Latency Detected on Service B</p>
          </motion.div>
        )}
        
        {/* --- CHARTS --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Response Time Chart */}
          <div className="bg-[#161B22] p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Response Time (ms)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <defs>
                  <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #374151' }} />
                <Line type="monotone" dataKey="time" stroke="#A076F9" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Requests Per Service Chart */}
          <div className="bg-[#161B22] p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Requests Handled Per Service</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestsData}>
                 <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A9FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#A076F9" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #374151' }} />
                <Bar dataKey="requests" fill="url(#colorRequests)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

         {/* --- INTERACTIVE BUTTON FOR DEMO --- */}
         <div className="text-center pt-4">
            <button
                onClick={toggleLatency}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
                Toggle High Latency Alert
            </button>
        </div>
      </div>
    </div>
  );
}