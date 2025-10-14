"use client";

import { useEffect, useState } from "react";
import OlMap from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import { geometryData, GeometryType } from "./models/geometry";

export default function Home() {
    const [activeTypes, setActiveTypes] = useState<string[]>([]);
    const [geoData, setGeoData] = useState<GeometryType[]>([]);
    const loadedGeoData = geometryData;
    const options = geometryData.keys().toArray();

    async function fetchData() {
        const municipal = await fetch("data/Eskilstuna_Municipal_Map.geojson");
        loadedGeoData.set("MUNICIPALITY", { data: await municipal.json(), order: 7 });

        const districts = await fetch("data/Eskilstuna_Districts.geojson");
        loadedGeoData.set("DISTRICT", { data: await districts.json(), order: 6 });

        const preschools = await fetch("data/Eskilstuna_Preschools.geojson");
        loadedGeoData.set("PRESCHOOL", { data: await preschools.json(), order: 5 });

        const road = await fetch("data/Eskilstuna_Road.geojson");
        loadedGeoData.set("ROAD", { data: await road.json(), order: 4 });

        const distribution = await fetch("data/Eskilstuna_Distribution_Point_Test_1.geojson");
        loadedGeoData.set("DISTRIBUTION POINT", { data: await distribution.json(), order: 3 });

        const supply = await fetch("data/Eskilstuna_Supply_Point_Test_1.geojson");
        loadedGeoData.set("SUPPLY POINT", { data: await supply.json(), order: 2 });

        const route = await fetch("data/Eskilstuna_Route_Test_1.geojson");
        loadedGeoData.set("ROUTE", { data: await route.json(), order: 1 });
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        const data: GeometryType[] = [];
        activeTypes.forEach(type => {
            const geo = loadedGeoData.get(type);
            if (geo && geo.data) {
                data.push(geo);
            }
        });
        data.sort((a, b) => a.order - b.order);
        setGeoData(data);
    }, [activeTypes]);

    return (
        <div style={{ display: "flex", height: "100%", minHeight: 600 }}>
            <Sidebar
                options={options}
                actives={activeTypes}
                onToggle={(t) => setActiveTypes(type => activeTypes.includes(t) ? type.filter(item => item !== t) : [...type, t])}
            />
            <div style={{ flex: 1 }}>
                <OlMap geoData={geoData} />
            </div>
        </div>
    );
}
