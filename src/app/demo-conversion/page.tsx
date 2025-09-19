"use client";

import { useState, useEffect, FC, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Users, Briefcase, Video, Target, BarChart2, LucideIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- TYPE DEFINITIONS for strict TypeScript ---

type DetectionType = {
  label: string;
  icon: LucideIcon;
};

type Detection = {
  id: number;
  label: string;
  confidence: number;
  icon: LucideIcon;
  x: number;
  y: number;
  size: number;
  duration: number;
};

type ChartData = {
  time: string;
  people: number;
};

type KpiCardProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  unit: string;
  color: 'cyan' | 'violet' | 'lime';
};

// --- CONSTANTS for easy configuration ---

const DETECTION_TYPES: DetectionType[] = [
  { label: 'Person', icon: Users },
  { label: 'Car', icon: Car },
  { label: 'Backpack', icon: Briefcase },
];
const MAX_DETECTIONS = 15;
const DETECTION_INTERVAL_MS = 1500;
const MAX_CHART_POINTS = 20;

// --- MAIN PAGE COMPONENT ---

export default function VisionPage() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [peopleCount, setPeopleCount] = useState(0);

  // This useEffect hook simulates a live feed by generating new detections
  // and updating the chart data at regular intervals.
  useEffect(() => {
    const generateDetections = () => {
      // 1. Create a new detection with random properties
      const type = DETECTION_TYPES[Math.floor(Math.random() * DETECTION_TYPES.length)];
      const newDetection: Detection = {
        id: Date.now(),
        label: type.label,
        icon: type.icon,
        confidence: Math.random() * (0.99 - 0.85) + 0.85,
        x: Math.random() * 90,
        y: Math.random() * 90,
        size: Math.floor(Math.random() * (120 - 70) + 70),
        duration: Math.random() * (8 - 4) + 4, // Random duration for animation
      };

      // 2. Update the detections state, ensuring it doesn't grow infinitely
      setDetections(prev => 
        [...prev, newDetection].slice(-MAX_DETECTIONS)
      );

      // 3. Update people count and chart data if a 'Person' is detected
      if (type.label === 'Person') {
        const newCount = peopleCount + 1;
        setPeopleCount(newCount);
        
        const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'});
        const newEntry = { time: newTime, people: newCount };
        
        setChartData(prev => 
          [...prev, newEntry].slice(-MAX_CHART_POINTS)
        );
      }
    };

    const intervalId = setInterval(generateDetections, DETECTION_INTERVAL_MS);
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [peopleCount]); // Rerun effect when peopleCount changes to get the latest value

  return (
    <main className="flex flex-col min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
        
        <header>
          <h1 className="text-3xl font-bold tracking-wider bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
            AI Vision Analytics
          </h1>
          <p className="text-gray-400 mt-1">Live demonstration of real-time object detection</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <KpiCard icon={Video} title="Cameras Active" value="1" unit="" color="cyan" />
          <KpiCard icon={Users} title="People Detected" value={peopleCount.toString()} unit="Total" color="violet" />
          <KpiCard icon={Target} title="Average Accuracy" value="96.8" unit="%" color="lime" />
        </div>

        {/* --- LIVE VISION FEED --- */}
        <div className="w-full h-[500px] bg-black/40 rounded-lg overflow-hidden relative border border-cyan-500/20 shadow-inner shadow-black/50">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]"></div>
          <AnimatePresence>
            {detections.map((d) => <DetectedObject key={d.id} {...d} />)}
          </AnimatePresence>
        </div>
        
        {/* --- ANALYTICS CHART --- */}
        <div className="w-full h-[300px] bg-gray-800/50 rounded-lg p-4 border border-violet-500/20">
           <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="text-violet-400" size={20}/>
              <h3 className="font-semibold text-violet-300">People Count Over Time</h3>
           </div>
           <ResponsiveContainer width="100%" height="85%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
              <XAxis dataKey="time" stroke="#A0AEC0" tick={{ fill: '#A0AEC0', fontSize: 12 }} />
              <YAxis stroke="#A0AEC0" allowDecimals={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 32, 44, 0.9)', 
                  borderColor: 'rgba(128, 128, 128, 0.5)',
                  color: '#E2E8F0',
                  borderRadius: '0.5rem'
                }}
              />
              <Line type="monotone" dataKey="people" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4, fill: '#a78bfa' }} activeDot={{ r: 8, stroke: '#c4b5fd' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

/**
 * KPI Card Component: Displays a key performance indicator with neon styling.
 */
const KpiCard: FC<KpiCardProps> = ({ icon: Icon, title, value, unit, color }) => {
  const styles = {
    cyan: { container: 'border-cyan-500/30', glow: 'shadow-[0_0_20px_rgba(56,189,248,0.3)]', text: 'text-cyan-300', iconBg: 'bg-cyan-500/20' },
    violet: { container: 'border-violet-500/30', glow: 'shadow-[0_0_20px_rgba(167,139,250,0.3)]', text: 'text-violet-300', iconBg: 'bg-violet-500/20' },
    lime: { container: 'border-lime-500/30', glow: 'shadow-[0_0_20px_rgba(163,230,53,0.3)]', text: 'text-lime-300', iconBg: 'bg-lime-500/20' },
  };

  return (
    <div className={`flex items-center p-4 rounded-lg bg-gray-800/50 border ${styles[color].container} ${styles[color].glow}`}>
      <div className={`p-3 rounded-md ${styles[color].iconBg}`}>
        <Icon className={`w-6 h-6 text-white ${styles[color].text}`} />
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-400">{title}</p>
        <p className={`text-2xl font-bold ${styles[color].text}`}>
          {value} <span className="text-base font-normal text-gray-300">{unit}</span>
        </p>
      </div>
    </div>
  );
};

/**
 * Detected Object Component: Renders a single, animated detection with a bounding box.
 */
const DetectedObject: FC<Detection> = ({ label, confidence, icon: Icon, x, y, size, duration }) => {
    const confidenceColor = confidence > 0.95 ? 'text-lime-400' : 'text-yellow-400';

    return (
        <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <motion.div
                className="w-full h-full border-2 border-cyan-400 rounded-md bg-cyan-500/10 flex items-center justify-center relative shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                animate={{
                    x: [0, Math.random() * 20 - 10, 0], // Random micro-movements
                    y: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{ duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            >
                <Icon className="w-1/2 h-1/2 text-cyan-200" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
            </motion.div>
            <div className="mt-2 px-2 py-1 bg-black/70 rounded text-xs text-center whitespace-nowrap backdrop-blur-sm">
                <span className="font-bold text-white">{label}</span>
                <span className={`ml-2 font-mono ${confidenceColor}`}>
                    {(confidence * 100).toFixed(1)}%
                </span>
            </div>
        </motion.div>
    );
};