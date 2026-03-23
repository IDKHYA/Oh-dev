'use client';

import * as ReactModule from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRunner } from 'react-runner';
import * as LucideIcons from 'lucide-react';
import { ChevronLeft, Maximize2, RotateCcw, Code, X, Folder } from 'lucide-react';
import Link from 'next/link';

class ErrorBoundary extends ReactModule.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '24px', color: '#ff4b4b', background: '#fff', borderRadius: '12px', border: '2px solid #ff4b4b', height: '100%', overflow: 'auto' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>🚨 런타임 렌더링 에러</h3>
                    <p style={{ fontSize: '14px', marginBottom: '10px' }}>컴포넌트 실행 중 문제가 발생했습니다. 소스 코드를 확인해주세요.</p>
                    <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', background: '#f5f5f5', padding: '12px', borderRadius: '8px', color: '#333' }}>
                        {this.state.error.toString()}
                    </pre>
                </div>
            );
        }
        return this.props.children;
    }
}

function LivePreview({ code, scope }) {
    const { element, error } = useRunner({ code, scope });
    
    return (
        <ErrorBoundary>
            {error ? (
                <div style={{ padding: '24px', color: '#ff4b4b', background: '#fff', borderRadius: '12px', border: '2px dashed #ff4b4b', height: '100%', overflow: 'auto' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>⚠️ 구문 분석 및 컴파일 에러</h3>
                    <p style={{ fontSize: '14px', marginBottom: '10px' }}>react-runner 코어에서 평가 중 에러가 발생했습니다:</p>
                    <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', background: '#f5f5f5', padding: '12px', borderRadius: '8px', color: '#333' }}>
                        {error.toString()}
                    </pre>
                </div>
            ) : element}
        </ErrorBoundary>
    );
}

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
    const [deleteStep, setDeleteStep] = useState(false);
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

    const handleDelete = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/contents/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                router.push(`/browse/${folder}`);
            } else {
                alert('삭제 실패');
            }
        } catch (e) {
            alert('오류 발생');
        } finally {
            setIsSaving(false);
        }
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

    // React-Runner Scope: 렌더링될 코드에서 사용할 수 있는 라이브러리들
    // [Performance Optimization] scope 객체를 useMemo로 감싸 렌더링마다 재생성되는 것을 방지
    const scope = ReactModule.useMemo(() => ({
        import: {
            'react': ReactModule,
            'lucide-react': LucideIcons
        },
        React: ReactModule.default || ReactModule,
        ...ReactModule,
        // ...LucideIcons 는 전역 식별자 충돌(예: Quote)을 일으키므로 절대 스프레드하지 않습니다. 사용자가 직접 import 해서 써야 합니다.
    }), []);

    if (loading) return <div style={{ padding: '2rem', opacity: 0.5 }}>콘텐츠를 불러오는 중...</div>;
    if (error) return <div style={{ padding: '2rem', color: '#ff4b4b' }}>데이터를 불러올 수 없습니다: {error}</div>;

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '2rem' }}>
            <header className="brand-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '12px' }}>
                    <div className="brand-header-main" style={{ flex: 1, minWidth: 0 }}>
                        <button onClick={() => router.back()} className="glass" style={{ padding: '8px', borderRadius: '12px', marginRight: '8px' }}>
                            <ChevronLeft size={20} />
                        </button>
                        <div className="logo-text" style={{ flex: 1, minWidth: 0 }}>
                            {isEditing ? (
                                <input
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--primary)', color: 'white', fontSize: '1.2rem', fontWeight: '800', width: '100%', borderRadius: '8px', padding: '4px 12px', outline: 'none' }}
                                />
                            ) : (
                                <>
                                    <h1 className="brand-header-title gradient-text" style={{ fontSize: '1.4rem', lineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{content.title}</h1>
                                    <Link href={`/browse/${folder}`} className="brand-header-tag" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', transition: 'opacity 0.2s' }}>
                                        <Folder size={10} /> {decodeURIComponent(folder)} / {id}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                        <Link href={`/browse/${folder}`} className="glass" style={{ padding: '8px 12px', borderRadius: '12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', color: 'white' }}>
                            <Folder size={16} />
                        </Link>
                        <button onClick={() => setShowCode(!showCode)} className="glass mobile-hide" style={{ padding: '8px 12px', borderRadius: '12px', fontSize: '0.8rem' }}>
                            <Code size={16} />
                        </button>
                        <button onClick={() => window.location.reload()} className="glass" style={{ padding: '8px 12px', borderRadius: '12px', fontSize: '0.8rem' }}>
                            <RotateCcw size={16} />
                        </button>
                    </div>
                </div>
            </header>

            <div className="viewer-main-layout" style={{ display: 'grid', gridTemplateColumns: (showCode && !isFullScreen) ? 'repeat(auto-fit, minmax(450px, 1fr))' : '1fr', gap: '20px', minHeight: '600px' }}>
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
                        <div className="preview-container" style={{ flex: 1, width: '100%', minHeight: '100%' }}>
                            <LivePreview key={content.code} code={content.code} scope={scope} />
                        </div>
                    </div>
                </div>

                {/* 코드 영역 (토글 시) */}
                {showCode && !isFullScreen && (
                    <div className="glass code-viewer-panel" style={{ background: '#0a0a0a', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--glass-border)' }}>
                        <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Code size={14} color="var(--primary)" />
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.8 }}>SOURCE CODE</span>
                                <Link href={`/browse/${folder}`} className="glass mobile-hide" style={{ marginLeft: '8px', padding: '4px 8px', borderRadius: '6px', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#8b5cf6', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                                    <Folder size={12} /> {decodeURIComponent(folder)}
                                </Link>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(content.code);
                                        alert('코드가 클립보드에 복사되었습니다.');
                                    }}
                                    className="glass"
                                    style={{ color: '#ccc', padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem' }}
                                >
                                    Copy
                                </button>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="btn-primary"
                                        style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem' }}
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <>
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
                                                        fetchContent();
                                                        setIsEditing(false);
                                                    } else {
                                                        alert('저장에 실패했습니다.');
                                                    }
                                                } catch (e) {
                                                    alert('오류 발생');
                                                } finally {
                                                    setIsSaving(false);
                                                }
                                            }}
                                            style={{ background: '#27c93f', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            {isSaving ? 'Saving...' : 'Save'}
                                        </button>
                                        <button 
                                            onClick={() => { setIsEditing(false); fetchContent(); }}
                                            className="glass"
                                            style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem' }}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (deleteStep) {
                                                    handleDelete();
                                                } else {
                                                    setDeleteStep(true);
                                                }
                                            }}
                                            disabled={isSaving}
                                            style={{ 
                                                background: deleteStep ? '#ff4b4b' : 'transparent', 
                                                border: '1px solid #ff4b4b', 
                                                color: deleteStep ? 'white' : '#ff4b4b', 
                                                padding: '8px 16px', 
                                                borderRadius: '8px', 
                                                fontSize: '0.75rem', 
                                                cursor: 'pointer', 
                                                fontWeight: 'bold',
                                                minWidth: '90px',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {deleteStep ? 'REAL DELETE?' : 'DELETE'}
                                        </button>
                                        {deleteStep && (
                                            <button 
                                                onClick={() => setDeleteStep(false)} 
                                                className="glass" 
                                                style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem' }}
                                            >
                                                CANCEL
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div style={{ flex: 1, minHeight: '400px', display: 'flex' }}>
                            {isEditing ? (
                                <textarea
                                    value={editedCode}
                                    onChange={(e) => setEditedCode(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'transparent',
                                        color: '#ce9178',
                                        border: 'none',
                                        padding: '24px',
                                        fontFamily: 'monospace',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        resize: 'none',
                                        outline: 'none'
                                    }}
                                />
                            ) : (
                                <pre style={{ width: '100%', height: '100%', overflow: 'auto', padding: '24px', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', color: '#d4d4d4', margin: 0 }}>
                                    <code>{content.code}</code>
                                </pre>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <button onClick={() => setShowCode(!showCode)} className="glass" style={{ width: '100%', padding: '16px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {showCode ? <X size={18} /> : <Code size={18} />} {showCode ? '코드 닫기' : '전체 코드 보기 / 수정'}
                </button>
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
