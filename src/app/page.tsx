"use client";

import { useEffect, useState } from "react";
import OlMap from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import { geometryData, GeometryType } from "./models/geometry";
import Image from "next/image";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import { FeatureCollection } from "geojson";

export default function Home() {
    console.log(process.env.NODE_ENV);
    const [activeTypes, setActiveTypes] = useState<string[]>([]);
    const [geoData, setGeoData] = useState<GeometryType[]>([]);
    const loadedGeoData = geometryData;
    const [options, setOptions] = useState<string[]>(Array.from(loadedGeoData.keys()));
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const collapsedWidth = 64;
    const expandedWidth = 260;
    const sideWidth = collapsed ? collapsedWidth : expandedWidth;

    const handleImportLayer = (name: string, data: FeatureCollection) => {
        if (geometryData.has(name)) {
            alert("Layer name already exists.");
            return;
        }
        const maxId = Array.from(geometryData.values()).reduce((m, v) => Math.max(m, v.id), 0);
        const order = options.length;
        const style = new Style({
            stroke: new Stroke({ color: "#2f54eb", width: 2 }),
            fill: new Fill({ color: "rgba(24,144,255,0.25)" }),
        });
        geometryData.set(name, { id: maxId + 1, data, order, style });
        setOptions(o => [...o, name]);
        setActiveTypes(a => [...a, name]);
    };

    async function fetchData() {
        const municipal = await fetch("data/Eskilstuna_Municipal_Map.geojson");
        let style = loadedGeoData.get("MUNICIPALITY")?.style;
        loadedGeoData.set("MUNICIPALITY", { id: 2, data: await municipal.json(), order: 2, style: style! });

        const districts = await fetch("data/Eskilstuna_Districts.geojson");
        style = loadedGeoData.get("DISTRICT")?.style;
        loadedGeoData.set("DISTRICT", { id: 3, data: await districts.json(), order: 3, style: style! });

        const preschools = await fetch("data/Eskilstuna_Preschools.geojson");
        style = loadedGeoData.get("PRESCHOOL")?.style;
        loadedGeoData.set("PRESCHOOL", { id: 4, data: await preschools.json(), order: 4, style: style! });

        const road = await fetch("data/Eskilstuna_Road.geojson");
        style = loadedGeoData.get("ROAD")?.style;
        loadedGeoData.set("ROAD", { id: 5, data: await road.json(), order: 5, style: style! });

        const distribution = await fetch("data/Eskilstuna_Distribution_Point_Test_1.geojson");
        style = loadedGeoData.get("DISTRIBUTION POINT")?.style;
        loadedGeoData.set("DISTRIBUTION POINT", { id: 6, data: await distribution.json(), order: 6, style: style! });

        const supply = await fetch("data/Eskilstuna_Supply_Point_Test_1.geojson");
        style = loadedGeoData.get("SUPPLY POINT")?.style;
        loadedGeoData.set("SUPPLY POINT", { id: 7, data: await supply.json(), order: 7, style: style! });

        const route = await fetch("data/Eskilstuna_Route_Test_1.geojson");
        style = loadedGeoData.get("ROUTE")?.style;
        loadedGeoData.set("ROUTE", { id: 8, data: await route.json(), order: 8, style: style! });
    }

    useEffect(() => {
        if (loadedGeoData) {
            setOptions(Array.from(loadedGeoData.keys()));
        }
    }, [loadedGeoData])

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
    }, [activeTypes, options]);

    const handleReorder = (next: string[]) => {
        setOptions(next);
        // Update order (ascending index => lower index draws beneath higher ones if sorting asc)
        next.forEach((key, idx) => {
            const entry = geometryData.get(key);
            if (entry) entry.order = idx; // mutate order
        });
        // Force refresh of active ordering
        setActiveTypes(a => [...a]);
    };

    return (
        <div style={{ display: "flex", flexDirection: 'column', height: "100vh" }}>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                height: 60,
                borderBottom: '1px solid #ddd',
                boxSizing: 'border-box',
                backgroundColor: '#03045e'
            }}>
                <div
                    style={{
                        width: sideWidth,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '0 12px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'width 0.25s ease'
                    }}
                    onClick={() => setCollapsed(c => !c)}
                >
                    
                    <span style={{
                        fontSize: 24,
                        lineHeight: 1,
                        color: '#fff'
                    }}>☰</span>
                    {!collapsed && <span style={{ fontWeight: 600, color: '#fff' }}>Layers</span>}
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <Image src="/Logo.png" alt="Logo" width={200} height={64} style={{ objectFit: 'contain' }} />
                </div>
                <div style={{ width: sideWidth }} />
            </header>
            <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
                <Sidebar
                    options={options}
                    actives={activeTypes}
                    onToggle={(t) => setActiveTypes(type => activeTypes.includes(t) ? type.filter(item => item !== t) : [...type, t])}
                    collapsed={collapsed}
                    width={sideWidth}
                    onReorder={handleReorder}
                    onImport={handleImportLayer} // new
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <OlMap geoData={geoData} headerHeight={60} />
                </div>
            </div>
        </div>
    );
}
