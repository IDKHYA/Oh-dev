import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Globe, Monitor, Server, Smartphone, Cpu, Activity, 
  ShieldCheck, Cloud, Users, Zap, Wifi, Lock, ChevronRight, ChevronLeft,
  ArrowRight, ArrowLeftRight, CheckCircle2, Layout, Network, HardDrive
} from 'lucide-react';

// --- Reusable UI Components ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 border border-gray-100 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-8 border-b pb-4">
    <div className="flex items-center gap-3 mb-2">
      {Icon && <Icon className="w-8 h-8 text-blue-600" />}
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
    {subtitle && <p className="text-lg text-gray-500 font-medium">{subtitle}</p>}
  </div>
);

const Highlight = ({ children }) => (
  <span className="bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.5 rounded">
    {children}
  </span>
);

const Quote = ({ children }) => (
  <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-4 my-4 rounded-r-lg text-gray-700 text-lg font-medium italic">
    {children}
  </blockquote>
);

// --- Interactive Animations ---

// 1. Client-Server Animation
const ClientServerAnimation = () => {
  const [animState, setAnimState] = useState(0); // 0: idle, 1: req, 2: res

  const triggerAnim = () => {
    setAnimState(1);
    setTimeout(() => setAnimState(2), 1000);
    setTimeout(() => setAnimState(0), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl my-6 border">
      <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
        <ArrowLeftRight className="w-5 h-5"/> 클라이언트-서버 통신 과정
      </h4>
      <div className="flex items-center justify-between w-full max-w-md relative">
        {/* Client */}
        <div className="flex flex-col items-center z-10 bg-white p-3 rounded-lg shadow">
          <Monitor className="w-12 h-12 text-gray-700 mb-2" />
          <span className="font-bold text-sm">클라이언트</span>
          <span className="text-xs text-gray-500">(요청)</span>
        </div>

        {/* Path & Packets */}
        <div className="flex-1 h-1 bg-gray-300 mx-4 relative overflow-hidden rounded">
          {animState === 1 && (
            <div className="absolute top-0 left-0 h-full w-4 bg-blue-500 rounded-full animate-[slideRight_1s_linear]" />
          )}
          {animState === 2 && (
             <div className="absolute top-0 right-0 h-full w-4 bg-green-500 rounded-full animate-[slideLeft_1s_linear]" />
          )}
        </div>

        {/* Server */}
        <div className="flex flex-col items-center z-10 bg-white p-3 rounded-lg shadow">
          <Server className="w-12 h-12 text-blue-600 mb-2" />
          <span className="font-bold text-sm">서버</span>
          <span className="text-xs text-gray-500">(응답)</span>
        </div>
      </div>
      
      <div className="mt-8 h-8 text-sm font-semibold text-gray-600">
        {animState === 0 && "대기 중..."}
        {animState === 1 && <span className="text-blue-600">클라이언트가 서버에 데이터를 요청합니다...</span>}
        {animState === 2 && <span className="text-green-600">서버가 클라이언트에게 데이터를 응답합니다!</span>}
      </div>
      <button 
        onClick={triggerAnim} 
        disabled={animState !== 0}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        통신 시작해보기
      </button>

      <style>{`
        @keyframes slideRight { from { left: 0%; } to { left: 100%; } }
        @keyframes slideLeft { from { right: 0%; } to { right: 100%; } }
      `}</style>
    </div>
  );
};

// 2. Topology Toggle Animation
const TopologyVisualizer = () => {
  const [isLogical, setIsLogical] = useState(false);

  return (
    <div className="bg-slate-800 text-white rounded-xl p-6 my-6 shadow-xl transition-all duration-500">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg flex items-center gap-2">
          <Layout className="w-5 h-5"/> 
          {isLogical ? "논리적 토폴로지 (Logical)" : "물리적 토폴로지 (Physical)"}
        </h4>
        <div className="flex bg-slate-700 rounded-lg p-1 cursor-pointer" onClick={() => setIsLogical(!isLogical)}>
          <div className={`px-4 py-1 flex-1 text-center rounded-md text-sm font-medium transition-colors ${!isLogical ? 'bg-blue-500 text-white' : 'text-gray-400'}`}>Physical</div>
          <div className={`px-4 py-1 flex-1 text-center rounded-md text-sm font-medium transition-colors ${isLogical ? 'bg-green-500 text-white' : 'text-gray-400'}`}>Logical</div>
        </div>
      </div>

      <div className="relative h-64 border border-slate-600 rounded-lg bg-slate-900 overflow-hidden">
        {/* Physical View */}
        <div className={`absolute inset-0 p-4 transition-opacity duration-500 flex justify-center items-center ${isLogical ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
           <div className="w-full max-w-sm border-2 border-gray-500 border-dashed rounded-lg p-4 relative">
              <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-gray-400">서버실 (Rack 1)</span>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center"><Server className="w-8 h-8 text-gray-300"/><span className="text-[10px] mt-1 text-gray-400">Port 1</span></div>
                <div className="w-16 h-1 bg-yellow-600"></div> {/* Copper Cable */}
                <div className="flex flex-col items-center"><Cpu className="w-10 h-10 text-blue-400"/><span className="text-[10px] mt-1 text-gray-400">Switch (Shelf A)</span></div>
                <div className="w-16 h-1 bg-yellow-600"></div>
                <div className="flex flex-col items-center"><Monitor className="w-8 h-8 text-gray-300"/><span className="text-[10px] mt-1 text-gray-400">1층 사무실</span></div>
              </div>
           </div>
           <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-yellow-400">
             "장비가 실제로 어디에 배치되어 있고, 케이블이 어떻게 연결되어 있는지 보여줍니다."
           </div>
        </div>

        {/* Logical View */}
        <div className={`absolute inset-0 p-4 transition-opacity duration-500 flex justify-center items-center ${!isLogical ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
           <div className="flex justify-center items-center gap-8 w-full">
              <div className="flex flex-col items-center">
                <Server className="w-8 h-8 text-green-400"/>
                <span className="text-xs font-mono mt-1 text-green-200">192.168.10.10</span>
                <span className="text-[10px] text-gray-500">VLAN 10</span>
              </div>
              <div className="relative w-32 h-0.5 bg-green-500 border-dashed">
                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[10px] text-green-400 bg-slate-900 px-1">Subnet: 192.168.10.0/24</div>
                 {/* Moving packet in logical view */}
                 <div className="absolute top-1/2 -mt-1 w-2 h-2 bg-white rounded-full animate-ping left-0"></div>
              </div>
              <div className="flex flex-col items-center">
                <Monitor className="w-8 h-8 text-green-400"/>
                <span className="text-xs font-mono mt-1 text-green-200">192.168.10.50</span>
                <span className="text-[10px] text-gray-500">VLAN 10</span>
              </div>
           </div>
           <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-green-400">
             "데이터 관점의 구조! IP 주소, 서브넷 등 논리적으로 어떻게 통신하는지 보여줍니다."
           </div>
        </div>
      </div>
    </div>
  )
}

// 3. QoS Animation (Queue Priority)
const QoSVisualizer = () => {
  const [running, setRunning] = useState(false);

  return (
    <div className="bg-indigo-900 text-white p-6 rounded-xl my-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold flex items-center gap-2"><Activity /> QoS (서비스 품질) 원리</h4>
        <button onClick={() => setRunning(!running)} className="px-4 py-1 bg-indigo-600 rounded-full hover:bg-indigo-500 text-sm">
          {running ? '정지' : '트래픽 전송 시뮬레이션'}
        </button>
      </div>
      
      <div className="flex gap-4 mb-4">
        <div className="flex-1 border border-indigo-700 p-4 rounded-lg bg-indigo-950 relative overflow-hidden h-32">
          <span className="absolute top-2 left-2 text-xs font-bold text-indigo-300">중요도 낮음 (일반 파일)</span>
          {running && (
            <>
              <div className="absolute top-10 left-0 w-6 h-6 bg-gray-400 rounded opacity-50 animate-[moveRightSlow_4s_linear_infinite]"></div>
              <div className="absolute top-10 left-12 w-6 h-6 bg-gray-400 rounded opacity-50 animate-[moveRightSlow_4s_linear_infinite_1s]"></div>
            </>
          )}
        </div>
        
        <div className="w-16 flex flex-col items-center justify-center border-x-2 border-dashed border-indigo-400">
          <span className="text-[10px] text-indigo-300 mb-2">라우터 (QoS)</span>
          <Cpu className="w-8 h-8 text-indigo-400 animate-pulse"/>
        </div>

        <div className="flex-1 border border-indigo-700 p-4 rounded-lg bg-indigo-950 relative overflow-hidden h-32">
          <span className="absolute top-2 left-2 text-xs font-bold text-green-400">중요도 높음 (실시간 음성/영상) - <Highlight>우선 통과!</Highlight></span>
          {running && (
            <>
              <div className="absolute top-10 left-0 w-6 h-6 bg-green-500 rounded-full animate-[moveRightFast_1.5s_linear_infinite]"></div>
              <div className="absolute top-10 left-12 w-6 h-6 bg-green-500 rounded-full animate-[moveRightFast_1.5s_linear_infinite_0.5s]"></div>
              <div className="absolute top-10 left-24 w-6 h-6 bg-green-500 rounded-full animate-[moveRightFast_1.5s_linear_infinite_1s]"></div>
            </>
          )}
        </div>
      </div>
      <p className="text-sm text-indigo-200">
        QoS 메커니즘은 제한된 네트워크 자원 속에서 <strong>지연에 민감한 실시간 트래픽(음성, 영상)</strong>을 
        일반 데이터(파일 다운로드 등)보다 우선적으로 처리하여 서비스 품질을 보장합니다.
      </p>

      <style>{`
        @keyframes moveRightSlow { from { transform: translateX(-50px); } to { transform: translateX(400px); } }
        @keyframes moveRightFast { from { transform: translateX(-50px); } to { transform: translateX(400px); } }
      `}</style>
    </div>
  )
}

// --- Digital Book Pages ---

const pages = [
  // Page 0: Intro
  {
    title: "Intro",
    content: (
      <div className="text-center py-10 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-100 rounded-full">
            <Network className="w-20 h-20 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Cisco ITN Module 1:<br/>
          <span className="text-blue-600">Networking Today</span> 완벽 마스터북
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          이 모듈의 가장 큰 목적은 하나입니다. <br/>
          <strong className="text-gray-800">"현대 사회에서 네트워크는 왜 필수이고, 기본 요소는 무엇이며, 좋은 네트워크의 조건은 무엇인가?"</strong><br/>
          단순히 랜선이나 와이파이를 설명하는 장이 아닙니다. 네트워크를 사회적 연결 수단, 기술 인프라, 미래 직업 분야로까지 넓게 보게 만드는 입문 모듈입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
          <Card className="bg-blue-50 border-blue-100 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> 학습 흐름</h3>
            <ul className="text-sm text-gray-700 space-y-1 ml-6 list-decimal marker:text-blue-500 font-medium">
              <li>네트워크가 삶에 미치는 영향</li>
              <li>네트워크 구성요소와 토폴로지</li>
              <li>네트워크 종류와 인터넷 접속</li>
              <li>신뢰할 수 있는 네트워크 조건</li>
              <li>최신 트렌드와 보안, 그리고 진로</li>
            </ul>
          </Card>
          <Card className="bg-green-50 border-green-100 shadow-sm hover:shadow-md transition flex flex-col justify-center items-center text-center">
             <BookOpen className="w-10 h-10 text-green-600 mb-2"/>
             <p className="text-green-800 font-bold">"개념 → 구성요소 → 구조 → 인터넷 → 품질 → 트렌드 → 보안 → 직업"</p>
             <p className="text-sm text-green-700 mt-2">흐름이 끊기지 않게 완벽히 연결해드립니다.</p>
          </Card>
        </div>
      </div>
    )
  },
  
  // Page 1: 삶과 네트워크
  {
    title: "1. 삶과 네트워크",
    content: (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={Globe} title="Networks Affect Our Lives" subtitle="네트워크는 왜 중요한가?" />
        
        <Quote>
          "오늘날 사람은 공기, 물, 음식, 주거만큼이나 <Highlight>의사소통에 의존</Highlight>하며 네트워크를 통해 이전과 비교할 수 없을 정도로 긴밀하게 연결되어 있다."
        </Quote>
        
        <p className="text-lg text-gray-700 leading-relaxed">
          이 말의 뜻은 단순히 "인터넷 많이 쓴다"가 아닙니다. 현대 사회에서는 <strong>인간 활동의 대부분이 네트워크를 매개로</strong> 일어납니다. 이메일, 화상회의, 온라인 수업, 은행 업무, 쇼핑, 기업 내부 시스템 접근 등 네트워크는 특정 기술 분야가 아니라 <strong>현대 사회 전체의 기본 인프라</strong>입니다.
        </p>

        <Card className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
            <Globe className="text-blue-500 w-6 h-6"/> "No Boundaries" (경계 없는 세상)의 진짜 의미
          </h3>
          <p className="text-gray-600 mb-4">단순한 수사가 아닙니다. 네트워크가 만들어낸 거대한 사회적 변화를 의미합니다.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-blue-600 font-bold text-lg mb-2">1) 공간의 경계를 줄인다</div>
              <p className="text-sm text-gray-700">예전에는 물리적으로 같은 장소에 있어야 가능했던 원격근무, 온라인 강의, 해외 협업이 네트워크를 통해 가능해졌습니다.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-blue-600 font-bold text-lg mb-2">2) 공동체의 범위를 넓힌다</div>
              <p className="text-sm text-gray-700">공동체가 더 이상 지역 중심이 아닙니다. 관심사, 직업, 프로젝트 기반으로 전 세계적 연결이 가능합니다.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-blue-600 font-bold text-lg mb-2">3) 인간 네트워크의 기술 매개</div>
              <p className="text-sm text-gray-700">사람과 사람의 관계가 직접 접촉만으로 이루어지는 것이 아니라 플랫폼과 통신망을 통해 유지되고 확장됩니다.</p>
            </div>
          </div>
          <div className="mt-4 text-center text-blue-800 font-semibold bg-blue-50 py-2 rounded">
            "즉, 네트워크는 단지 기계들을 잇는 것이 아니라 사람, 정보, 서비스, 사회적 활동을 연결하는 구조입니다."
          </div>
        </Card>
      </div>
    )
  },

  // Page 2: 구성요소 1 (Host/Server/Client/P2P)
  {
    title: "2. 구성요소: 종단 장치",
    content: (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={Monitor} title="Network Components: End Devices" subtitle="데이터의 출발점과 도착점" />
        
        <p className="text-lg text-gray-700 mb-6">
          네트워크를 이루는 핵심 세 가지는 <strong>종단 장치(End Devices), 중간 장치(Intermediary Devices), 전송 매체(Network Media)</strong>입니다. 이 장에서는 데이터를 직접 주고받는 주체에 대해 알아봅니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-t-4 border-t-blue-500">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><Smartphone className="w-6 h-6"/> Host와 End Device</h3>
            <p className="text-gray-700 text-sm mb-3">
              네트워크에 연결된 모든 장치를 <strong>호스트(Host)</strong> 또는 <strong>종단 장치(End Device)</strong>라고 합니다.
            </p>
            <p className="text-gray-700 text-sm">
              여기서 <Highlight>"종단(End)"</Highlight>이라는 말이 중요합니다. 데이터는 보통 이 종단에서 시작해서 중간 네트워크를 거쳐 다른 종단에 도착합니다. (예: 스마트폰, 노트북, 프린터, 서버 등)
            </p>
          </Card>

          <Card className="border-t-4 border-t-indigo-500">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><ArrowLeftRight className="w-6 h-6"/> Server & Client</h3>
            <ul className="text-sm text-gray-700 space-y-3">
              <li>
                <strong className="text-indigo-600">서버(Server):</strong> 정보나 서비스를 "제공"하는 장치. (웹 서버, 이메일 서버, 파일 서버)
              </li>
              <li>
                <strong className="text-indigo-600">클라이언트(Client):</strong> 서버에 요청을 보내고 정보를 "받아오는" 장치. (웹 브라우저 등)
              </li>
            </ul>
            <div className="mt-3 bg-indigo-50 p-2 rounded text-indigo-800 font-bold text-center">
              "클라이언트는 요청하고, 서버는 응답한다"
            </div>
          </Card>
        </div>

        <ClientServerAnimation />

        <Card className="bg-slate-50 border-slate-200">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><Users className="w-6 h-6"/> P2P (Peer-to-Peer) 구조</h3>
          <p className="text-gray-700 mb-4 text-sm">
            일반적인 클라이언트-서버 구조와 달리, P2P 구조에서는 하나의 장치가 <strong>클라이언트이면서 동시에 서버 역할</strong>을 수행하여 대등하게 직접 자원을 주고받습니다.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded border border-green-200">
              <span className="font-bold text-green-700">👍 장점:</span> 설정이 쉽고, 구조가 단순하며, 비용이 낮습니다.
            </div>
            <div className="bg-white p-3 rounded border border-red-200">
              <span className="font-bold text-red-700">👎 단점:</span> 중앙 관리가 없고, 보안이 약하며, 확장성과 성능이 떨어집니다. 기업 환경에서는 한계가 명확합니다.
            </div>
          </div>
        </Card>
      </div>
    )
  },

  // Page 3: 구성요소 2 (중간 장치와 매체)
  {
    title: "3. 중간 장치와 매체",
    content: (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={Cpu} title="Intermediary Devices & Media" subtitle="네트워크의 교차로와 도로" />

        <p className="text-lg text-gray-700">
          네트워크를 이해할 때 라우터나 스위치만 생각하기 쉽지만, 이들은 사실 종단 장치끼리의 통신을 돕는 <strong>'중간 전달자'</strong>입니다. 네트워크는 그냥 전기가 흐르는 선이 아니라, 장치들이 규칙에 따라 트래픽을 통제하는 시스템입니다.
        </p>

        <Card>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Network className="text-blue-500 w-6 h-6"/> 중간 장치 (Intermediary Network Devices)
          </h3>
          <p className="text-gray-600 mb-4 text-sm">종단 장치 사이를 이어주며, 데이터 흐름을 관리합니다. (스위치, 라우터, 무선 AP, 방화벽 등)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="border border-blue-100 bg-blue-50 p-3 rounded-lg flex flex-col items-center text-center">
                <Activity className="w-8 h-8 text-blue-500 mb-2"/>
                <strong className="text-blue-800 text-sm">신호 재생 및 재전송</strong>
                <p className="text-xs text-gray-600 mt-1">전송 중 약해진 신호를 다시 정리해 전달</p>
             </div>
             <div className="border border-blue-100 bg-blue-50 p-3 rounded-lg flex flex-col items-center text-center">
                <ArrowLeftRight className="w-8 h-8 text-blue-500 mb-2"/>
                <strong className="text-blue-800 text-sm">경로 정보 유지</strong>
                <p className="text-xs text-gray-600 mt-1">어떤 경로가 최적인지 테이블 유지</p>
             </div>
             <div className="border border-blue-100 bg-blue-50 p-3 rounded-lg flex flex-col items-center text-center">
                <ShieldCheck className="w-8 h-8 text-blue-500 mb-2"/>
                <strong className="text-blue-800 text-sm">오류 알림 및 관리</strong>
                <p className="text-xs text-gray-600 mt-1">통신 실패나 이상 상황 감지 및 대응</p>
             </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Wifi className="text-purple-500 w-6 h-6"/> 네트워크 매체 (Network Media)
          </h3>
          <p className="text-gray-600 mb-4 text-sm">데이터는 추상적 정보지만, 실제로는 <strong>전기, 빛, 전자기파</strong> 형태로 물리적인 세계를 통과합니다. 데이터가 지나가는 길입니다.</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
               <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0"><Zap className="text-yellow-600 w-6 h-6"/></div>
               <div>
                  <strong className="text-gray-800">금속 케이블 (Copper)</strong>
                  <p className="text-sm text-gray-600 mt-1">전기 신호를 사용합니다. 일반적인 구리선 기반 랜(LAN) 케이블이 해당합니다.</p>
               </div>
            </li>
            <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
               <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0"><Activity className="text-cyan-600 w-6 h-6"/></div>
               <div>
                  <strong className="text-gray-800">광섬유 케이블 (Fiber-Optic)</strong>
                  <p className="text-sm text-gray-600 mt-1">빛의 펄스를 사용합니다. 초고속, 장거리 전송에 유리하며 전자기 간섭에 강합니다.</p>
               </div>
            </li>
            <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"><Wifi className="text-purple-600 w-6 h-6"/></div>
               <div>
                  <strong className="text-gray-800">무선 (Wireless)</strong>
                  <p className="text-sm text-gray-600 mt-1">전자기파 주파수 변조를 사용합니다. 와이파이, 셀룰러 망이 해당합니다.</p>
               </div>
            </li>
          </ul>
        </Card>
      </div>
    )
  },

  // Page 4: 네트워크 표현 (토폴로지)
  {
    title: "4. 표현과 토폴로지",
    content: (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={Layout} title="Representations & Topologies" subtitle="복잡한 네트워크를 그리는 방법" />

        <p className="text-lg text-gray-700">
          실제 네트워크는 장비, 포트, 케이블, 주소 체계가 매우 복잡하게 얽혀 있습니다. 이를 체계적으로 이해하고 관리하기 위해 사용하는 도식화 방법이 바로 <strong>토폴로지 다이어그램(Topology Diagram)</strong>입니다.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg flex gap-4 text-sm mb-6">
           <div className="flex-1">
             <strong className="text-gray-800 block mb-1">NIC (Network Interface Card)</strong>
             <span className="text-gray-600">장치가 네트워크에 접속하게 해주는 랜카드나 무선 어댑터</span>
           </div>
           <div className="flex-1">
             <strong className="text-gray-800 block mb-1">Physical Port & Interface</strong>
             <span className="text-gray-600">장비의 실제 연결 포트와 통신을 위한 논리적 접점</span>
           </div>
        </div>

        <Highlight>가장 많이 헷갈리지만 가장 중요한 개념!</Highlight>
        
        {/* Interactive Topology Visualizer replaces static text */}
        <TopologyVisualizer />

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
          <p className="font-bold text-yellow-800 mb-1">핵심 차이 요약</p>
          <p className="text-sm text-yellow-900">
            물리적으로는 A-B-C 순서로 연결되어 있더라도, 논리적으로는 VLAN이나 라우팅 설정에 따라 전혀 다른 구조처럼 동작할 수 있습니다. 
            <br/>따라서 <strong>물리 토폴로지(어디에 있나?)</strong>와 <strong>논리 토폴로지(데이터가 어떻게 흐르나?)</strong> 두 가지 지도가 모두 필요합니다.
          </p>
        </div>
      </div>
    )
  },

  // Page 5: 네트워크 종류
  {
    title: "5. 네트워크의 종류",
    content: (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={Globe} title="Common Types of Networks" subtitle="규모와 소유권에 따른 분류" />

        <p className="text-lg text-gray-700">
          네트워크는 크기와 목적에 따라 다양합니다. 집 안의 작은 네트워크(Small Home)부터 사무실(SOHO), 대기업 네트워크(Medium/Large), 그리고 전 세계적 규모의 인터넷(World Wide)까지 점차 확장됩니다. <strong>규모가 커질수록 설계, 보안, 요구사항이 완전히 달라집니다.</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="border-t-8 border-blue-400">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">LAN <span className="text-sm font-normal text-gray-500">(Local Area Network)</span></h3>
            <p className="font-medium text-gray-800 mb-4">"작은 지리적 범위 안의 한정된 네트워크"</p>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
              <li>예: 집, 학교 건물, 한 회사의 사무실 층</li>
              <li>특징: 제한된 공간</li>
              <li>관리: 하나의 개인이나 조직이 직접 관리</li>
              <li>속도: 내부 장치 간 고속 연결 제공</li>
            </ul>
          </Card>

          <Card className="border-t-8 border-purple-400">
            <h3 className="text-2xl font-bold text-purple-900 mb-2">WAN <span className="text-sm font-normal text-gray-500">(Wide Area Network)</span></h3>
            <p className="font-medium text-gray-800 mb-4">"넓은 지리적 범위를 연결하는 광역 네트워크"</p>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
              <li>예: 도시 간 연결, 국가 간 연결, 서울 본사와 부산 지사 연결</li>
              <li>특징: 멀리 떨어진 <strong>여러 LAN들을 연결</strong>함</li>
              <li>관리: 통신 서비스 제공자(ISP/SP)가 인프라 관리</li>
              <li>속도: 물리적 거리 때문에 상대적으로 LAN보다 느릴 수 있음</li>
            </ul>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mt-6 border-none">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-blue-300">
            <Globe className="w-6 h-6"/> 인터넷의 정체 (The Internet)
          </h3>
          <p className="mb-4">
            인터넷은 하나의 거대한 단일 네트워크가 아닙니다. 전 세계의 LAN과 WAN이 서로 거미줄처럼 연결된 집합체, 즉 <strong>"네트워크들의 네트워크 (Network of networks)"</strong>입니다.
          </p>
          <div className="bg-slate-700/50 p-3 rounded-lg text-sm text-slate-300 border border-slate-600">
            특정 개인이나 단체가 전체 인터넷을 소유하지 않습니다. 대신 질서 유지를 위해 IETF, ICANN, IAB 같은 여러 표준/조정 조직이 존재하여 규칙을 만듭니다.
          </div>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
           <div className="flex-1 bg-green-50 p-4 rounded-lg border border-green-200">
             <h4 className="font-bold text-green-800 mb-1">인트라넷 (Intranet)</h4>
             <p className="text-sm text-green-900"><strong>조직 내부 사람만</strong> 접근 가능한 사설 네트워크. (예: 사내 인사시스템, 내부 문서 서버)</p>
           </div>
           <div className="flex-1 bg-orange-50 p-4 rounded-lg border border-orange-200">
             <h4 className="font-bold text-orange-800 mb-1">엑스트라넷 (Extranet)</h4>
             <p className="text-sm text-orange-900"><strong>외부 협력자에게도</strong> 제한적으로 접근을 허용하는 망. (예: 협력업체 포털, 파트너 전용 시스템)</p>
           </div>
        </div>
      </div>
    )
  },

  // Page 6: 접속과 융합
  {
    title: "6. 접속과 융합 네트워크",
    content: (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={Wifi} title="Connections & Convergence" subtitle="인터넷에 연결하는 방식" />

        <p className="text-lg text-gray-700 mb-6">
          인터넷은 한 가지 방식으로 연결되지 않습니다. 일반 가정(Home)과 기업(Business)은 요구하는 성능과 안정성이 다르기 때문에 다양한 기술을 사용합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-3 font-bold text-gray-800 border-b">🏠 가정/소규모 환경 접속</div>
            <ul className="p-4 space-y-3 text-sm text-gray-700">
              <li><strong className="text-blue-600">Cable:</strong> 케이블 TV 사업자의 광대역 회선 (대역폭 높음)</li>
              <li><strong className="text-blue-600">DSL:</strong> 기존 전화선을 활용한 광대역 연결</li>
              <li><strong className="text-blue-600">Cellular:</strong> 스마트폰과 동일한 이동통신망(데이터망) 활용</li>
              <li><strong className="text-blue-600">Satellite:</strong> 농어촌/오지에서 유용한 위성 인터넷</li>
              <li><strong className="text-gray-400">Dial-up:</strong> 과거 모뎀 저속 연결 (현재 거의 안 씀)</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden border-t-4 border-t-indigo-600">
            <div className="bg-indigo-50 p-3 font-bold text-indigo-900 border-b border-indigo-100">🏢 기업 환경 접속</div>
            <ul className="p-4 space-y-3 text-sm text-gray-700">
              <li><Highlight>기업은 단순 연결보다 '보장된 성능과 안정성'이 핵심</Highlight></li>
              <li><strong className="text-indigo-600">Dedicated Leased Line:</strong> 사업자 망 내 예약된 전용 회선 (보안/안정성 최상)</li>
              <li><strong className="text-indigo-600">Ethernet WAN:</strong> LAN 기술인 이더넷을 WAN 광역까지 확장</li>
              <li><strong className="text-indigo-600">Business DSL (SDSL):</strong> 대칭형 대역폭을 제공하는 기업 전용 DSL</li>
            </ul>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <Network className="w-6 h-6"/> Converged Network (융합 네트워크)
          </h3>
          <p className="text-gray-800 font-medium mb-3 text-sm">
            과거에는 전화(음성망), 케이블TV(영상망), 컴퓨터(데이터망) 인프라가 각각 <strong>따로 존재</strong>했습니다.
          </p>
          <p className="text-indigo-800 font-bold mb-4">
            하지만 현대 네트워크는 단 하나의 공통 인프라(IP망) 위에 <span className="bg-indigo-200 px-1 rounded">데이터, 음성(VoIP), 영상</span> 트래픽을 모두 실어 나릅니다. 이것이 '융합 네트워크'입니다.
          </p>
          <div className="flex gap-2 text-xs font-bold text-white justify-center mb-2">
             <div className="bg-blue-500 px-4 py-2 rounded-l-full shadow">데이터 (PC)</div>
             <div className="bg-indigo-500 px-4 py-2 shadow">음성 (IP전화)</div>
             <div className="bg-purple-500 px-4 py-2 rounded-r-full shadow">영상 (화상회의)</div>
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            ▶ <strong>장점:</strong> 하나의 동일한 표준 기반. 배선 단순화, 운영/유지보수 비용 대폭 절감!
          </div>
        </Card>
      </div>
    )
  },

  // Page 7: 신뢰할 수 있는 네트워크
  {
    title: "7. 신뢰할 수 있는 네트워크",
    content: (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={ShieldCheck} title="Reliable Networks" subtitle="좋은 네트워크의 4가지 필수 조건" />

        <p className="text-lg text-gray-700 mb-4">
          네트워크는 단순히 연결만 된다고 끝나는 것이 아닙니다. 끊김 없고 안전한 <strong>"신뢰할 수 있는 네트워크(Reliable Network)"</strong>를 구축하기 위해 설계 시 반드시 고려해야 할 4가지 핵심 기준이 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:-translate-y-1 transition-transform border-l-4 border-l-red-500">
            <h4 className="text-lg font-bold text-red-800 mb-2 flex items-center gap-2"><Activity className="w-5 h-5"/> 1. Fault Tolerance (장애 허용성)</h4>
            <p className="text-sm text-gray-700">
              일부 장비가 고장나거나 링크가 끊겨도 전체 서비스가 무너지지 않는 능력입니다. 핵심은 실패 영향을 제한하고 우회할 수 있는 <strong>중복 경로(Redundancy)</strong>를 설계하는 것입니다. (패킷 스위칭 기술이 이를 뒷받침합니다)
            </p>
          </Card>

          <Card className="hover:-translate-y-1 transition-transform border-l-4 border-l-blue-500">
            <h4 className="text-lg font-bold text-blue-800 mb-2 flex items-center gap-2"><ArrowLeftRight className="w-5 h-5"/> 2. Scalability (확장성)</h4>
            <p className="text-sm text-gray-700">
              새로운 사용자와 서비스가 추가되어도 기존 성능을 해치지 않고 쉽게 크기를 키울 수 있는 능력입니다. <strong>"표준과 프로토콜"</strong>을 잘 따라 질서 있게 설계해야 벤더 종속 없이 확장이 가능합니다.
            </p>
          </Card>
        </div>

        {/* QoS Interactive replaces static text */}
        <QoSVisualizer />

        <Card className="border-l-4 border-l-emerald-500 mt-4 bg-emerald-50">
           <h4 className="text-lg font-bold text-emerald-800 mb-3 flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> 4. Security (보안)</h4>
           <p className="text-sm text-gray-700 mb-3">
             빠른 것만큼 안전해야 합니다. 장비 자체를 지키는 '인프라 보안'과 데이터를 지키는 '정보 보안'을 모두 포함합니다. 정보 보안의 3대 목표(CIA Triad)는 다음과 같습니다.
           </p>
           <div className="flex justify-between gap-2 text-sm">
             <div className="flex-1 bg-white p-2 border rounded shadow-sm text-center">
               <strong className="text-emerald-700 block">기밀성 (Confidentiality)</strong>
               <span className="text-xs text-gray-500">"남이 보면 안 됨"<br/>(허가된 사람만 열람)</span>
             </div>
             <div className="flex-1 bg-white p-2 border rounded shadow-sm text-center">
               <strong className="text-emerald-700 block">무결성 (Integrity)</strong>
               <span className="text-xs text-gray-500">"중간에 바뀌면 안 됨"<br/>(전송 중 변조 방지)</span>
             </div>
             <div className="flex-1 bg-white p-2 border rounded shadow-sm text-center">
               <strong className="text-emerald-700 block">가용성 (Availability)</strong>
               <span className="text-xs text-gray-500">"필요할 때 써야 함"<br/>(항상 접근 가능 보장)</span>
             </div>
           </div>
        </Card>
      </div>
    )
  },

  // Page 8: 최신 트렌드
  {
    title: "8. 네트워크 최신 동향",
    content: (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={Zap} title="Network Trends" subtitle="네트워크는 어떻게 진화하는가" />

        <p className="text-lg text-gray-700 mb-6">
          네트워크는 단순 연결 기술을 넘어 현대 생활과 산업 변화의 핵심 동력이 되었습니다. 다음 4가지 흐름이 현재의 네트워크 환경을 주도합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h4 className="font-bold text-xl text-blue-900 mb-2 flex items-center gap-2"><Smartphone className="w-5 h-5"/> BYOD (Bring Your Own Device)</h4>
            <p className="text-sm text-gray-700 mb-3">
              직원이나 학생이 <strong>개인 장비(스마트폰, 노트북)</strong>를 업무 환경에 가져와 사용하는 현상입니다.
            </p>
            <div className="bg-gray-100 p-2 rounded text-xs text-gray-600">
              <strong>현향:</strong> 자유도와 유연성은 높아지지만, 소유권이 조직에 없고 장비가 다양해 <strong>보안 및 관리 난이도가 크게 상승</strong>합니다.
            </div>
          </Card>

          <Card>
            <h4 className="font-bold text-xl text-blue-900 mb-2 flex items-center gap-2"><Users className="w-5 h-5"/> Online Collaboration</h4>
            <p className="text-sm text-gray-700 mb-3">
              네트워크가 단순 정보 검색을 넘어 화상회의, 문서 공유 등 <strong>집단 지능이 작동하는 실시간 협업 공간</strong>으로 변모했습니다.
            </p>
            <div className="bg-gray-100 p-2 rounded text-xs text-gray-600">
              물리적 거리를 극복하고 의사결정 속도와 프로젝트 효율을 높입니다. (비디오 커뮤니케이션의 중요성 증가)
            </div>
          </Card>

          <Card className="col-span-1 md:col-span-2 bg-slate-50 border-slate-200">
            <h4 className="font-bold text-xl text-blue-900 mb-2 flex items-center gap-2"><Cloud className="w-5 h-5"/> Cloud Computing</h4>
            <p className="text-sm text-gray-700 mb-4">
              데이터 저장뿐만 아니라, 애플리케이션과 컴퓨팅 자원 자체를 인터넷을 통해 빌려 쓰는 방식입니다. 인프라를 직접 구축할 필요가 없어졌습니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-white p-2 border rounded"><strong className="block text-indigo-700">Public</strong>대중에게 제공 (AWS, Azure)</div>
              <div className="bg-white p-2 border rounded"><strong className="block text-indigo-700">Private</strong>특정 조직만 전용 사용</div>
              <div className="bg-white p-2 border rounded"><strong className="block text-indigo-700">Hybrid</strong>Public + Private 결합</div>
              <div className="bg-white p-2 border rounded"><strong className="block text-indigo-700">Custom</strong>특정 산업(의료 등) 맞춤</div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
           <div className="flex-1 bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
              <h5 className="font-bold text-yellow-800 text-sm mb-1">스마트 홈 (Smart Home)</h5>
              <p className="text-xs text-yellow-900">가전과 생활 공간 전체가 통합 제어 네트워크에 편입. (자동화+연결)</p>
           </div>
           <div className="flex-1 bg-orange-50 p-4 border border-orange-200 rounded-lg">
              <h5 className="font-bold text-orange-800 text-sm mb-1">전력선 네트워킹 (Powerline)</h5>
              <p className="text-xs text-orange-900">기존 전기 콘센트와 전선을 통신 경로로 재활용. 음영지역 해결.</p>
           </div>
           <div className="flex-1 bg-green-50 p-4 border border-green-200 rounded-lg">
              <h5 className="font-bold text-green-800 text-sm mb-1">무선 광대역 (Wireless Broadband)</h5>
              <p className="text-xs text-green-900">유선 인프라가 없는 지역의 정보 격차를 줄이는 WISP/셀룰러 기술.</p>
           </div>
        </div>
      </div>
    )
  },

  // Page 9: 네트워크 보안
  {
    title: "9. 네트워크 보안",
    content: (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={Lock} title="Network Security" subtitle="위협은 안과 밖 모두에 존재한다" />

        <Quote>
          "네트워크 규모와 상관없이 보안은 필수다. 보안은 단일 도구가 아닌 <Highlight>다층 방어(Multiple Layers)</Highlight>가 필요하다."
        </Quote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Card className="border-t-4 border-red-500 bg-red-50/30">
            <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2"><Lock className="w-5 h-5"/> 외부 위협 (External Threats)</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
              <li>바이러스, 웜, 트로이목마, 스파이웨어</li>
              <li>제로데이(Zero-day) 공격</li>
              <li>해커 등 공격자 기반 침입</li>
              <li>서비스 거부 공격 (DoS / DDoS)</li>
              <li>데이터 가로채기 및 신원 도용</li>
            </ul>
          </Card>

          <Card className="border-t-4 border-orange-500 bg-orange-50/30">
            <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2"><Users className="w-5 h-5"/> 내부 위협 (Internal Threats)</h4>
            <p className="text-sm font-semibold text-orange-900 mb-2">보안은 해커만의 문제가 아닙니다!</p>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
              <li>직원의 실수 (의도치 않은 데이터 유출/설정 오류)</li>
              <li>악의적인 내부자 (권한 남용)</li>
              <li>BYOD 장비의 분실 또는 도난</li>
            </ul>
          </Card>
        </div>

        <Card className="mt-6">
          <h4 className="font-bold text-gray-800 mb-4">기업망을 지키는 다층 보안 솔루션 (Security Solutions)</h4>
          <div className="flex flex-wrap gap-3">
             <div className="bg-slate-100 p-3 rounded flex-1 min-w-[150px]">
               <strong className="text-sm text-slate-800 block">Antivirus & Antispyware</strong>
               <span className="text-xs text-gray-600">종단 장치(호스트) 보호</span>
             </div>
             <div className="bg-slate-100 p-3 rounded flex-1 min-w-[150px]">
               <strong className="text-sm text-slate-800 block">Firewall (방화벽)</strong>
               <span className="text-xs text-gray-600">내/외부 간 허가되지 않은 접근 차단</span>
             </div>
             <div className="bg-slate-100 p-3 rounded flex-1 min-w-[150px]">
               <strong className="text-sm text-slate-800 block">ACL (접근 제어 목록)</strong>
               <span className="text-xs text-gray-600">누가/무엇을 허용할지 세부 규칙 설정</span>
             </div>
             <div className="bg-slate-100 p-3 rounded flex-1 min-w-[150px]">
               <strong className="text-sm text-slate-800 block">IPS (침입 방지 시스템)</strong>
               <span className="text-xs text-gray-600">실시간 침입 시도 탐지 및 자동차단</span>
             </div>
             <div className="bg-slate-100 p-3 rounded flex-1 min-w-[150px]">
               <strong className="text-sm text-slate-800 block">VPN (가상 사설망)</strong>
               <span className="text-xs text-gray-600">공용망에서도 안전한 사설 암호화 통신</span>
             </div>
          </div>
          <p className="text-sm text-center text-gray-500 mt-4 italic">
            "네트워크 보안 학습은 인프라(스위칭/라우팅) 트래픽 흐름에 대한 명확한 이해에서 시작됩니다."
          </p>
        </Card>
      </div>
    )
  },

  // Page 10: 전문가 & 핵심 요약
  {
    title: "10. 직무 & 최종 요약",
    content: (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={CheckCircle2} title="The IT Professional & Summary" subtitle="이론에서 현장으로" />

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">CCNA와 네트워크 전문가의 길</h3>
            <p className="text-sm text-blue-100 mb-4 leading-relaxed">
              이 모듈의 끝이 직업 이야기인 이유는 이 모든 지식이 산업 현장에서 당장 쓰이기 때문입니다. 현대 네트워크 엔지니어는 단순 케이블 연결자가 아닙니다.
            </p>
            <div className="bg-blue-700/50 p-3 rounded text-sm font-semibold mb-3">
              요구 역량: IP 기초 + 보안 + 무선 + 클라우드 가상화 + 자동화(DevNet)
            </div>
            <p className="text-xs text-blue-200">
              가능한 진로: 네트워크/클라우드 엔지니어, 보안 관리자, NOC 운영, 기술 지원
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
          <h3 className="text-2xl font-black text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 inline-block">절대 잊지 말아야 할 10가지 핵심 포인트</h3>
          <ul className="space-y-3 text-sm text-gray-700 font-medium">
            <li className="flex gap-2"><span className="text-blue-500 font-bold">1.</span> Host(장치), Server(제공), Client(요청)의 역할 구분</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold">2.</span> End Device(시작/끝점) vs Intermediary Device(전달/관리)</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold">3.</span> 매체 3대장: 구리선(전기), 광섬유(빛), 무선(전자기파)</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold">4.</span> Physical(실제 배치) vs Logical(데이터/IP 흐름) 토폴로지의 차이</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold">5.</span> LAN(좁은 내부망) vs WAN(넓은 통신망 연결)</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold">6.</span> Intranet(우리끼리) vs Extranet(외부 파트너 일부 허용)</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold">7.</span> Converged Network: 데이터, 음성, 영상을 단일 IP 인프라로 통합</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold">8.</span> Reliable 4요소: Fault Tolerance, Scalability, QoS, Security</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold">9.</span> 보안 3요소(CIA): 기밀성, 무결성, 가용성</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold">10.</span> 트렌드: BYOD, 클라우드, 협업툴, 스마트홈이 네트워크를 복잡하게 만듦</li>
          </ul>
        </div>

        <Card className="bg-slate-900 text-slate-100 border-none">
          <h4 className="text-lg font-bold text-yellow-400 mb-3">한 문단 압축 요약</h4>
          <p className="text-sm leading-loose text-slate-300">
            이 모듈은 현대 네트워크가 인간 삶을 연결하는 핵심 <strong>인프라</strong>라는 점에서 출발하여, 데이터의 <strong>종단 장치</strong>와 <strong>중간 장치, 매체</strong>를 배우고, 이를 <strong>물리적/논리적 토폴로지</strong>로 그리는 법을 익힙니다. 이어서 <strong>LAN, WAN, 인터넷</strong> 등 규모별 차이와 접속 기술, 음성/영상을 합친 <strong>융합 네트워크</strong>를 이해합니다. 궁극적으로 <strong>장애허용성, 확장성, QoS, 보안(내/외부)</strong>을 갖춘 <strong>신뢰할 수 있는 네트워크</strong>를 설계해야 하며, 클라우드와 BYOD 같은 현대 <strong>트렌드</strong>를 수용하는 능력이 곧 네트워크 전문가(IT Professional)의 길임을 보여주는 완벽한 입문 지도입니다.
          </p>
        </Card>
      </div>
    )
  }
];


export default function CiscoModule1Book() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <h1 className="font-bold text-lg md:text-xl hidden sm:block">Interactive ITN Masterbook</h1>
          </div>
          <div className="text-sm font-medium text-slate-300">
            Chapter {currentPage === 0 ? 'Intro' : currentPage} / {pages.length - 1}
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-6 p-4 my-4">
        
        {/* Sidebar TOC (Desktop) */}
        <aside className="hidden md:block w-64 shrink-0 bg-white rounded-xl shadow-sm border p-4 self-start sticky top-24">
          <h3 className="font-bold text-gray-800 mb-4 px-2 border-b pb-2">목차 (Table of Contents)</h3>
          <nav className="space-y-1">
            {pages.map((page, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === idx 
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-500' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                }`}
              >
                {page.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-xl shadow-sm border p-6 md:p-10 min-h-[60vh] flex flex-col">
          
          <div className="flex-1">
            {pages[currentPage].content}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition ${
                currentPage === 0 ? 'opacity-0 pointer-events-none' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-5 h-5" /> 이전 장
            </button>
            
            <div className="text-sm text-gray-400 md:hidden">
              {currentPage} / {pages.length - 1}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition ${
                currentPage === pages.length - 1 ? 'opacity-0 pointer-events-none' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              다음 장 <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
      
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}