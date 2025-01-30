/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';// @ts-ignore
import { FundsData } from "../types/fund";

export default function FundPerformanceTable({
  fundsData,
}: {
  fundsData: FundsData;
}) {
  const [selectedFund, setSelectedFund] = useState<number>(0);
  const [selectedDataType, setSelectedDataType] = useState<
    "TVPI_ratio" | "MOIC"
  >("TVPI_ratio");
  const [selectedMetric, setSelectedMetric] = useState<string>("");
  const [showChart, setShowChart] = useState<boolean>(false);

  const tableData = useMemo(() => {
    const fund = fundsData.funds[selectedFund];
    return fund[selectedDataType];
  }, [fundsData, selectedFund, selectedDataType]);

  const columns = useMemo(() => {
    if (Object.keys(tableData).length === 0) return [];
    return Object.keys(tableData[Object.keys(tableData)[0]]);
  }, [tableData]);

  const chartData = useMemo(() => {
    return Object.entries(tableData).map(([date, values]) => ({
      date,
      // @ts-expect-error
      [selectedMetric]: parseFloat(values[selectedMetric as keyof typeof values] as string) || 0,
    }));
  }, [tableData, selectedMetric]);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 items-center">
        <Select onValueChange={(value) => setSelectedFund(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Fund" />
          </SelectTrigger>
          <SelectContent>

            {fundsData.funds.map((fund: any, index: number) => (
              <SelectItem key={index} value={index.toString()}>
                {fund.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            setSelectedDataType(value as "TVPI_ratio" | "MOIC");
            setSelectedMetric("");
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Data Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TVPI_ratio">TVPI Ratio</SelectItem>
            <SelectItem value="MOIC">MOIC</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={setSelectedMetric}
          disabled={!selectedDataType}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Metric" />
          </SelectTrigger>
          <SelectContent>
            {columns.map((column) => (
              <SelectItem key={column} value={column}>
                {column}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Switch
            id="chart-mode"
            checked={showChart}
            onCheckedChange={setShowChart}
          />
          <Label htmlFor="chart-mode">Show Chart</Label>
        </div>
      </div>

      {showChart && selectedMetric ? (
        <div className="h-[400px] w-full">
          <ChartContainer config={{}} className="h-[400px] ">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date"
                tickMargin={8}
              />

              <YAxis
                tickMargin={8}
                domain={['auto', 'auto']}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone"
                dataKey={selectedMetric}
                stroke={`hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`}
                activeDot={{ r: 4 }}
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table className="h-[300px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                {columns.map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(tableData).map(([date, values]) => (
                <TableRow key={date}>
                  <TableCell className="font-medium">{date}</TableCell>
                  {columns.map((column) => (
                    <TableCell key={column}>

                      {values[column as keyof typeof values]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

