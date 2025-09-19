'use client';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Clock, Users, Percent, Repeat, Maximize } from 'lucide-react';

// ============================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// All data is self-contained. Modify these arrays to see the dashboard update.
// ============================================================================

interface Table {
  id: number;
  status: 'free' | 'occupied';
  turnover: number;
}

interface OccupancyData {
  time: string;
  occupied: number;
}

interface WaitTimeData {
  hour: string;
  waitTime: number; // in minutes
}

// --- Seating Layout Data ---
// Generates 20 tables with random statuses and turnover counts.
const tableData: Table[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    status: Math.random() > 0.45 ? 'occupied' : 'free', // Approx. 55% occupied
    turnover: Math.floor(Math.random() * 4) + 1,
}));

// --- Chart Data ---
const occupancyByTimeData: OccupancyData[] = [
  { time: '5 PM', occupied: 5 },
  { time: '6 PM', occupied: 11 },
  { time: '7 PM', occupied: 17 },
  { time: '8 PM', occupied: 18 },
  { time: '9 PM', occupied: 14 },
  { time: '10 PM', occupied: 9 },
];

const avgWaitTimeByHourData: WaitTimeData[] = [
  { hour: '5 PM', waitTime: 2.1 },
  { hour: '6 PM', waitTime: 4.5 },
  { hour: '7 PM', waitTime: 9.2 },
  { hour: '8 PM', waitTime: 12.5 }, // Peak wait time (triggers alert)
  { hour: '9 PM', waitTime: 7.8 },
  { hour: '10 PM', waitTime: 3.0 },
];

// ============================================================================
// 2. KPI CALCULATIONS
// These values are derived from the dummy data above.
// ============================================================================
const totalTables = tableData.length;
const occupiedTables = tableData.filter(t => t.status === 'occupied').length;
const freeTables = totalTables - occupiedTables;
const occupancyPercentage = Math.round((occupiedTables / totalTables) * 100);

// Dummy values for advanced KPIs
const avgWaitingTime = 12.5; // Set to a value > 10 to show the alert by default
const avgTableTurnover = 2.3; // times/day

// A simple helper component for KPI cards to avoid repetition
const KpiCard = ({ title, value, icon: Icon }: { title: string; value: string | number; icon: React.ElementType }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-start justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
            <Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </div>
    </div>
);


// ============================================================================
// 3. MAIN PAGE COMPONENT
// This is the main JSX for your page.
// ============================================================================
const RestaurantDashboardPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Table & Occupancy Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-3xl mx-auto">
            Actionable insights for restaurants: manage seating, reduce waiting times, and optimize space utilization.
          </p>
        </div>

        {/* --- KPI Cards --- */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
          <KpiCard title="Total Tables" value={totalTables} icon={Maximize} />
          <KpiCard title="Occupied" value={occupiedTables} icon={Users} />
          <KpiCard title="Free" value={freeTables} icon={Users} />
          <KpiCard title="Occupancy %" value={`${occupancyPercentage}%`} icon={Percent} />
          <KpiCard title="Avg. Wait Time" value={`${avgWaitingTime} min`} icon={Clock} />
          <KpiCard title="Table Turnover" value={`${avgTableTurnover}x`} icon={Repeat} />
        </div>

        {/* --- Alert Box --- */}
        {avgWaitingTime > 10 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-8 flex items-center shadow-lg" role="alert">
            <AlertTriangle className="h-6 w-6 mr-3"/>
            <div>
              <p className="font-bold">High Wait Times</p>
              <p>Average waiting time is over 10 minutes. Consider opening overflow seating or streamlining kitchen orders.</p>
            </div>
          </div>
        )}

        {/* --- Charts --- */}
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Average Waiting Time by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={avgWaitTimeByHourData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }} />
                <Legend />
                <Line type="monotone" dataKey="waitTime" name="Wait Time (min)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Occupancy by Time of Day</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyByTimeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }} />
                <Legend />
                <Bar dataKey="occupied" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Seating Layout --- */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Live Seating Layout</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-4">
                {tableData.map((table) => (
                    <div key={table.id} className="relative group flex items-center justify-center">
                        {/* The visible table box */}
                        <div
                            className={`
                                h-16 w-16 rounded-md flex items-center justify-center font-bold text-white text-lg
                                transition-transform duration-200 group-hover:scale-110
                                ${table.status === 'free'
                                    ? 'bg-green-500 shadow-lg shadow-green-500/40' // Green with glow
                                    : 'bg-red-500 animate-pulse' // Red with pulse
                                }
                            `}
                        >
                            {table.id}
                        </div>
                        {/* The tooltip (hidden by default) */}
                        <div 
                            className="absolute bottom-full mb-2 w-max bg-gray-900 text-white text-xs rounded-md py-1.5 px-3 opacity-0 
                                       group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10
                                       transform -translate-x-1/2 left-1/2"
                        >
                            <p><strong>Table:</strong> {table.id}</p>
                            <p><strong>Status:</strong> <span className="capitalize">{table.status}</span></p>
                            <p><strong>Turnover:</strong> {table.turnover}x</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </main>
  );
};

export default RestaurantDashboardPage;