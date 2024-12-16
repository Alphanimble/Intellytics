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
import { FundsData, FundData } from "../types/fund";

export default function FundPerformanceTable({
  fundsData,
}: {
  fundsData: FundsData;
}) {
  const [selectedFund, setSelectedFund] = useState<number>(0);
  const [selectedDataType, setSelectedDataType] = useState<
    "TVPI_ratio" | "MOIC"
  >("TVPI_ratio");

  const tableData = useMemo(() => {
    const fund = fundsData.funds[selectedFund];
    return fund[selectedDataType];
  }, [fundsData, selectedFund, selectedDataType]);

  const columns = useMemo(() => {
    if (Object.keys(tableData).length === 0) return [];
    return Object.keys(tableData[Object.keys(tableData)[0]]);
  }, [tableData]);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Select onValueChange={(value) => setSelectedFund(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Fund" />
          </SelectTrigger>
          <SelectContent>
            {fundsData.funds.map((fund, index) => (
              <SelectItem key={index} value={index.toString()}>
                {fund.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setSelectedDataType(value as "TVPI_ratio" | "MOIC")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Data Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TVPI_ratio">TVPI Ratio</SelectItem>
            <SelectItem value="MOIC">MOIC</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
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
    </div>
  );
}
