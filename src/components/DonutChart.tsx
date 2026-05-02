'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string;
}

const COLOR_DOT: Record<string, string> = {
  primary: 'bg-gradient-to-br from-[#8a4cfc] to-[#bd9dff]',
  secondary: 'bg-gradient-to-br from-[#40ceed] to-[#53ddfc]',
  tertiary: 'bg-gradient-to-br from-[#58e7ab] to-[#9bffce]',
};

export default function DonutChart({ data, centerLabel, centerValue }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="relative flex-1 min-h-[180px]">
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

      {/* Legend — name + percentage for each slice */}
      <ul className="flex flex-col gap-2 px-1">
        {data.map((entry, idx) => {
          const pct = total > 0 ? (entry.value / total) * 100 : 0;
          return (
            <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${COLOR_DOT[entry.color] ?? COLOR_DOT.primary}`} />
              <span className="text-on-surface-variant truncate flex-1 min-w-0">{entry.name}</span>
              <span className="font-mono font-semibold text-on-surface tabular-nums">
                {pct.toFixed(1)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
