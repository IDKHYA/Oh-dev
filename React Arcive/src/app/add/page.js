'use client';

import { Code, Save, Folder, Plus, Atom, Layout, Terminal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AddContent() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [folder, setFolder] = useState('default');
    const [folders, setFolders] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchFolders = () => {
        fetch('/api/folders')
            .then(res => res.json())
            .then(data => setFolders(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !code) return alert('제목과 코드는 필수입니다.');

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/contents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, code, folder }),
            });

            if (res.ok) {
                router.push('/');
            } else {
                const data = await res.json();
                alert(data.error || '저장에 실패했습니다.');
            }
        } catch (error) {
            alert('오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <header className="brand-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="brand-header-main">
                        <div className="logo-icon-container brand-header-icon">
                            <Folder size={32} className="folder-icon" />
                            <div className="atom-icon-overlay">
                                <Atom size={18} color="var(--primary)" />
                            </div>
                        </div>
                        <div>
                            <h1 className="brand-header-title gradient-text">React Archive</h1>
                            <p className="brand-header-tag">FOR GEMINI</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => router.back()} 
                        className="glass"
                        style={{ padding: '8px', borderRadius: '12px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="brand-header-subtitle">
                    <span className="brand-header-subtitle-text">
                        새 콘텐츠 추가
                    </span>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="add-content-form">
                {/* 폼 섹션 (모바일에서 먼저 나옴) */}
                <div className="form-section">
                    <div className="glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', opacity: 0.7 }}>제목</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="예: 인터랙티브 카드 컴포넌트"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', opacity: 0.7 }}>개요</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="이 콘텐츠에 대한 간단한 설명을 입력하세요."
                                style={{ width: '100%', height: '100px', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none', resize: 'none' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', opacity: 0.7 }}>저장 폴더</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <select
                                    value={folder}
                                    onChange={(e) => setFolder(e.target.value)}
                                    style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }}
                                >
                                    <option value="default">기본 (default)</option>
                                    {folders.map(f => <option key={f} value={f}>{decodeURIComponent(f)}</option>)}
                                </select>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        const newFolderName = prompt('새 폴더 이름을 입력하세요:');
                                        if (newFolderName) {
                                            const res = await fetch('/api/folders', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ folder: newFolderName })
                                            });
                                            if (res.ok) {
                                                fetchFolders();
                                                setFolder(newFolderName);
                                            } else {
                                                alert('폴더 생성 실패');
                                            }
                                        }
                                    }}
                                    className="glass"
                                    style={{ padding: '0 12px', color: 'white', cursor: 'pointer' }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                        >
                            <Save size={18} /> {isSubmitting ? '저장 중...' : '콘텐츠 저장하기'}
                        </button>
                    </div>

                    <div className="glass" style={{ padding: '20px', fontSize: '0.8rem', opacity: 0.5, lineHeight: '1.6' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#6366f1' }}>
                            <Layout size={14} /> 저장 안내
                        </h4>
                        코드는 <code>/react_contents</code> 경로에 안전하게 보관됩니다.
                    </div>
                </div>

                {/* 코드 섹션 */}
                <div className="code-section">
                    <div className="glass" style={{ padding: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', opacity: 0.7 }}>리액트 코드 (.jsx)</label>
                        <div style={{ position: 'relative' }}>
                            <Terminal size={16} style={{ position: 'absolute', top: '16px', left: '16px', opacity: 0.3 }} />
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder=" 여기에 코드를 붙여넣으세요..."
                                style={{
                                    width: '100%',
                                    height: '500px',
                                    background: '#000',
                                    color: '#ce9178',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    padding: '16px 16px 16px 44px',
                                    fontFamily: 'monospace',
                                    fontSize: '14px',
                                    lineHeight: '1.6',
                                    resize: 'none',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
