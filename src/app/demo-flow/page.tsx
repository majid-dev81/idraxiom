// /src/app/demo-flow/page.tsx

"use client"; // This is a client component to allow for state and effects

import type { NextPage } from 'next';
import { FC, ReactNode } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Eye, LogOut, MapPin, LogIn } from 'lucide-react';

// --- TYPE DEFINITIONS ---

type KpiData = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: ReactNode;
};

// --- MOCK DATA (Replace with your actual data source) ---

const kpiData: readonly KpiData[] = [
  {
    title: "Total Visitors",
    value: "1,482",
    change: "+12.5%",
    changeType: "increase",
    icon: <Users className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Peak Occupancy",
    value: "124",
    change: "-3.2%",
    changeType: "decrease",
    icon: <TrendingUp className="h-6 w-6 text-green-400" />,
  },
  {
    title: "Dwell Time",
    value: "12m 45s",
    change: "+8.1%",
    changeType: "increase",
    icon: <Eye className="h-6 w-6 text-purple-400" />,
  },
  {
    title: "Exit Rate",
    value: "78%",
    change: "+1.9%",
    changeType: "increase", // Note: A real-world 'increase' here might be bad, colored red. This is for demonstration.
    icon: <LogOut className="h-6 w-6 text-red-400" />,
  },
];

const heatmapData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  traffic: Math.floor(Math.random() * 101), // Random traffic level 0-100
}));

const flowData = {
  entry: 820,
  mainArea: 650,
  exit: 590,
};

const visitorsPerHourData = [
    { hour: '9am', visitors: 65 }, { hour: '10am', visitors: 90 },
    { hour: '11am', visitors: 110 }, { hour: '12pm', visitors: 140 },
    { hour: '1pm', visitors: 180 }, { hour: '2pm', visitors: 165 },
    { hour: '3pm', visitors: 150 }, { hour: '4pm', visitors: 130 },
    { hour: '5pm', visitors: 100 },
];


// --- REUSABLE COMPONENTS ---

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

// Note: The KpiCardProps are now derived from our KpiData type for consistency
const KpiCard: FC<KpiData> = ({ title, value, change, changeType, icon }) => (
  <Card className="p-5 transition-all duration-300 hover:bg-slate-800 hover:shadow-cyan-500/10 hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      {icon}
    </div>
    <div className="mt-2">
      <p className="text-3xl font-bold text-slate-50">{value}</p>
      <p className={`text-sm ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
        {change} vs last period
      </p>
    </div>
  </Card>
);

// --- HEATMAP COMPONENT ---

interface TrafficHeatmapProps {
  data: { id: number; traffic: number }[];
}

const TrafficHeatmap: FC<TrafficHeatmapProps> = ({ data }) => {
  const getTrafficColor = (level: number) => {
    if (level > 75) return 'bg-red-600 hover:bg-red-500'; // High traffic
    if (level > 40) return 'bg-yellow-500 hover:bg-yellow-400'; // Medium traffic
    return 'bg-green-600 hover:bg-green-500'; // Low traffic
  };

  const getTrafficLabel = (level: number) => {
    if (level > 75) return 'High Traffic';
    if (level > 40) return 'Medium Traffic';
    return 'Low Traffic';
  };

  return (
    <Card className="p-6">
       <h3 className="text-lg font-semibold text-slate-100 mb-4">Traffic Heatmap</h3>
       <div className="grid grid-cols-10 gap-2">
        {data.map((cell) => (
          <div key={cell.id} className="group relative">
            <div
              className={`w-full aspect-square rounded-md transition-all duration-200 cursor-pointer hover:scale-110 ${getTrafficColor(cell.traffic)}`}
            />
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 w-max left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Cell {cell.id} – {getTrafficLabel(cell.traffic)} ({cell.traffic}%)
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
            </div>
          </div>
        ))}
       </div>
    </Card>
  );
};

// --- FLOW DIAGRAM COMPONENT ---

interface FlowDiagramProps {
  data: { entry: number; mainArea: number; exit: number };
}

const FlowDiagram: FC<FlowDiagramProps> = ({ data }) => {
  const FlowStep = ({ icon, title, count, color }: { icon: ReactNode; title: string; count: number, color: string }) => (
    <div className="flex flex-col items-center text-center">
      <div className={`flex items-center justify-center w-20 h-20 rounded-full border-2 ${color}`}>
        {icon}
      </div>
      <p className="mt-2 font-semibold text-slate-100">{title}</p>
      <p className="text-sm text-slate-400">Visitors: {count}</p>
    </div>
  );

  const AnimatedArrow = () => (
    <svg width="100%" height="20" className="flex-grow mx-4" preserveAspectRatio="none">
      <motion.path
        d="M 0 10 L 1000 10" // Use a large fixed number for the path length
        stroke="#475569" // slate-600
        strokeWidth="2"
        strokeDasharray="5 5"
        vectorEffect="non-scaling-stroke"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -20 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </svg>
  );

  return (
    <Card className="p-6 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-slate-100 mb-6">Visitor Flow Diagram</h3>
        <div className="flex items-center justify-between w-full">
            <FlowStep icon={<LogIn size={32} className="text-cyan-400"/>} title="Entry Zone" count={data.entry} color="border-cyan-400/50" />
            <AnimatedArrow />
            <FlowStep icon={<MapPin size={32} className="text-purple-400"/>} title="Main Area" count={data.mainArea} color="border-purple-400/50" />
            <AnimatedArrow />
            <FlowStep icon={<LogOut size={32} className="text-red-400"/>} title="Exit Zone" count={data.exit} color="border-red-400/50" />
        </div>
    </Card>
  );
};


// --- VISITORS CHART COMPONENT ---

interface VisitorsChartProps {
    data: { hour: string, visitors: number }[]
}

const VisitorsChart: FC<VisitorsChartProps> = ({ data }) => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Visitors Per Hour</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                color: '#f8fafc',
                borderRadius: '0.5rem'
              }}
              cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
            />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            <Bar dataKey="visitors" fill="#22d3ee" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );


// --- MAIN PAGE COMPONENT ---

const DemoFlowPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">People & Flow Analytics</h1>
          <p className="mt-1 text-slate-400">Live data from main entrance cameras.</p>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}
        </section>
        
        {/* Main Content: Heatmap and Flow Diagram */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <TrafficHeatmap data={heatmapData} />
            <FlowDiagram data={flowData} />
        </section>

        {/* Visitors Per Hour Chart */}
        <section>
          <VisitorsChart data={visitorsPerHourData} />
        </section>

      </div>
    </div>
  );
};

export default DemoFlowPage;