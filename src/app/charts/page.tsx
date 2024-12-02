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

const tvpiData = [
  { year: "Yr 0", fundI: 0.7, fundII: 0.9, fundIII: 0.9, fundIV: 1.1 },
  { year: "Yr 1", fundI: 0.7, fundII: 1.2, fundIII: 1.0, fundIV: 0.9 },
  { year: "Yr 2", fundI: 0.8, fundII: 1.3, fundIII: 1.2, fundIV: 1.7 },
  { year: "Yr 3", fundI: 1.1, fundII: 1.3, fundIII: 1.5, fundIV: 1.48 },
  { year: "Yr 4", fundI: 1.2, fundII: 1.5, fundIII: 1.5, fundIV: null },
  { year: "Yr 5", fundI: 1.3, fundII: 1.5, fundIII: 2.5, fundIV: null },
  { year: "Yr 6", fundI: 1.3, fundII: 1.7, fundIII: 2.2, fundIV: null },
  { year: "Yr 7", fundI: 2.1, fundII: 2.0, fundIII: 2.2, fundIV: null },
  { year: "Yr 8", fundI: 2.1, fundII: 2.3, fundIII: null, fundIV: null },
  { year: "Yr 9", fundI: 1.8, fundII: 2.6, fundIII: null, fundIV: null },
  { year: "Yr 10", fundI: 1.6, fundII: 2.6, fundIII: null, fundIV: null },
  { year: "Yr 11", fundI: 1.8, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 12", fundI: 1.7, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 13", fundI: 1.7, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 14", fundI: 1.7, fundII: null, fundIII: null, fundIV: null },
];

const moicData = [
  { year: "Yr 0", fundI: 1.0, fundII: 1.0, fundIII: 1.0, fundIV: 1.2 },
  { year: "Yr 1", fundI: 1.0, fundII: 1.4, fundIII: 1.1, fundIV: 1.1 },
  { year: "Yr 2", fundI: 1.2, fundII: 1.5, fundIII: 1.3, fundIV: 1.9 },
  { year: "Yr 3", fundI: 1.7, fundII: 1.4, fundIII: 1.6, fundIV: 1.6 },
  { year: "Yr 4", fundI: 1.5, fundII: 1.7, fundIII: 1.7, fundIV: null },
  { year: "Yr 5", fundI: 1.6, fundII: 1.7, fundIII: 3.0, fundIV: null },
  { year: "Yr 6", fundI: 1.6, fundII: 2.0, fundIII: 2.6, fundIV: null },
  { year: "Yr 7", fundI: 2.5, fundII: 2.3, fundIII: 2.5, fundIV: null },
  { year: "Yr 8", fundI: 2.6, fundII: 2.7, fundIII: null, fundIV: null },
  { year: "Yr 9", fundI: 2.2, fundII: 3.0, fundIII: null, fundIV: null },
  { year: "Yr 10", fundI: 2.0, fundII: 2.9, fundIII: null, fundIV: null },
  { year: "Yr 11", fundI: 2.3, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 12", fundI: 2.2, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 13", fundI: 2.2, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 14", fundI: 2.2, fundII: null, fundIII: null, fundIV: null },
];

const irrData = [
  { year: "Yr 0", fundI: 0, fundII: 0, fundIII: null, fundIV: null },
  { year: "Yr 1", fundI: 0, fundII: 16.2, fundIII: null, fundIV: null },
  { year: "Yr 2", fundI: 0, fundII: 18.2, fundIII: 10.6, fundIV: 55.0 },
  { year: "Yr 3", fundI: 3.5, fundII: 9.8, fundIII: 20.6, fundIV: 19.6 },
  { year: "Yr 4", fundI: 7.6, fundII: 12.0, fundIII: 13.3, fundIV: null },
  { year: "Yr 5", fundI: 12.1, fundII: 10.3, fundIII: 25.3, fundIV: null },
  { year: "Yr 6", fundI: 7.9, fundII: 13.3, fundIII: 16.4, fundIV: null },
  { year: "Yr 7", fundI: 17.7, fundII: 14.0, fundIII: 15.0, fundIV: null },
  { year: "Yr 8", fundI: 15.6, fundII: 14.7, fundIII: null, fundIV: null },
  { year: "Yr 9", fundI: 9.9, fundII: 15.4, fundIII: null, fundIV: null },
  { year: "Yr 10", fundI: 7.7, fundII: 14.9, fundIII: null, fundIV: null },
  { year: "Yr 11", fundI: 8.6, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 12", fundI: 7.8, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 13", fundI: 7.8, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 14", fundI: 7.7, fundII: null, fundIII: null, fundIV: null },
];

const dpiData = [
  { year: "Yr 0", fundI: 0.0, fundII: null, fundIII: 0.0, fundIV: null },
  { year: "Yr 1", fundI: 0.0, fundII: null, fundIII: 0.0, fundIV: null },
  { year: "Yr 2", fundI: 0.0, fundII: null, fundIII: 0.0, fundIV: null },
  { year: "Yr 3", fundI: 0.0, fundII: null, fundIII: 0.0, fundIV: 0.02 },
  { year: "Yr 4", fundI: 0.0, fundII: null, fundIII: 0.0, fundIV: null },
  { year: "Yr 5", fundI: 0.0, fundII: null, fundIII: 0.0, fundIV: null },
  { year: "Yr 6", fundI: 0.0, fundII: 0.5, fundIII: 0.1, fundIV: null },
  { year: "Yr 7", fundI: 0.3, fundII: 0.5, fundIII: 0.2, fundIV: null },
  { year: "Yr 8", fundI: 0.4, fundII: 1.0, fundIII: null, fundIV: null },
  { year: "Yr 9", fundI: 0.5, fundII: 1.2, fundIII: null, fundIV: null },
  { year: "Yr 10", fundI: 0.8, fundII: 1.2, fundIII: null, fundIV: null },
  { year: "Yr 11", fundI: 1.2, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 12", fundI: 1.5, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 13", fundI: 1.6, fundII: null, fundIII: null, fundIV: null },
  { year: "Yr 14", fundI: 1.6, fundII: null, fundIII: null, fundIV: null },
];

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
        <ChartContainer config={chartConfig} className="h-[300px]">
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
              dataKey="fundI"
              stroke="var(--color-fundI)"
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="fundII"
              stroke="var(--color-fundII)"
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="fundIII"
              stroke="var(--color-fundIII)"
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="fundIV"
              stroke="var(--color-fundIV)"
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
      <div className="grid grid-cols-2  gap-4">
        <MetricChart
          title="TVPI (Pre-Carry)"
          description="Total Value to Paid-In Capital"
          data={tvpiData}
        />
        <MetricChart
          title="MOIC"
          description="Multiple on Invested Capital"
          data={moicData}
        />
        <MetricChart
          title="Net IRR"
          description="Internal Rate of Return (%)"
          data={irrData}
        />
        <MetricChart
          title="DPI"
          description="Distributions to Paid-In Capital"
          data={dpiData}
        />
      </div>
    </div>
  );
}
