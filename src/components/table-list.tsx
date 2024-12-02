import fs from "fs";
import path from "path";

export function getTableList() {
  const dataDir = path.join(process.cwd(), "public", "data");
  const files = fs.readdirSync(dataDir);
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""));
}

export default function TableList() {
  const tables = getTableList();
  return <div>{JSON.stringify(tables)}</div>;
}
