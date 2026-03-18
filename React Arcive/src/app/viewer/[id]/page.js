'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Runner } from 'react-runner';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import { ChevronLeft, Maximize2, RotateCcw, Code, ExternalLink } from 'lucide-react';

export default function ContentViewer({ params }) {
    const { id } = params;
    const searchParams = useSearchParams();
    const router = useRouter();
    const folder = searchParams.get('folder') || 'default';

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCode, setShowCode] = useState(false);

    useEffect(() => {
        fetch(`/api/contents/${id}?folder=${folder}`)
            .then(res => {
                if (!res.ok) throw new Error('Content not found');
                return res.json();
            })
            .then(data => setContent(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id, folder]);

    if (loading) return <div style={{ padding: '2rem', opacity: 0.5 }}>콘텐츠를 불러오는 중...</div>;
    if (error) return <div style={{ padding: '2rem', color: '#ff4b4b' }}>데이터를 불러올 수 없습니다: {error}</div>;

    // React-Runner Scope: 렌더링될 코드에서 사용할 수 있는 라이브러리들
    const scope = {
        import: {
            'react': React,
            'lucide-react': LucideIcons
        },
        React,
        ...React,
        ...LucideIcons,
    };

    return (
        <div className="animate-fade-in" style={{ height: 'calc(100vh - 5rem)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => router.back()} className="glass nav-item" style={{ padding: '8px', minWidth: 'auto' }}>
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{content.title}</h1>
                        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>{folder} / {id}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => setShowCode(!showCode)} className="glass nav-item" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                        <Code size={16} /> {showCode ? '코드 숨기기' : '코드 보기'}
                    </button>
                    <button onClick={() => window.location.reload()} className="glass nav-item" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                        <RotateCcw size={16} /> 새로고침
                    </button>
                </div>
            </header>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: showCode ? '1fr 1fr' : '1fr', gap: '20px', minHeight: 0 }}>
                {/* 렌더링 영역 */}
                <div className="glass" style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', color: '#000', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '8px 16px', background: '#f8f9fa', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#666' }}>PREVIEW</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                        </div>
                    </div>
                    <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
                        <Runner code={content.code} scope={scope} onRenderError={(err) => <div style={{ color: 'red' }}>Rendering Error: {err.message}</div>} />
                    </div>
                </div>

                {/* 코드 영역 (토글 시) */}
                {showCode && (
                    <div className="glass" style={{ background: '#1e1e1e', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '8px 16px', background: '#2d2d2d', borderBottom: '1px solid #3d3d3d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#aaa' }}>SOURCE CODE</span>
                        </div>
                        <pre style={{ flex: 1, overflow: 'auto', padding: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6', color: '#d4d4d4', margin: 0 }}>
                            <code>{content.code}</code>
                        </pre>
                    </div>
                )}
            </div>

            <footer className="glass" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ maxWidth: '70%', opacity: 0.7, fontSize: '0.9rem' }}>
                    <strong>개요:</strong> {content.description || "설명이 없습니다."}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>
                    저장일: {new Date(content.createdAt).toLocaleString()} | {(content.size / 1024).toFixed(1)} KB
                </div>
            </footer>
        </div>
    );
}
