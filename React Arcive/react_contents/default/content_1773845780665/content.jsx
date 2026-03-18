import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Menu, ChevronLeft, ChevronRight, X, 
  GitBranch, GitCommit, GitMerge, GitPullRequest, 
  Terminal, CheckCircle, AlertTriangle, ArrowRight, 
  RefreshCw, RotateCcw, Box, Eye, Layers, Trash2, Database, FolderDown
} from 'lucide-react';

const GitIntermediateBook = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const progress = ((currentChapter + 1) / 24) * 100;

  // 컴포넌트: 터미널 코드 블록
  const CodeBlock = ({ code, desc, highlight }) => (
    <div className={`my-5 rounded-xl overflow-hidden border ${highlight ? 'border-blue-500 shadow-blue-100' : 'border-gray-700'} shadow-lg`}>
      <div className="bg-gray-800 text-gray-400 text-xs px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2"><Terminal size={14} /> 터미널</div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="bg-gray-900 p-4 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre">
        <code>{code}</code>
      </div>
      {desc && <div className="bg-gray-50 p-3 text-sm text-gray-700 border-t border-gray-200 leading-relaxed">{desc}</div>}
    </div>
  );

  // 컴포넌트: 정보 강조 박스
  const InfoBox = ({ children, title, icon: Icon, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-50 border-blue-500 text-blue-900",
      red: "bg-red-50 border-red-500 text-red-900",
      green: "bg-green-50 border-green-500 text-green-900",
      yellow: "bg-yellow-50 border-yellow-500 text-yellow-900",
      purple: "bg-purple-50 border-purple-500 text-purple-900",
    };
    
    return (
      <div className={`${colorClasses[color]} border-l-4 p-5 my-6 rounded-r-xl shadow-sm`}>
        {title && (
          <div className="flex items-center gap-2 font-bold mb-3 text-lg">
            {Icon && <Icon size={20} />}
            {title}
          </div>
        )}
        <div className="text-gray-800 leading-relaxed space-y-2">{children}</div>
      </div>
    );
  };

  // 컴포넌트: 깃 노드 (동그라미)
  const GitNode = ({ color = "bg-blue-500", label }) => (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 ${color} rounded-full border-4 border-white shadow-md z-10 flex items-center justify-center text-white font-bold text-xs`}>
        {label}
      </div>
    </div>
  );

  const chapters = [
    {
      title: "1. 왜 중급 개념이 필요한가",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">기본 단계에서는 보통 여기까지만 씁니다.</p>
          <div className="flex gap-3 flex-wrap font-mono text-sm">
            <span className="bg-gray-100 px-3 py-1 rounded border border-gray-300">git add</span>
            <span className="bg-gray-100 px-3 py-1 rounded border border-gray-300">git commit</span>
            <span className="bg-gray-100 px-3 py-1 rounded border border-gray-300">git push</span>
            <span className="bg-gray-100 px-3 py-1 rounded border border-gray-300">git pull</span>
          </div>
          
          <p className="text-lg text-gray-700 mt-6">그런데 실제로 조금만 더 써보면 바로 이런 상황이 생깁니다.</p>
          
          <ul className="space-y-3 bg-red-50 border border-red-100 p-6 rounded-xl">
            <li className="flex gap-3"><AlertTriangle className="text-red-500 shrink-0"/> 기능 A 작업 중인데 기능 B도 급하게 수정해야 함</li>
            <li className="flex gap-3"><AlertTriangle className="text-red-500 shrink-0"/> 작업하다가 이전 상태로 되돌리고 싶음</li>
            <li className="flex gap-3"><AlertTriangle className="text-red-500 shrink-0"/> 커밋은 했는데 잘못된 커밋이었음</li>
            <li className="flex gap-3"><AlertTriangle className="text-red-500 shrink-0"/> 다른 사람 브랜치와 합쳐야 함</li>
            <li className="flex gap-3"><AlertTriangle className="text-red-500 shrink-0"/> <code>pull</code> 했더니 충돌이 남</li>
            <li className="flex gap-3"><AlertTriangle className="text-red-500 shrink-0"/> 작업 중인 내용은 잠깐 치워두고 다른 브랜치로 가야 함</li>
          </ul>

          <InfoBox title="이때 필요한 것이 중급 개념입니다." icon={CheckCircle}>
            <p className="text-lg">즉 Git 중급은 어려운 기술이 아니라<br/>
            <strong className="text-blue-700 bg-blue-100 px-1 rounded">실제로 프로젝트를 안전하게 다루기 위한 운영 기술</strong>입니다.</p>
          </InfoBox>
        </div>
      )
    },
    {
      title: "2. 브랜치 branch란 무엇인가",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-800">브랜치는 말 그대로 <strong>가지</strong>입니다.</p>
          <p className="text-lg text-gray-700">
            하나의 프로젝트에는 보통 기본 줄기가 있습니다.<br/>
            보통 <code>main</code> 또는 <code>master</code>라는 이름의 기본 브랜치가 그 줄기입니다.
          </p>
          <p className="text-lg text-gray-700">그런데 프로젝트를 하다 보면 기본 줄기에서 바로 모든 작업을 하면 위험합니다.</p>
          
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-2">
              <p className="font-bold text-gray-800">예를 들어:</p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>로그인 기능 개발</li>
                <li>회원가입 수정</li>
                <li>버그 수정</li>
                <li>실험용 코드 추가</li>
              </ul>
              <p className="mt-4 text-red-600 font-semibold bg-red-50 p-2 rounded">
                이걸 전부 main에서 바로 작업하면 서로 섞이고 망가지기 쉽습니다.
              </p>
            </div>

            {/* 시각화: 브랜치 */}
            <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-inner border border-gray-100 relative h-40 flex items-center justify-center">
              {/* Main 줄기 */}
              <div className="absolute left-10 right-10 h-3 bg-blue-500 rounded-full flex items-center justify-between">
                <span className="absolute -top-6 left-0 text-blue-600 font-bold text-sm">main</span>
                <div className="w-6 h-6 rounded-full bg-white border-4 border-blue-500 shadow z-10 relative"></div>
                <div className="w-6 h-6 rounded-full bg-white border-4 border-blue-500 shadow z-10 relative"></div>
              </div>
              
              {/* Feature 가지 */}
              <svg className="absolute w-full h-full inset-0 z-0 pointer-events-none" preserveAspectRatio="none">
                <path d="M 30% 50% C 50% 50%, 50% 20%, 70% 20%" fill="none" stroke="#10B981" strokeWidth="12" strokeLinecap="round"/>
              </svg>
              <div className="absolute" style={{ top: '20%', left: '70%', transform: 'translate(-50%, -50%)' }}>
                <span className="absolute -top-6 -left-8 whitespace-nowrap text-green-600 font-bold text-sm bg-white px-1 rounded">feature/login</span>
                <div className="w-6 h-6 rounded-full bg-white border-4 border-green-500 shadow z-10 relative"></div>
              </div>
            </div>
          </div>

          <InfoBox title="브랜치의 정의" color="green" icon={GitBranch}>
            그래서 Git에서는 줄기에서 새로운 가지를 뻗어 따로 작업합니다. 그 가지가 <strong>브랜치</strong>입니다.<br/><br/>
            즉 브랜치는 <strong>기존 프로젝트 흐름에서 분리해서 독립적으로 작업할 수 있는 작업선</strong>입니다.
          </InfoBox>
        </div>
      )
    },
    {
      title: "3. 왜 브랜치를 써야 하는가",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-800">브랜치를 쓰는 이유는 명확합니다.</p>
          
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 안전함
              </h3>
              <p className="text-gray-600">기본 브랜치를 건드리지 않고 실험할 수 있습니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-green-800 mb-2 flex items-center gap-2">
                <span className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 작업 분리
              </h3>
              <p className="text-gray-600 mb-2">기능별로 작업을 나눌 수 있습니다.</p>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">feature/login</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">feature/signup</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">fix/header-bug</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-purple-800 mb-2 flex items-center gap-2">
                <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span> 협업이 쉬움
              </h3>
              <p className="text-gray-600">사람마다 자신의 브랜치에서 작업한 뒤 나중에 합칠 수 있습니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-yellow-100 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center gap-2">
                <span className="bg-yellow-100 text-yellow-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span> 실패해도 부담이 적음
              </h3>
              <p className="text-gray-600">실험 브랜치가 잘못되면 그 브랜치만 정리하면 됩니다.</p>
            </div>
          </div>

          <p className="text-center font-bold text-xl text-gray-800 mt-8 bg-gray-100 p-4 rounded-xl">
            즉 브랜치는 프로젝트를 깔끔하고 안전하게 유지하기 위한 핵심 구조입니다.
          </p>
        </div>
      )
    },
    {
      title: "4. 브랜치 생성과 이동",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">현재 브랜치 확인</h3>
            <CodeBlock 
              code="git branch" 
              desc="현재 체크되어 있는 브랜치 앞에는 * 표시가 붙습니다." 
            />
          </div>

          <div>
            <h3 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">새 브랜치 만들기</h3>
            <CodeBlock 
              code="git branch feature/login" 
              desc="이 명령은 브랜치를 만들기만 합니다. 아직 그 브랜치로 이동하지는 않습니다." 
            />
          </div>

          <div>
            <h3 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">브랜치 생성과 동시에 이동</h3>
            <CodeBlock 
              code="git switch -c feature/login" 
              desc="이 뜻은 “feature/login이라는 새 브랜치를 만들고, 그 브랜치로 바로 이동하라”입니다." 
            />
            <p className="text-gray-500 text-sm mt-2 ml-2">또는 예전 방식으로는 <code>git checkout -b feature/login</code></p>
          </div>

          <div>
            <h3 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">다른 브랜치로 이동</h3>
            <CodeBlock code="git switch main" />
            <p className="text-gray-500 text-sm mt-2 ml-2">또는 <code>git checkout main</code></p>
          </div>
        </div>
      )
    },
    {
      title: "5. checkout과 switch",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">예전에는 브랜치 이동도 <code>checkout</code>으로 많이 했습니다.</p>
          <CodeBlock code="git checkout main" />
          
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-6">
            <p className="font-bold text-red-800 mb-3 text-lg flex items-center gap-2"><AlertTriangle /> 하지만 checkout은 역할이 너무 많았습니다.</p>
            <ul className="list-disc pl-6 space-y-1 text-red-900">
              <li>브랜치 이동</li>
              <li>특정 커밋으로 이동</li>
              <li>파일 복원</li>
            </ul>
          </div>

          <p className="text-lg font-bold text-gray-800 mb-4">그래서 Git은 더 명확하게 나누기 시작했습니다.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-blue-200 rounded-xl p-5">
              <h4 className="text-xl font-bold text-blue-800 mb-2 font-mono flex items-center gap-2">
                <GitBranch size={20} /> switch
              </h4>
              <p className="text-gray-600 mb-4">브랜치 이동 전용에 가깝습니다.</p>
              <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm leading-relaxed">
                git switch main<br/>
                git switch feature/login
              </div>
            </div>

            <div className="bg-white border-2 border-green-200 rounded-xl p-5">
              <h4 className="text-xl font-bold text-green-800 mb-2 font-mono flex items-center gap-2">
                <RotateCcw size={20} /> restore
              </h4>
              <p className="text-gray-600 mb-4">파일 복원 쪽에 더 가깝습니다.</p>
              <div className="bg-gray-100 text-gray-500 p-3 rounded text-sm italic border border-gray-200">
                (파일의 상태를 되돌릴 때 사용 - 뒤에서 자세히 다룸)
              </div>
            </div>
          </div>

          <InfoBox title="요즘 감각으로는 이렇게 이해하시면 좋습니다.">
            <ul className="space-y-2 text-lg">
              <li>👉 <strong>브랜치 이동</strong> = <code>switch</code></li>
              <li>👉 <strong>파일 복원</strong> = <code>restore</code></li>
              <li>👉 <strong>checkout</strong> = 예전부터 있던 다용도 명령</li>
            </ul>
            <p className="mt-4 text-gray-700 bg-white p-3 rounded border border-blue-100">
              실무에서는 아직 <code>checkout</code>도 많이 보지만<br/>처음 배울 때는 <code>switch</code>, <code>restore</code>로 구분해서 이해하면 더 편합니다.
            </p>
          </InfoBox>
        </div>
      )
    },
    {
      title: "6. 브랜치 병합 merge",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-800">
            브랜치의 핵심은 따로 작업한 뒤 다시 합치는 것입니다.<br/>
            이 합치는 작업이 <strong>merge</strong>입니다.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-6">
            <p className="font-bold text-gray-800 mb-3">예를 들어:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 font-medium">
              <li><code>main</code>에서 프로젝트 시작</li>
              <li><code>feature/login</code> 브랜치 생성</li>
              <li>로그인 기능 개발 완료</li>
              <li>그 결과를 다시 <code>main</code>에 반영하고 싶음</li>
            </ol>
            <p className="mt-4 text-blue-600 font-bold">이때 merge를 합니다.</p>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">병합 예시</h3>
          
          <p className="text-lg">먼저 main으로 이동:</p>
          <CodeBlock code="git switch main" />
          
          <p className="text-lg">그 다음 feature 브랜치를 합침:</p>
          <CodeBlock 
            code="git merge feature/login" 
            desc="뜻은 “현재 브랜치 main에 feature/login의 작업 내용을 합쳐라”입니다." 
          />

          <InfoBox title="가장 중요한 방향 감각" color="purple" icon={GitMerge}>
            <p className="text-xl">
              즉 merge는 <strong className="bg-white px-2 rounded">현재 내가 서 있는 브랜치</strong>로<br/>다른 브랜치를 가져오는 것입니다.
            </p>
            <p className="mt-2 opacity-80">이 방향 감각이 중요합니다.</p>
          </InfoBox>
        </div>
      )
    },
    {
      title: "7. Fast-forward merge와 merge commit",
      content: (
        <div className="space-y-10">
          <p className="text-lg">merge에는 대표적으로 두 가지 상황이 있습니다.</p>

          {/* 1. Fast-forward */}
          <div>
            <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded flex items-center justify-center">1</span> 
              Fast-forward merge
            </h3>
            <p className="text-lg mb-4">아주 단순한 병합입니다.</p>
            <p className="text-gray-700 mb-4 bg-gray-50 p-4 rounded-lg">
              예를 들어 main에서 갈라진 뒤 <strong>main은 그대로였고 feature 브랜치만 앞으로 몇 커밋 진행되었다면</strong><br/><br/>
              main은 그냥 포인터만 feature 쪽으로 옮기면 됩니다.<br/>이걸 Fast-forward라고 합니다.
            </p>
            
            {/* Fast-forward 시각화 */}
            <div className="bg-white border-2 border-blue-100 rounded-xl p-6 relative overflow-hidden flex flex-col items-center">
              <div className="flex w-full max-w-lg items-center justify-between relative mb-8">
                <div className="absolute h-1 bg-gray-300 left-10 right-10 top-1/2 -translate-y-1/2 z-0"></div>
                <GitNode label="A" color="bg-gray-400" />
                <GitNode label="B" color="bg-green-500" />
                <GitNode label="C" color="bg-green-500" />
              </div>
              <div className="w-full flex justify-between px-8 text-sm font-bold mt-2">
                <div className="text-gray-500 text-center flex flex-col items-center gap-1 opacity-50">
                   <span className="border border-gray-400 px-2 rounded">main (이전)</span>
                </div>
                <div className="text-transparent">.</div>
                <div className="text-blue-600 text-center flex flex-col items-center gap-1">
                   <ArrowRight size={16} className="-mt-6 mb-1 opacity-50"/>
                   <span className="border-2 border-blue-500 bg-blue-50 px-2 rounded">main (Fast-forward!)</span>
                   <span className="text-green-600 font-mono mt-1">feature</span>
                </div>
              </div>
            </div>

            <p className="text-lg font-bold text-blue-900 mt-4 bg-blue-50 p-3 rounded inline-block">
              쉽게 말하면 굳이 병합 기록 하나를 더 만들 필요 없이 main을 앞으로 당기면 끝나는 상태입니다.
            </p>
          </div>

          {/* 2. Merge commit */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded flex items-center justify-center">2</span> 
              Merge commit
            </h3>
            <p className="text-lg mb-4">두 브랜치가 각각 따로 진행된 경우 단순히 앞으로 당길 수 없습니다.</p>
            <div className="flex gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 p-3 rounded flex-1 text-center font-bold text-blue-800">main에서도 커밋 발생</div>
              <div className="bg-green-50 border border-green-200 p-3 rounded flex-1 text-center font-bold text-green-800">feature에서도 커밋 발생</div>
            </div>
            <p className="text-gray-700 mb-4 bg-gray-50 p-4 rounded-lg">
              이 경우에는 두 흐름을 하나로 합쳤다는 별도 기록이 필요합니다. 그게 merge commit입니다.
            </p>

            {/* Merge Commit 시각화 */}
            <div className="bg-white border-2 border-purple-100 rounded-xl p-6 relative overflow-hidden flex flex-col items-center mt-6">
              <div className="relative w-full max-w-md h-32">
                {/* Lines */}
                <svg className="absolute inset-0 w-full h-full z-0" pointerEvents="none">
                  {/* Main line */}
                  <line x1="10%" y1="20%" x2="50%" y2="20%" stroke="#9CA3AF" strokeWidth="4" />
                  <line x1="50%" y1="20%" x2="90%" y2="50%" stroke="#9CA3AF" strokeWidth="4" />
                  {/* Branch line */}
                  <path d="M 10% 20% C 30% 80%, 50% 80%, 90% 50%" fill="none" stroke="#10B981" strokeWidth="4" />
                </svg>
                
                {/* Nodes */}
                <div className="absolute top-[20%] left-[10%] -translate-x-1/2 -translate-y-1/2"><GitNode label="A" color="bg-gray-400" /></div>
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                  <GitNode label="B" color="bg-blue-500" />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600">main 커밋</span>
                </div>
                <div className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                  <GitNode label="C" color="bg-green-500" />
                  <span className="absolute top-12 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600 w-max">feature 커밋</span>
                </div>
                <div className="absolute top-[50%] left-[90%] -translate-x-1/2 -translate-y-1/2">
                  <GitNode label="M" color="bg-purple-600" />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-extrabold text-purple-700 whitespace-nowrap bg-purple-100 px-2 rounded border border-purple-200 shadow-sm">Merge Commit</span>
                </div>
              </div>
            </div>

            <p className="text-lg font-bold text-purple-900 mt-4 bg-purple-50 p-3 rounded inline-block">
              즉 merge commit은 두 갈래 이력이 다시 하나로 만나는 지점입니다.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "8. 충돌 conflict를 더 깊게 이해하기",
      content: (
        <div className="space-y-6">
          <p className="text-lg bg-red-50 text-red-900 p-4 rounded-xl border border-red-200">
            충돌은 단순히 "문제가 생겼다"가 아닙니다.<br/>
            정확히는 <strong>두 변경이 겹쳐서 Git이 자동 판단을 못하는 상태</strong>입니다.
          </p>
          
          <p className="text-gray-700">
            예를 들어 같은 파일의 같은 줄을 A도 바꾸고 B도 바꾸면 Git은 어느 쪽이 맞는지 모릅니다.<br/>
            그래서 충돌 표식을 넣습니다.
          </p>

          <div className="my-6">
            <h4 className="font-bold text-gray-800 mb-2">예시 형태:</h4>
            <div className="bg-gray-900 rounded-xl overflow-hidden font-mono text-sm shadow-lg">
              <div className="bg-gray-800 text-gray-400 px-4 py-2 text-xs">index.html (Conflict)</div>
              <div className="p-4">
                <div className="text-blue-400 font-bold bg-blue-900/30 px-2 py-1 -mx-2 rounded">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</div>
                <div className="text-gray-300 py-2">내 현재 브랜치 내용</div>
                <div className="text-yellow-400 font-bold bg-yellow-900/30 px-2 py-1 -mx-2 rounded">=======</div>
                <div className="text-gray-300 py-2">합치려는 브랜치 내용</div>
                <div className="text-green-400 font-bold bg-green-900/30 px-2 py-1 -mx-2 rounded">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/login</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-3">의미는 이렇습니다.</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="text-blue-600 font-mono font-bold w-36 shrink-0">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</span> 아래: 현재 브랜치 내용</li>
              <li className="flex gap-2"><span className="text-yellow-600 font-mono font-bold w-36 shrink-0">=======</span> 기준 위아래 비교</li>
              <li className="flex gap-2"><span className="text-green-600 font-mono font-bold w-36 shrink-0">&gt;&gt;&gt;&gt;&gt;&gt;&gt; ...</span> 아래: 합치려는 브랜치 내용</li>
            </ul>
            <p className="mt-4 font-bold text-red-600">이걸 보고 사람이 최종 결과를 정해야 합니다.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">충돌 해결 순서</h3>
            <ol className="flex flex-col md:flex-row gap-2 w-full font-bold text-sm md:text-base">
              <li className="bg-white border border-gray-300 p-3 flex-1 rounded text-center shadow-sm">1. 파일 열기</li>
              <li className="bg-white border border-gray-300 p-3 flex-1 rounded text-center shadow-sm">2. 남길 내용 결정</li>
              <li className="bg-white border border-gray-300 p-3 flex-1 rounded text-center shadow-sm">3. 표시 삭제 정리</li>
              <li className="bg-white border border-gray-300 p-3 flex-1 rounded text-center shadow-sm">4. 저장</li>
              <li className="bg-blue-50 border border-blue-300 text-blue-800 p-3 flex-1 rounded text-center shadow-sm">5. git add</li>
              <li className="bg-green-50 border border-green-300 text-green-800 p-3 flex-1 rounded text-center shadow-sm">6. 커밋</li>
            </ol>
            <InfoBox title="충돌의 본질" color="red">
              즉 충돌 해결의 본질은 <strong className="bg-white px-2 py-1 rounded">파일의 최종 정답을 사람이 직접 결정하는 것</strong>입니다.
            </InfoBox>
          </div>
        </div>
      )
    },
    {
      title: "9. pull이 내부적으로 하는 일",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">기본 설명에서는 <code>git pull</code>을 "가져오고 반영하는 명령"이라고 했습니다.</p>
          <p className="text-lg font-bold text-blue-800">중급에서는 더 정확히 이해해야 합니다.</p>

          <div className="bg-gray-100 p-6 rounded-xl text-center">
            <p className="text-lg mb-4"><code>git pull</code>은 보통 아래 두 단계를 한 번에 합니다.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-2xl font-mono font-bold">
              <div className="bg-white px-6 py-4 rounded-xl shadow-md border-2 border-purple-500 text-purple-700 w-full md:w-auto">git pull</div>
              <div className="text-gray-400">=</div>
              <div className="bg-white px-6 py-4 rounded-xl shadow-md border border-blue-300 text-blue-600 w-full md:w-auto">1. git fetch</div>
              <div className="text-gray-400">+</div>
              <div className="bg-white px-6 py-4 rounded-xl shadow-md border border-green-300 text-green-600 w-full md:w-auto">2. git merge</div>
            </div>
          </div>

          <p className="text-lg mt-6">즉 pull은 사실상</p>
          <CodeBlock code={"git fetch\ngit merge"} desc="를 줄인 개념입니다." />

          <InfoBox title="pull에서 충돌이 나는 이유" color="yellow" icon={AlertTriangle}>
            그래서 pull을 했을 때 충돌이 날 수 있는 것입니다.<br/>
            단순 다운로드가 아니라 <strong>병합(merge)까지 시도</strong>하기 때문입니다.
          </InfoBox>
        </div>
      )
    },
    {
      title: "10. fetch, merge, rebase의 관계",
      content: (
        <div className="space-y-8">
          
          {/* fetch */}
          <div className="bg-white p-6 border-l-4 border-blue-500 rounded-r-xl shadow-sm">
            <h3 className="text-2xl font-bold font-mono text-blue-800 mb-2">fetch</h3>
            <p className="text-gray-700">
              원격 저장소의 최신 커밋 정보를 가져옵니다.<br/>
              하지만 내 현재 작업 브랜치에 바로 합치지는 않습니다.<br/>
              <span className="inline-block mt-2 bg-blue-50 px-2 py-1 rounded font-bold text-blue-900">즉 "서버 쪽 최신 정보를 일단 받아놓기"입니다.</span>
            </p>
          </div>

          {/* merge */}
          <div className="bg-white p-6 border-l-4 border-green-500 rounded-r-xl shadow-sm">
            <h3 className="text-2xl font-bold font-mono text-green-800 mb-2">merge</h3>
            <p className="text-gray-700">
              두 브랜치의 흐름을 하나로 합칩니다.
            </p>
          </div>

          {/* rebase */}
          <div className="bg-white p-6 border-l-4 border-purple-500 rounded-r-xl shadow-sm">
            <h3 className="text-2xl font-bold font-mono text-purple-800 mb-2">rebase</h3>
            <p className="text-gray-700 mb-4">
              내 브랜치의 작업을 다른 브랜치 위에 다시 이어 붙이는 방식입니다.
            </p>
            <p className="text-sm bg-gray-50 p-3 rounded mb-4 italic">이건 처음엔 약간 어렵게 느껴질 수 있습니다.</p>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm font-bold text-center">
              <div className="bg-green-50 text-green-800 p-4 rounded border border-green-200">
                <div className="mb-2">merge는</div>
                "두 갈래를 합쳐서 만나는 방식"
              </div>
              <div className="bg-purple-50 text-purple-800 p-4 rounded border border-purple-200">
                <div className="mb-2">rebase는</div>
                "내 작업을 최신 줄기 위에 다시 정렬하는 방식"
              </div>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <p className="font-bold mb-2">예를 들어:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>main이 더 앞으로 감</li>
                <li>나는 예전 main에서 feature 작업 중</li>
                <li>이때 rebase를 하면 <strong>내 feature 커밋들이 최신 main 뒤에 다시 붙습니다</strong></li>
              </ul>
              <p className="mt-3 text-purple-700 font-bold bg-white inline-block px-2 rounded">그래서 이력이 더 직선적으로 보일 수 있습니다.</p>
            </div>
          </div>

          <InfoBox title="처음엔 어떻게 이해하면 좋은가" color="gray">
            <ul className="space-y-2 text-lg font-bold mb-4">
              <li>📌 <span className="font-mono text-blue-600">fetch</span> = 최신 내용 받아오기</li>
              <li>📌 <span className="font-mono text-green-600">merge</span> = 두 흐름 합치기</li>
              <li>📌 <span className="font-mono text-purple-600">rebase</span> = 내 작업을 최신 줄기 기준으로 다시 쌓기</li>
            </ul>
            <p className="text-gray-600 border-t pt-4">
              실무에서는 팀 규칙에 따라 merge 기반 협업을 하기도 하고 rebase를 적극적으로 쓰기도 합니다.<br/>
              <strong className="text-gray-900">처음에는 merge를 먼저 확실히 이해하는 것이 좋습니다.</strong>
            </p>
          </InfoBox>

        </div>
      )
    },
    {
      title: "11. reset이란 무엇인가",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-red-600 font-bold bg-red-50 p-4 rounded-xl">
            <code>reset</code>은 Git에서 가장 강력하면서도 조심해야 하는 명령 중 하나입니다.
          </p>

          <InfoBox title="reset의 정의" icon={RotateCcw} color="red">
            한 줄로 말하면<br/>
            <strong className="text-xl">브랜치의 현재 위치와 스테이징 상태를 되돌리는 명령</strong>입니다.
          </InfoBox>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-4">쉽게 말하면:</h4>
            <ul className="space-y-3 text-gray-700 font-medium text-lg">
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-red-500" /> 방금 add한 걸 취소하고 싶다</li>
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-red-500" /> 방금 commit한 걸 다시 없애고 싶다</li>
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-red-500" /> 아예 작업 내용을 과거 상태로 되돌리고 싶다</li>
            </ul>
            <p className="mt-6 font-bold text-xl text-red-700">이럴 때 <code>reset</code>이 등장합니다.</p>
          </div>

          <p className="text-lg bg-yellow-50 text-yellow-800 p-4 rounded-lg font-bold text-center border border-yellow-200 shadow-sm">
            다만 reset은 어디까지 되돌릴지에 따라 성격이 완전히 달라집니다.
          </p>
        </div>
      )
    },
    {
      title: "12. reset --soft, --mixed, --hard",
      content: (
        <div className="space-y-8">
          <p className="text-xl font-bold text-red-600 bg-red-50 p-3 rounded text-center">이 세 개는 정말 중요합니다.</p>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            
            {/* --soft */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-lg font-bold font-mono">1</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
                <h3 className="font-bold text-2xl text-blue-800 mb-2 font-mono">--soft</h3>
                <p className="text-lg font-bold bg-blue-50 p-2 rounded mb-3 text-blue-900">커밋만 되돌리고 스테이징 상태는 남깁니다.</p>
                <ul className="text-gray-600 space-y-1 mb-4 text-sm">
                  <li>✅ commit 취소</li>
                  <li>✅ add 상태는 유지</li>
                  <li>✅ 작업 파일도 유지</li>
                </ul>
                <p className="text-sm bg-gray-50 p-2 rounded mb-3 text-gray-600">예를 들어 마지막 커밋 메시지를 잘못 썼거나 조금 수정해서 다시 커밋하고 싶을 때 유용합니다.</p>
                <div className="bg-gray-800 text-green-400 font-mono text-xs p-2 rounded">git reset --soft HEAD~1</div>
                <p className="text-xs text-gray-500 mt-2 italic">뜻: 마지막 1개 커밋 전으로 되돌리되 변경내용은 스테이징 상태로 남겨라</p>
              </div>
            </div>

            {/* --mixed */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-yellow-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-lg font-bold font-mono">2</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500">
                <h3 className="font-bold text-2xl text-yellow-600 mb-2 font-mono">--mixed</h3>
                <p className="text-lg font-bold bg-yellow-50 p-2 rounded mb-3 text-yellow-900">커밋도 되돌리고 스테이징도 해제합니다. 하지만 작업 파일은 남깁니다.</p>
                <ul className="text-gray-600 space-y-1 mb-4 text-sm">
                  <li>✅ commit 취소</li>
                  <li>✅ add 취소</li>
                  <li>✅ 파일 수정 내용은 작업 디렉토리에 남음</li>
                </ul>
                <p className="text-sm bg-gray-50 p-2 rounded mb-3 text-gray-600 font-bold">기본 git reset은 보통 mixed입니다.</p>
                <div className="bg-gray-800 text-green-400 font-mono text-xs p-2 rounded">git reset HEAD~1</div>
                <p className="text-xs text-gray-500 mt-2 italic">이건 마지막 커밋을 없애지만 파일 수정 내용 자체는 남겨둡니다.</p>
              </div>
            </div>

            {/* --hard */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-red-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-lg font-bold font-mono">3</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500">
                <h3 className="font-bold text-2xl text-red-600 mb-2 font-mono">--hard</h3>
                <p className="text-lg font-bold bg-red-50 p-2 rounded mb-3 text-red-900">커밋도 되돌리고 스테이징도 지우고 작업 파일 변경도 버립니다.</p>
                <ul className="text-gray-600 space-y-1 mb-4 text-sm">
                  <li>🚫 commit 취소</li>
                  <li>🚫 add 취소</li>
                  <li>🚫 수정한 파일도 삭제</li>
                  <li>💥 <strong>완전히 과거 상태로 돌아감</strong></li>
                </ul>
                <div className="bg-gray-800 text-green-400 font-mono text-xs p-2 rounded">git reset --hard HEAD~1</div>
                <p className="text-xs text-red-600 font-bold mt-2 bg-red-50 p-1 rounded">이건 매우 강력합니다. 정말 버려도 되는 변경에만 써야 합니다.</p>
              </div>
            </div>
          </div>

          <InfoBox title="이 셋을 감각적으로 기억하는 법" color="gray">
            <div className="grid grid-cols-3 gap-2 text-center text-sm md:text-base font-bold mt-4">
              <div className="bg-blue-100 text-blue-800 p-3 rounded">soft<br/><span className="text-xs font-normal">커밋만 취소</span></div>
              <div className="bg-yellow-100 text-yellow-800 p-3 rounded">mixed<br/><span className="text-xs font-normal">커밋 + add 취소</span></div>
              <div className="bg-red-100 text-red-800 p-3 rounded">hard<br/><span className="text-xs font-normal">커밋+add+수정 취소</span></div>
            </div>
          </InfoBox>

        </div>
      )
    },
    {
      title: "13. revert란 무엇인가",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700"><code>revert</code>는 <code>reset</code>과 비슷해 보이지만 철학이 다릅니다.</p>

          <InfoBox title="revert의 철학" color="purple">
            <code>revert</code>는 <br/>
            <strong className="text-xl">기존 커밋을 지우는 것이 아니라, 그 커밋을 취소하는 새 커밋을 만드는 것</strong>입니다.
          </InfoBox>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl space-y-4">
            <p className="text-gray-700">예를 들어 5번 커밋이 잘못되었다면 그걸 삭제하는 대신</p>
            <div className="bg-purple-100 text-purple-900 p-4 rounded-lg font-bold text-center text-lg">
              "5번 커밋의 반대 작업"을 하는 새 커밋을 하나 더 추가하는 것입니다.
            </div>
          </div>

          <h4 className="font-bold text-gray-800 mt-6 mb-2">예시:</h4>
          <CodeBlock code="git revert 커밋해시" desc="즉 Git 이력은 유지하면서 결과만 되돌립니다." />
        </div>
      )
    },
    {
      title: "14. reset과 revert의 차이",
      content: (
        <div className="space-y-8">
          <p className="text-xl font-bold text-red-600 bg-red-50 p-3 rounded text-center mb-6">
            이 차이는 협업에서 매우 중요합니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* reset */}
            <div className="bg-white border-2 border-red-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-red-100 px-4 py-3 font-mono font-bold text-red-900 text-center text-xl">reset</div>
              <div className="p-6">
                <p className="text-lg mb-2">이력을 뒤로 되돌립니다.</p>
                <p className="font-bold text-red-700 bg-red-50 p-2 rounded text-center">즉 히스토리 구조 자체를 바꿉니다.</p>
                
                {/* 시각화 */}
                <div className="mt-6 flex items-center justify-center gap-2 bg-gray-50 p-4 rounded">
                  <GitNode label="A" color="bg-blue-500" /> <ArrowRight size={16} className="text-gray-400"/>
                  <GitNode label="B" color="bg-blue-500" /> <ArrowRight size={16} className="text-red-300 relative after:content-['X'] after:absolute after:-top-4 after:left-0 after:text-red-500 after:font-bold after:text-xl"/>
                  <div className="opacity-30 flex items-center gap-2"><GitNode label="C" color="bg-gray-400" /></div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">C가 아예 삭제됨</p>
              </div>
            </div>

            {/* revert */}
            <div className="bg-white border-2 border-purple-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-purple-100 px-4 py-3 font-mono font-bold text-purple-900 text-center text-xl">revert</div>
              <div className="p-6">
                <p className="text-lg mb-2">이력은 그대로 두고</p>
                <p className="font-bold text-purple-700 bg-purple-50 p-2 rounded text-center">되돌리는 새 커밋을 추가합니다.</p>
                
                {/* 시각화 */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 bg-gray-50 p-4 rounded">
                  <GitNode label="A" color="bg-blue-500" /> <ArrowRight size={16} className="text-gray-400"/>
                  <GitNode label="B" color="bg-blue-500" /> <ArrowRight size={16} className="text-gray-400"/>
                  <GitNode label="C" color="bg-blue-500" /> <ArrowRight size={16} className="text-gray-400"/>
                  <GitNode label="-C" color="bg-purple-500" />
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">C를 취소하는 새로운 커밋(-C)이 추가됨</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold border-b pb-2 mb-4">언제 무엇을 써야 하나</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-lg">
                <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2 text-lg">
                  <CheckCircle size={20} className="text-blue-500"/> 혼자 작업 중이고 아직 push 안 했음
                </h4>
                <p className="bg-white p-3 rounded font-mono font-bold inline-block border shadow-sm">reset을 써도 비교적 안전합니다.</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-5 rounded-lg">
                <h4 className="font-bold text-purple-800 flex items-center gap-2 mb-2 text-lg">
                  <CheckCircle size={20} className="text-purple-500"/> 이미 push해서 다른 사람도 보고 있는 이력임
                </h4>
                <p className="bg-white p-3 rounded font-mono font-bold inline-block border shadow-sm mb-2">보통 revert가 더 안전합니다.</p>
                <p className="text-gray-600 text-sm mt-2">왜냐하면 이미 공유된 이력을 reset으로 바꾸면 다른 사람 히스토리와 꼬일 수 있기 때문입니다.</p>
              </div>
            </div>
            
            <InfoBox title="즉 실무 감각으로는 이렇습니다." color="gray">
              <ul className="list-disc pl-5 space-y-2 text-lg font-bold">
                <li>로컬에서 아직 혼자만 아는 실수 = <code className="bg-gray-200 px-2 rounded text-red-600">reset</code></li>
                <li>이미 공유된 커밋 취소 = <code className="bg-gray-200 px-2 rounded text-purple-600">revert</code></li>
              </ul>
            </InfoBox>
          </div>
        </div>
      )
    },
    {
      title: "15. restore와 checkout의 역할 구분",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">Git을 배우다 보면 파일을 되돌릴 때 헷갈립니다.</p>

          <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-green-900 font-mono mb-4 flex items-center gap-2"><RotateCcw/> restore</h3>
            <p className="text-lg mb-4">작업 파일을 이전 상태로 복원하는 데 더 명확한 명령입니다.</p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100 mb-4">
              <p className="text-sm text-gray-600 mb-2">예를 들어 수정한 파일을 마지막 커밋 상태로 되돌리고 싶다면:</p>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded">git restore 파일명</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
              <p className="text-sm text-gray-600 mb-2">스테이징 해제도 가능합니다.</p>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded">git restore --staged 파일명</div>
            </div>

            <p className="font-bold text-green-800 mt-4 text-center">즉 restore는 "파일 상태를 복원한다"는 의미로 이해하면 좋습니다.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 font-mono mb-4">checkout</h3>
            <p className="mb-2">예전에는 브랜치 이동과 파일 복원 둘 다 맡았습니다.</p>
            <p className="mb-4 text-red-600">그래서 강력하지만 초보자에게는 헷갈리기 쉬웠습니다.</p>
            
            <div className="bg-white p-4 rounded-lg border border-gray-300 font-bold text-lg text-center shadow-sm">
              <p className="mb-2 text-gray-500 text-sm font-normal">이제는 생각을 이렇게 나누면 편합니다.</p>
              <div className="flex justify-center items-center gap-4 text-blue-700">
                브랜치 이동 = <code className="bg-blue-100 px-3 py-1 rounded border border-blue-200 text-blue-800">switch</code>
              </div>
              <div className="flex justify-center items-center gap-4 text-green-700 mt-2">
                파일 복원 = <code className="bg-green-100 px-3 py-1 rounded border border-green-200 text-green-800">restore</code>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "16. stash란 무엇인가",
      content: (
        <div className="space-y-6">
          <InfoBox title="stash의 핵심" color="blue" icon={Box}>
            <code>stash</code>는 <br/>
            <strong className="text-xl">작업 중인 변경사항을 잠깐 서랍에 넣어두는 기능</strong>입니다.
          </InfoBox>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl space-y-3">
            <h4 className="font-bold text-gray-800 mb-2">예를 들어 이런 상황이 있습니다.</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>로그인 작업 중</li>
              <li>아직 commit하기는 애매함</li>
              <li className="text-red-600 font-bold">그런데 급하게 main 브랜치에서 버그를 수정해야 함</li>
            </ul>
            <p className="bg-red-50 p-2 rounded text-red-800 font-semibold mt-4 inline-block">
              이때 그냥 브랜치를 바꾸려 하면 꼬일 수 있습니다.
            </p>
          </div>

          <p className="text-lg font-bold text-blue-800">그래서 현재 수정 중인 내용을 임시 보관합니다.</p>
          <CodeBlock code="git stash" desc="그러면 작업 내용이 잠시 치워집니다." highlight />

          {/* 시각화: 서랍 */}
          <div className="flex justify-center my-6">
            <div className="bg-white border-4 border-blue-200 p-6 rounded-xl shadow-lg w-full max-w-sm text-center relative overflow-hidden">
               <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded-t-lg absolute top-0 left-0 right-0">임시 보관함 (Stash)</div>
               <div className="mt-10 flex justify-center gap-2">
                 <div className="bg-yellow-100 border border-yellow-300 w-12 h-16 shadow-sm relative before:absolute before:top-1 before:right-1 before:w-3 before:h-3 before:bg-yellow-200"></div>
                 <div className="bg-blue-100 border border-blue-300 w-12 h-16 shadow-sm rotate-6 relative before:absolute before:top-1 before:right-1 before:w-3 before:h-3 before:bg-blue-200"></div>
               </div>
               <p className="text-sm text-gray-500 mt-4 font-bold">"로그인 작업 중" 파일들 보관 중...</p>
            </div>
          </div>

          <p className="text-lg">이후 다른 브랜치로 가서 급한 일을 하고 나중에 다시 꺼내옵니다.</p>
          <CodeBlock code="git stash pop" />

          <p className="text-xl font-bold text-center bg-gray-100 p-4 rounded-xl shadow-inner mt-6">
            즉 stash는 <br/><span className="text-blue-600">아직 정식 커밋하기 애매한 작업</span>을<br/>잠깐 숨겨두는 임시 보관함입니다.
          </p>
        </div>
      )
    },
    {
      title: "17. 로그 읽는 법과 이력 추적",
      content: (
        <div className="space-y-8">
          <p className="text-lg text-gray-700 bg-gray-100 p-4 rounded-lg font-bold text-center">
            Git을 잘 쓰려면 로그를 읽을 줄 알아야 합니다.
          </p>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 border-b pb-2">기본 로그</h3>
            <CodeBlock code="git log" desc="이 명령은 커밋 이력을 자세히 보여줍니다." />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 border-b pb-2">간단한 한 줄 로그</h3>
            <CodeBlock code="git log --oneline" desc="짧은 커밋 해시와 메시지만 보여줘서 훨씬 보기 편합니다." />
            
            <h4 className="font-bold text-gray-700 mt-4 mb-2">예:</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm leading-relaxed shadow-lg">
              <span className="text-yellow-400">a1b2c3d</span> 로그인 버튼 수정<br/>
              <span className="text-yellow-400">d4e5f6g</span> 회원가입 폼 추가<br/>
              <span className="text-yellow-400">h7i8j9k</span> 초기 프로젝트 설정
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 border-b pb-2">브랜치 구조까지 보기</h3>
            <CodeBlock 
              code="git log --oneline --graph --all" 
              desc="이걸 보면 브랜치가 어디서 갈라지고 어디서 합쳐졌는지 시각적으로 파악하기 쉽습니다." 
              highlight
            />
          </div>
        </div>
      )
    },
    {
      title: "18. HEAD의 개념",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">Git 설명에서 자주 보이는 단어가 <code>HEAD</code>입니다.</p>

          <InfoBox title="HEAD란?" color="blue" icon={Eye}>
            <code>HEAD</code>는 <br/>
            <strong className="text-xl">지금 내가 보고 있는 현재 위치를 가리키는 포인터</strong>라고 생각하시면 됩니다.<br/><br/>
            보통은 현재 브랜치의 최신 커밋을 가리킵니다.
          </InfoBox>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl relative overflow-hidden my-6">
            <h4 className="font-bold text-gray-800 mb-4 z-10 relative">예를 들어:</h4>
            <ul className="list-disc pl-5 text-gray-700 z-10 relative mb-6">
              <li>현재 main 브랜치에 있음</li>
              <li>main의 최신 커밋이 A임</li>
            </ul>
            <p className="text-lg font-bold text-blue-700 bg-blue-100 p-3 rounded text-center z-10 relative">
              그럼 HEAD는 A를 가리킵니다.
            </p>

            {/* 시각화 */}
            <div className="mt-8 flex flex-col items-center relative z-10">
               <div className="bg-blue-600 text-white font-mono font-bold px-4 py-1 rounded-full shadow-lg border-2 border-white mb-2 animate-bounce flex items-center gap-2">
                 <Eye size={16}/> HEAD
               </div>
               <div className="w-1 h-8 bg-blue-500 mb-2"></div>
               <GitNode label="A" color="bg-gray-800" />
               <div className="mt-2 text-sm font-bold text-gray-600">main의 최신 커밋</div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">자주 보는 표현</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-xl font-mono text-purple-700 mb-2 bg-purple-50 inline-block px-2 rounded">HEAD~1</h4>
              <p className="text-gray-700">현재 커밋의 바로 이전 커밋</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-xl font-mono text-purple-700 mb-2 bg-purple-50 inline-block px-2 rounded">HEAD~2</h4>
              <p className="text-gray-700">현재 커밋에서 두 단계 전</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-bold text-gray-700 mb-2">예:</h4>
            <CodeBlock code="git reset --soft HEAD~1" desc="현재 커밋보다 한 단계 전으로 되돌리라는 뜻입니다." />
          </div>

          <p className="text-center font-bold text-xl text-gray-800 bg-gray-100 p-4 rounded-xl shadow-inner mt-6">
            즉 HEAD는 Git에서 <span className="text-blue-600 bg-white px-2 rounded inline-block shadow-sm">"현재 기준점"</span> 역할을 합니다.
          </p>
        </div>
      )
    },
    {
      title: "19. 원격 브랜치와 추적 브랜치",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            처음엔 브랜치가 로컬에만 있는 것처럼 느껴지지만 원격에도 브랜치가 있습니다.<br/>
            예를 들어 GitHub에 <code>main</code>, <code>develop</code>, <code>feature/login</code>이 있을 수 있습니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
              <h3 className="text-lg font-bold text-blue-900 mb-2">원격 브랜치 보기</h3>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded">git branch -r</div>
            </div>
            
            <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
              <h3 className="text-lg font-bold text-green-900 mb-2">로컬과 원격 모두 보기</h3>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded">git branch -a</div>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Layers/> 추적 브랜치란</h3>
            <p className="text-lg bg-gray-50 p-4 rounded-lg mb-4 text-gray-700 border border-gray-200">
              내 로컬 브랜치가 어느 원격 브랜치를 따라가고 있는지 연결된 상태를 말합니다.
            </p>
            <p className="text-gray-600 mb-4">
              예를 들어 로컬 <code>main</code>이 원격 <code>origin/main</code>을 추적하면<br/>
              그다음부터는 <code>git pull</code>, <code>git push</code>를 좀 더 간단히 쓸 수 있습니다.
            </p>
            
            <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl">
              <h4 className="font-bold text-purple-900 mb-2">처음 브랜치를 올릴 때 자주 보는 명령:</h4>
              <CodeBlock code="git push -u origin main" highlight />
              <p className="text-gray-700 mt-2 bg-white p-3 rounded">
                여기서 <code>-u</code>는 upstream 설정입니다.<br/>
                <strong className="text-purple-700">즉 로컬 main과 원격 origin/main을 연결하는 느낌입니다.</strong>
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "20. 협업에서 자주 쓰는 실제 흐름",
      content: (
        <div className="space-y-6">
          <p className="text-lg bg-gray-100 p-4 rounded-xl text-center font-bold text-gray-700 mb-6">
            이제 실제 협업 흐름을 예시로 보겠습니다.
          </p>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg font-bold text-blue-900 flex items-center gap-2 text-lg shadow-sm">
            <CheckCircle className="text-blue-500" /> 상황: 팀 프로젝트에서 로그인 기능을 맡았다고 가정하겠습니다.
          </div>

          <div className="space-y-4 mt-8 pl-4 border-l-4 border-gray-200 relative">
            
            {/* 1단계 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold font-mono">1</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">최신 코드 받기</h3>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded w-full md:w-2/3 my-2 shadow-sm">git pull origin main</div>
              <p className="text-sm text-gray-500 mb-6">먼저 main을 최신으로 맞춥니다.</p>
            </div>

            {/* 2단계 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold font-mono">2</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">작업 브랜치 생성</h3>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded w-full md:w-2/3 my-2 shadow-sm">git switch -c feature/login</div>
              <div className="mb-6 h-2"></div>
            </div>

            {/* 3단계 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold font-mono">3</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">개발 진행</h3>
              <p className="text-sm text-gray-600 my-1 font-bold">파일 수정 후...</p>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded w-full md:w-2/3 my-2 shadow-sm">git status<br/>git add .<br/>git commit -m "로그인 폼 UI 추가"</div>
              <p className="text-sm text-gray-600 my-1 font-bold mt-4">추가 작업 후...</p>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded w-full md:w-2/3 my-2 shadow-sm">git add .<br/>git commit -m "로그인 유효성 검사 추가"</div>
              <div className="mb-6 h-2"></div>
            </div>

            {/* 4단계 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold font-mono">4</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">원격 브랜치로 올리기</h3>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded w-full md:w-2/3 my-2 shadow-sm">git push -u origin feature/login</div>
              <div className="mb-6 h-2"></div>
            </div>

            {/* 5단계 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold font-mono shadow-[0_0_0_4px_white]">5</div>
              <h3 className="text-xl font-bold text-blue-800 mb-1 flex items-center gap-2"><GitPullRequest size={20}/> GitHub에서 Pull Request 생성</h3>
              <p className="text-gray-700 bg-blue-50 p-3 rounded w-full md:w-2/3 border border-blue-100 my-2 shadow-sm">
                이제 main에 바로 합치지 않고 검토 요청을 보냅니다.<br/>이게 <strong>Pull Request</strong>입니다.<br/>
                <span className="text-blue-700 font-bold text-sm bg-white px-2 py-1 rounded inline-block mt-2">"제 브랜치 작업을 main에 합쳐주세요" 라고 제안하는 단계입니다.</span>
              </p>
              <div className="mb-6 h-2"></div>
            </div>

            {/* 6단계 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold font-mono">6</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">리뷰 후 병합</h3>
              <p className="text-sm text-gray-500 mb-6">검토가 끝나면 GitHub에서 merge</p>
            </div>

            {/* 7단계 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold font-mono">7</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">내 로컬 main 최신화</h3>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded w-full md:w-2/3 my-2 shadow-sm">git switch main<br/>git pull origin main</div>
              <div className="mb-6 h-2"></div>
            </div>

            {/* 8단계 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold font-mono">8</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2"><Trash2 size={20} className="text-gray-400"/> 작업 끝난 브랜치 정리</h3>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded w-full md:w-2/3 my-2 shadow-sm">git branch -d feature/login</div>
              <p className="text-sm text-gray-600 mt-2 mb-1">원격까지 지우려면</p>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded w-full md:w-2/3 my-2 shadow-sm">git push origin --delete feature/login</div>
            </div>

          </div>

          <p className="text-center font-bold text-xl text-green-800 bg-green-50 p-4 rounded-xl shadow-sm mt-8 border border-green-200">
            이게 아주 전형적인 실무 흐름입니다.
          </p>
        </div>
      )
    },
    {
      title: "21. GitHub 협업: fork, clone, pull request",
      content: (
        <div className="space-y-8">
          <p className="text-lg text-gray-700">GitHub 협업에서는 clone 말고 fork도 자주 봅니다.</p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white border-2 border-blue-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-blue-800 mb-2 flex items-center gap-2 font-mono"><FolderDown size={24}/> clone</h3>
              <p className="text-gray-700 mb-4 font-bold bg-blue-50 p-2 rounded">저장소를 내 컴퓨터로 복사하는 것입니다.</p>
              <div className="bg-gray-800 text-green-400 font-mono text-sm p-3 rounded mt-auto">git clone 저장소주소</div>
            </div>

            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-purple-800 mb-2 flex items-center gap-2 font-mono"><GitBranch size={24} className="rotate-90"/> fork</h3>
              <p className="text-gray-700 mb-4 font-bold bg-purple-50 p-2 rounded">남의 GitHub 저장소를 내 GitHub 계정으로 복사해오는 것입니다.</p>
              <p className="text-sm text-gray-500 italic mt-auto">주로 오픈소스 기여에서 많이 씁니다.</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4">흐름은 보통 이렇습니다.</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 font-medium bg-white p-4 rounded border shadow-sm">
              <li>원본 저장소 fork</li>
              <li>내 계정으로 복사됨</li>
              <li>그걸 내 컴퓨터에 clone</li>
              <li>수정 후 내 저장소에 push</li>
              <li>원본 저장소에 Pull Request 요청</li>
            </ol>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <GitPullRequest size={28} className="text-blue-500" /> Pull Request
            </h3>
            <p className="text-lg mb-4">GitHub에서 브랜치 병합을 제안하는 기능입니다.</p>
            <div className="bg-blue-50 text-blue-900 font-bold p-4 rounded-lg text-center italic text-xl shadow-inner border border-blue-100 mb-4">
              "내 변경을 당신 저장소에 당겨가 주세요"
            </div>
            <p className="text-gray-600 mb-6 text-center text-sm">라는 의미에서 시작된 이름입니다.</p>
            
            <p className="text-lg bg-white p-4 rounded border shadow-sm">
              실무에서는 코드 리뷰, 토론, 승인 과정이 이 안에서 일어납니다.
            </p>

            <InfoBox title="Pull Request의 본질" color="blue">
              즉 Pull Request는 단순 병합 버튼이 아니라 <strong className="text-xl bg-white px-2 py-1 rounded">협업 검토 창구</strong>입니다.
            </InfoBox>
          </div>
        </div>
      )
    },
    {
      title: "22. 실무에서 자주 하는 실수와 복구 감각",
      content: (
        <div className="space-y-6">
          
          <div className="bg-white border-l-4 border-red-500 p-5 rounded-r-xl shadow-sm">
            <h3 className="font-bold text-red-800 text-lg mb-2 flex items-center gap-2"><AlertTriangle size={18}/> 실수 1. main에서 바로 작업함</h3>
            <p className="text-gray-700">가능하면 기능 개발은 브랜치에서 하시는 게 좋습니다.</p>
          </div>

          <div className="bg-white border-l-4 border-yellow-500 p-5 rounded-r-xl shadow-sm">
            <h3 className="font-bold text-yellow-800 text-lg mb-2 flex items-center gap-2"><AlertTriangle size={18}/> 실수 2. <code>git add .</code>를 무심코 남발함</h3>
            <p className="text-gray-700 mb-2">원하지 않는 파일까지 올라갈 수 있습니다. 특히 설정 파일, 임시 파일, 비밀 키 파일은 조심해야 합니다.</p>
            <p className="text-gray-800 font-bold bg-yellow-50 inline-block px-2 rounded">그래서 .gitignore도 중요합니다.</p>
            <div className="mt-3 bg-gray-50 p-3 rounded font-mono text-sm border">
              예:<br/>
              node_modules/<br/>
              .env<br/>
              build/
            </div>
          </div>

          <div className="bg-white border-l-4 border-red-500 p-5 rounded-r-xl shadow-sm">
            <h3 className="font-bold text-red-800 text-lg mb-2 flex items-center gap-2"><AlertTriangle size={18}/> 실수 3. commit 없이 브랜치 이동하려 함</h3>
            <p className="text-gray-700">작업이 꼬일 수 있습니다. 필요하면 commit하거나 stash하세요.</p>
          </div>

          <div className="bg-white border-l-4 border-red-600 p-5 rounded-r-xl shadow-sm bg-red-50">
            <h3 className="font-bold text-red-900 text-lg mb-2 flex items-center gap-2"><AlertTriangle size={18}/> 실수 4. 이미 push한 이력을 reset으로 바꿔버림</h3>
            <p className="text-red-800 font-bold mb-1">협업 중이라면 매우 조심해야 합니다.</p>
            <p className="text-gray-700">공유된 히스토리 수정은 팀원 작업을 꼬이게 만들 수 있습니다.</p>
          </div>

          <div className="bg-white border-l-4 border-yellow-500 p-5 rounded-r-xl shadow-sm">
            <h3 className="font-bold text-yellow-800 text-lg mb-2 flex items-center gap-2"><AlertTriangle size={18}/> 실수 5. pull 전에 내 상태를 확인하지 않음</h3>
            <p className="text-gray-700">pull은 병합을 일으킬 수 있으므로 항상 먼저 <code>git status</code>를 보는 습관이 좋습니다.</p>
          </div>

          <div className="bg-gray-800 border p-6 rounded-xl shadow-lg mt-8 text-white">
            <h3 className="font-bold text-blue-300 text-xl mb-4 flex items-center gap-2"><RefreshCw size={24}/> 실수 6. 뭐가 꼬였는지 모르겠는데 계속 명령만 입력함</h3>
            <p className="text-gray-300 mb-4 bg-gray-700 p-2 rounded inline-block">이럴 때는 멈추고 아래 3개부터 보시면 됩니다.</p>
            <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg shadow-inner mb-4">
              git status<br/>
              git branch<br/>
              git log --oneline --graph --all
            </div>
            <p className="font-bold text-yellow-400 text-center text-lg">이 세 개만 봐도 현재 상황이 많이 풀립니다.</p>
          </div>

        </div>
      )
    },
    {
      title: "23. 추천 학습 순서",
      content: (
        <div className="space-y-6">
          <p className="text-lg bg-blue-50 p-4 rounded-xl text-blue-900 font-bold border border-blue-100 mb-8 text-center">
            Git은 한 번에 다 외우려고 하면 오히려 더 헷갈립니다.<br/>
            순서를 나눠서 배우는 것이 좋습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1단계 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm hover:border-blue-400 transition flex flex-col h-full relative overflow-hidden">
              <div className="bg-blue-500 text-white font-black text-4xl absolute -right-2 -top-2 w-16 h-16 rounded-full flex items-center justify-center opacity-10 pointer-events-none">1</div>
              <h3 className="font-bold text-blue-800 text-xl mb-4 border-b pb-2">1단계</h3>
              <ul className="space-y-2 font-mono text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500"/> status</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500"/> add</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500"/> commit</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500"/> push</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500"/> pull</li>
              </ul>
            </div>

            {/* 2단계 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm hover:border-green-400 transition flex flex-col h-full relative overflow-hidden">
              <div className="bg-green-500 text-white font-black text-4xl absolute -right-2 -top-2 w-16 h-16 rounded-full flex items-center justify-center opacity-10 pointer-events-none">2</div>
              <h3 className="font-bold text-green-800 text-xl mb-4 border-b pb-2">2단계</h3>
              <ul className="space-y-2 font-mono text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> branch</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> switch</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> merge</li>
                <li className="flex items-center gap-2 font-sans font-bold text-gray-800"><CheckCircle size={16} className="text-green-500"/> conflict 해결</li>
              </ul>
            </div>

            {/* 3단계 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm hover:border-red-400 transition flex flex-col h-full relative overflow-hidden">
               <div className="bg-red-500 text-white font-black text-4xl absolute -right-2 -top-2 w-16 h-16 rounded-full flex items-center justify-center opacity-10 pointer-events-none">3</div>
              <h3 className="font-bold text-red-800 text-xl mb-4 border-b pb-2">3단계</h3>
              <ul className="space-y-2 font-mono text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-red-500"/> reset</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-red-500"/> revert</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-red-500"/> restore</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-red-500"/> stash</li>
              </ul>
            </div>

            {/* 4단계 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm hover:border-purple-400 transition flex flex-col h-full relative overflow-hidden">
               <div className="bg-purple-500 text-white font-black text-4xl absolute -right-2 -top-2 w-16 h-16 rounded-full flex items-center justify-center opacity-10 pointer-events-none">4</div>
              <h3 className="font-bold text-purple-800 text-xl mb-4 border-b pb-2">4단계</h3>
              <ul className="space-y-2 font-mono text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-purple-500"/> fetch</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-purple-500"/> rebase</li>
                <li className="flex items-center gap-2 font-sans font-bold text-gray-800"><CheckCircle size={16} className="text-purple-500"/> 원격 브랜치</li>
                <li className="flex items-center gap-2 font-sans font-bold text-gray-800"><CheckCircle size={16} className="text-purple-500"/> Pull Request 협업 흐름</li>
              </ul>
            </div>

          </div>

          <p className="text-center font-bold text-xl text-gray-800 mt-8 bg-gray-100 p-4 rounded-xl">
            이 순서로 익히면 훨씬 자연스럽습니다.
          </p>
        </div>
      )
    },
    {
      title: "24. 최종 요약",
      content: (
        <div className="space-y-6 pb-10">
          <p className="text-lg bg-gray-800 text-white text-center p-4 rounded-xl font-bold shadow-lg">이제 전체를 핵심만 압축해서 정리하겠습니다.</p>

          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl text-blue-800 mb-2 font-mono">브랜치</h3>
              <p className="text-gray-700 leading-relaxed">독립적으로 작업하기 위한 가지입니다. 기능별 작업, 실험, 협업을 안전하게 할 수 있게 해줍니다.</p>
            </div>

            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl text-green-800 mb-2 font-mono">merge</h3>
              <p className="text-gray-700 leading-relaxed">브랜치의 작업 내용을 현재 브랜치에 합치는 것입니다.</p>
            </div>

            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl text-indigo-800 mb-2 font-mono">checkout / switch</h3>
              <p className="text-gray-700 leading-relaxed">브랜치 이동을 담당합니다. 요즘은 <code className="bg-indigo-50 text-indigo-700 px-1 rounded">switch</code>가 더 명확합니다.</p>
            </div>

            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl text-red-800 mb-2 font-mono">reset</h3>
              <p className="text-gray-700 leading-relaxed">커밋이나 스테이징 상태를 되돌리는 강력한 명령입니다. <code className="text-red-600 bg-red-50 px-1 rounded">soft</code>, <code className="text-red-600 bg-red-50 px-1 rounded">mixed</code>, <code className="text-red-600 bg-red-50 px-1 rounded">hard</code> 차이를 알아야 합니다.</p>
            </div>

            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl text-purple-800 mb-2 font-mono">revert</h3>
              <p className="text-gray-700 leading-relaxed">기존 커밋을 지우지 않고 그 커밋을 취소하는 새 커밋을 만드는 방식입니다. 공유된 이력에서는 더 안전한 경우가 많습니다.</p>
            </div>

            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl text-emerald-800 mb-2 font-mono">restore</h3>
              <p className="text-gray-700 leading-relaxed">파일 상태 복원에 집중된 명령입니다.</p>
            </div>

            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl text-orange-800 mb-2 font-mono">stash</h3>
              <p className="text-gray-700 leading-relaxed">커밋하기 애매한 작업을 잠깐 임시 보관하는 서랍입니다.</p>
            </div>

            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl text-teal-800 mb-2 font-mono flex gap-2"><span className="w-16">fetch /</span> pull</h3>
              <p className="text-gray-700 leading-relaxed"><code className="bg-teal-50 px-1 rounded">fetch</code>는 최신 원격 정보를 가져오기만 합니다.<br/><code className="bg-teal-50 px-1 rounded">pull</code>은 가져오고 현재 브랜치에 반영까지 합니다.</p>
            </div>

          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mt-6">
            <h3 className="font-bold text-xl text-blue-900 mb-4 border-b border-blue-200 pb-2 flex items-center gap-2"><Database size={20}/> Push와 Pull의 큰 그림</h3>
            <ul className="space-y-3 font-bold text-lg text-blue-800">
              <li className="flex items-center gap-3"><span className="bg-white border border-blue-300 px-3 py-1 rounded shadow-sm font-mono w-20 text-center">push</span> = 내 커밋을 원격으로 올리기</li>
              <li className="flex items-center gap-3"><span className="bg-white border border-blue-300 px-3 py-1 rounded shadow-sm font-mono w-20 text-center">pull</span> = 원격 최신 내용을 내 쪽으로 가져와 반영하기</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl mt-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20"><BookOpen size={100} /></div>
            <h3 className="text-2xl font-bold mb-4 z-10 relative">Git의 진짜 핵심</h3>
            <p className="text-xl leading-relaxed font-semibold z-10 relative">
              Git은 명령어 암기 도구가 아니라<br/>
              <span className="bg-white text-blue-800 px-3 py-1 rounded-lg inline-block mt-3 shadow-lg">
                프로젝트의 시간 흐름과 작업 흐름을 안전하게 관리하는 시스템
              </span>
              입니다.
            </p>
          </div>

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
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 overflow-y-auto ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
          <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
            <BookOpen className="text-blue-600"/> 목차 (중급)
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
                  ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600 shadow-inner' 
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
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Header & Progress Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="h-1.5 w-full bg-gray-100">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-600 hover:text-gray-900 p-1 bg-gray-100 rounded-md">
                <Menu size={20} />
              </button>
              <h1 className="text-lg md:text-xl font-bold text-gray-800 truncate">Git 중급 설명서</h1>
            </div>
            <div className="text-sm text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap">
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
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
                  currentChapter === 0 
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                  : 'text-blue-700 bg-blue-50 hover:bg-blue-100 hover:shadow-md border border-blue-200'
                }`}
              >
                <ChevronLeft size={20} /> <span className="hidden sm:inline">이전 장</span>
              </button>
              
              <span className="text-gray-500 font-medium text-sm md:hidden bg-white px-3 py-1 rounded-full border shadow-sm">
                {currentChapter + 1} / {chapters.length}
              </span>

              <button 
                onClick={handleNext} 
                disabled={currentChapter === chapters.length - 1}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
                  currentChapter === chapters.length - 1 
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                  : 'text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                <span className="hidden sm:inline">다음 장</span> <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="h-16"></div>
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default GitIntermediateBook;