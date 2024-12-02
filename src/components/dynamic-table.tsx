"use client";

import { useState, useEffect } from "react";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TableData {
  [key: string]: any;
}

function SingleTable({ tables, index }: { tables: string[]; index: number }) {
  const [selectedTable, setSelectedTable] = useState<string>(tables[0]);
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/data/${selectedTable}.json`);
      const data = await response.json();
      setTableData(data);
    };

    fetchData();
  }, [selectedTable]);

  if (tableData.length === 0) return <div>Loading...</div>;

  const columns = Object.keys(tableData[0]);

  return (
    <div className="space-y-4 p-4 rounded-lg shadow-md">
      <Select onValueChange={setSelectedTable} defaultValue={selectedTable}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Select table ${index + 1}`} />
        </SelectTrigger>
        <SelectContent>
          {tables.map((table) => (
            <SelectItem key={table} value={table}>
              {table}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ScrollArea className="h-screen w-full rounded-md border">
        <div className="w-max min-w-full">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column} className="text-xs">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column} className="text-xs">
                      {row[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default function DynamicTables({ tables }: { tables: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[0, 1, 2, 4].map((index) => (
        <SingleTable key={index} tables={tables} index={index} />
      ))}
    </div>
  );
}
