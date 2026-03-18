import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Menu, ChevronLeft, ChevronRight, X, 
  Monitor, Cloud, GitBranch, GitCommit, ArrowRight, 
  AlertTriangle, Terminal, CheckCircle, FileText,
  RotateCcw, Users, HardDrive, Download, Upload, Server
} from 'lucide-react';

const GitConceptBook = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 진행도 계산
  const progress = ((currentChapter + 1) / 15) * 100;

  // 터미널 UI 컴포넌트
  const CodeBlock = ({ code, desc }) => (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      <div className="bg-gray-800 text-gray-400 text-xs px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <Terminal size={14} /> 터미널
      </div>
      <div className="bg-gray-900 p-4 font-mono text-sm text-green-400 overflow-x-auto">
        <code>{code}</code>
      </div>
      {desc && <div className="bg-gray-100 p-3 text-sm text-gray-700 border-t border-gray-200">{desc}</div>}
    </div>
  );

  // 정보 박스 컴포넌트
  const InfoBox = ({ children, title, icon: Icon }) => (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
      {title && (
        <div className="flex items-center gap-2 text-blue-800 font-bold mb-2">
          {Icon && <Icon size={18} />}
          {title}
        </div>
      )}
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );

  // 목차 데이터 및 각 장의 컨텐츠
  const chapters = [
    {
      title: "1. Git이란 무엇인가",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-800">
            Git은 <strong>버전 관리 시스템</strong>입니다.<br/>
            버전 관리란 파일이나 프로젝트의 변경 이력을 기록하고 관리하는 것을 뜻합니다.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="text-blue-500" />
              예를 들어 보고서를 작성한다고 해보겠습니다.
            </h4>
            <ul className="space-y-3 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-gray-300 pl-8">
              <li className="relative before:absolute before:-left-6 before:top-1.5 before:w-2.5 before:h-2.5 before:bg-blue-500 before:rounded-full">1차 초안 작성</li>
              <li className="relative before:absolute before:-left-6 before:top-1.5 before:w-2.5 before:h-2.5 before:bg-blue-500 before:rounded-full">교수님 피드백 반영</li>
              <li className="relative before:absolute before:-left-6 before:top-1.5 before:w-2.5 before:h-2.5 before:bg-blue-500 before:rounded-full">문장 수정</li>
              <li className="relative before:absolute before:-left-6 before:top-1.5 before:w-2.5 before:h-2.5 before:bg-blue-500 before:rounded-full">표 추가</li>
              <li className="relative text-red-600 font-semibold before:absolute before:-left-6 before:top-1.5 before:w-2.5 before:h-2.5 before:bg-red-500 before:rounded-full">실수로 중요한 내용을 삭제</li>
              <li className="relative text-blue-600 font-semibold before:absolute before:-left-6 before:top-1.5 before:w-2.5 before:h-2.5 before:bg-blue-500 before:rounded-full">다시 이전 상태로 복구하고 싶음</li>
            </ul>
          </div>

          <p className="text-lg leading-relaxed text-gray-800">
            이런 상황에서 Git이 있으면 각 시점의 상태를 기록해둘 수 있습니다.<br/>
            그래서 언제든지 과거 상태를 확인할 수 있고, 누가 무엇을 바꿨는지도 알 수 있습니다.
          </p>

          <InfoBox title="Git의 핵심 의의" icon={CheckCircle}>
            즉 Git은 단순히 파일을 저장하는 도구가 아니라,<br/>
            <strong className="text-blue-700">파일의 변화 과정을 체계적으로 기록하고 되돌릴 수 있게 해주는 시스템</strong>입니다.
          </InfoBox>

          <p className="text-lg leading-relaxed text-gray-800">
            또 Git은 협업에 강합니다.<br/>
            여러 사람이 같은 프로젝트를 동시에 수정하더라도 각자의 작업을 관리하고 나중에 합칠 수 있습니다.
          </p>
        </div>
      )
    },
    {
      title: "2. Git과 GitHub의 차이",
      content: (
        <div className="space-y-6">
          <p className="text-red-500 font-bold bg-red-50 inline-block px-4 py-2 rounded-lg mb-4">
            이 부분은 반드시 구분해서 이해해야 합니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Git 카드 */}
            <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4 mx-auto">
                <Monitor size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center text-indigo-900 mb-2">Git</h3>
              <p className="text-center text-gray-600 mb-4">내 컴퓨터(로컬)</p>
              <div className="bg-indigo-50 p-4 rounded-lg text-gray-800">
                Git은 <strong>버전 관리를 하는 프로그램</strong>입니다.<br/><br/>
                내 컴퓨터 안에서 파일의 변경 이력을 기록하고 관리합니다.
              </div>
            </div>

            {/* GitHub 카드 */}
            <div className="bg-white border-2 border-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-800 rounded-full mb-4 mx-auto">
                <Cloud size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">GitHub</h3>
              <p className="text-center text-gray-600 mb-4">인터넷(온라인)</p>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-800">
                GitHub는 <strong>Git 저장소를 인터넷에 올려서 공유하고 협업할 수 있게 해주는 서비스</strong>입니다.
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-xl">
            <h4 className="font-bold text-blue-900 mb-4 text-lg">💡 쉽게 말하면 이렇게 생각하시면 됩니다.</h4>
            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-3">
                <span className="bg-blue-500 text-white p-1 rounded"><CheckCircle size={16}/></span>
                <span><strong>Git</strong> = 작업을 기록하는 도구</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-gray-800 text-white p-1 rounded"><CheckCircle size={16}/></span>
                <span><strong>GitHub</strong> = 그 기록을 올려두는 온라인 공간</span>
              </li>
            </ul>
          </div>
          
          <p className="text-lg leading-relaxed text-gray-800 mt-4 font-semibold text-center bg-gray-100 py-4 rounded-lg">
            즉, Git이 본체이고 GitHub는 그 Git 프로젝트를 인터넷에서 다루기 쉽게 만든 플랫폼입니다.<br/>
            그래서 Git을 쓸 줄 알아야 GitHub도 제대로 쓸 수 있습니다.
          </p>
        </div>
      )
    },
    {
      title: "3. Git을 왜 배우는가",
      content: (
        <div className="space-y-6">
          <p className="text-lg mb-6 text-gray-700">Git을 배우는 이유는 크게 4가지입니다.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-400 transition-colors">
              <div className="text-blue-500 mb-4"><RotateCcw size={32} /></div>
              <h3 className="text-xl font-bold mb-2">1) 실수해도 되돌릴 수 있음</h3>
              <p className="text-gray-600">파일을 잘못 수정했거나 내용을 지웠더라도 이전 버전으로 돌아갈 수 있습니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-green-400 transition-colors">
              <div className="text-green-500 mb-4"><GitCommit size={32} /></div>
              <h3 className="text-xl font-bold mb-2">2) 작업 이력이 남음</h3>
              <p className="text-gray-600">언제 어떤 파일을 왜 바꿨는지를 기록할 수 있습니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-purple-400 transition-colors">
              <div className="text-purple-500 mb-4"><Users size={32} /></div>
              <h3 className="text-xl font-bold mb-2">3) 협업이 쉬워짐</h3>
              <p className="text-gray-600">여러 사람이 같은 프로젝트를 나눠 작업하고 나중에 합칠 수 있습니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-400 transition-colors">
              <div className="text-orange-500 mb-4"><FileText size={32} /></div>
              <h3 className="text-xl font-bold mb-2">4) 개발뿐 아니라 모든 문서 작업에도 유용함</h3>
              <p className="text-gray-600">코드뿐 아니라 보고서, 문서, 포트폴리오, 연구자료 관리에도 충분히 쓸 수 있습니다.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "4. Git이 관리하는 3개의 핵심 공간",
      content: (
        <div className="space-y-8">
          <p className="text-lg font-bold text-red-500 bg-red-50 p-3 rounded-lg inline-block">
            Git을 제대로 이해하려면 이 3개를 확실히 알아야 합니다.
          </p>

          {/* 시각적 다이어그램 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50 p-6 rounded-xl border border-gray-200 overflow-x-auto">
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg border-2 border-blue-200 text-center shadow-sm relative z-10 min-w-[200px]">
              <div className="text-blue-500 mb-2 flex justify-center"><HardDrive size={32}/></div>
              <h4 className="font-bold text-lg mb-1">작업 디렉토리</h4>
              <p className="text-sm text-gray-500 font-mono">Working Directory</p>
            </div>
            
            <div className="text-gray-400 md:-mx-4 z-0 rotate-90 md:rotate-0 my-2 md:my-0">
              <ArrowRight size={32} />
            </div>

            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg border-2 border-yellow-200 text-center shadow-sm relative z-10 min-w-[200px]">
              <div className="text-yellow-500 mb-2 flex justify-center"><GitBranch size={32}/></div>
              <h4 className="font-bold text-lg mb-1">스테이징 영역</h4>
              <p className="text-sm text-gray-500 font-mono">Staging Area</p>
            </div>

            <div className="text-gray-400 md:-mx-4 z-0 rotate-90 md:rotate-0 my-2 md:my-0">
              <ArrowRight size={32} />
            </div>

            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg border-2 border-green-200 text-center shadow-sm relative z-10 min-w-[200px]">
              <div className="text-green-500 mb-2 flex justify-center"><HardDrive size={32}/></div>
              <h4 className="font-bold text-lg mb-1">로컬 저장소</h4>
              <p className="text-sm text-gray-500 font-mono">Local Repository</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="text-xl font-bold text-blue-800 mb-2">1) 작업 디렉토리 (Working Directory)</h3>
              <p className="text-gray-700 leading-relaxed">
                내가 실제로 파일을 열고 수정하는 공간입니다.<br/>
                예를 들어 메모장이나 VS Code에서 파일을 수정하면 그 변경은 먼저 작업 디렉토리에서 일어납니다.<br/>
                <strong className="text-black bg-blue-100 px-1">즉, 사람이 직접 손대는 실제 폴더 공간입니다.</strong>
              </p>
            </div>

            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">2) 스테이징 영역 (Staging Area)</h3>
              <p className="text-gray-700 leading-relaxed">
                커밋하기 전에 변경사항을 잠시 올려두는 공간입니다.<br/>
                작업 디렉토리에서 수정한 파일 중에서 “이 파일은 이번 커밋에 포함하겠다”라고 선택한 것들이 들어갑니다.<br/>
                <strong className="text-black bg-yellow-100 px-1">즉 스테이징 영역은 커밋할 준비를 하는 대기 공간입니다.</strong>
              </p>
            </div>

            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="text-xl font-bold text-green-800 mb-2">3) 로컬 저장소 (Local Repository)</h3>
              <p className="text-gray-700 leading-relaxed">
                커밋이 실제로 저장되는 공간입니다.<br/>
                내 컴퓨터 안에 있는 Git 저장소이며 프로젝트 폴더 안의 <code>.git</code>이라는 숨김 폴더에 관련 정보가 저장됩니다.<br/>
                <strong className="text-black bg-green-100 px-1">즉 여기는 Git이 이력과 버전을 기록하는 핵심 공간입니다.</strong>
              </p>
            </div>
          </div>

          <InfoBox title="이 3개를 한 줄로 정리하면" icon={BookOpen}>
            <ul className="space-y-2 mt-2">
              <li>📍 <strong>작업 디렉토리:</strong> 내가 수정하는 곳</li>
              <li>📍 <strong>스테이징 영역:</strong> 커밋할 것만 모아두는 곳</li>
              <li>📍 <strong>로컬 저장소:</strong> 커밋 기록이 저장되는 곳</li>
            </ul>
            <p className="mt-4 font-bold text-blue-900 bg-white inline-block p-2 rounded">이 구조를 이해하면 Git이 훨씬 쉬워집니다.</p>
          </InfoBox>
        </div>
      )
    },
    {
      title: "5. Git의 기본 작업 흐름",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">Git 작업은 보통 아래 흐름으로 진행됩니다.</p>
          
          <div className="bg-gray-800 p-6 rounded-xl font-mono text-center overflow-x-auto whitespace-nowrap">
            <span className="text-white">파일 수정</span>
            <span className="text-gray-400 mx-3">→</span>
            <span className="text-yellow-400">git add</span>
            <span className="text-gray-400 mx-3">→</span>
            <span className="text-green-400">git commit</span>
            <span className="text-gray-400 mx-3">→</span>
            <span className="text-blue-400">git push</span>
          </div>

          <p className="text-lg text-gray-700 mt-6">좀 더 정확히 쓰면 이렇습니다.</p>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl text-center overflow-x-auto whitespace-nowrap font-bold text-gray-800">
            작업 디렉토리
            <span className="text-blue-400 mx-3">→</span>
            스테이징 영역
            <span className="text-blue-400 mx-3">→</span>
            로컬 저장소
            <span className="text-blue-400 mx-3">→</span>
            원격 저장소
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4 border-b pb-2">각 단계는 다음 의미를 가집니다.</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="font-bold text-lg">파일 수정</h4>
                <p className="text-gray-600">내가 실제 파일을 만들거나 수정합니다.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 text-yellow-800 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="font-bold text-lg font-mono">git add</h4>
                <p className="text-gray-600">수정한 파일 중 커밋할 대상을 스테이징 영역에 올립니다.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="font-bold text-lg font-mono">git commit</h4>
                <p className="text-gray-600">스테이징된 내용을 하나의 기록으로 저장합니다.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h4 className="font-bold text-lg font-mono">git push</h4>
                <p className="text-gray-600">내 로컬 저장소의 커밋을 GitHub 같은 원격 저장소에 업로드합니다.</p>
              </div>
            </div>
          </div>

          <InfoBox title="반대로 받아올 때는?">
            <p className="mb-2">그리고 반대로 원격 저장소에서 최신 작업을 받아올 때는 보통 아래를 씁니다.</p>
            <div className="bg-white p-3 rounded font-bold text-center border border-gray-200">
              원격 저장소 <span className="text-blue-500 mx-2">→</span> <span className="text-purple-600 font-mono">git pull</span> <span className="text-blue-500 mx-2">→</span> 내 로컬 작업 공간
            </div>
          </InfoBox>
        </div>
      )
    },
    {
      title: "6. add, commit, push, pull의 의미",
      content: (
        <div className="space-y-8">
          <p className="text-lg bg-green-50 text-green-800 p-3 rounded-lg font-bold border border-green-200">
            이 네 개를 정확히 이해하면 Git의 핵심 절반은 끝난 것입니다.
          </p>

          {/* git add */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-yellow-400 px-6 py-3 font-mono font-bold text-lg">git add</div>
            <div className="p-6">
              <p className="text-lg mb-4">파일의 변경사항을 <strong>스테이징 영역에 올리는 명령어</strong>입니다.</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center italic text-gray-700">
                "이 파일은 다음 커밋에 포함할게요" 라고 Git에게 알려주는 단계입니다.
              </div>
              <CodeBlock code="git add ." desc="현재 폴더 기준 변경된 내용을 한꺼번에 스테이징합니다." />
            </div>
          </div>

          {/* git commit */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-green-400 px-6 py-3 font-mono font-bold text-lg">git commit</div>
            <div className="p-6">
              <p className="text-lg mb-4">스테이징 영역에 올라간 변경사항을 <strong>하나의 버전 기록으로 저장하는 명령어</strong>입니다.</p>
              <CodeBlock code='git commit -m "로그인 화면 수정"' desc="여기서 -m은 메시지를 뜻합니다. 커밋 메시지는 '이번 변경에서 무엇을 했는지'를 설명하는 짧은 기록입니다." />
              <div className="bg-gray-100 p-4 rounded-lg text-center italic text-gray-700 mt-4">
                즉 커밋은 "현재 상태를 하나의 의미 있는 저장 시점으로 남긴다" 라고 이해하시면 됩니다.
              </div>
            </div>
          </div>

          {/* git push */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-400 px-6 py-3 font-mono font-bold text-lg text-white">git push</div>
            <div className="p-6">
              <p className="text-lg mb-4">내 로컬 저장소에 있는 커밋을 <strong>원격 저장소로 올리는 명령어</strong>입니다.</p>
              <p className="text-gray-700 bg-gray-50 p-4 rounded">
                즉 내 컴퓨터 안에서만 저장되어 있던 작업 기록을 GitHub 같은 온라인 저장소에 업로드하는 단계입니다.
              </p>
            </div>
          </div>

          {/* git pull */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-purple-400 px-6 py-3 font-mono font-bold text-lg text-white">git pull</div>
            <div className="p-6">
              <p className="text-lg mb-4">원격 저장소의 최신 변경사항을 <strong>내 컴퓨터로 가져와 반영하는 명령어</strong>입니다.</p>
              <p className="text-gray-700 bg-gray-50 p-4 rounded">
                즉 다른 사람이 작업한 내용이나 다른 컴퓨터에서 내가 작업한 내용을 내 현재 프로젝트에 가져오는 것입니다.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "7. 로컬 저장소와 원격 저장소",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 mb-6">Git을 배우다 보면 저장소라는 말을 자주 듣습니다.</p>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-8 relative">
            
            {/* 시각적 연결선 (데스크탑) */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-dashed border-t-4 border-dashed border-gray-300 z-0"></div>

            {/* 로컬 저장소 */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100 relative z-10 text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                <Monitor size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-indigo-900">로컬 저장소</h3>
              <p className="text-lg font-semibold bg-indigo-50 p-2 rounded mb-4">내 컴퓨터 안</p>
              <p className="text-gray-600 text-left">
                내 컴퓨터 안에 있는 Git 저장소입니다.<br/><br/>
                여기에는 내가 커밋한 내용이 저장됩니다.
              </p>
            </div>

            {/* 교환 화살표 (모바일) */}
            <div className="md:hidden flex justify-center text-gray-400 my-4">
              <Upload size={32} className="mr-4" />
              <Download size={32} />
            </div>

            {/* 원격 저장소 */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-800 relative z-10 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-800">
                <Server size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">원격 저장소</h3>
              <p className="text-lg font-semibold bg-gray-100 p-2 rounded mb-4">인터넷이나 서버</p>
              <p className="text-gray-600 text-left">
                인터넷이나 서버에 있는 Git 저장소입니다.<br/><br/>
                대표적으로 GitHub 저장소가 여기에 해당합니다.
              </p>
            </div>
          </div>

          <InfoBox title="즉 정리하면 이렇습니다.">
            <ul className="list-disc pl-5 space-y-2 mb-4 font-bold text-lg">
              <li>로컬 저장소: 내 컴퓨터 안</li>
              <li>원격 저장소: GitHub 같은 온라인 공간</li>
            </ul>
            <p className="text-gray-700 bg-white p-3 rounded">
              보통 작업은 로컬에서 하고 공유와 협업은 원격 저장소를 통해 이뤄집니다.
            </p>
          </InfoBox>
        </div>
      )
    },
    {
      title: "8. git push를 정확히 이해하기",
      content: (
        <div className="space-y-8">
          <p className="text-lg text-gray-700">이제 핵심 중 하나인 <code>git push</code>를 자세히 보겠습니다.</p>

          <div>
            <h3 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">git push는 무엇인가</h3>
            <p className="text-lg leading-relaxed bg-blue-50 p-4 rounded-lg mb-4">
              <code>git push</code>는 <strong>내가 로컬에서 만든 커밋을 원격 저장소로 보내는 것</strong>입니다.
            </p>
            <p className="text-lg text-red-600 font-bold mb-4 bg-red-50 p-4 rounded-lg">
              중요한 점은 <code>push</code>는 수정 중인 파일 자체를 막연히 올리는 것이 아니라<br/>
              <strong>이미 commit까지 끝난 기록을 올리는 것</strong>이라는 점입니다.
            </p>
            
            <p className="font-bold mb-2">즉 순서는 항상 이런 느낌입니다.</p>
            <ol className="list-decimal pl-6 space-y-2 text-lg font-mono bg-gray-100 p-4 rounded-lg">
              <li>파일 수정</li>
              <li>git add</li>
              <li>git commit</li>
              <li className="text-blue-600 font-bold bg-blue-100 inline-block px-2">git push</li>
            </ol>

            <CodeBlock 
              code="git push origin main" 
              desc={
                <div>
                  <p>이 뜻은 다음과 같습니다.</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li><code>origin</code> = 원격 저장소 이름</li>
                    <li><code>main</code> = 올릴 브랜치 이름</li>
                  </ul>
                  <p className="mt-2 font-bold">즉 “내 로컬의 main 브랜치 커밋을 origin 원격 저장소로 올려라” 라는 뜻입니다.</p>
                </div>
              } 
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">git push를 하는 이유</h3>
            <p className="mb-4"><code>git push</code>를 해야</p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2"><CheckCircle className="text-green-500"/> GitHub에 내 작업이 반영되고</li>
              <li className="flex gap-2"><CheckCircle className="text-green-500"/> 다른 사람도 내 작업을 받을 수 있으며</li>
              <li className="flex gap-2"><CheckCircle className="text-green-500"/> 백업 효과도 생기고</li>
              <li className="flex gap-2"><CheckCircle className="text-green-500"/> 협업이 가능해집니다</li>
            </ul>
            <p className="bg-gray-100 p-3 rounded font-bold">
              즉 <code>commit</code>만 하면 내 컴퓨터 안에만 저장되고 <code>push</code>를 해야 인터넷상의 저장소에도 반영됩니다.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
              <AlertTriangle /> git push에서 자주 하는 오해
            </h3>
            <p className="italic text-gray-600 mb-4 bg-white p-3 rounded border border-gray-200">
              "파일 저장했으니 push 되겠지"
            </p>
            <p className="font-bold text-lg mb-2">하지만 아닙니다.</p>
            <p className="mb-4">파일 저장은 단순히 파일이 바뀐 것뿐입니다. Git 입장에서는 아래 과정을 거쳐야 합니다.</p>
            <div className="flex flex-wrap gap-2 text-sm font-mono items-center justify-center bg-white p-4 rounded-lg shadow-inner">
              <span className="bg-gray-200 px-3 py-1 rounded">수정</span> <ArrowRight size={16}/>
              <span className="bg-yellow-200 px-3 py-1 rounded">add</span> <ArrowRight size={16}/>
              <span className="bg-green-200 px-3 py-1 rounded">commit</span> <ArrowRight size={16}/>
              <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded">push</span>
            </div>
            <p className="text-center font-bold mt-4 text-blue-800">즉 push는 마지막 단계입니다.</p>
          </div>
        </div>
      )
    },
    {
      title: "9. git pull을 정확히 이해하기",
      content: (
        <div className="space-y-8">
          <p className="text-lg text-gray-700">이제 반대 방향인 <code>git pull</code>입니다.</p>

          <div>
            <h3 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">git pull은 무엇인가</h3>
            <p className="text-lg leading-relaxed bg-purple-50 p-4 rounded-lg mb-4 border border-purple-100">
              <code>git pull</code>은 <strong>원격 저장소의 최신 변경사항을 내 로컬 프로젝트로 가져와 반영하는 명령어</strong>입니다.
            </p>

            <CodeBlock 
              code="git pull origin main" 
              desc="이 뜻은 “origin 원격 저장소의 main 브랜치 최신 내용을 가져와 현재 내 작업에 반영하라” 입니다." 
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">왜 git pull이 필요한가</h3>
            <p className="mb-4">협업 중이라고 가정해보겠습니다.</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 space-y-3">
              <div className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">1</span> 내가 어제 프로젝트를 받음</div>
              <div className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">2</span> 오늘 다른 팀원이 GitHub에 수정사항 업로드함</div>
              <div className="flex items-center gap-3 text-red-600 font-bold"><span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">3</span> 나는 아직 예전 상태로 작업 중임</div>
            </div>
            <p className="text-lg mb-2">
              이 상태에서 계속 작업하면 나중에 충돌이 나거나 오래된 파일 기준으로 작업하게 됩니다.
            </p>
            <p className="text-lg font-bold bg-purple-100 p-3 rounded inline-block">
              그래서 최신 상태를 먼저 받아와야 합니다. 그때 쓰는 것이 <code>git pull</code>입니다.
            </p>
          </div>

          <InfoBox title="git pull의 본질">
            <p className="mb-2"><code>git pull</code>은 단순 다운로드가 아닙니다.<br/>
            원격 저장소의 최신 상태를 가져와서 <strong>내 현재 브랜치에 반영하는 과정</strong>입니다.</p>
            <p className="bg-white p-2 rounded inline-block mt-2">즉 최신 내용을 가져오고 필요하면 자동으로 병합도 시도합니다.</p>
            <p className="font-bold text-purple-800 mt-4 text-lg">그래서 pull은 협업에서 매우 중요합니다.</p>
          </InfoBox>
        </div>
      )
    },
    {
      title: "10. git fetch와 git pull의 차이",
      content: (
        <div className="space-y-6">
          <p className="text-lg bg-gray-100 p-3 rounded text-gray-700 font-medium">
            이건 초보자에서 중급자로 넘어갈 때 꼭 알아야 합니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white border-2 border-blue-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-blue-100 px-4 py-3 font-mono font-bold text-blue-900 text-lg text-center border-b border-blue-200">
                git fetch
              </div>
              <div className="p-6 text-center">
                <p className="text-xl mb-4">원격 저장소의 최신 정보를<br/><strong className="text-blue-600 bg-blue-50 px-2 rounded">가져오기만</strong> 합니다.</p>
                <p className="text-gray-500 text-sm">내 작업 파일에는 바로 합치지 않습니다.</p>
                
                {/* 시각화 */}
                <div className="mt-6 flex flex-col items-center">
                  <Cloud className="text-gray-400 mb-2" size={32}/>
                  <div className="h-10 border-l-2 border-dashed border-blue-400 flex items-center justify-center relative w-full">
                     <ArrowRight size={20} className="text-blue-400 absolute rotate-90" />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded p-2 text-sm text-gray-600 mb-2 w-full">
                    숨겨진 추적 브랜치
                  </div>
                  <div className="text-red-400 text-xs font-bold">X (합쳐지지 않음)</div>
                  <Monitor className="text-gray-700 mt-2" size={32}/>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-purple-100 px-4 py-3 font-mono font-bold text-purple-900 text-lg text-center border-b border-purple-200">
                git pull
              </div>
              <div className="p-6 text-center">
                <p className="text-xl mb-4">가져온 뒤 현재 브랜치에<br/><strong className="text-purple-600 bg-purple-50 px-2 rounded">반영까지</strong> 합니다.</p>
                <p className="text-gray-500 text-sm">(fetch + merge의 역할)</p>
                
                {/* 시각화 */}
                <div className="mt-6 flex flex-col items-center">
                  <Cloud className="text-gray-400 mb-2" size={32}/>
                  <div className="h-10 border-l-2 border-solid border-purple-500 flex items-center justify-center relative w-full">
                     <ArrowRight size={20} className="text-purple-500 absolute rotate-90" />
                  </div>
                  <div className="bg-purple-100 border border-purple-300 rounded p-2 font-bold text-sm text-purple-900 mb-2 w-full">
                    내 작업 폴더에 병합
                  </div>
                  <Monitor className="text-gray-800 mt-2" size={32}/>
                </div>
              </div>
            </div>
          </div>

          <InfoBox title="즉 차이는 이렇습니다.">
            <ul className="text-lg space-y-2 mb-4">
              <li>🔍 <strong>fetch</strong> = 받아오기만</li>
              <li>📥 <strong>pull</strong> = 받아오고 합치기까지</li>
            </ul>
            <p className="text-gray-700">처음에는 <code>pull</code>만 알아도 괜찮지만 나중에는 <code>fetch</code>도 이해하면 더 안전하게 작업할 수 있습니다.</p>
          </InfoBox>
        </div>
      )
    },
    {
      title: "11. 처음부터 따라 하는 Git 실습",
      content: (
        <div className="space-y-10">
          <p className="text-lg bg-gray-100 p-4 rounded-lg">이제 실제 흐름으로 정리해보겠습니다.</p>

          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><span className="bg-blue-500 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">1</span> 11-1. Git 설치 확인</h3>
            <p className="text-gray-600 mb-2">터미널에서 아래를 입력합니다. 버전이 나오면 Git이 설치된 것입니다.</p>
            <CodeBlock code="git --version" />
          </div>

          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><span className="bg-blue-500 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">2</span> 11-2. 사용자 정보 설정</h3>
            <p className="text-gray-600 mb-2">처음 한 번은 이름과 이메일을 등록합니다. 이 정보는 커밋 기록에 작성자로 남습니다.</p>
            <CodeBlock code={'git config --global user.name "내이름"\ngit config --global user.email "내이메일@example.com"'} />
          </div>

          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><span className="bg-blue-500 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">3</span> 11-3. 저장소 받기</h3>
            <p className="text-gray-600 mb-2">GitHub에 있는 프로젝트를 내 컴퓨터로 가져옵니다. 그 다음 해당 폴더로 이동합니다.</p>
            <CodeBlock code={'git clone https://github.com/username/project.git\ncd project'} />
          </div>

          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><span className="bg-blue-500 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">4</span> 11-4. 파일 상태 확인</h3>
            <p className="text-gray-600 mb-2">이 명령어는 현재 Git 상태를 보여줍니다. Git을 할 때 가장 자주 보는 명령어 중 하나입니다.</p>
            <ul className="list-disc pl-8 mb-2 text-sm text-gray-500">
              <li>수정된 파일이 있는지</li>
              <li>스테이징된 파일이 있는지</li>
              <li>커밋할 내용이 있는지</li>
            </ul>
            <CodeBlock code="git status" />
          </div>

          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><span className="bg-blue-500 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">5</span> 11-5. 파일 수정 후 스테이징</h3>
            <p className="text-gray-600 mb-2">예를 들어 README.md를 수정했다고 가정하겠습니다. 이제 스테이징합니다.</p>
            <CodeBlock code="git add README.md" desc="전체를 올리고 싶다면 git add . 을 사용합니다." />
          </div>

          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><span className="bg-blue-500 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">6</span> 11-6. 커밋</h3>
            <p className="text-gray-600 mb-2">이제 변경사항이 로컬 저장소에 기록됩니다.</p>
            <CodeBlock code='git commit -m "README 내용 수정"' />
          </div>

          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><span className="bg-blue-500 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">7</span> 11-7. 원격 저장소에 업로드</h3>
            <p className="text-gray-600 mb-2">이제 GitHub에도 반영됩니다.</p>
            <CodeBlock code="git push origin main" />
          </div>

          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><span className="bg-blue-500 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">8</span> 11-8. 최신 내용 받아오기</h3>
            <p className="text-gray-600 mb-2">다른 사람이 수정한 내용을 내 컴퓨터에 반영하고 싶다면 아래를 실행합니다.</p>
            <CodeBlock code="git pull origin main" />
          </div>
        </div>
      )
    },
    {
      title: "12. 협업할 때 일어나는 충돌 conflict",
      content: (
        <div className="space-y-8">
          <p className="text-lg">Git을 쓰다 보면 충돌이라는 말을 듣게 됩니다.</p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <AlertTriangle /> 충돌이란 무엇인가
            </h3>
            <p className="text-lg bg-white p-4 rounded mb-4 font-bold border border-red-100">
              충돌은 같은 파일의 같은 부분을 서로 다르게 수정했을 때 Git이 자동으로 결정하지 못하는 상태입니다.
            </p>
            <p className="mb-2 font-semibold">예를 들어</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800">
              <li>내가 5번째 줄을 수정함</li>
              <li>팀원도 같은 5번째 줄을 수정함</li>
              <li>내가 <code>git pull</code>을 했더니 Git이 어느 내용을 남겨야 할지 모름</li>
            </ul>
            <p className="mt-4 font-bold text-red-600 bg-red-100 inline-block p-2 rounded">이때 충돌이 발생합니다.</p>
          </div>

          {/* 충돌 시각화 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="bg-blue-100 p-4 rounded text-center border-2 border-blue-300 w-full md:w-1/3">
              <p className="font-bold mb-2">나의 작업</p>
              <div className="bg-white text-xs text-left p-2 border">5줄: 배경색 파랑</div>
            </div>
            <div className="font-bold text-red-500">VS (충돌)</div>
            <div className="bg-yellow-100 p-4 rounded text-center border-2 border-yellow-300 w-full md:w-1/3">
              <p className="font-bold mb-2">팀원의 작업 (GitHub)</p>
              <div className="bg-white text-xs text-left p-2 border">5줄: 배경색 노랑</div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">충돌은 왜 생기나</h3>
            <p className="text-lg leading-relaxed mb-4">
              충돌은 Git이 고장난 것이 아니라 오히려 Git이 함부로 덮어쓰지 않고 사람에게 판단을 맡기는 것입니다.
            </p>
            <div className="bg-gray-800 text-white p-4 rounded-lg font-bold text-center italic shadow-inner">
              “둘 다 중요한 변경처럼 보이는데 어느 쪽을 남길지 사람이 결정해주세요”
            </div>
            <p className="mt-2 text-center text-gray-500 text-sm">라고 Git이 말하는 셈입니다.</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">충돌이 나면 어떻게 하나</h3>
            <ol className="list-decimal pl-6 space-y-3 font-semibold text-lg bg-white p-4 rounded border border-green-100">
              <li>충돌 난 파일을 연다</li>
              <li>표시된 충돌 구간을 확인한다</li>
              <li>원하는 최종 내용을 직접 정리한다</li>
              <li>다시 <code>git add</code> 한다</li>
              <li>커밋한다</li>
            </ol>
            <p className="mt-6 text-center font-bold text-green-700 bg-green-100 p-3 rounded-lg">
              즉 충돌은 해결 가능한 정상적인 협업 과정입니다.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "13. 실무에서 자주 쓰는 필수 명령어",
      content: (
        <div className="space-y-4">
          <p className="text-lg mb-6 bg-gray-100 p-3 rounded text-center font-bold">여기서는 꼭 외워야 할 것만 정리하겠습니다.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="font-bold text-gray-800 mb-2">현재 상태 확인</div>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono">git status</code>
              <p className="text-sm text-gray-500 mt-2">지금 제일 먼저 확인해야 하는 명령어입니다.</p>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="font-bold text-gray-800 mb-2">버전 확인</div>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono">git --version</code>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="font-bold text-gray-800 mb-2">현재 폴더 목록 보기</div>
              <p className="text-xs text-gray-500 mb-1">Windows 계열:</p>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono text-sm mb-2">dir (또는 dir /w)</code>
              <p className="text-xs text-gray-500 mb-1">Mac/Linux 계열:</p>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono text-sm">ls</code>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="font-bold text-gray-800 mb-2">상위 폴더로 이동</div>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono">cd ..</code>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="font-bold text-gray-800 mb-2">저장소 복제</div>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono">git clone 저장소주소</code>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="font-bold text-gray-800 mb-2">스테이징</div>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono mb-1 text-sm">git add 파일명</code>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono text-sm">git add .</code>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="font-bold text-gray-800 mb-2">커밋</div>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono">git commit -m "메시지"</code>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="font-bold text-gray-800 mb-2">업로드</div>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono">git push origin main</code>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="font-bold text-gray-800 mb-2">최신 내용 받기</div>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono">git pull origin main</code>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="font-bold text-gray-800 mb-2">원격 저장소 확인</div>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono">git remote -v</code>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm md:col-span-2 transition">
              <div className="font-bold text-gray-800 mb-2">커밋 기록 보기</div>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono mb-2">git log</code>
              <p className="text-sm text-gray-500 mb-1">짧게 보고 싶다면</p>
              <code className="bg-gray-800 text-green-400 p-2 rounded block font-mono">git log --oneline</code>
            </div>

          </div>
        </div>
      )
    },
    {
      title: "14. Git을 배울 때 꼭 가져야 하는 감각",
      content: (
        <div className="space-y-6">
          <p className="text-lg bg-indigo-50 text-indigo-900 p-4 rounded-lg mb-8 font-semibold border-l-4 border-indigo-500">
            Git은 명령어를 외우는 것보다<br/>
            <strong>흐름을 머릿속에 그릴 수 있어야</strong> 잘하게 됩니다.<br/>
            <span className="text-base font-normal mt-2 inline-block">그 감각은 아래처럼 잡으면 됩니다.</span>
          </p>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-lg font-bold">1</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-bold text-lg text-blue-900 mb-2">수정했다고 바로 올라가는 게 아니다</h3>
                <p className="text-gray-600">수정은 작업 디렉토리일 뿐입니다. 스테이징과 커밋을 거쳐야 기록됩니다.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-lg font-bold">2</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-bold text-lg text-green-900 mb-2">커밋했다고 GitHub에 올라간 게 아니다</h3>
                <p className="text-gray-600">커밋은 로컬 저장소에만 저장된 상태입니다. GitHub에 반영하려면 <code>push</code>가 필요합니다.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-purple-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-lg font-bold">3</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-bold text-lg text-purple-900 mb-2">협업 전에 최신 상태를 받아야 한다</h3>
                <p className="text-gray-600">혼자 최신이라고 생각해도 원격 저장소에는 더 새로운 내용이 있을 수 있습니다. 그래서 작업 전에 <code>pull</code> 확인이 중요합니다.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-yellow-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-lg font-bold">4</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-bold text-lg text-yellow-900 mb-2">status를 자주 봐야 한다</h3>
                <p className="text-gray-600">Git이 지금 어떤 상태인지 헷갈릴 때는 무조건 <code>git status</code>를 보는 습관이 좋습니다.</p>
              </div>
            </div>

          </div>
        </div>
      )
    },
    {
      title: "15. 최종 정리",
      content: (
        <div className="space-y-6 pb-10">
          <p className="text-lg bg-gray-100 text-center p-4 rounded-lg font-bold">이제 전체를 아주 짧게 정리하겠습니다.</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Git이란</h3>
              <p className="text-gray-700">파일 변경 이력을 기록하고 관리하는 버전 관리 시스템입니다.</p>
            </div>
            
            <div className="bg-gray-100 p-5 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">GitHub란</h3>
              <p className="text-gray-700">Git 저장소를 인터넷에서 공유하고 협업할 수 있게 해주는 서비스입니다.</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 mb-4 border-b border-blue-200 pb-2">Git의 핵심 3공간</h3>
            <ul className="flex flex-wrap gap-4 text-lg font-semibold">
              <li className="bg-white px-4 py-2 rounded-full shadow-sm text-blue-800">1. 작업 디렉토리</li>
              <li className="bg-white px-4 py-2 rounded-full shadow-sm text-blue-800">2. 스테이징 영역</li>
              <li className="bg-white px-4 py-2 rounded-full shadow-sm text-blue-800">3. 로컬 저장소</li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-xl font-bold text-green-900 mb-4 border-b border-green-200 pb-2">기본 흐름</h3>
            <div className="flex flex-wrap gap-2 items-center font-mono font-bold text-green-800">
              <span className="bg-white px-3 py-1 rounded border">파일 수정</span> <span>→</span>
              <span className="bg-white px-3 py-1 rounded border">git add</span> <span>→</span>
              <span className="bg-white px-3 py-1 rounded border">git commit</span> <span>→</span>
              <span className="bg-green-600 text-white px-3 py-1 rounded">git push</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border-2 border-blue-400 shadow-sm text-center">
              <h3 className="text-xl font-bold text-blue-600 font-mono mb-2">git push</h3>
              <p className="text-gray-700 font-semibold bg-gray-50 p-2 rounded">로컬 커밋을 원격 저장소에 올리는 것</p>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-purple-400 shadow-sm text-center">
              <h3 className="text-xl font-bold text-purple-600 font-mono mb-2">git pull</h3>
              <p className="text-gray-700 font-semibold bg-gray-50 p-2 rounded">원격 저장소의 최신 변경사항을 내 로컬로 가져와 반영하는 것</p>
            </div>
          </div>

          <InfoBox title="가장 중요한 감각" icon={BookOpen}>
            <p className="text-lg">
              Git은 단순 업로드 도구가 아니라<br/>
              <strong className="text-xl text-blue-800 bg-yellow-100 px-2 mt-2 inline-block">변경사항을 단계적으로 관리하는 시스템</strong>입니다.
            </p>
          </InfoBox>

        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentChapter < chapters.length - 1) setCurrentChapter(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (currentChapter > 0) setCurrentChapter(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectChapter = (index) => {
    setCurrentChapter(index);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      
      {/* Sidebar (Table of Contents) */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 overflow-y-auto ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
          <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
            <BookOpen className="text-blue-600"/> 목차
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <ul className="py-2">
          {chapters.map((chapter, index) => (
            <li key={index}>
              <button 
                onClick={() => selectChapter(index)}
                className={`w-full text-left px-5 py-3 text-sm transition-colors ${
                  currentChapter === index 
                  ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent'
                }`}
              >
                {chapter.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header & Progress Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="h-1 w-full bg-gray-200">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-600 hover:text-gray-900 p-1">
                <Menu size={24} />
              </button>
              <h1 className="text-lg md:text-xl font-bold text-gray-800 truncate">Git 완벽 개념 설명서</h1>
            </div>
            <div className="text-sm text-gray-500 font-medium whitespace-nowrap hidden sm:block">
              {currentChapter + 1} / {chapters.length}
            </div>
          </div>
        </header>

        {/* Reading Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8 scroll-smooth">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-10 lg:p-12">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 pb-6 border-b-2 border-gray-100 leading-tight">
                {chapters[currentChapter].title}
              </h1>
              <div className="prose prose-lg max-w-none prose-blue">
                {chapters[currentChapter].content}
              </div>
            </div>
            
            {/* Bottom Navigation */}
            <div className="bg-gray-50 border-t border-gray-200 p-4 md:p-6 flex justify-between items-center">
              <button 
                onClick={handlePrev} 
                disabled={currentChapter === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentChapter === 0 
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                  : 'text-blue-700 bg-blue-50 hover:bg-blue-100 hover:shadow-sm'
                }`}
              >
                <ChevronLeft size={20} /> <span className="hidden sm:inline">이전 장</span>
              </button>
              
              <span className="text-gray-500 text-sm md:hidden">
                {currentChapter + 1} / {chapters.length}
              </span>

              <button 
                onClick={handleNext} 
                disabled={currentChapter === chapters.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentChapter === chapters.length - 1 
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                  : 'text-white bg-blue-600 hover:bg-blue-700 shadow hover:shadow-md'
                }`}
              >
                <span className="hidden sm:inline">다음 장</span> <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          {/* 하단 여백 확보 */}
          <div className="h-12"></div>
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default GitConceptBook;