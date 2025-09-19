// /src/app/demo-queue/page.tsx
"use client";

import React, { useState, useEffect, FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  UsersIcon,
  ClockIcon,
  CheckIcon, // Corrected: Was UserCheckIcon
  UserMinusIcon,
  ArrowTrendingUpIcon, // Corrected: Was TrendingUpIcon
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// --- TYPES ---
type Person = {
  id: number;
  entryTime: number;
};

type KpiData = {
  queueLength: number;
  avgWaitTime: number;
  servedCount: number;
  abandonedCount: number;
  abandonRate: number;
  maxQueueLength: number;
};

type ChartDataPoint = {
  time: string;
  served: number;
  abandoned: number;
};

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  unit?: string;
  color?: string;
}

// --- SIMULATION CONSTANTS ---
const SIMULATION_TICK_MS = 1000;
const ADD_PERSON_CHANCE = 0.5;
const SERVE_PERSON_CHANCE = 0.3;
const ABANDON_WAIT_THRESHOLD_S = 20;
const ABANDON_CHANCE = 0.15;

// --- KPI CARD COMPONENT ---
const KpiCard: FC<KpiCardProps> = ({ title, value, icon: Icon, unit = '', color = 'text-cyan-400' }) => (
  <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 hover:border-cyan-400/50 transition">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      {Icon && <Icon className={`h-6 w-6 ${color}`} />}
    </div>
    <p className="text-3xl font-bold text-white">
      {value}
      <span className="text-lg font-medium text-slate-400 ml-1">{unit}</span>
    </p>
  </div>
);

export default function DemoQueuePage() {
  const [queue, setQueue] = useState<Person[]>([]);
  const [servedPeople, setServedPeople] = useState<{ id: number; waitTime: number }[]>([]);
  const [abandonedPeople, setAbandonedPeople] = useState<{ id: number; waitTime: number }[]>([]);
  const [simulationTime, setSimulationTime] = useState(0);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [kpis, setKpis] = useState<KpiData>({
    queueLength: 0, avgWaitTime: 0, servedCount: 0,
    abandonedCount: 0, abandonRate: 0, maxQueueLength: 0,
  });

  // --- SIMULATION LOOP ---
  useEffect(() => {
    const simulationInterval = setInterval(() => {
      setSimulationTime(prevTime => prevTime + 1);

      setQueue(currentQueue => {
        let queueAfterServing = [...currentQueue];

        // Serve someone
        if (queueAfterServing.length > 0 && Math.random() < SERVE_PERSON_CHANCE) {
          const personServed = queueAfterServing.shift();
          if (personServed) {
            const waitTime = simulationTime - personServed.entryTime;
            setServedPeople(prev => [...prev, { id: personServed.id, waitTime }]);
          }
        }

        // Abandon
        const stillWaiting: Person[] = [];
        const justAbandoned: { id: number; waitTime: number }[] = [];
        queueAfterServing.forEach(person => {
          const waitTime = simulationTime - person.entryTime;
          if (waitTime > ABANDON_WAIT_THRESHOLD_S && Math.random() < ABANDON_CHANCE) {
            justAbandoned.push({ id: person.id, waitTime });
          } else {
            stillWaiting.push(person);
          }
        });
        if (justAbandoned.length > 0) setAbandonedPeople(prev => [...prev, ...justAbandoned]);

        // Add new
        let finalQueue = stillWaiting;
        if (Math.random() < ADD_PERSON_CHANCE) {
          finalQueue = [...finalQueue, { id: Date.now(), entryTime: simulationTime }];
        }

        return finalQueue;
      });
    }, SIMULATION_TICK_MS);

    return () => clearInterval(simulationInterval);
  }, [simulationTime]);

  // --- KPI + CHART UPDATE ---
  useEffect(() => {
    const servedCount = servedPeople.length;
    const abandonedCount = abandonedPeople.length;
    const totalOutcomes = servedCount + abandonedCount;
    const totalWaitTime = servedPeople.reduce((sum, p) => sum + p.waitTime, 0);

    setKpis(prev => ({
      queueLength: queue.length,
      avgWaitTime: servedCount > 0 ? totalWaitTime / servedCount : 0,
      servedCount,
      abandonedCount,
      abandonRate: totalOutcomes > 0 ? (abandonedCount / totalOutcomes) * 100 : 0,
      maxQueueLength: Math.max(prev.maxQueueLength, queue.length),
    }));

    if (simulationTime > 0 && simulationTime % 5 === 0) {
      const newPoint: ChartDataPoint = {
        time: `${Math.floor(simulationTime / 60)}m ${simulationTime % 60}s`,
        served: servedCount,
        abandoned: abandonedCount,
      };
      setChartData(prev => [...prev.slice(-19), newPoint]);
    }
  }, [queue.length, servedPeople, abandonedPeople, simulationTime]); // Corrected: Removed duplicate servedPeople

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Queue & Service Monitoring
          </h1>
          <p className="mt-3 text-slate-400 text-lg">Real-time simulation with business insights</p>
        </header>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <KpiCard title="People in Queue" value={kpis.queueLength} icon={UsersIcon} />
          <KpiCard title="Avg. Wait Time" value={kpis.avgWaitTime.toFixed(1)} unit="s" icon={ClockIcon} color="text-violet-400"/>
          <KpiCard title="Served" value={kpis.servedCount} icon={CheckIcon} color="text-green-400"/>
          <KpiCard title="Abandoned" value={kpis.abandonedCount} icon={UserMinusIcon} color="text-red-400"/>
          <KpiCard title="Abandon Rate" value={kpis.abandonRate.toFixed(1)} unit="%" icon={ExclamationTriangleIcon} color="text-orange-400"/>
          <KpiCard title="Max Queue" value={kpis.maxQueueLength} icon={ArrowTrendingUpIcon} color="text-cyan-400"/>
        </div>

        {/* Queue Visualizer */}
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 mb-12">
          <h2 className="text-xl font-semibold mb-4 text-white">Live Queue</h2>
          <div className="flex gap-2 flex-wrap">
            <AnimatePresence>
              {queue.map(p => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-lg"
                >
                  {simulationTime - p.entryTime}s
                </motion.div>
              ))}
            </AnimatePresence>
            {queue.length === 0 && (
              <div className="w-full text-center text-slate-500">Queue is empty</div>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Performance Over Time</h2>
          <div className="h-96">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15,23,42,0.9)',
                    border: '1px solid #334155',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9'
                  }}
                />
                <Legend />
                <Bar dataKey="served" stackId="a" fill="#22c55e" name="Served"/>
                <Bar dataKey="abandoned" stackId="a" fill="#ef4444" name="Abandoned"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}