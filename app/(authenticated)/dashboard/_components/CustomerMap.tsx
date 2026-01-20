"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Style, Circle, Fill, Icon } from "ol/style";
import Overlay from "ol/Overlay";
import Select from "./Select";
import { MapLocation } from "@/src/domain/entities/mapLocations";
import getMarkerIcon from "../_utils/getMarkerIcon";

interface CustomerMapProps {
  locations: MapLocation[];
}

export default function CustomerMap({ locations }: CustomerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const initialCenterRef = useRef<[number, number]>(
    locations[0]?.coordinates ?? [-34.8813, -8.0555]
  );

  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null
  );

  const locationFilterOptions = useMemo(
    () => [
      { label: "Todos os locais", value: "" },
      ...locations.map((location) => ({
        value: location.id,
        label: location.name,
      })),
    ],
    [locations]
  );

  const categoryFilterOptions = useMemo(() => {
    const categories = Array.from(
      new Set(locations.map((location) => location.category))
    );

    return [
      { label: "Todas as categorias", value: "" },
      ...categories.map((category) => ({
        value: category,
        label: category,
      })),
    ];
  }, [locations]);

  const filterLocations = useCallback(
    (locations: MapLocation[]) =>
      locations.filter((location) => {
        const locationMatch = !locationFilter || location.id === locationFilter;
        const categoryMatch =
          !categoryFilter || location.category === categoryFilter;

        return locationMatch && categoryMatch;
      }),
    [locationFilter, categoryFilter]
  );

  const createFeatures = useCallback((locations: MapLocation[]) => {
    return locations.map((location) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(location.coordinates)),
        location,
      });

      feature.setStyle([
        new Style({
          image: new Circle({
            radius: 14,
            fill: new Fill({ color: location.color }),
          }),
        }),
        new Style({
          image: new Icon({
            src: getMarkerIcon(location.icon),
            scale: 0.8,
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
          }),
        }),
      ]);

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
        url: "https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attributions:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [tileLayer, vectorLayer],
      view: new View({
        center: fromLonLat(initialCenterRef.current),
        zoom: 12,
      }),
      controls: [],
    });

    if (popupRef.current) {
      const overlay = new Overlay({
        element: popupRef.current,
        autoPan: false,
        positioning: "bottom-center",
        offset: [0, 0],
      });
      map.addOverlay(overlay);
      overlayRef.current = overlay;
    }

    map.on("click", (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);
      if (feature) {
        const location = feature.get("location") as MapLocation;
        setSelectedLocation(location);
        overlayRef.current?.setPosition(event.coordinate);
      } else {
        setSelectedLocation(null);
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

    const filteredLocations = filterLocations(locations);
    const features = createFeatures(filteredLocations);

    vectorSourceRef.current.clear();
    vectorSourceRef.current.addFeatures(features);

    overlayRef.current?.setPosition(undefined);
  }, [filterLocations, createFeatures, locations]);

  const handleLocationFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocationFilter(e.target.value);
  };

  const handleCategoryFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryFilter(e.target.value);
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
            name="category"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            options={categoryFilterOptions}
          />
        </div>
      </div>
      <div className="rounded-xl overflow-hidden relative h-[350px]">
        <div ref={mapRef} className="w-full h-full" />
        <div
          ref={popupRef}
          className={`absolute z-10 ${selectedLocation ? "block" : "hidden"}`}
        >
          {selectedLocation && (
            <div className="bg-surface opacity-90 border border-glass-edge rounded-xl p-4 shadow-xl min-w-[200px]">
              <h3 className="text-sm font-montserrat font-bold text-neutral-100 mb-2">
                {selectedLocation.name}
              </h3>
              <div className="flex flex-col gap-1 text-xs text-neutral-300">
                <p>
                  <span className="text-neutral-400">Categoria:</span>{" "}
                  {selectedLocation.category}
                </p>
                <p>
                  <span className="text-neutral-400">Descrição:</span>{" "}
                  {selectedLocation.description}
                </p>
                <p>
                  <span className="text-neutral-400">Endereço:</span>{" "}
                  {selectedLocation.address}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
