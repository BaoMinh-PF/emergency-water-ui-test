"use client";

import { useEffect, useState } from "react";
import OlMap from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import { geometryData, GeometryType } from "./models/geometry";

export default function Home() {
    const [activeTypes, setActiveTypes] = useState<string[]>([]);
    const [geoData, setGeoData] = useState<GeometryType[]>([]);
    const loadedGeoData = geometryData;
    const options = ["Test"];

    // async function fetchData() {
    //     const municipal = await fetch("data/Eskilstuna_Municipal_Map.geojson");
    //     let style = loadedGeoData.get("MUNICIPALITY")?.style;
    //     loadedGeoData.set("MUNICIPALITY", { data: await municipal.json(), order: 2, style: style! });

    //     const districts = await fetch("data/Eskilstuna_Districts.geojson");
    //     style = loadedGeoData.get("DISTRICT")?.style;
    //     loadedGeoData.set("DISTRICT", { data: await districts.json(), order: 3, style: style! });

    //     const preschools = await fetch("data/Eskilstuna_Preschools.geojson");
    //     style = loadedGeoData.get("PRESCHOOL")?.style;
    //     loadedGeoData.set("PRESCHOOL", { data: await preschools.json(), order: 4, style: style! });

    //     const road = await fetch("data/Eskilstuna_Road.geojson");
    //     style = loadedGeoData.get("ROAD")?.style;
    //     loadedGeoData.set("ROAD", { data: await road.json(), order: 5, style: style! });

    //     const distribution = await fetch("data/Eskilstuna_Distribution_Point_Test_1.geojson");
    //     style = loadedGeoData.get("DISTRIBUTION POINT")?.style;
    //     loadedGeoData.set("DISTRIBUTION POINT", { data: await distribution.json(), order: 6, style: style! });

    //     const supply = await fetch("data/Eskilstuna_Supply_Point_Test_1.geojson");
    //     style = loadedGeoData.get("SUPPLY POINT")?.style;
    //     loadedGeoData.set("SUPPLY POINT", { data: await supply.json(), order: 7, style: style! });;

    //     const route = await fetch("data/Eskilstuna_Route_Test_1.geojson");
    //     style = loadedGeoData.get("ROUTE")?.style;
    //     loadedGeoData.set("ROUTE", { data: await route.json(), order: 8, style: style! });

    // }

    // useEffect(() => {
    //     fetchData()
    // }, []);

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
