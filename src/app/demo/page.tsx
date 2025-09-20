// /src/app/demo/page.tsx

"use client";

import React, { useMemo } from 'react';
import dataJson from "../../../data/dummy-analytics.json";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { 
  Users, BarChart3, DollarSign, Percent, TrendingUp, AlertTriangle, 
  PieChart as PieChartIcon, UserPlus
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface AnalyticsData {
  date: string;
  visitors: number;
  orders: number;
  revenue: number;
  avgOrder: number;
  conversionRate: number;
  channel: string;
  country: string;
  newCustomers: number;
  repeatCustomers: number;
}

// --- DATA PROCESSING & HOOKS ---
// Using a hook to memoize data processing, ensuring it runs only once.
const useAnalyticsData = () => {
  return useMemo(() => {
    const data: AnalyticsData[] = dataJson as AnalyticsData[];

    // KPIs
    const totalVisitors = data.reduce((sum, d) => sum + d.visitors, 0);
    const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);
    const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
    const avgConversion = data.reduce((sum, d) => sum + d.conversionRate, 0) / data.length;

    // Calculate trends (comparing last day to previous day)
    const lastDay = data[data.length - 1];
    const prevDay = data[data.length - 2];
    const visitorTrend = ((lastDay.visitors - prevDay.visitors) / prevDay.visitors) * 100;
    const orderTrend = ((lastDay.orders - prevDay.orders) / prevDay.orders) * 100;
    const revenueTrend = ((lastDay.revenue - prevDay.revenue) / prevDay.revenue) * 100;
    const conversionTrend = ((lastDay.conversionRate - prevDay.conversionRate) / prevDay.conversionRate) * 100;

    // Forecast Data (simple projection)
    const avgDailyRevenue = data.slice(-7).reduce((sum, d) => sum + d.revenue, 0) / 7;
    const forecastData = Array.from({ length: 7 }).map((_, i) => ({
      date: `Forecast D${i + 1}`,
      revenue: avgDailyRevenue * (1 + (Math.random() - 0.4) / 10), // a bit of random variation
      forecast: avgDailyRevenue * (1 + (Math.random() - 0.4) / 10) // separate key for forecast styling
    }));
    const combinedRevenueData = [...data.map(d => ({ date: d.date, revenue: d.revenue })), ...forecastData];
    
    // Channel Data for Pie Chart
    const channelData = Object.values(
      data.reduce((acc: Record<string, { name: string; value: number }>, d) => {
        acc[d.channel] = acc[d.channel] || { name: d.channel, value: 0 };
        acc[d.channel].value += d.visitors;
        return acc;
      }, {})
    );

    return {
      data,
      kpis: [
        { title: "Total Visitors", value: totalVisitors.toLocaleString(), trend: visitorTrend, icon: Users },
        { title: "Total Orders", value: totalOrders.toLocaleString(), trend: orderTrend, icon: BarChart3 },
        { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, trend: revenueTrend, icon: DollarSign },
        { title: "Avg. Conversion", value: `${avgConversion.toFixed(1)}%`, trend: conversionTrend, icon: Percent },
      ],
      revenueTrend,
      channelData,
      combinedRevenueData,
    };
  }, []);
};


// --- UI COMPONENTS ---

// KPI Card Component
const KpiCard = ({ title, value, trend, icon: Icon }: { title: string, value: string, trend: number, icon: React.ElementType }) => (
  <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/80 shadow-lg
                  transition-all duration-300 hover:border-cyan-400/60 hover:shadow-cyan-400/10 hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <div className="flex flex-col">
        <span className="text-slate-400 text-sm">{title}</span>
        <span className="text-3xl font-bold text-white mt-1">{value}</span>
      </div>
      <Icon className="w-8 h-8 text-slate-500" />
    </div>
    <div className={`flex items-center mt-4 text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
      <TrendingUp className="w-4 h-4 mr-1" />
      <span>{trend.toFixed(1)}% vs yesterday</span>
    </div>
  </div>
);

// Chart Card Wrapper
const AnalyticsChartCard = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/80 shadow-lg">
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 text-cyan-400 mr-3" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    {children}
  </div>
);

// Manually define the types for the custom tooltip payload and props
interface CustomPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomPayload[];
  label?: string;
}

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 p-3 rounded-md border border-slate-700 shadow-lg">
        <p className="text-sm text-slate-300 font-medium">{`Date: ${label}`}</p>
        {payload.map((pld, index: number) => (
          <p key={index} style={{ color: pld.color }} className="text-sm">
            {`${pld.name}: ${pld.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};


// --- MAIN PAGE COMPONENT ---
export default function DemoPage() {
  const { data, kpis, revenueTrend, channelData, combinedRevenueData } = useAnalyticsData();
  const PIE_CHART_COLORS = ["#22d3ee", "#3b82f6", "#a855f7", "#f59e0b"];

  return (
    <main className="bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Idraxiom Analytics Studio
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Explore how Idraxiom turns multi-dimensional data into deeper insights and powerful analytics.
          </p>
        </div>

        {/* Alert Banner */}
        <div className={`bg-opacity-20 border rounded-lg p-4 mb-10 flex items-center justify-center
                        ${revenueTrend >= 0 ? 'bg-green-500 border-green-500/50 text-green-300' : 'bg-red-500 border-red-500/50 text-red-300'}`}>
          {revenueTrend >= 0 ? 
            <TrendingUp className="w-5 h-5 mr-3" /> : 
            <AlertTriangle className="w-5 h-5 mr-3" />}
          <p className="font-semibold text-sm">
            Revenue {revenueTrend >= 0 ? 'increased' : 'dropped'} by {Math.abs(revenueTrend).toFixed(1)}% compared to yesterday.
          </p>
        </div>
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpis.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <AnalyticsChartCard title="Visitors Trend" icon={Users}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12}/>
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="visitors" stroke="#22d3ee" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>

          <AnalyticsChartCard title="Revenue Trend" icon={DollarSign}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsChartCard>
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
                 <AnalyticsChartCard title="Visitors by Channel" icon={PieChartIcon}>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                        <Pie data={channelData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false}>
                            {channelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconSize={10} wrapperStyle={{fontSize: '14px'}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </AnalyticsChartCard>
            </div>
            <div className="lg:col-span-3">
                <AnalyticsChartCard title="New vs. Repeat Customers" icon={UserPlus}>
                    <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12}/>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconSize={10} wrapperStyle={{fontSize: '14px'}}/>
                        <Bar dataKey="newCustomers" stackId="a" fill="#22d3ee" name="New" />
                        <Bar dataKey="repeatCustomers" stackId="a" fill="#3b82f6" name="Repeat" />
                    </BarChart>
                    </ResponsiveContainer>
                </AnalyticsChartCard>
            </div>
        </div>

        {/* Forecast Chart */}
        <div className="w-full">
            <AnalyticsChartCard title="Revenue Forecast (Next 7 Days)" icon={TrendingUp}>
                <ResponsiveContainer width="100%" height={350}>
                <LineChart data={combinedRevenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconSize={10} wrapperStyle={{fontSize: '14px'}}/>
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} name="Actual Revenue" />
                    <Line type="monotone" dataKey="forecast" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" name="Forecasted" />
                </LineChart>
                </ResponsiveContainer>
            </AnalyticsChartCard>
        </div>
      </div>
    </main>
  );
}