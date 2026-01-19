import Card from "@/app/_components/Card";
import PlanCards from "./_components/PlanCards";
import VehicleValueSlider from "./_components/VehicleValueSlider";
import ClientAgeSlider from "./_components/ClientAgeSlider";
import AdditionalCoverages from "./_components/AdditionalCoverages";
import IncludedBenefits from "./_components/IncludedBenefits";
import PlanIndicators from "./_components/PlanIndicators";

export default function PlanSimulatorPage() {
  return (
    <div className="py-8 px-32 max-w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 py-6 px-5">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-md font-montserrat font-bold text-neutral-100">
                Planos personalizados
              </h2>
              <PlanCards />
            </div>

            <VehicleValueSlider />

            <ClientAgeSlider />

            <div className="mb-4">
              <AdditionalCoverages />
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-8">
          <Card className="py-6 px-8">
            <IncludedBenefits />
          </Card>

          <Card className="py-6 px-8">
            <PlanIndicators />
          </Card>
        </div>
      </div>
    </div>
  );
}
