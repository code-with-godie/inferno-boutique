'use client';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

function MyLineChart() {
  const data = [
    {
      name: 'Sun',
      visit: 3000,
      click: 2000,
    },
    {
      name: 'Mon',
      visit: 2678,
      click: 4560,
    },
    {
      name: 'Tue',
      visit: 1457,
      click: 5000,
    },
    {
      name: 'Wed',
      visit: 2345,
      click: 6370,
    },
    {
      name: 'Thur',
      visit: 5000,
      click: 4345,
    },
    {
      name: 'Fri',
      visit: 3574,
      click: 3770,
    },
    {
      name: 'Sat',
      visit: 4300,
      click: 4500,
    },
  ];
  return (
    <div className=' bg-bgSoft p-4 h-96 rounded-md shrink-0'>
      <h1 className=' capitalize text-lg text-textSoft '>weekly recap</h1>
      <ResponsiveContainer
        width='100%'
        height='90%'
      >
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey='name'
            stroke='#0284C7'
          />
          <YAxis stroke='#0284C7' />
          <Tooltip contentStyle={{ background: '#0284C7', border: 'none' }} />
          <Legend />
          <Line
            type='monotone'
            dataKey='visit'
            stroke='#055781'
          />
          <Line
            type='monotone'
            dataKey='click'
            stroke='#ffffff'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyLineChart;
