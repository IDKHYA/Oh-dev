'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Moon, 
  Sun,
  List,
  CheckCircle2,
  BookMarked
} from 'lucide-react';

// --- 데이터 영역 (제공해주신 모든 텍스트를 구조화) ---
// 전체 데이터를 여기에 복사해서 붙여넣으시면 됩니다!
const bookData = [
  {
    id: 1,
    title: "이 자료 전체의 큰 흐름",
    content: (
      <>
        <p>이 자료는 단순히 “예쁜 화면을 만드는 법”을 설명하는 것이 아닙니다.<br/>
        핵심은 <strong>사람이 디지털 시스템을 어떻게 경험하고, 어떻게 이해하고, 어떻게 조작하는가</strong>를 다루는 것입니다.</p>
        
        <h3>전체 흐름은 크게 이렇게 이어집니다.</h3>
        <ul>
          <li>오늘날 디지털 기기에서 왜 소프트웨어와 UI가 중요해졌는가</li>
          <li>UI 중에서도 왜 단순한 화면 배치보다 인터랙션이 중요한가</li>
          <li>좋은 인터랙션과 나쁜 인터랙션은 무엇으로 구분되는가</li>
          <li>실제 문제를 어떻게 관찰하고 해결하는가</li>
          <li>그 해결의 바탕에는 왜 인간의 인지와 기억에 대한 이해가 필요한가</li>
        </ul>
        
        <p>결국 HCI는 “기계를 만드는 일”이 아니라<br/>
        <strong>사람이 덜 헷갈리고 덜 지치고 더 잘 해낼 수 있게 만드는 일</strong>이라는 결론으로 이어진다.</p>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mt-6 border-l-4 border-blue-500">
          <strong>즉 이 강의는</strong><br/>
          디지털 기기 → 사용자 인터페이스 → 인터랙션 디자인 → 실제 개선 사례 → 인간 인지의 원리<br/>
          이 흐름으로 전개됩니다.
        </div>
      </>
    )
  },
  {
    id: 2,
    title: "왜 하드웨어보다 소프트웨어와 UI가 더 중요해졌는가",
    content: (
      <>
        <p>자료의 첫 부분은 HCI를 갑자기 정의하지 않고, 먼저 현실의 변화부터 이야기합니다.</p>
        <p>예전에는 디지털 기기를 평가할 때 하드웨어 성능이 핵심이었습니다.<br/>
        예를 들어 PC는 더 빠른 연산, 더 큰 저장공간, 더 높은 안정성이 중요했고, 스마트폰도 카메라 성능이나 칩 성능처럼 기계 자체의 발전이 중심이었습니다.</p>
        <p>그런데 지금은 상황이 달라졌습니다.<br/>
        기기의 기본 성능이 어느 정도 상향 평준화되면서, <strong>사용자가 실제로 체감하는 차이는 소프트웨어를 얼마나 쉽게 쓸 수 있는가에서 크게 갈리게 되었습니다.</strong></p>
        
        <h3>예를 들면 이런 것입니다.</h3>
        <ul>
          <li>PC 프로그램이 설치와 실행부터 복잡하면 기능이 좋아도 잘 쓰지 않게 됨</li>
          <li>온라인 쇼핑몰 주문과 결제 단계가 복잡하면 중간에 포기하게 됨</li>
          <li>모바일 앱은 화면이 작기 때문에 조작이 조금만 불편해도 활용도가 급격히 떨어짐</li>
          <li>고령층이나 디지털 취약 계층은 기능 부족보다 사용 방법 자체의 장벽 때문에 기기를 사용하지 못함</li>
        </ul>
        
        <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg mt-6 border-l-4 border-amber-500">
          <p>여기서 중요한 관점은 문제가 “기능이 없다”가 아니라<br/>
          <strong>“쓸 수 없다” 또는 “쓰기가 너무 어렵다”</strong>는 점입니다.</p>
          <p>즉 현대 디지털 제품의 경쟁력은 단순히 성능이 아니라 <strong>사용 가능성, 사용 편의성, 접근성</strong>에서 결정됩니다.<br/>
          그래서 HCI가 중요해집니다.</p>
        </div>
      </>
    )
  }
];

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const contentRef = useRef(null);

  // 진행률 계산
  const progress = ((currentChapter + 1) / bookData.length) * 100;

  useEffect(() => {
    // 챕터 변경 시 스크롤 최상단으로 이동
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentChapter]);

  const handleNext = () => {
    if (currentChapter < bookData.length - 1) {
      setCurrentChapter(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1);
    }
  };

  const handleChapterSelect = (index) => {
    setCurrentChapter(index);
    setIsSidebarOpen(false);
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 모바일 사이드바 오버레이 */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 목차 사이드바 */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-30 w-72 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex flex-col border-r ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
      >
        <div className="p-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 font-black text-lg text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-6 h-6" />
            <span>HCI 완벽 요약서</span>
          </div>
          <button 
            className="md:hidden p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-wider">목차 (Table of Contents)</div>
          <ul className="space-y-1">
            {bookData.map((chapter, index) => (
              <li key={chapter.id}>
                <button
                  onClick={() => handleChapterSelect(index)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-start gap-3 ${
                    currentChapter === index 
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className={`flex-shrink-0 mt-0.5 ${currentChapter === index ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                    {index + 1}.
                  </span>
                  <span className="leading-snug">{chapter.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 진행률 바 (사이드바 하단) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span>진행률</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 flex flex-col h-full relative max-w-full min-w-0">
        
        {/* 상단 네비게이션 바 */}
        <header className="h-16 flex items-center justify-between px-4 border-b bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex-shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="목차 열기"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:flex">
              <BookMarked className="w-4 h-4" />
              <span>Chapter {currentChapter + 1} of {bookData.length}</span>
            </div>
          </div>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="테마 변경"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
          </button>
        </header>

        {/* 최상단 프로그레스 바 (가로) */}
        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 block md:hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 책 본문 영역 */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 scroll-smooth"
        >
          <div className="max-w-3xl mx-auto pb-20">
            {/* 챕터 헤더 */}
            <div className="mb-10 pb-6 border-b-2 border-slate-200 dark:border-slate-700">
              <div className="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest mb-3 text-sm">
                CHAPTER {currentChapter + 1}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-slate-900 dark:text-white">
                {bookData[currentChapter].title}
              </h1>
            </div>

            {/* 본문 콘텐츠 */}
            <div className="prose prose-lg dark:prose-invert prose-indigo max-w-none text-slate-800 dark:text-slate-300 leading-relaxed font-medium">
              {bookData[currentChapter].content}
            </div>
            
            {/* 하단 네비게이션 버튼 (이전/다음 챕터) */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={handlePrev}
                disabled={currentChapter === 0}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  currentChapter === 0 
                    ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-slate-500'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                이전 챕터
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentChapter === bookData.length - 1}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  currentChapter === bookData.length - 1 
                    ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                다음 챕터
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 글로벌 스크롤바 스타일링을 위한 CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.5);
        }
      `}} />
    </div>
  );
}
