"use client";

import { useEffect, useState } from "react";
import OlMap from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import { geometryData, GeometryType } from "./models/geometry";
import Image from "next/image";

export default function Home() {
    const [activeTypes, setActiveTypes] = useState<string[]>([]);
    const [geoData, setGeoData] = useState<GeometryType[]>([]);
    const loadedGeoData = geometryData;
    const [options, setOptions] = useState<string[]>(Array.from(loadedGeoData.keys()));
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const collapsedWidth = 64;
    const expandedWidth = 260;
    const sideWidth = collapsed ? collapsedWidth : expandedWidth;

    async function fetchData() {
        const municipal = await fetch("data/Eskilstuna_Municipal_Map.geojson");
        let style = loadedGeoData.get("MUNICIPALITY")?.style;
        loadedGeoData.set("MUNICIPALITY", { data: await municipal.json(), order: 2, style: style! });

        const districts = await fetch("data/Eskilstuna_Districts.geojson");
        style = loadedGeoData.get("DISTRICT")?.style;
        loadedGeoData.set("DISTRICT", { data: await districts.json(), order: 3, style: style! });

        const preschools = await fetch("data/Eskilstuna_Preschools.geojson");
        style = loadedGeoData.get("PRESCHOOL")?.style;
        loadedGeoData.set("PRESCHOOL", { data: await preschools.json(), order: 4, style: style! });

        const road = await fetch("data/Eskilstuna_Road.geojson");
        style = loadedGeoData.get("ROAD")?.style;
        loadedGeoData.set("ROAD", { data: await road.json(), order: 5, style: style! });

        const distribution = await fetch("data/Eskilstuna_Distribution_Point_Test_1.geojson");
        style = loadedGeoData.get("DISTRIBUTION POINT")?.style;
        loadedGeoData.set("DISTRIBUTION POINT", { data: await distribution.json(), order: 6, style: style! });

        const supply = await fetch("data/Eskilstuna_Supply_Point_Test_1.geojson");
        style = loadedGeoData.get("SUPPLY POINT")?.style;
        loadedGeoData.set("SUPPLY POINT", { data: await supply.json(), order: 7, style: style! });;

        const route = await fetch("data/Eskilstuna_Route_Test_1.geojson");
        style = loadedGeoData.get("ROUTE")?.style;
        loadedGeoData.set("ROUTE", { data: await route.json(), order: 8, style: style! });
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
    }, [activeTypes]);

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
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <OlMap geoData={geoData} headerHeight={60} />
                </div>
            </div>
        </div>
    );
}
