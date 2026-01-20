"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ApexOptions } from "apexcharts";
import chevronRightIcon from "@/assets/icons/chevron_right.svg";
import { KpiEvolutionData } from "@/src/domain/entities/dashboard";

interface ConversionRateChartProps {
  labels: string[];
  data: KpiEvolutionData;
}

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ConversionRateChart({ labels, data }: ConversionRateChartProps) {
  const visibleLabels = useMemo(() => labels.slice(0, 6), [labels]);
  const visibleData = useMemo(() => data.data.slice(0, 6), [data]);
  const max = useMemo(() => Math.max(0, ...visibleData), [visibleData]);

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
        background: "transparent",
        fontFamily: "var(--font-montserrat), sans-serif",
      },
      colors: ["var(--color-dashboard-conversion-chart)"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["var(--color-dashboard-conversion-chart)"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: "40%",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: visibleLabels,
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
        min: 0,
        max: max,
        tickAmount: 5,
        labels: {
          style: {
            colors: "var(--color-neutral-100)",
            fontSize: "0.7rem",
            fontFamily: "var(--font-montserrat), sans-serif",
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
        style: {
          fontSize: "0.7rem",
          fontFamily: "var(--font-montserrat), sans-serif",
        },
        custom: ({ series, seriesIndex, dataPointIndex }) => {
          const value = series[seriesIndex][dataPointIndex];
          return `
            <div style="
              background-color: var(--color-neutral-400);
              padding: 0.6rem 0.7rem;
              color: var(--color-neutral-100);
              font-size: 0.8rem;
              font-weight: 600;
              font-family: var(--font-montserrat), sans-serif;
            ">
              ${value}
            </div>
          `;
        },
      },
      states: {
        hover: {
          filter: {
            type: "lighten",
            value: 0.15,
          },
        },
      },
    }),
    [visibleLabels, max]
  );

  const series = useMemo(
    () => [
      {
        name: data.name,
        data: visibleData,
      },
    ],
    [data.name, visibleData]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md font-montserrat font-bold text-neutral-100">
          Taxa de conversão
        </h2>
        <Image
          src={chevronRightIcon}
          alt="Ver mais"
          className="w-4 h-4 opacity-70"
        />
      </div>
      <div className="flex-1 min-h-[250px]">
        <Chart options={chartOptions} series={series} type="bar" height="100%" />
      </div>
    </div>
  );
}

