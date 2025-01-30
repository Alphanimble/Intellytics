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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import bizongo from "../../../public/charts/bizongo.json";
import fibe from "../../../public/charts/fibe.json";
import lenscart from "../../../public/charts/lenscart.json";
import Pixis from "../../../public/charts/Pixis.json";

import { useState } from "react";

console.log(bizongo[0].compareMetrics[0]);

function processData(metricIndex: number, data: any[]) {
  const metricData = data[0].compareMetrics[metricIndex];
  return Object.entries(metricData)// @ts-expect-error
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
  color,
}: {
  title: string;
  description: string;
  data: any[];
  color: string;
}) {
  const formatToMillions = (value: number) => `${value / 1_000_000}M`;

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
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatToMillions} // Format Y-axis values to millions
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color || "hsl(var(--chart-1))"}
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
  const [company, setCompany] = useState(bizongo);

  const handleCompanyChange = (value: string) => {
    switch (value) {
      case "bizongo":
        setCompany(bizongo);
        break;
      case "fibe":
        setCompany(fibe);
        break;
      case "lenscart":
        setCompany(lenscart);
        break;
      case "pixis":
        setCompany(Pixis);
        break;
      default:
        setCompany(bizongo);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fund Performance Metrics</h1>
        <Select onValueChange={handleCompanyChange} defaultValue="bizongo">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bizongo">Bizongo</SelectItem>
            <SelectItem value="fibe">Fibe</SelectItem>
            <SelectItem value="lenscart">Lenscart</SelectItem>
            <SelectItem value="pixis">Pixis</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <MetricChart
          title="Gross Revenue"
          description="Quarterly Gross Revenue"
          data={processData(0, company)}
          color="hsl(var(--chart-1))"
        />
        <MetricChart
          title="Net Revenue"
          description="Quarterly Net Revenue"
          data={processData(1, company)}
          color="hsl(var(--chart-2))"
        />
        <MetricChart
          title="Direct Cost"
          description="Quarterly Direct Cost"
          data={processData(2, company)}
          color="hsl(var(--chart-3))"
        />
        <MetricChart
          title="Gross Margin"
          description="Quarterly Gross Margin"
          data={processData(3, company)}
          color="hsl(var(--chart-4))"
        />
      </div>
    </div>
  );
}
