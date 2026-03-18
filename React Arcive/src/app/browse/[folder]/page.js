'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, Database, Play } from 'lucide-react';

export default function FolderContentsPage({ params }) {
    const { folder } = params;
    const decodedFolder = decodeURIComponent(folder);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/contents?folder=${folder}`)
            .then(res => res.json())
            .then(data => setContents(data))
            .finally(() => setLoading(false));
    }, [folder]);

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <Link href="/browse" className="glass nav-item" style={{ padding: '8px' }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>{decodedFolder}</h1>
                </div>
                <p style={{ opacity: 0.6 }}>{contents.length}개의 리액트 콘텐츠가 이 폴더에 있습니다.</p>
            </header>

            {loading ? (
                <p style={{ opacity: 0.5 }}>불러오는 중...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                    {contents.map(content => (
                        <div key={content.id} className="glass" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{content.title}</h3>
                                <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', opacity: 0.5 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {new Date(content.createdAt).toLocaleDateString()}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Database size={12} /> {(content.size / 1024).toFixed(1)} KB</span>
                                </div>
                            </div>
                            <Link href={`/viewer/${content.id}?folder=${folder}`} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
                                <Play size={16} /> 실행
                            </Link>
                        </div>
                    ))}
                    {contents.length === 0 && <div className="glass" style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>폴더가 비어 있습니다.</div>}
                </div>
            )}
        </div>
    );
}
