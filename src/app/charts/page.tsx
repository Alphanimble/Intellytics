"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import data from "../../../public/data/bazingo.json";
console.log(data[0].compareMetrics[0]);

const chartConfig = {
  fundI: {
    label: "Fund I",
    color: "hsl(var(--chart-1))",
  },
  fundII: {
    label: "Fund II",
    color: "hsl(var(--chart-2))",
  },
  fundIII: {
    label: "Fund III",
    color: "hsl(var(--chart-3))",
  },
  fundIV: {
    label: "Fund IV",
    color: "hsl(var(--chart-4))",
  },
};

function processData(metricIndex) {
  const metricData = data[0].compareMetrics[metricIndex];
  return Object.entries(metricData)
    .filter(([key, value]) => key.includes("_") && !isNaN(value))
    .map(([key, value]) => {
      const [quarter, year] = key.split("_");
      return {
        year: `${year} Q${quarter}`,
        value: Number(value),
      };
    });
}

function MetricChart({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: any[];
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px]">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default function FundMetricsDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Fund Performance Metrics</h1>
      <div className="grid grid-cols-2 gap-4">
        <MetricChart
          title="Gross Revenue"
          description="Quarterly Gross Revenue"
          data={processData(0)}
        />
        <MetricChart
          title="Net Revenue"
          description="Quarterly Net Revenue"
          data={processData(1)}
        />
        <MetricChart
          title="Direct Cost"
          description="Quarterly Direct Cost"
          data={processData(2)}
        />
        <MetricChart
          title="Gross Margin"
          description="Quarterly Gross Margin"
          data={processData(3)}
        />
      </div>
    </div>
  );
}
