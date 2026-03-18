'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Folder, ChevronRight, FileCode, RotateCcw } from 'lucide-react';

export default function BrowsePage() {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFolders = () => {
        setLoading(true);
        fetch('/api/folders')
            .then(res => res.json())
            .then(data => setFolders(data))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    const handleAddFolder = async () => {
        const name = prompt('새 폴더 이름을 입력하세요:');
        if (!name) return;

        try {
            const res = await fetch('/api/folders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folder: name })
            });

            if (res.ok) {
                fetchFolders();
            } else {
                const data = await res.json();
                alert(data.error || '폴더 생성 실패');
            }
        } catch (e) {
            alert('오류 발생');
        }
    };

    const handleRenameFolder = async (oldName) => {
        const newName = prompt('새 폴더 이름을 입력하세요:', oldName);
        if (!newName || newName === oldName) return;

        try {
            const res = await fetch(`/api/folders/${oldName}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName })
            });

            if (res.ok) {
                fetchFolders();
            } else {
                const data = await res.json();
                alert(data.error || '이름 변경 실패');
            }
        } catch (e) {
            alert('오류 발생');
        }
    };

    const handleDeleteFolder = async (name) => {
        if (!confirm(`'${name}' 폴더를 정말 삭제하시겠습니까? 내부의 모든 콘텐츠가 삭제됩니다.`)) return;

        try {
            const res = await fetch(`/api/folders/${name}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchFolders();
            } else {
                const data = await res.json();
                alert(data.error || '삭제 실패');
            }
        } catch (e) {
            alert('오류 발생');
        }
    };

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Browse Folders</h1>
                    <p style={{ opacity: 0.6 }}>주제별로 분류된 아카이브 폴더를 탐색합니다.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={fetchFolders} className="glass nav-item" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                        <RotateCcw size={16} /> 새로고침
                    </button>
                    <button onClick={handleAddFolder} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                        <Folder size={16} /> 폴더 추가
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {folders.map(folder => (
                    <div key={folder} className="glass" style={{ padding: '24px', borderRadius: '16px', transition: 'transform 0.2s', cursor: 'default' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Folder size={24} />
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <button 
                                    onClick={(e) => { e.preventDefault(); handleRenameFolder(folder); }} 
                                    className="glass" 
                                    style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                                    title="이름 변경"
                                >
                                    Rename
                                </button>
                                <button 
                                    onClick={(e) => { e.preventDefault(); handleDeleteFolder(folder); }} 
                                    className="glass" 
                                    style={{ padding: '4px 8px', fontSize: '0.7rem', color: '#ff4b4b' }}
                                    title="폴더 삭제"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '4px' }}>{decodeURIComponent(folder)}</h3>
                        <p style={{ fontSize: '0.875rem', opacity: 0.5, marginBottom: '20px' }}>폴더 내 콘텐츠 탐색</p>
                        <Link href={`/browse/${folder}`} className="nav-item active" style={{ justifyContent: 'center', padding: '10px' }}>
                            콘텐츠 보기 <ChevronRight size={16} />
                        </Link>
                    </div>
                ))}
                {folders.length === 0 && !loading && <p style={{ opacity: 0.5 }}>폴더가 아직 없습니다.</p>}
            </div>
        </div>
    );
}
