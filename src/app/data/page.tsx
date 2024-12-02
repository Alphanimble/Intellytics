import { getTableList } from "@/components/table-list";
import DynamicTables from "@/components/dynamic-table";

export default function Home() {
  const tables = getTableList();

  return (
    <main className="container mx-auto p-6  min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dynamic Tables Viewer</h1>
      <DynamicTables tables={tables} />
    </main>
  );
}
