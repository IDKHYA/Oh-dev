'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Plus, FolderOpen, Play, Layout, Folder, History, Search, Atom } from 'lucide-react';

export default function Dashboard() {
    const [recentContents, setRecentContents] = useState([]);
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // 최근 콘텐츠 (전체 폴더에서 가져오기 위해 일단 루트만 조회하거나 복합 조회 필요)
                // 간단하게 모든 폴더를 먼저 가져온 후 각 폴더의 첫번째 리스트들을 합침
                const folderRes = await fetch('/api/folders');
                const foldersData = await folderRes.json();
                setFolders(foldersData);

                const allContents = [];
                for (const folder of foldersData) {
                    const res = await fetch(`/api/contents?folder=${folder}`);
                    const data = await res.json();
                    allContents.push(...data.map(c => ({ ...c, folder })));
                }
                
                // 날짜순 정렬
                allContents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRecentContents(allContents.slice(0, 6));
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="animate-fade-in">
            <header className="brand-header">
                <div className="brand-header-main">
                    <div className="logo-icon-container brand-header-icon">
                        <Folder size={36} className="folder-icon" />
                        <div className="atom-icon-overlay">
                            <Atom size={20} color="var(--primary)" />
                        </div>
                    </div>
                    <div>
                        <h1 className="brand-header-title gradient-text">React Archive</h1>
                        <p className="brand-header-tag">FOR GEMINI</p>
                    </div>
                </div>
                <div className="brand-header-subtitle">
                    <span className="brand-header-subtitle-text">
                        대시보드
                    </span>
                </div>
            </header>

            <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={20} color="#6366f1" /> 최근 추가된 콘텐츠
                    </h2>
                    <Link href="/add" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                        <Plus size={16} /> 추가하기
                    </Link>
                </div>

                {loading ? (
                    <div style={{ opacity: 0.5 }}>로딩 중...</div>
                ) : recentContents.length === 0 ? (
                    <div className="glass" style={{ padding: '3rem', textAlign: 'center', opacity: 0.6 }}>
                        저장된 콘텐츠가 없습니다. 첫 번째 리액트 코드를 추가해보세요!
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {recentContents.map((content) => (
                            <div key={content.id} className="glass archive-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 'bold', textTransform: 'uppercase' }}>{content.folder}</span>
                                    <h3 style={{ fontSize: '1.125rem', marginTop: '4px' }}>{content.title}</h3>
                                </div>
                                <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: '1.5', minHeight: '4.5em' }}>
                                    {content.description || "설명이 없습니다."}
                                </p>
                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>{new Date(content.createdAt).toLocaleDateString()}</span>
                                    <Link href={`/viewer/${content.id}?folder=${content.folder}`} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                                        <Play size={14} /> 실행
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                    <FolderOpen size={20} color="#8b5cf6" /> 폴더 브라우저
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {folders.map(folder => (
                        <Link href={`/browse/${folder}`} key={folder} className="glass nav-item" style={{ minWidth: '150px', justifyContent: 'center', padding: '16px' }}>
                            {folder}
                        </Link>
                    ))}
                    {folders.length === 0 && !loading && <p style={{ opacity: 0.5 }}>생성된 폴더가 없습니다.</p>}
                </div>
            </section>
        </div>
    );
}
