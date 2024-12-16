"use client";

import React, { useState, useMemo } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  Line,
  TooltipProps,
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import originalData from "../../../public/predictions/lenskart_predictions.json";
import fibe from "../../../public/predictions/fibe_predictions.json";
import bizongo from "../../../public/predictions/bazingo_predictions.json";
import Pixis from "../../../public/predictions/pixis_predictions.json";

// Define the type for the original data points
interface DataPoint {
  ds: string | number; // timestamp
  y: number; // actual value
  yhat1: number; // predicted value
}

// Format timestamp to readable date
const formatDate = (timestamp: string | number): string => {
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Custom Dot Component with Recharts-compatible shape function
const CustomDot = (props: {
  cx?: number;
  cy?: number;
  stroke?: string;
  fill?: string;
}) => {
  const { cx, cy, stroke, fill } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4} // Very small radius
      stroke={stroke}
      fill={fill}
      strokeWidth={2}
    />
  );
};

// Custom Tooltip Component with correct typing and null checks
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border border-gray-700 p-4 rounded-lg shadow-lg">
        <p className="font-bold text-gray-300">{`Date: ${label}`}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className={`
              ${
                entry.name === "Actual Values in Cr"
                  ? "text-purple-600"
                  : "text-green-600"
              }
            `}
          >
            {`${entry.name}: ${
              entry.value !== undefined ? entry.value.toFixed(2) : "N/A"
            }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ScatterAndLineOfBestFitChart() {
  const [tempRange, setTempRange] = useState<[number, number]>([0, 50]);
  const [confirmedRange, setConfirmedRange] = useState<[number, number]>([
    0, 50,
  ]);
  const [selectedCompany, setSelectedCompany] = useState("lenskart");

  // Simulated data for different companies
  const companiesData = {
    lenskart: originalData,
    fibe: fibe,
    bizongo: bizongo,
    pixis: Pixis,
  };

  // Use useMemo to ensure consistent data sampling across server and client renders
  const sampledData = useMemo<DataPoint[]>(() => {
    const selectedData =
      companiesData[selectedCompany as keyof typeof companiesData];
    if (!Array.isArray(selectedData)) {
      console.error(`Data for ${selectedCompany} is not an array`);
      return [];
    }
    return selectedData
      .slice(confirmedRange[0], confirmedRange[1])
      .map((item) => ({
        ...item,
        ds: formatDate(item.ds),
      }));
  }, [confirmedRange, selectedCompany]);

  const handleRangeConfirm = () => {
    setConfirmedRange(tempRange);
  };

  const handleCompanyChange = (value: string) => {
    setSelectedCompany(value as keyof typeof companiesData);
    // Reset the range when changing companies
    const newMax = Array.isArray(
      companiesData[value as keyof typeof companiesData]
    )
      ? companiesData[value as keyof typeof companiesData].length - 1
      : 50;
    setTempRange([0, Math.min(50, newMax)]);
    setConfirmedRange([0, Math.min(50, newMax)]);
  };

  return (
    <div>
      <div className="flex justify-between items-center m-8">
        <h1 className="text-6xl font-bold">Revenue Predictions by Prophet</h1>
        <Select onValueChange={handleCompanyChange} defaultValue="lenskart">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lenskart">Lenskart</SelectItem>
            <SelectItem value="fibe">Fibe</SelectItem>
            <SelectItem value="bizongo">Bizongo</SelectItem>
            <SelectItem value="pixis">Pixis</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mx-auto max-w-3xl mb-4 flex items-center space-x-4">
        <div className="flex-grow">
          <p className="text-sm text-gray-600 mb-2">
            Adjust data range: {tempRange[0]} - {tempRange[1]}
          </p>
          <Slider
            defaultValue={tempRange}
            min={0}
            max={
              Array.isArray(
                companiesData[selectedCompany as keyof typeof companiesData]
              )
                ? companiesData[selectedCompany as keyof typeof companiesData]
                    .length - 1
                : 50
            }
            step={1}
            onValueChange={(value: [number, number]) => setTempRange(value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRangeConfirm}
          className="mt-4"
        >
          <Check className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-center">
        <ResponsiveContainer width="80%" height={600}>
          <ComposedChart data={sampledData}>
            <CartesianGrid />
            <XAxis dataKey="ds" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            {/* Scatter plot of actual values with smaller dots */}
            <Scatter
              name="Actual Values"
              dataKey="y"
              stroke="#8884d8"
              shape={CustomDot}
            />
            {/* Line of best fit */}
            <Line
              name="Predicted Line"
              dataKey="yhat1"
              stroke="#88ca9d"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
