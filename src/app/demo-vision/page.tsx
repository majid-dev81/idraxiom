"use client";

import React, { useState, useEffect, FC, ComponentType, SVGProps } from 'react';
import { motion, AnimatePresence, TargetAndTransition } from 'framer-motion';
import { Video, Target, BarChart2, Users as UsersIcon, LucideIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- TYPE DEFINITIONS for a robust component ---
type MotionPath = 'leftRight' | 'diagonal' | 'scaleInOut' | 'still';
// Update Shape components to accept all standard SVG props
type ShapeComponent = ComponentType<SVGProps<SVGSVGElement>>;
type DetectionType = {
  label: string;
  shape: ShapeComponent;
};
type Detection = {
  id: number;
  label:string;
  confidence: number;
  shape: ShapeComponent;
  x: number;
  y: number;
  size: number;
  motionPath: MotionPath;
};
type ChartData = { time: string; people: number };
type KpiCardProps = { icon: LucideIcon; title: string; value: string; color: 'cyan' | 'violet' | 'lime' };

// --- SVG SHAPES for realistic detections (FIXED to accept style prop) ---
const PersonShape: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 4a5 5 0 100 10 5 5 0 000-10zm-7 12c-4 0-5 2-5 5v2h24v-2c0-3-1-5-5-5z" />
  </svg>
);
const CarShape: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </svg>
);
const BackpackShape: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 5h-2V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v1H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2zM10 4h4v1h-4V4zm8 15H6V7h12v12z" />
  </svg>
);

// --- CONSTANTS ---
const DETECTION_TYPES: DetectionType[] = [
  { label: 'Person', shape: PersonShape }, { label: 'Car', shape: CarShape }, { label: 'Backpack', shape: BackpackShape }
];
const MOTION_PATHS: MotionPath[] = ['leftRight', 'diagonal', 'scaleInOut', 'still'];
const HEATMAP_GRID = { rows: 8, cols: 12 };
const HEATMAP_DECAY_RATE = 0.9;

// --- MAIN PAGE COMPONENT ---
export default function VisionPage() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [peopleCount, setPeopleCount] = useState(0);
  const [heatmap, setHeatmap] = useState(() => Array(HEATMAP_GRID.rows * HEATMAP_GRID.cols).fill(0));

  useEffect(() => {
    const simulationInterval = setInterval(() => {
      const type = DETECTION_TYPES[Math.floor(Math.random() * DETECTION_TYPES.length)];
      const newDetection: Detection = {
        id: Date.now(),
        ...type,
        confidence: Math.random() * (0.99 - 0.85) + 0.85,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        size: Math.floor(Math.random() * (100 - 60) + 60),
        motionPath: MOTION_PATHS[Math.floor(Math.random() * MOTION_PATHS.length)],
      };
      setDetections(prev => [...prev, newDetection].slice(-10));

      const col = Math.floor((newDetection.x / 100) * HEATMAP_GRID.cols);
      const row = Math.floor((newDetection.y / 100) * HEATMAP_GRID.rows);
      const index = row * HEATMAP_GRID.cols + col;
      setHeatmap(prev => {
        const newHeatmap = prev.map(val => val * HEATMAP_DECAY_RATE);
        newHeatmap[index] = Math.min(1, newHeatmap[index] + 0.5);
        return newHeatmap;
      });

      if (type.label === 'Person') {
        const newCount = peopleCount + 1;
        setPeopleCount(newCount);
        const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setChartData(prev => [...prev, { time: newTime, people: newCount }].slice(-20));
      }
    }, 1200);

    return () => clearInterval(simulationInterval);
  }, [peopleCount]);

  return (
    <main className="flex flex-col min-h-screen bg-[#0a192f] text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
        <header>
          <h1 className="text-3xl font-bold tracking-wider text-cyan-300">AI Surveillance Feed</h1>
          <p className="text-gray-400 mt-1">Real-time object detection and activity analysis</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard icon={Video} title="Cameras Active" value="1" color="cyan" />
          <KpiCard icon={UsersIcon} title="People Detected" value={peopleCount.toString()} color="violet" />
          <KpiCard icon={Target} title="Average Confidence" value="96.8%" color="lime" />
        </div>
        <div className="w-full h-[550px] bg-black rounded-lg overflow-hidden relative border-2 border-cyan-500/30 p-1 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <div className="absolute inset-0 z-0 bg-black/50" />
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(rgba(18, 18, 18, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%' }} />
          <HeatmapGrid data={heatmap} />
          <AnimatePresence>
            {detections.map((d) => <DetectedObject key={d.id} {...d} />)}
          </AnimatePresence>
        </div>
        <div className="w-full h-[300px] bg-gray-800/20 rounded-lg p-4 border border-violet-500/20">
           <div className="flex items-center gap-2 mb-4"><BarChart2 className="text-violet-400" size={20}/><h3 className="font-semibold text-violet-300">People Count Over Time</h3></div>
           <ResponsiveContainer width="100%" height="85%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
              <XAxis dataKey="time" stroke="#A0AEC0" tick={{ fill: '#A0AEC0', fontSize: 12 }} />
              <YAxis stroke="#A0AEC0" allowDecimals={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(26, 32, 44, 0.9)', borderColor: 'rgba(128, 128, 128, 0.5)' }} />
              <Line type="monotone" dataKey="people" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4, fill: '#a78bfa' }} activeDot={{ r: 8, stroke: '#c4b5fd' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
const KpiCard: FC<KpiCardProps> = ({ icon: Icon, title, value, color }) => {
  const styles = {
    cyan: 'border-cyan-500/30 shadow-cyan-500/20 text-cyan-300',
    violet: 'border-violet-500/30 shadow-violet-500/20 text-violet-300',
    lime: 'border-lime-500/30 shadow-lime-500/20 text-lime-300',
  };
  return (
    <div className={`flex items-center p-4 rounded-lg bg-gray-800/30 border shadow-lg ${styles[color]}`}>
      <Icon className={`w-8 h-8 ${styles[color]}`} />
      <div className="ml-4"><p className="text-sm text-gray-400">{title}</p><p className={`text-2xl font-bold`}>{value}</p></div>
    </div>
  );
};

const HeatmapGrid: FC<{ data: number[] }> = ({ data }) => (
  <div className="absolute inset-0 z-20 grid grid-cols-12 grid-rows-8 pointer-events-none">
    {data.map((heat, i) => (
      <div key={i} className="transition-colors duration-500" style={{ backgroundColor: `rgba(255, 80, 80, ${heat * 0.6})`, boxShadow: `0 0 15px rgba(255, 80, 80, ${heat * 0.4})`}} />
    ))}
  </div>
);

const DetectedObject: FC<Detection> = ({ shape: Shape, label, confidence, x, y, size, motionPath }) => {
    const confidenceColor = confidence > 0.95 ? 'text-lime-400' : 'text-yellow-400';
    
    // Defines the continuous animation for the object while it's visible
    const motionVariants: { [key in MotionPath]: TargetAndTransition } = {
      leftRight: { x: [-size * 0.2, size * 0.2, -size * 0.2], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } },
      diagonal: { x: [-15, 15, -15], y: [-15, 15, -15], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } },
      scaleInOut: { scale: [1, 1.1, 1], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } },
      still: { scale: 1, x: 0, y: 0 }
    };

    // The animate prop is now cleaner, combining the target state with the selected motion variant
    const animateProps: TargetAndTransition = {
      opacity: 1,
      scale: 1,
      ...motionVariants[motionPath]
    };
    // To fix the type error, we must handle potential key conflicts manually.
    if(motionPath === 'scaleInOut') {
      // The `scale` from motionVariants should take precedence.
      delete animateProps.scale;
    }


    return (
        <motion.div
            className="absolute z-30 flex flex-col items-center"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0.1 }}
            animate={animateProps}
            exit={{ opacity: 0, scale: 0.1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          <div className="absolute -top-6 px-2 py-0.5 bg-black/60 rounded text-xs backdrop-blur-sm">
            <span>{label}</span><span className={`ml-2 font-mono ${confidenceColor}`}>{(confidence * 100).toFixed(0)}%</span>
          </div>
          <motion.div className="w-full h-full relative"
            animate={{ filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="absolute inset-0 border-2 border-cyan-400/80 rounded-md animate-pulse" style={{ animationDuration: '3s' }}/>
            <Shape className="w-full h-full p-2 text-cyan-300 opacity-80" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
          </motion.div>
        </motion.div>
    );
};