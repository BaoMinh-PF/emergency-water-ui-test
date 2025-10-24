"use client";

import { useRef } from "react";
import Image from "next/image"; // added

type Props = {
    options: string[];
    actives: string[];
    onToggle: (type: string) => void;
    collapsed: boolean;
    width: number;
    onReorder: (next: string[]) => void; // new
    onImport: (name: string, data: any) => void; // new
};

export default function Sidebar({ options, actives, onToggle, collapsed, width, onReorder, onImport }: Props) {
    const dragIndex = useRef<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // new

    const handleDragStart = (index: number) => (e: React.DragEvent) => {
        dragIndex.current = index;
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (index: number) => (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (index: number) => (e: React.DragEvent) => {
        e.preventDefault();
        if (dragIndex.current === null || dragIndex.current === index) return;
        const next = [...options];
        const [moved] = next.splice(dragIndex.current, 1);
        next.splice(index, 0, moved);
        dragIndex.current = null;
        onReorder(next);
    };

    const triggerImport = () => fileInputRef.current?.click(); // new

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { // new
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            try {
                const json = JSON.parse(ev.target?.result as string);
                const name = prompt("Enter layer name")?.trim();
                if (!name) return;
                onImport(name, json);
            } catch {
                alert("Invalid GeoJSON file.");
            } finally {
                e.target.value = "";
            }
        };
        reader.readAsText(file);
    };

    return (
        <div style={{
            width,
            padding: 12,
            borderRight: '1px solid #ddd',
            boxSizing: 'border-box',
            transition: 'width 0.25s ease'
        }}>{!collapsed && (
            <>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {options.map((opt, idx) => (
                        <li
                            key={opt}
                            style={{
                                marginBottom: 8,
                                cursor: 'grab',
                                background: '#f7f7f7',
                                border: '1px solid #e1e1e1',
                                borderRadius: 4,
                                padding: 6
                            }}
                            draggable
                            onDragStart={handleDragStart(idx)}
                            onDragOver={handleDragOver(idx)}
                            onDrop={handleDrop(idx)}
                        >
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={actives.includes(opt)}
                                    onChange={() => onToggle(opt)}
                                />
                                <span style={{ flex: 1 }}>{opt}</span>
                                <Image
                                    src="/up-down-arrow.svg"
                                    alt="Reorder layer"
                                    width={16}
                                    height={16}
                                    style={{ opacity: 0.6, pointerEvents: 'none' }}
                                />
                            </label>
                        </li>
                    ))}
                </ul>
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button
                        onClick={triggerImport}
                        style={{
                            background: 'linear-gradient(135deg,#1890ff,#2f54eb)',
                            color: '#fff',
                            border: '1px solid #2f54eb',
                            padding: '8px 10px',
                            fontSize: 12,
                            borderRadius: 6,
                            cursor: 'pointer',
                            fontWeight: 600,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                            transition: 'background 0.2s, transform 0.15s'
                        }}
                        onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
                        onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        + Import GeoJSON
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".geojson,application/geo+json,application/json"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <small style={{ color: '#555', fontSize: 11 }}>
                        Supported: .geojson / application/geo+json
                    </small>
                </div>
            </>
        )}
        </div>
    );
}

