import FundPerformanceTable from "@/components/custom/FundPerformanceTable";
import { FundsData } from "@/types/fund";
import data from "../../../public/quantium_fund_data.json";

// In a real application, you would fetch this data from an API
const fundsData: FundsData = data;

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fund Performance</h1>
      <FundPerformanceTable fundsData={fundsData} />
    </main>
  );
}
