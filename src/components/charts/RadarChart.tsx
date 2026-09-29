import React from 'react';
import {
  ResponsiveContainer,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from 'recharts';

export interface RadarChartProps {
  data: {
    subject: string;
    industry: number;
    curriculum: number;
    trainee: number;
    fullMark?: number;
  }[];
  height?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, height = 280 }) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#334155', fontSize: 10, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
          <Radar
            name="Live Industry Demand %"
            dataKey="industry"
            stroke="#0d9488"
            fill="#0d9488"
            fillOpacity={0.25}
          />
          <Radar
            name="Curriculum Coverage %"
            dataKey="curriculum"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.2}
          />
          <Radar
            name="Trainee Exit Competence %"
            dataKey="trainee"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.15}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '11px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
            iconType="circle"
            iconSize={8}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};
