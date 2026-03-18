'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Runner } from 'react-runner';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import { ChevronLeft, Maximize2, RotateCcw, Code, X, Folder } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function ContentViewer({ params }) {
    const { id } = params;
    const searchParams = useSearchParams();
    const router = useRouter();
    const folder = searchParams.get('folder') || 'default';

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCode, setShowCode] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedCode, setEditedCode] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [folders, setFolders] = useState([]);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [targetFolder, setTargetFolder] = useState(folder);
    const viewerRef = useRef(null);

    const fetchContent = () => {
        fetch(`/api/contents/${id}?folder=${folder}`)
            .then(res => {
                if (!res.ok) throw new Error('Content not found');
                return res.json();
            })
            .then(data => {
                setContent(data);
                setEditedCode(data.code);
                setEditedTitle(data.title);
                setEditedDescription(data.description);
                setTargetFolder(data.folder);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    const fetchAllFolders = () => {
        fetch('/api/folders')
            .then(res => res.json())
            .then(data => setFolders(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchContent();
        fetchAllFolders();

        const handleFsChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, [id, folder]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            viewerRef.current?.requestFullscreen().catch(err => {
                alert(`전체 화면 모드에 진입할 수 없습니다: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

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
        useState: React.useState,
        useEffect: React.useEffect,
        useMemo: React.useMemo,
        useCallback: React.useCallback,
        useRef: React.useRef,
        Fragment: React.Fragment,
        ...LucideIcons,
    };

    return (
        <div className="animate-fade-in" style={{ height: 'calc(100vh - 5rem)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => router.back()} className="glass nav-item" style={{ padding: '8px', minWidth: 'auto' }}>
                        <ChevronLeft size={20} />
                    </button>
                    <div style={{ flex: 1 }}>
                        {isEditing ? (
                            <input 
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', width: '100%', borderRadius: '8px', padding: '4px 12px', outline: 'none' }}
                            />
                        ) : (
                            <>
                                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{content.title}</h1>
                                <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>{decodeURIComponent(folder)} / {id}</p>
                            </>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={() => setShowCode(!showCode)} className="glass nav-item" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                        <Code size={16} /> {showCode ? '코드 숨기기' : '코드 보기'}
                    </button>
                    <Link href={`/browse/${folder}`} className="glass nav-item" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                        <Folder size={16} /> 폴더로 이동
                    </Link>
                    <button onClick={() => window.location.reload()} className="glass nav-item" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                        <RotateCcw size={16} /> 새로고침
                    </button>
                </div>
            </header>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: (showCode && !isFullScreen) ? '1fr 1fr' : '1fr', gap: '20px', minHeight: 0 }}>
                {/* 렌더링 영역 */}
                <div 
                    ref={viewerRef}
                    className={`glass ${isFullScreen ? 'viewer-fullscreen' : ''}`} 
                    style={{ 
                        flex: 1, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        overflow: 'hidden', 
                        borderRadius: isFullScreen ? '0' : '24px',
                        background: isFullScreen ? '#fff' : 'rgba(255, 255, 255, 0.03)',
                        position: 'relative',
                        color: isFullScreen ? '#000' : 'inherit'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: isFullScreen ? '#f8f9fa' : 'transparent', color: isFullScreen ? '#000' : '#fff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Maximize2 size={14} opacity={0.5} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>PREVIEW</span>
                        </div>
                        {isFullScreen ? (
                            <button 
                                onClick={toggleFullScreen} 
                                style={{ background: '#ff4b4b', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}
                            >
                                <X size={18} /> 전체화면 종료 (Esc)
                            </button>
                        ) : (
                            <button onClick={toggleFullScreen} className="glass" style={{ padding: '6px 12px', color: 'white' }}>
                                <Maximize2 size={16} />
                            </button>
                        )}
                    </div>
                    <div style={{ flex: 1, overflow: 'auto', padding: isFullScreen ? '0' : '20px', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                        <div style={{ flex: 1, width: '100%', minHeight: '100%' }}>
                            <Runner code={content.code} scope={scope} onRenderError={(err) => <div style={{ color: 'red', padding: '20px' }}>Rendering Error: {err.message}</div>} />
                        </div>
                    </div>
                </div>

                {/* 코드 영역 (토글 시) */}
                {showCode && !isFullScreen && (
                    <div className="glass" style={{ background: '#1e1e1e', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '8px 16px', background: '#2d2d2d', borderBottom: '1px solid #3d3d3d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#aaa' }}>SOURCE CODE</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button 
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(content.code);
                                        alert('코드가 클립보드에 복사되었습니다.');
                                    }}
                                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#ccc', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}
                                >
                                    Copy
                                </button>
                                {!isEditing ? (
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <button 
                                        disabled={isSaving}
                                        onClick={async () => {
                                            setIsSaving(true);
                                            try {
                                                const res = await fetch(`/api/contents/${id}`, {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ 
                                                        folder, 
                                                        code: editedCode, 
                                                        title: editedTitle, 
                                                        description: editedDescription,
                                                        toFolder: targetFolder
                                                    })
                                                });
                                                if (res.ok) {
                                                    const updatedData = await res.json();
                                                    if (targetFolder !== folder) {
                                                        // 폴더가 바뀌었으면 URL 이동
                                                        router.push(`/viewer/${id}?folder=${targetFolder}`);
                                                    } else {
                                                        fetchContent();
                                                        setIsEditing(false);
                                                    }
                                                } else {
                                                    alert('저장에 실패했습니다.');
                                                }
                                            } catch (e) {
                                                alert('오류 발생');
                                            } finally {
                                                setIsSaving(false);
                                            }
                                        }}
                                        style={{ background: '#27c93f', border: 'none', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}
                                    >
                                        {isSaving ? 'Saving...' : 'Save'}
                                    </button>
                                )}
                                {isEditing && (
                                    <button 
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditedCode(content.code);
                                        }}
                                        style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#aaa', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden', padding: '0', display: 'flex' }}>
                            {isEditing ? (
                                <textarea
                                    value={editedCode}
                                    onChange={(e) => setEditedCode(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: '#1a1a1a',
                                        color: '#d4d4d4',
                                        border: 'none',
                                        padding: '20px',
                                        fontFamily: 'monospace',
                                        fontSize: '13px',
                                        lineHeight: '1.6',
                                        resize: 'none',
                                        outline: 'none'
                                    }}
                                />
                            ) : (
                                <pre style={{ width: '100%', height: '100%', overflow: 'auto', padding: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6', color: '#d4d4d4', margin: 0 }}>
                                    <code>{content.code}</code>
                                </pre>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <footer className="glass" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <strong style={{ fontSize: '0.85rem' }}>개요 수정:</strong>
                                <input 
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    placeholder="설명을 입력하세요"
                                    style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px', padding: '4px 8px', outline: 'none', fontSize: '0.9rem' }}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <strong style={{ fontSize: '0.85rem' }}>폴더 이동:</strong>
                                <select 
                                    value={targetFolder}
                                    onChange={(e) => setTargetFolder(e.target.value)}
                                    style={{ background: '#2d2d2d', color: 'white', border: '1px solid #3d3d3d', borderRadius: '4px', padding: '4px 8px', outline: 'none', fontSize: '0.85rem' }}
                                >
                                    {folders.map(f => (
                                        <option key={f} value={f}>{decodeURIComponent(f)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                            <strong>개요:</strong> {content.description || "설명이 없습니다."}
                        </div>
                    )}
                </div>
                {!isEditing && (
                    <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>
                        저장일: {new Date(content.createdAt).toLocaleString()} | {(content.size / 1024).toFixed(1)} KB
                    </div>
                )}
            </footer>
        </div>
    );
}
