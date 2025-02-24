"use client";
import { getCatDistribution } from "@/lib/lib";
import React, { useCallback, useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Cell, Label } from "recharts";

const MyPieChart = () => {
  const [data, setData] = useState([]);
  const getCategoryDistribution = useCallback(async () => {
    try {
      const cat = await getCatDistribution();
      setData(cat);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCategoryDistribution();
  }, [getCategoryDistribution]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <ResponsiveContainer width='100%' height='90%'>
      <PieChart width={730} height={250}>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={80}
          fill='#8884d8'
          labelLine={false}
          label={(entry) => entry.name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {/* <Label value='Categories' offset={0} position='center' /> */}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MyPieChart;
