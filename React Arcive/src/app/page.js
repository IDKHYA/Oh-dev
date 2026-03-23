'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Plus, FolderOpen, Play, Folder, History, ArrowRight, Database, Box, Activity, Atom, ChevronRight } from 'lucide-react';

export default function Dashboard() {
    const [recentContents, setRecentContents] = useState([]);
    const [folders, setFolders] = useState([]);
    const [stats, setStats] = useState({ totalContents: 0, totalFolders: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [recentRes, foldersRes, statsRes] = await Promise.all([
                    fetch('/api/contents/recent'),
                    fetch('/api/folders'),
                    fetch('/api/stats')
                ]);
                
                const recent = await recentRes.json();
                const foldersData = await foldersRes.json();
                const statsData = await statsRes.json();
                
                setRecentContents(recent);
                setFolders(foldersData);
                setStats(statsData);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
            {/* Branded Header */}
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
                        <p className="brand-header-tag">FOR GEMINI <span style={{opacity: 0.5}}>v12.0</span></p>
                    </div>
                </div>
                <div className="brand-header-subtitle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span className="brand-header-subtitle-text">대시보드</span>
                    <Link href="/add" className="btn-primary" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem' }}>
                        <Plus size={14} /> 새 콘텐츠
                    </Link>
                </div>
            </header>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '3rem' }}>
                <div className="glass" style={{ padding: '20px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', width: 'fit-content' }}>
                        <Database size={18} color="var(--primary)" />
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stats.totalContents}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.5, fontWeight: '600' }}>보관된 콘텐츠</span>
                </div>
                <div className="glass" style={{ padding: '20px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', width: 'fit-content' }}>
                        <Folder size={18} color="#8b5cf6" />
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stats.totalFolders}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.5, fontWeight: '600' }}>활성 폴더</span>
                </div>
                <div className="glass mobile-hide" style={{ padding: '20px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ padding: '8px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', width: 'fit-content' }}>
                        <Activity size={18} color="#ec4899" />
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>Premium</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.5, fontWeight: '600' }}>시스템 상태</span>
                </div>
            </div>

            {/* Recent Archive: Horizontal Scroll */}
            <section style={{ marginBottom: '3.5rem' }}>
                <div className="section-label">
                    <History size={14} /> 최근 아카이브
                </div>
                
                {loading ? (
                    <div style={{ display: 'flex', gap: '16px' }}>
                        {[1, 2, 3].map(i => <div key={i} className="glass" style={{ flex: '0 0 280px', height: '180px', opacity: 0.3, borderRadius: '20px' }}></div>)}
                    </div>
                ) : recentContents.length === 0 ? (
                    <div className="glass" style={{ padding: '3rem', textAlign: 'center', opacity: 0.5, borderRadius: '24px' }}>
                        최근 활동이 없습니다.
                    </div>
                ) : (
                    <div className="recent-scroll-container">
                        {recentContents.map((content) => (
                            <Link href={`/viewer/${content.id}?folder=${content.folder}`} key={content.id} className="recent-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: '800', opacity: 0.8 }}>
                                        {decodeURIComponent(content.folder)}
                                    </span>
                                    <ArrowRight size={14} style={{ opacity: 0.3 }} />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.3' }}>{content.title}</h3>
                                <p className="summary-text">{content.description || "상세 설명이 등록되지 않은 콘텐츠입니다."}</p>
                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', opacity: 0.4 }}>
                                    <Clock size={10} /> {new Date(content.updatedAt).toLocaleDateString()}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* Folder Explorer: Premium Grid */}
            <section>
                <div className="section-label">
                    <FolderOpen size={14} /> 폴더 브라우저
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                    {folders.map(folder => (
                        <Link href={`/browse/${folder}`} key={folder} className="folder-grid-item">
                            <div style={{ position: 'relative' }}>
                                <Folder size={48} color="#8b5cf6" style={{ opacity: 0.8 }} fill="rgba(139, 92, 246, 0.1)" />
                                <ChevronRight size={14} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5 }} />
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: '700', textAlign: 'center' }}>{decodeURIComponent(folder)}</span>
                        </Link>
                    ))}
                    {folders.length === 0 && !loading && (
                        <div className="glass" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', opacity: 0.5, borderRadius: '24px' }}>
                            생성된 폴더가 없습니다.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
