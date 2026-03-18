'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Folder, ChevronRight, FileCode } from 'lucide-react';

export default function BrowsePage() {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/folders')
            .then(res => res.json())
            .then(data => setFolders(data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Browse Folders</h1>
                <p style={{ opacity: 0.6 }}>주제별로 분류된 아카이브 폴더를 탐색합니다.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {folders.map(folder => (
                    <Link href={`/browse/${folder}`} key={folder} className="glass nav-item" style={{ padding: '24px', justifyContent: 'space-between', transition: 'all 0.3s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '12px' }}>
                                <Folder size={24} color="#6366f1" />
                            </div>
                            <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{folder}</span>
                        </div>
                        <ChevronRight size={20} opacity={0.3} />
                    </Link>
                ))}
                {folders.length === 0 && !loading && <p style={{ opacity: 0.5 }}>폴더가 아직 없습니다.</p>}
            </div>
        </div>
    );
}
