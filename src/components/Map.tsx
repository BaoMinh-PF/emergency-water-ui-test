"use client";

import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import proj4 from 'proj4';
import { register } from "ol/proj/proj4";
import { GeometryType } from '@/app/models/geometry';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import { Feature, MapBrowserEvent } from 'ol';

type Props = {
    geoData: GeometryType[];
};

proj4.defs(
    "EPSG:3006",
    "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
register(proj4);

export default function OlMap({ geoData }: Props) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapObj = useRef<Map | null>(null);
    const vectorLayer = useRef<VectorLayer<VectorSource> | null>(null);
    const hoveredFeatureRef = useRef<Feature | null>(null);
    const [tooltip, setTooltip] = useState<{
        visible: boolean;
        x: number;
        y: number;
        content: string;
    }>({ visible: false, x: 0, y: 0, content: '' });

    const handlePointerMove = (event: MapBrowserEvent) => {
        const map = mapObj.current;
        if (!map) return;

        const pixel = map.getEventPixel(event.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);

        map.getTargetElement().style.cursor = hit ? "pointer" : "";

        if (hit) {
            const feature = map.forEachFeatureAtPixel(pixel, (feat) => feat as Feature);
            if (feature && feature !== hoveredFeatureRef.current) {
                // Restore previous hovered feature's image scale
                if (hoveredFeatureRef.current) {
                    const prevStyle = hoveredFeatureRef.current.getStyle() as Style;
                    const prevImage = prevStyle?.getImage();
                    if (prevImage) prevImage.setScale(1);
                    hoveredFeatureRef.current.setStyle(prevStyle);
                }
                // Enlarge current feature's image
                const style = feature.getStyle() as Style;
                const image = style?.getImage();
                if (image) image.setScale(1.5);
                feature.setStyle(style);
                hoveredFeatureRef.current = feature;
                let tooltipContent = "";
                const type = feature.get("geometryType");
                if (!type) {
                    return;
                }

                if (type === 4) {
                    const name = feature.get("Firmabenämning") || 'N/A';
                    const address = feature.get("Besöksadress") || 'N/A';
                    tooltipContent = `Preschool
                                    Address: ${address}
                                    Name: ${name}`;

                } else if (type === 6) {
                    const name = feature.get("Name") || 'N/A';
                    const address = feature.get("Address") || 'N/A';
                    tooltipContent = `Distribution Point
                                    Address: ${address}
                                    Name: ${name}`;
                } else if (type === 7) {
                    const name = feature.get("Name") || 'N/A';
                    const address = feature.get("Address") || 'N/A';
                    tooltipContent = `Supply Point
                                    Address: ${address}
                                    Name: ${name}`;
                } else {
                    return;
                }

                const mouseEvent = event.originalEvent as MouseEvent;
                setTooltip({
                    visible: true,
                    x: mouseEvent.clientX,
                    y: mouseEvent.clientY - 80, // Position above cursor
                    content: tooltipContent
                });
            }
        } else {
            // Restore previous hovered feature's image scale
            if (hoveredFeatureRef.current) {
                const prevStyle = hoveredFeatureRef.current.getStyle() as Style;
                const prevImage = prevStyle?.getImage();
                if (prevImage) prevImage.setScale(1);
                hoveredFeatureRef.current.setStyle(prevStyle);
                hoveredFeatureRef.current = null;
            }

            setTooltip({ visible: false, x: 0, y: 0, content: '' });
        }
    };

    useEffect(() => {
        if (!mapRef.current || mapObj.current) return;
        const osmLayer = new TileLayer({ source: new OSM(), zIndex: 0, }); // OSM first layer
        vectorLayer.current = new VectorLayer({ source: new VectorSource(), zIndex: 1, });
        const initialView = new View({
            center: [
                1837693, 8267084],
            zoom: 10,
        });
        mapObj.current = new Map({
            target: mapRef.current,
            layers: [osmLayer, vectorLayer.current],
            view: initialView,
        });

        mapObj.current.on("pointermove", handlePointerMove);

        return () => {
            mapObj.current?.un("pointermove", handlePointerMove);
            mapObj.current?.setTarget(undefined);
            mapObj.current = null;
            vectorLayer.current = null;
        };
    }, []);

    useEffect(() => {
        if (!mapObj.current || !vectorLayer.current) return;
        const source = vectorLayer.current.getSource();
        if (!source) return;
        const format = new GeoJSON();
        source.clear();

        geoData.forEach((geo) => {
            const feats = format.readFeatures(geo.data, {
                dataProjection: "EPSG:3006",
                featureProjection: "EPSG:3857",
            });

            feats.forEach((feat) => {
                feat.setStyle(geo.style.clone());
                feat.setProperties({ ...feat.getProperties(), geometryType: geo.order })
            });

            if (geo.order === 3) {
                feats.forEach((feat) => {
                    const originalStyle = feat.getStyle() as Style;
                    const newStyle = new Style({
                        fill: originalStyle.getFill()!,
                        stroke: originalStyle.getStroke()!,
                        text: new Text({
                            text: feat.get("distriktsnamn"),
                            font: "14px Arial",
                        }),
                    });

                    feat.setStyle(newStyle);
                });
            }

            source.addFeatures(feats);
        });

    }, [geoData]);


    return (
        <>
            <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />
            {tooltip.visible && (
                <div
                    style={{
                        position: 'fixed',
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y}px`,
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        pointerEvents: 'none',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'pre-line',
                        zIndex: 1000,
                        fontSize: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {tooltip.content}
                </div>
            )}
        </>
    );
}

