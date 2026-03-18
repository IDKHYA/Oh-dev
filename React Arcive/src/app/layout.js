import "./globals.css";
import Link from 'next/link';
import { Home, PlusSquare, Folder, Info, Github } from 'lucide-react';

export const metadata = {
  title: "리액트 자료 모음 for 제미나이",
  description: "제미나이로 만든 리액트 결과물을 위한 아카이브",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            darkMode: 'class',
            theme: {
              extend: {
                colors: {
                  background: "var(--background)",
                  foreground: "var(--foreground)",
                }
              }
            }
          }
        `}} />
      </head>
      <body>
        <div className="main-container">
          <aside className="sidebar">
            <div className="logo-section">
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', background: 'linear-gradient(45deg, #fff, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                React Archive
              </h1>
              <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '4px' }}>for Gemini</p>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/" className="nav-item active">
                <Home /> <span>대시보드</span>
              </Link>
              <Link href="/add" className="nav-item">
                <PlusSquare /> <span>새 콘텐츠 추가</span>
              </Link>
              <Link href="/browse" className="nav-item">
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
