'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, Database, Play } from 'lucide-react';

export default function FolderContentsPage({ params }) {
    const { folder } = params;
    const decodedFolder = decodeURIComponent(folder);
    const [contents, setContents] = useState([]);
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 편집 및 이동 관련 상태
    const [editingId, setEditingId] = useState(null);
    const [moveTarget, setMoveTarget] = useState(null); // { id, title }
    const [tempTitle, setTempTitle] = useState('');
    const [tempDescription, setTempDescription] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [deleteStepId, setDeleteStepId] = useState(null); // 'confirm' 단계 확인용 (ID 저장)

    const fetchFolders = () => {
        fetch('/api/folders')
            .then(res => res.json())
            .then(data => setFolders(data))
            .catch(err => console.error(err));
    };

    const fetchContents = () => {
        setLoading(true);
        fetch(`/api/contents?folder=${folder}`)
            .then(res => res.json())
            .then(data => setContents(data))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchContents();
        fetchFolders();
    }, [folder]);

    const handleUpdate = async (content) => {
        setIsProcessing(true);
        try {
            const res = await fetch(`/api/contents/${content.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    folder, 
                    title: tempTitle, 
                    description: tempDescription
                    // code는 전달하지 않음 (부분 업데이트 사용)
                })
            });
            if (res.ok) {
                fetchContents();
                setEditingId(null);
            } else {
                alert('수정 실패');
            }
        } catch (e) {
            alert('오류 발생');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleMove = async (id, toFolder) => {
        if (!toFolder || toFolder === folder) return;
        setIsProcessing(true);
        try {
            const res = await fetch(`/api/contents/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folder, toFolder })
            });

            if (res.ok) {
                // 이동 완료 후 목록에서 즉시 제거 (로컬 상태 업데이트)
                setContents(prev => prev.filter(c => c.id !== id));
                setMoveTarget(null);
            } else {
                const data = await res.json();
                alert(data.error || '이동 실패');
            }
        } catch (e) {
            alert('오류 발생');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (id, title) => {
        setIsProcessing(true);
        try {
            const res = await fetch(`/api/contents/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setContents(prev => prev.filter(c => c.id !== id));
                setEditingId(null);
                setDeleteStepId(null);
            } else {
                alert('삭제 실패');
            }
        } catch (e) {
            alert('오류 발생');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
            <header className="brand-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div className="brand-header-main">
                        <Link href="/browse" className="glass" style={{ padding: '8px', borderRadius: '12px', marginRight: '8px' }}>
                            <ChevronLeft size={20} />
                        </Link>
                        <div className="logo-text">
                            <h1 className="brand-header-title gradient-text" style={{ fontSize: '1.4rem' }}>{decodedFolder}</h1>
                            <p className="brand-header-tag">FOLDER ARCHIVE <span style={{opacity: 0.5}}>v12.0</span></p>
                        </div>
                    </div>
                </div>
                <div className="brand-header-subtitle">
                    <span className="brand-header-subtitle-text">{contents.length}개의 콘텐츠</span>
                </div>
            </header>

            {loading ? (
                <p style={{ opacity: 0.5 }}>불러오는 중...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                    {contents.map(content => (
                        <div key={content.id} className="glass" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    {editingId === content.id ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                                            <input 
                                                value={tempTitle}
                                                onChange={(e) => setTempTitle(e.target.value)}
                                                placeholder="제목"
                                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px 12px', borderRadius: '4px', outline: 'none', fontWeight: 'bold' }}
                                            />
                                            <textarea 
                                                value={tempDescription}
                                                onChange={(e) => setTempDescription(e.target.value)}
                                                placeholder="개요를 입력하세요"
                                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px 12px', borderRadius: '4px', outline: 'none', fontSize: '0.9rem', resize: 'none', height: '60px' }}
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '4px' }}>{content.title}</h3>
                                            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '8px' }}>{content.description || '설명이 없습니다.'}</p>
                                        </>
                                    )}
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', opacity: 0.4 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {new Date(content.createdAt).toLocaleDateString()}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Database size={12} /> {(content.size / 1024).toFixed(1)} KB</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    {editingId === content.id ? (
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button 
                                                onClick={() => handleUpdate(content)} 
                                                disabled={isProcessing}
                                                className="btn-primary" 
                                                style={{ padding: '6px 12px' }}
                                            >
                                                저장
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="glass" style={{ padding: '6px 12px' }}>취소</button>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (deleteStepId === content.id) {
                                                        handleDelete(content.id, content.title);
                                                    } else {
                                                        setDeleteStepId(content.id);
                                                    }
                                                }}
                                                disabled={isProcessing}
                                                className="glass btn-delete-focus" 
                                                style={{ 
                                                    padding: '8px 16px', 
                                                    color: deleteStepId === content.id ? '#fff' : '#ff4b4b', 
                                                    background: deleteStepId === content.id ? '#ff4b4b' : 'transparent',
                                                    border: '1px solid rgba(255, 75, 75, 0.4)',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.8rem',
                                                    borderRadius: '8px',
                                                    minWidth: '80px',
                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                                }}
                                            >
                                                {deleteStepId === content.id ? '진짜삭제' : '삭제'}
                                            </button>
                                            {deleteStepId === content.id && (
                                                <button onClick={() => setDeleteStepId(null)} className="glass" style={{ padding: '8px 12px', fontSize: '0.75rem' }}>취소</button>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <button 
                                                onClick={() => {
                                                    setEditingId(content.id);
                                                    setTempTitle(content.title);
                                                    setTempDescription(content.description || '');
                                                }}
                                                className="glass" 
                                                style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                                            >
                                                수정
                                            </button>
                                            <button 
                                                onClick={() => setMoveTarget({ id: content.id, title: content.title })}
                                                className="glass" 
                                                style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                                            >
                                                이동
                                            </button>
                                            <Link href={`/viewer/${content.id}?folder=${folder}`} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
                                                <Play size={16} /> 실행
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {contents.length === 0 && <div className="glass" style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>폴더가 비어 있습니다.</div>}
                </div>
            )}

            {/* 폴더 이동 모달 */}
            {moveTarget && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
                    <div className="glass animate-fade-in" style={{ width: '100%', maxWidth: '450px', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>폴더 이동</h2>
                            <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>
                                <strong style={{ color: 'var(--primary)' }}>{moveTarget.title}</strong> 콘텐츠를 어디로 옮길까요?
                            </p>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxHeight: '300px', overflowY: 'auto', padding: '4px' }}>
                            {folders.map(f => (
                                <button
                                    key={f}
                                    onClick={() => handleMove(moveTarget.id, f)}
                                    disabled={isProcessing || f === folder}
                                    className="glass nav-item"
                                    style={{ 
                                        padding: '16px', 
                                        justifyContent: 'center', 
                                        fontSize: '0.9rem',
                                        opacity: f === folder ? 0.3 : 1,
                                        cursor: f === folder ? 'not-allowed' : 'pointer',
                                        textAlign: 'center'
                                    }}
                                >
                                    {decodeURIComponent(f)}
                                </button>
                            ))}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button 
                                onClick={() => setMoveTarget(null)} 
                                className="glass" 
                                style={{ flex: 1, padding: '12px', borderRadius: '12px' }}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
