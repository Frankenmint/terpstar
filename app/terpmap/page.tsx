import TerpMapPlot from "@/components/TerpMapPlot";

async function fetchTerpMapData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/terpmap`, { cache: "no-store" });
  return res.json();
}

export default async function TerpMapPage() {
  const data = await fetchTerpMapData();

  return (
    <div className="p-4">
      <TerpMapPlot data={data} />
    </div>
  );
}
