import React from 'react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ComposedChart,
} from 'recharts';

export interface LineChartProps {
  data: any[];
  xKey: string;
  series: {
    key: string;
    label: string;
    color: string;
    strokeWidth?: number;
    strokeDasharray?: string;
  }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showDeficitArea?: boolean;
  valueFormatter?: (val: number) => string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xKey,
  series,
  height = 240,
  showGrid = true,
  showLegend = true,
  showDeficitArea = false,
  valueFormatter = (v) => v.toLocaleString(),
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />}
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'JetBrains Mono' }}
            tickLine={false}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'JetBrains Mono' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '11px',
              fontFamily: 'Inter',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            }}
            formatter={(value: any, name: any) => [valueFormatter(Number(value)), name]}
            labelStyle={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px', fontFamily: 'JetBrains Mono' }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              iconType="circle"
              iconSize={8}
            />
          )}

          {showDeficitArea && series.length >= 2 && (
            <Area
              type="monotone"
              dataKey={series[0].key}
              fill="#fee2e2"
              stroke="none"
              fillOpacity={0.6}
            />
          )}

          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={s.strokeWidth || 2}
              strokeDasharray={s.strokeDasharray}
              dot={{ r: 3, fill: s.color, strokeWidth: 1 }}
              activeDot={{ r: 5, stroke: '#ffffff', strokeWidth: 2 }}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
