'use client';

import "./globals.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home, PlusSquare, Folder, Info, Menu, X } from 'lucide-react';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 페이지 이동 시 사이드바 닫기 (모바일)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <html lang="ko">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          .runner-container > * {
            max-width: 100%;
          }
        `}</style>
      </head>
      <body>
        <div className="main-container">
          {/* 모바일 토글 버튼 */}
          <button className="mobile-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* 오버레이 (모바일) */}
          <div 
            className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`} 
            onClick={() => setIsSidebarOpen(false)} 
          />

          <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="logo-section">
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', background: 'linear-gradient(45deg, #fff, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                React Archive
              </h1>
              <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '4px' }}>for Gemini</p>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
                <Home /> <span>대시보드</span>
              </Link>
              <Link href="/add" className={`nav-item ${pathname === '/add' ? 'active' : ''}`}>
                <PlusSquare /> <span>새 콘텐츠 추가</span>
              </Link>
              <Link href="/browse" className={`nav-item ${pathname.startsWith('/browse') ? 'active' : ''}`}>
                <Folder /> <span>폴더 탐색</span>
              </Link>
            </nav>

            <div style={{ marginTop: 'auto' }}>
              <div className="nav-item">
                <Info size={20} /> <span>도움말</span>
              </div>
            </div>
          </aside>
          
          <main className="content-area">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
