'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string;
}

export default function DonutChart({ data, centerLabel, centerValue }: DonutChartProps) {
  return (
    <div className="relative w-full h-full min-h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="donut-primary" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8a4cfc" />
              <stop offset="100%" stopColor="#bd9dff" />
            </linearGradient>
            <linearGradient id="donut-secondary" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#40ceed" />
              <stop offset="100%" stopColor="#53ddfc" />
            </linearGradient>
            <linearGradient id="donut-tertiary" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#58e7ab" />
              <stop offset="100%" stopColor="#9bffce" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="62%"
            outerRadius="88%"
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, idx) => (
              <Cell key={idx} fill={`url(#donut-${entry.color})`} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center label */}
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && (
            <span className="font-mono text-2xl font-bold text-primary">{centerValue}</span>
          )}
          {centerLabel && (
            <span className="text-xs uppercase tracking-wider text-on-surface-variant mt-1">
              {centerLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
