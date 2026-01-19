"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Style, Circle, Fill, Stroke, Text } from "ol/style";
import Overlay from "ol/Overlay";

import Select from "./Select";
import {
  customerLocations,
  locationFilterOptions,
  typeFilterOptions,
  CustomerLocation,
  CustomerType,
} from "../_utils/mock";

const getMarkerColor = (
  type: CustomerType,
  status: string
): { fill: string; stroke: string } => {
  if (status === "inactive") {
    return { fill: "#BA1A1A", stroke: "#fff" };
  }
  if (status === "pending") {
    return { fill: "#43D2CB", stroke: "#fff" };
  }

  switch (type) {
    case "commercial":
      return { fill: "#1876D2", stroke: "#fff" };
    case "industrial":
      return { fill: "#43D2CB", stroke: "#fff" };
    case "residential":
    default:
      return { fill: "#2DB3C8", stroke: "#fff" };
  }
};

const getMarkerIcon = (type: CustomerType): string => {
  switch (type) {
    case "commercial":
      return "🏢";
    case "industrial":
      return "🏭";
    case "residential":
    default:
      return "🏠";
  }
};

export default function CustomerMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const overlayRef = useRef<Overlay | null>(null);

  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerLocation | null>(
    null
  );

  const filterLocations = useCallback(
    (locations: CustomerLocation[]) => {
      return locations.filter((location) => {
        const typeMatch = !typeFilter || location.type === typeFilter;

        let locationMatch = true;
        if (locationFilter) {
          const [lon, lat] = location.coordinates;
          switch (locationFilter) {
            case "austin-north":
              locationMatch = lat > 30.32;
              break;
            case "austin-south":
              locationMatch = lat < 30.28;
              break;
            case "austin-east":
              locationMatch = lon > -97.72;
              break;
            case "austin-west":
              locationMatch = lon < -97.78;
              break;
          }
        }

        return typeMatch && locationMatch;
      });
    },
    [locationFilter, typeFilter]
  );

  const createFeatures = useCallback((locations: CustomerLocation[]) => {
    return locations.map((location) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(location.coordinates)),
        customer: location,
      });

      const colors = getMarkerColor(location.type, location.status);
      const icon = getMarkerIcon(location.type);

      feature.setStyle(
        new Style({
          image: new Circle({
            radius: 14,
            fill: new Fill({ color: colors.fill }),
            stroke: new Stroke({ color: colors.stroke, width: 2 }),
          }),
          text: new Text({
            text: icon,
            font: "12px sans-serif",
            offsetY: 1,
          }),
        })
      );

      return feature;
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 1,
    });

    const tileLayer = new TileLayer({
      source: new XYZ({
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
        attributions:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [tileLayer, vectorLayer],
      view: new View({
        center: fromLonLat([-97.7431, 30.31]),
        zoom: 12,
      }),
      controls: [],
    });

    if (popupRef.current) {
      const overlay = new Overlay({
        element: popupRef.current,
        autoPan: true,
        positioning: "bottom-center",
        offset: [0, -20],
      });
      map.addOverlay(overlay);
      overlayRef.current = overlay;
    }

    map.on("click", (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);
      if (feature) {
        const customer = feature.get("customer") as CustomerLocation;
        setSelectedCustomer(customer);
        overlayRef.current?.setPosition(event.coordinate);
      } else {
        setSelectedCustomer(null);
        overlayRef.current?.setPosition(undefined);
      }
    });

    map.on("pointermove", (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);
      map.getTargetElement().style.cursor = feature ? "pointer" : "";
    });

    mapInstanceRef.current = map;

    return () => {
      map.setTarget(undefined);
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!vectorSourceRef.current) return;

    const filteredLocations = filterLocations(customerLocations);
    const features = createFeatures(filteredLocations);

    vectorSourceRef.current.clear();
    vectorSourceRef.current.addFeatures(features);

    setSelectedCustomer(null);
    overlayRef.current?.setPosition(undefined);
  }, [filterLocations, createFeatures]);

  const handleLocationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationFilter(e.target.value);
  };

  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

  const getTypeLabel = (type: CustomerType) => {
    switch (type) {
      case "residential":
        return "Residencial";
      case "commercial":
        return "Comercial";
      case "industrial":
        return "Industrial";
      default:
        return type;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md font-montserrat font-bold text-neutral-100">
          Mapa de clientes por região
        </h2>
        <div className="flex gap-3">
          <Select
            name="location"
            value={locationFilter}
            onChange={handleLocationFilterChange}
            options={locationFilterOptions}
          />
          <Select
            name="type"
            value={typeFilter}
            onChange={handleTypeFilterChange}
            options={typeFilterOptions}
          />
        </div>
      </div>
      <div className="rounded-xl overflow-hidden relative h-[350px]">
        <div ref={mapRef} className="w-full h-full" />
        <div
          ref={popupRef}
          className={`absolute z-10 ${selectedCustomer ? "block" : "hidden"}`}
        >
          {selectedCustomer && (
            <div className="bg-surface border border-glass-edge rounded-xl p-4 shadow-xl min-w-[200px]">
              <h3 className="text-sm font-montserrat font-bold text-neutral-100 mb-2">
                {selectedCustomer.name}
              </h3>
              <div className="flex flex-col gap-1 text-xs text-neutral-300">
                <p>
                  <span className="text-neutral-400">Tipo:</span>{" "}
                  {getTypeLabel(selectedCustomer.type)}
                </p>
                <p>
                  <span className="text-neutral-400">Status:</span>{" "}
                  {getStatusLabel(selectedCustomer.status)}
                </p>
                <p>
                  <span className="text-neutral-400">Endereço:</span>{" "}
                  {selectedCustomer.address}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

