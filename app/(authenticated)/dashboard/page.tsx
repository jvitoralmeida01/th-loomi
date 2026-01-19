import Card from "@/app/_components/Card";
import KpiEvolutionChart from "./_components/KpiEvolutionChart";
import ConversionRateChart from "./_components/ConversionRateChart";
import CustomerMap from "./_components/CustomerMap";
import ClientsTable from "./_components/ClientsTable";
import { getClients } from "./actions";

interface DashboardPageProps {
  searchParams?: Promise<{
    query?: Promise<string>;
    status?: Promise<string>;
    type?: Promise<string>;
    region?: Promise<string>;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: Readonly<DashboardPageProps>) {
  const params = await searchParams;
  const query = (await params?.query) || "";
  const status = (await params?.status) || "";
  const type = (await params?.type) || "";
  const region = (await params?.region) || "";

  const { clients } = await getClients({
    query,
    status,
    type,
    region,
  });

  return (
    <div className="flex flex-col gap-6 py-8 px-32 max-w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-4">
          <KpiEvolutionChart />
        </Card>

        <Card className="p-4">
          <ConversionRateChart />
        </Card>
      </div>

      <Card className="p-4">
        <CustomerMap />
      </Card>

      <Card className="p-6">
        <ClientsTable clients={clients} />
      </Card>
    </div>
  );
}
