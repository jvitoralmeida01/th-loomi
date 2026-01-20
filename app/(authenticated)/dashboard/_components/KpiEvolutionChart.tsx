"use client";

import { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { KpiEvolutionData } from "@/src/domain/entities/dashboard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type KpiType = "retention" | "conversion" | "churn" | "arpu";

const kpiTabs: { key: KpiType; label: string }[] = [
  { key: "retention", label: "Retenção" },
  { key: "conversion", label: "Conversão" },
  { key: "churn", label: "Churn" },
  { key: "arpu", label: "ARPU" },
];

interface KpiEvolutionChartProps {
  labels: string[];
  arpu: KpiEvolutionData;
  conversionRate: KpiEvolutionData;
  churn: KpiEvolutionData;
  retention: KpiEvolutionData;
}

export default function KpiEvolutionChart({ labels, arpu, conversionRate, churn, retention }: KpiEvolutionChartProps) {
  const [activeKpi, setActiveKpi] = useState<KpiType>("arpu");

  const handleTabClick = useCallback((kpi: KpiType) => {
    setActiveKpi(kpi);
  }, []);

  const kpiDataMap = useMemo(() => ({
    retention,
    conversion: conversionRate,
    churn,
    arpu,
  }), [retention, conversionRate, churn, arpu]);

  const currentData = kpiDataMap[activeKpi];
  const isArpu = activeKpi === "arpu";

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
        background: "transparent",
        fontFamily: "var(--font-montserrat), sans-serif",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: "var(--color-dashboard-kpi-chart)",
              opacity: 1,
            },
            {
              offset: 100,
              color: "var(--color-dashboard-kpi-chart)",
              opacity: 0.1,
            },
          ],
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["var(--color-dashboard-kpi-chart-border)"],
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            colors: "var(--color-neutral-100)",
            fontSize: "0.7rem",
            fontFamily: "var(--font-montserrat), sans-serif",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: {
            colors: "var(--color-neutral-100)",
            fontSize: "0.7rem",
            fontFamily: "var(--font-montserrat), sans-serif",
          },
          formatter: (value: number) => {
            if (isArpu) {
              return value.toFixed(0);
            }
            return value.toFixed(0);
          },
        },
      },
      grid: {
        borderColor: "var(--color-glass-edge)",
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (value: number) => {
            if (isArpu) {
              return `R$ ${(value * 1000).toLocaleString("pt-BR")}`;
            }
            return `${value}%`;
          },
        },
        marker: { show: true },
        custom: ({ series, seriesIndex, dataPointIndex }) => {
          const value = series[seriesIndex][dataPointIndex];
          const formattedValue = isArpu
            ? `R$ ${(value / 1000).toFixed(1)}k`
            : `${value}%`;
          return `
            <div style="
              background-color: var(--color-neutral-400);
              padding: 0.6rem 0.7rem;
              color: var(--color-neutral-100);
              font-size: 0.8rem;
              font-weight: 600;
              font-family: var(--font-montserrat), sans-serif;
            ">
              ${formattedValue}
            </div>
          `;
        },
      },
      markers: {
        hover: { size: 6 },
        colors: ["var(--color-neutral-100)"],
      },
    }),
    [isArpu, labels]
  );

  const series = useMemo(
    () => [
      {
        name: currentData.name,
        data: currentData.data,
      },
    ],
    [currentData]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md font-montserrat font-bold text-neutral-100">
          Evolução dos KPI's
        </h2>
        <div className="flex gap-2 px-2 py-2 rounded-full bg-neutral-100/5">
          {kpiTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`px-4 py-2 text-xs font-montserrat font-semibold rounded-full transition-all cursor-pointer ${
                activeKpi === tab.key
                  ? "glow-dashboard-kpi-button hover:shadow-none bg-dashboard-kpi-button text-neutral-100 transition-all duration-300"
                  : "shadow-none bg-neutral-100/10 text-neutral-300 hover:bg-neutral-100/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-[250px]">
        <Chart options={chartOptions} series={series} type="area" height="100%" />
      </div>
    </div>
  );
}

