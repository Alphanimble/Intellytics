/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from 'lucide-react';
import FundPerformanceTable from "@/components/custom/FundPerformanceTable";
import data from "../../../public/quantium_fund_data.json";

// In a real application, you would fetch this data from an API
const fundsData = data;

export default function Home() {
  const [tables, setTables] = useState<number[]>([0]);

  const addTable = () => {
    setTables(prevTables => [...prevTables, prevTables.length]);
  };

  const removeTable = () => {
    setTables(prevTables => prevTables.slice(0, prevTables.length - 1));
  };
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-5xl mb-8 font-bold">Fund Performance</h1>
        <div className="flex justify-end space-x-2">
          <Button onClick={addTable} variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button onClick={removeTable} variant="outline" size="icon">
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tables.map((tableIndex, index) => (
          <div
            key={tableIndex}
            className={`${index % 2 === 0 && index === tables.length - 1
              ? "md:col-span-2"
              : ""
              }`}
          >
            <FundPerformanceTable fundsData={fundsData} />
          </div>
        ))}
      </div>
    </main>
  );
}

