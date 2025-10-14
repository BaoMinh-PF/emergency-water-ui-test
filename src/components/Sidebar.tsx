"use client";

type Props = {
    options: string[];
    actives: string[];
    onToggle: (type: string) => void;
};

export default function Sidebar({ options, actives, onToggle }: Props) {
    return (
        <div style={{ width: 260, padding: 12, borderRight: '1px solid #ddd' }}>
            <h3 style={{ marginTop: 0 }}>{process.env.NEXT_PUBLIC_APP_NAME || 'Layers'}</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {options.map((opt) => (
                    <li key={opt} style={{ marginBottom: 8 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                                type="checkbox"
                                checked={actives.includes(opt)}
                                onChange={() => onToggle(opt)}
                            />
                            <span>{opt}</span>
                        </label>
                    </li>
                ))}
            </ul>
            <p style={{ color: '#666', fontSize: 12 }}>
                Select a type to load data from the database.
            </p>
        </div>
    );
}

