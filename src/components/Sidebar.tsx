"use client";

type Props = {
    options: string[];
    actives: string[];
    onToggle: (type: string) => void;
    collapsed: boolean;
    width: number;
};

export default function Sidebar({ options, actives, onToggle, collapsed, width }: Props) {
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
            </>
        )}
        </div>
    );
}

