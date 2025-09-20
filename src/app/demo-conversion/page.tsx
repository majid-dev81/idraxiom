"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  // TooltipProps is removed as we define our own to avoid conflicts
} from "recharts";
import {
  Users,
  ShoppingCart,
  Percent,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

// =============== Types ===============
type KpiCardProps = {
  title: string;
  value: string | number;
  icon: React.ElementType;
  accent?: "cyan" | "violet" | "lime" | "orange";
};

type DayData = {
  day: string;
  visitors: number;
  orders: number;
  revenue: number; // SAR
};

type FunnelStage = {
  name: string;
  count: number;
};

type ConversionTrend = {
  day: string;
  rate: number;
};

// --- FIX STARTS HERE ---
// Define a specific interface for our custom tooltip's props
// This avoids conflicts with the TooltipProps from the recharts library.
interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
    // Payload can contain other properties, but we only need 'value'.
  }[];
  label?: string;
}
// --- FIX ENDS HERE ---

// =============== Dummy Data ===============
const byDay: DayData[] = [
  { day: "Mon", visitors: 820, orders: 38, revenue: 4550 },
  { day: "Tue", visitors: 910, orders: 42, revenue: 5120 },
  { day: "Wed", visitors: 860, orders: 40, revenue: 4980 },
  { day: "Thu", visitors: 980, orders: 55, revenue: 7025 },
  { day: "Fri", visitors: 1200, orders: 70, revenue: 9100 },
  { day: "Sat", visitors: 1100, orders: 64, revenue: 8280 },
  { day: "Sun", visitors: 740, orders: 30, revenue: 3450 },
];

const funnel: FunnelStage[] = [
  { name: "Visitors", count: 5600 },
  { name: "Product Views", count: 4100 },
  { name: "Add to Cart", count: 2200 },
  { name: "Checkout", count: 1500 },
  { name: "Purchases", count: 1039 },
];

// =============== Helpers ===============
const formatSAR = (n: number) =>
  new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(n);

const toPct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;

// =============== KPIs Hook ===============
const useKpis = () => {
  return useMemo(() => {
    const totalVisitors = byDay.reduce((s, d) => s + d.visitors, 0);
    const totalOrders = byDay.reduce((s, d) => s + d.orders, 0);
    const totalRevenue = byDay.reduce((s, d) => s + d.revenue, 0);
    const convRate = totalVisitors > 0 ? (totalOrders / totalVisitors) * 100 : 0;
    const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const withRate = byDay.map((d) => ({
      ...d,
      rate: d.visitors > 0 ? (d.orders / d.visitors) * 100 : 0,
    }));
    const bestDay = withRate.reduce(
      (best, cur) => (cur.rate > best.rate ? cur : best),
      withRate[0]
    );

    const largestDrop = (() => {
      let maxDrop = 0;
      let stage = "";
      for (let i = 0; i < funnel.length - 1; i++) {
        const from = funnel[i].count;
        const to = funnel[i + 1].count;
        const drop = from > 0 ? ((from - to) / from) * 100 : 0;
        if (drop > maxDrop) {
          maxDrop = drop;
          stage = `${funnel[i].name} → ${funnel[i + 1].name}`;
        }
      }
      return { stage, drop: maxDrop };
    })();

    return {
      totalVisitors,
      totalOrders,
      totalRevenue,
      convRate,
      aov,
      bestDay,
      largestDrop,
    };
  }, []);
};

// =============== Components ===============
const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon: Icon,
  accent = "cyan",
}) => {
  const accents = {
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-300",
    violet:
      "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-300",
    lime: "from-lime-500/20 to-lime-500/5 border-lime-500/30 text-lime-300",
    orange:
      "from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-300",
  } as const;

  return (
    <div
      className={`bg-gradient-to-br ${accents[accent]} rounded-xl p-5 border shadow-lg flex items-center justify-between`}
    >
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-2xl md:text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-md bg-white/5">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

const FunnelBar: React.FC<{ stage: FunnelStage; max: number }> = ({
  stage,
  max,
}) => {
  const pct = max > 0 ? (stage.count / max) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span>{stage.name}</span>
        <span>
          {stage.count.toLocaleString()} • {toPct(pct, 0)}
        </span>
      </div>
      <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

// Use our new custom interface for the tooltip component's props.
const RateTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length && label) {
    const value = payload[0].value;

    if (value !== null && value !== undefined) {
      return (
        <div className="bg-slate-900 text-slate-200 text-sm p-3 rounded-md border border-slate-700">
          <div className="font-medium">Day: {label}</div>
          <div>Conversion: {toPct(value)}</div>
        </div>
      );
    }
  }

  return null;
};

// =============== Page ===============
export default function ConversionInsightsPage() {
  const {
    totalVisitors,
    totalOrders,
    totalRevenue,
    convRate,
    aov,
    bestDay,
    largestDrop,
  } = useKpis();

  const conversionTrend: ConversionTrend[] = byDay.map((d) => ({
    day: d.day,
    rate: d.visitors > 0 ? (d.orders / d.visitors) * 100 : 0,
  }));

  const maxFunnel = funnel[0].count;

  return (
    <main className="min-h-screen bg-[#0D1117] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Conversion Insights Demo
          </h1>
          <p className="text-slate-400">
            Track visitors → actions → purchases and uncover bottlenecks that
            impact revenue.
          </p>
        </header>

        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <KpiCard
            title="Visitors"
            value={totalVisitors.toLocaleString()}
            icon={Users}
            accent="cyan"
          />
          <KpiCard
            title="Orders"
            value={totalOrders.toLocaleString()}
            icon={ShoppingCart}
            accent="violet"
          />
          <KpiCard
            title="Conv. Rate"
            value={toPct(convRate)}
            icon={Percent}
            accent="lime"
          />
          <KpiCard
            title="AOV"
            value={formatSAR(aov)}
            icon={DollarSign}
            accent="orange"
          />
        </section>

        {/* Main grid */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Funnel */}
          <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-cyan-300" />
              <h3 className="text-lg font-semibold">Conversion Funnel</h3>
            </div>
            <div className="space-y-4">
              {funnel.map((stg) => (
                <FunnelBar key={stg.name} stage={stg} max={maxFunnel} />
              ))}
            </div>
          </div>

          {/* Conversion Trend */}
          <div className="lg:col-span-3 bg-slate-800/60 border border-slate-700 rounded-xl p-6">
            <div className="text-lg font-semibold mb-3">
              Conversion Rate by Day
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={conversionTrend}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis tickFormatter={(v) => `${v}%`} stroke="#9ca3af" />
                  <Tooltip content={<RateTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Insights */}
        <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 md:p-6">
          <div className="flex items-center gap-2 text-orange-300 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">Insights</span>
          </div>
          <ul className="list-disc list-inside text-slate-200 space-y-1.5">
            <li>
              Largest drop in funnel at{" "}
              <span className="text-cyan-300 font-semibold">
                {largestDrop.stage}
              </span>{" "}
              (drop {toPct(largestDrop.drop)}).
            </li>
            <li>
              Best conversion day:{" "}
              <span className="text-violet-300 font-semibold">
                {bestDay.day}
              </span>{" "}
              with {toPct(bestDay.rate)}.
            </li>
            <li>
              Estimated Revenue:{" "}
              <span className="text-lime-300 font-semibold">
                {formatSAR(
                  byDay.reduce((s, d) => s + d.revenue, 0)
                )}
              </span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}