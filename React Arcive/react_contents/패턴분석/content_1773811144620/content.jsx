import React, { useState, useEffect } from 'react';
import { 
  BookOpen, ChevronRight, ChevronLeft, Menu, X, 
  Target, Lightbulb, AlertTriangle, CheckCircle2, 
  BrainCircuit, BarChart2, PieChart, Scale, Quote
} from 'lucide-react';

// --- Reusable Components ---

const MathBlock = ({ children }) => (
  <div className="bg-slate-800 text-slate-100 p-4 my-6 rounded-lg font-mono text-center text-lg md:text-xl overflow-x-auto shadow-inner">
    {children}
  </div>
);

const InlineMath = ({ children }) => (
  <span className="font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-sm md:text-base">
    {children}
  </span>
);

const Callout = ({ title, children, type = 'info', icon: Icon }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-orange-50 border-orange-200 text-orange-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    idea: 'bg-amber-50 border-amber-200 text-amber-900',
  };

  const iconColors = {
    info: 'text-blue-500',
    warning: 'text-orange-500',
    success: 'text-emerald-500',
    idea: 'text-amber-500',
  };

  return (
    <div className={`border rounded-xl p-5 my-6 ${styles[type]} shadow-sm`}>
      {title && (
        <div className="flex items-center gap-2 mb-3 font-bold text-lg">
          {Icon && <Icon className={`w-6 h-6 ${iconColors[type]}`} />}
          {title}
        </div>
      )}
      <div className="space-y-2 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

const SectionTitle = ({ children, icon: Icon }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-12 mb-6 flex items-center gap-3 border-b pb-4">
    {Icon && <Icon className="w-8 h-8 text-indigo-600" />}
    {children}
  </h2>
);

const SubTitle = ({ children }) => (
  <h3 className="text-xl md:text-2xl font-bold text-slate-700 mt-8 mb-4">
    {children}
  </h3>
);

// --- Chapter Content Data ---

const chapters = [
  {
    id: 0,
    title: "책을 열며: 핵심 통찰",
    icon: BookOpen,
    content: () => (
      <div className="animate-fadeIn">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Chapter 0</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-6 leading-tight">
            불확실성 속의 최적 선택
          </h1>
          <p className="text-xl text-slate-600 font-medium">베이지안 결정 이론 완벽 가이드</p>
        </div>

        <Callout type="idea" icon={Quote}>
          <p className="text-xl text-center font-semibold italic">
            "불확실한 정보를 보고 가장 그럴듯한 선택을 하는 수학적 원리"
          </p>
        </Callout>

        <p className="text-lg leading-relaxed text-slate-700 mt-8">
          패턴 인식이나 머신러닝의 분류(Classification) 문제에서, 새로운 입력 데이터 <InlineMath>x</InlineMath>가 들어왔을 때 이것이 어느 부류(Class) <InlineMath>ω_i</InlineMath>에 속하는지 <strong>확률적으로 가장 타당하게 판단하는 방법</strong>이 바로 <strong>베이지안 결정 이론(Bayesian Decision Theory)</strong>입니다.
        </p>
        <p className="text-lg leading-relaxed text-slate-700 mt-4">
          이 디지털 북에서는 왜 이 개념이 필요한지부터 시작하여, 어떤 확률들이 등장하는지, 분류기를 어떻게 설계하는지, 정규분포와 연결하면 어떤 마법이 일어나는지, 그리고 이 이론의 장단점은 무엇인지 물 흐르듯 자연스러운 논리 전개로 설명해 드립니다. 단 하나의 내용도 놓치지 않고 완벽하게 체화해 보세요.
        </p>
      </div>
    )
  },
  {
    id: 1,
    title: "Part 1. 문제의 인식과 확률",
    icon: Target,
    content: () => (
      <div className="animate-fadeIn">
        <SectionTitle icon={BrainCircuit}>1. 인간의 직관을 컴퓨터의 언어로</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          우리는 현실에서 늘 불확실한 판단을 내립니다.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg text-slate-700 mb-6 bg-slate-50 p-6 rounded-lg border border-slate-100">
          <li>"이 목소리가 배철수인지 배칠수인지 애매하다."</li>
          <li>"저 멀리 보이는 표지판이 전주인지 진주인지 헷갈린다."</li>
          <li>"종이에 적힌 손글씨 숫자가 3인지 8인지 분명하지 않다."</li>
        </ul>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          사람은 이런 불확실한 상황에 직면했을 때, 무의식적으로 <strong>"더 그럴듯한 쪽"</strong>을 고릅니다. 베이지안 결정 이론은 바로 이 인간의 직관을 컴퓨터가 계산할 수 있는 엄밀한 수학적 형태로 바꾼 것입니다.
        </p>
        
        <Callout type="info" title="핵심 질문" icon={Target}>
          <p className="text-lg"><strong>"관측된 데이터 <InlineMath>x</InlineMath>가 있을 때, 이것이 어떤 부류 <InlineMath>ω_i</InlineMath>에서 왔을 가능성이 가장 큰가?"</strong></p>
        </Callout>

        <p className="text-lg leading-relaxed text-slate-700 mt-6 mb-4">
          이 가능성을 수치로 나타내는 대표적인 값이 바로 <strong>사후확률(Posterior Probability)</strong>입니다.
        </p>
        <MathBlock>P(ω_i | x)</MathBlock>
        <p className="text-lg text-center text-slate-600 mb-8">
          뜻: "데이터 <InlineMath>x</InlineMath>가 주어졌을 때, 그것이 부류 <InlineMath>ω_i</InlineMath>에 속할 확률"
        </p>

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-12">
          <h4 className="font-bold text-lg text-indigo-900 mb-2">최종 목표는 아주 단순하고 명쾌합니다.</h4>
          <ol className="list-decimal pl-5 space-y-1 text-indigo-800 font-medium">
            <li>입력을 본다.</li>
            <li>각 부류에 속할 확률을 계산한다.</li>
            <li>확률이 가장 큰 쪽으로 분류한다.</li>
          </ol>
        </div>

        <SectionTitle icon={BarChart2}>2. 먼저 왜 '확률 기초'가 필요한가?</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          베이지안 결정 이론은 이름 그대로 '결정(Decision)'에 관한 이론이지만, 그 결정의 유일한 근거는 <strong>'확률(Probability)'</strong>입니다. 따라서 확률의 기본 개념을 탄탄히 다져야만 뒤이어 등장하는 개념들을 완벽히 이해할 수 있습니다.
        </p>

        <SubTitle>2-1. 이산 확률과 연속 확률의 차이</SubTitle>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h4 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div> 이산 확률변수
            </h4>
            <p className="text-slate-600">주사위를 던졌을 때 나오는 값은 1, 2, 3, 4, 5, 6처럼 명확히 '셀 수 있는' 값입니다. 이를 이산값이라고 합니다.</p>
            <div className="mt-4 font-mono text-sm bg-slate-100 p-2 rounded text-center">P(X=3) = 1/6</div>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h4 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div> 연속 확률변수
            </h4>
            <p className="text-slate-600">사람의 키처럼 170.1cm, 170.123cm처럼 중간값이 무한히 존재합니다. 특정 점의 확률은 0에 가까우며 '구간에 대한 확률'을 다루기 위해 확률 밀도 함수(PDF) <InlineMath>p(x)</InlineMath>를 씁니다.</p>
          </div>
        </div>
        <p className="text-slate-600 italic text-center mb-8">
          * 수식을 전개할 때, 이산형은 대문자 <InlineMath>P(·)</InlineMath>를, 연속형은 소문자 밀도 함수 <InlineMath>p(·)</InlineMath>를 쓴다는 점을 기억하세요.
        </p>

        <SubTitle>2-2. 패턴인식에서 데이터 x란 무엇인가?</SubTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          패턴인식에서 입력 데이터 <InlineMath>x</InlineMath>는 단순한 숫자 하나가 아니라, 여러 특징(Feature)이 결합된 <strong>벡터(Vector)</strong>입니다.
          숫자 이미지를 예로 들면, 가로 비율, 세로 비율, 획의 밀도, 곡률 등 다양한 특징이 추출됩니다. 
          이때 개별 특징 하나하나는 랜덤 변수(Random Variable)가 되고, 이들을 한데 모은 <InlineMath>x</InlineMath>는 <strong>랜덤 벡터(Random Vector)</strong>가 됩니다. 결국 패턴인식은 특징 벡터 <InlineMath>x</InlineMath>가 가진 확률적 성질을 다차원 공간에서 분석하여 분류하는 문제입니다.
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: "Part 2. 베이지안 이론의 3대장",
    icon: PieChart,
    content: () => (
      <div className="animate-fadeIn">
        <SectionTitle icon={PieChart}>3. 세 가지 확률의 완벽한 이해</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-8">
          이 장에서 가장 중요한 핵심 파트입니다. 베이지안 결정 이론은 다음 세 가지 확률을 유기적으로 연결하는 이론입니다. 이 셋의 차이를 정확히 체화하면 이 이론의 절반을 마스터한 셈입니다.
        </p>

        <Callout type="idea" title="직관적 비유: 상자와 공 예제" icon={Lightbulb}>
          <p>이 개념들은 유명한 '상자 A, B와 공 색깔 예제'를 통해 가장 쉽게 이해할 수 있습니다.</p>
          <ol className="list-decimal pl-5 mt-3 space-y-1 font-medium">
            <li>먼저 상자 A 또는 B 중 하나를 선택한다.</li>
            <li>그 상자 안에서 보이지 않게 공을 하나 뽑는다.</li>
            <li>뽑힌 공의 색깔(예: 하양)을 확인한다.</li>
            <li>그 색깔을 단서로 삼아, 이 공이 <strong>어느 상자에서 나왔는지 추론</strong>한다.</li>
          </ol>
          <div className="mt-4 pt-4 border-t border-amber-200 grid grid-cols-3 gap-4 text-center">
            <div><span className="block text-xs uppercase text-amber-700">상자</span><span className="font-bold">부류 (<InlineMath>ω_i</InlineMath>)</span></div>
            <div><span className="block text-xs uppercase text-amber-700">공의 색</span><span className="font-bold">데이터 (<InlineMath>x</InlineMath>)</span></div>
            <div><span className="block text-xs uppercase text-amber-700">맞히는 일</span><span className="font-bold">분류</span></div>
          </div>
        </Callout>

        <div className="space-y-6 mt-10">
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <h4 className="text-xl font-bold text-slate-800 mb-2">사전확률 (Prior Probability, <InlineMath>P(ω_i)</InlineMath>)</h4>
            <p className="text-lg text-slate-700">
              관측 데이터(공)를 <strong>보기 전부터 이미 알고 있는 확률</strong>입니다.<br/>
              예를 들어 <InlineMath>P(A)=0.7</InlineMath>, <InlineMath>P(B)=0.3</InlineMath>이라면, 공을 보기도 전에 이미 상자 A가 선택될 가능성이 더 높다는 뜻입니다. 쉽게 말해 "아무런 단서가 없을 때, 기본적으로 얼마나 자주 등장하는가?"를 나타냅니다. (예: 정상 데이터 95%, 이상 데이터 5%)
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-6 py-2">
            <h4 className="text-xl font-bold text-slate-800 mb-2">우도 (Likelihood, <InlineMath>p(x | ω_i)</InlineMath>)</h4>
            <p className="text-lg text-slate-700">
              <strong>특정 부류라고 가정했을 때, 현재 관측된 데이터가 나올 확률</strong>입니다.<br/>
              예를 들어 <InlineMath>P(하양 | A)</InlineMath>는 "상자 A가 선택되었다고 '가정'할 때, 그 안에서 하얀 공이 나올 확률"입니다. 패턴인식 관점에서는 "부류 <InlineMath>ω_i</InlineMath>라고 가정할 때, 현재 입력 데이터 <InlineMath>x</InlineMath>가 얼마나 잘 설명되는가?"를 측정합니다.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-6 py-2">
            <h4 className="text-xl font-bold text-slate-800 mb-2">사후확률 (Posterior Probability, <InlineMath>P(ω_i | x)</InlineMath>)</h4>
            <p className="text-lg text-slate-700">
              데이터를 <strong>실제로 관측한 뒤에 업데이트된 최종 확률</strong>입니다.<br/>
              분류 문제의 궁극적인 목적이 "이 데이터가 어느 부류인가?"를 판단하는 것이므로, 사후확률이야말로 우리가 간절히 구하고자 하는 최종 결과값입니다.
            </p>
          </div>
        </div>

        <SectionTitle icon={AlertTriangle}>4. 왜 하나만 보면 안 되는가? (논리의 함정)</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          상자 문제에서 '하얀 공'이 나왔다고 가정해 봅시다. 이제 묻습니다. <em>"이 공은 A와 B 중 어디서 나왔을까?"</em>
        </p>

        <div className="space-y-4 mb-8">
          <Callout type="warning" title="❌ 잘못된 생각 1: 우도만 비교하기" icon={AlertTriangle}>
            <p>만약 <InlineMath>P(하양 | B) &gt; P(하양 | A)</InlineMath> 라고 해서 무조건 B에서 나왔다고 단정할 수 없습니다. 상자 B가 선택될 확률(<InlineMath>P(B)</InlineMath>)이 극단적으로 낮다면 실제로는 A에서 뽑혔을 가능성이 큽니다. 즉, <strong>우도만 보면 기존의 배경지식(사전 정보)이 무시됩니다.</strong></p>
          </Callout>
          
          <Callout type="warning" title="❌ 잘못된 생각 2: 사전확률만 비교하기" icon={AlertTriangle}>
            <p>반대로 <InlineMath>P(A) &gt; P(B)</InlineMath> 라는 이유만으로 무조건 A라고 판단하는 것도 어리석습니다. 눈앞의 공이 상자 B에서만 압도적으로 많이 나오는 특이한 색상일 수 있기 때문입니다. 즉, <strong>사전확률만 보면 현재 눈앞의 데이터 증거가 무시됩니다.</strong></p>
          </Callout>

          <Callout type="success" title="✅ 올바른 생각: 둘 다 반영해야 한다" icon={CheckCircle2}>
            <p>정답은 데이터 시청 후의 최종 확률, 즉 <InlineMath>P(A | 하양)</InlineMath>과 <InlineMath>P(B | 하양)</InlineMath>을 비교하는 것입니다. 관측 결과를 본 뒤 어느 부류일 가능성이 큰지 비교해야 하며, 이를 계산하게 해주는 마법의 공식이 바로 <strong>'베이즈 정리'</strong>입니다.</p>
          </Callout>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Part 3. 수학적 결합과 데이터",
    icon: Scale,
    content: () => (
      <div className="animate-fadeIn">
        <SectionTitle icon={Scale}>5. 베이즈 정리 (Bayes' Theorem)의 위대한 역할</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          베이즈 정리는 우리가 직접 구하기 힘든 <strong>'사후확률'</strong>을, 우리가 알거나 추정할 수 있는 <strong>'사전확률'과 '우도'</strong>를 이용해 계산할 수 있도록 변환해 줍니다.
        </p>
        
        <MathBlock>
          P(ω_i | x) = [ p(x | ω_i) × P(ω_i) ] / p(x)
        </MathBlock>

        <ul className="list-none space-y-3 text-lg text-slate-700 mb-8 bg-white p-6 rounded-lg border shadow-sm">
          <li className="flex items-start gap-3">
            <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded w-32 text-center shrink-0">P(ω_i)</span>
            <span>원래 그 부류가 나올 가능성 (사전확률)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-32 text-center shrink-0">p(x | ω_i)</span>
            <span>그 부류일 때 현재 데이터가 나올 가능성 (우도)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded w-32 text-center shrink-0">p(x)</span>
            <span>전체적으로 현재 데이터가 나올 가능성 (증거)</span>
          </li>
        </ul>

        <Callout type="idea" title="이 식이 직관적으로 뜻하는 것" icon={Lightbulb}>
          <p>어떤 부류의 사후확률이 커지려면 두 가지 조건을 만족해야 합니다.</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>원래 자주 등장하는 흔한 부류여야 한다. (사전확률이 큼)</li>
            <li>현재 관측된 데이터의 특성과 아주 잘 맞아야 한다. (우도가 큼)</li>
          </ol>
          <p className="mt-3 font-bold text-amber-900">즉, '흔한 정도'와 '증거와의 부합성'을 동시에 반영하는 것이 베이지안 사고의 정수입니다.</p>
        </Callout>

        <SubTitle>분모 p(x)는 왜 있는가?</SubTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-8">
          분모는 <InlineMath>p(x) = Σ p(x|ω_i)P(ω_i)</InlineMath> 로 계산됩니다. 이는 모든 부류를 다 고려했을 때 "현재 이 데이터 <InlineMath>x</InlineMath>가 세상에 나타날 전체 확률"을 뜻합니다. 실제 분류를 위해 각 부류의 사후확률 크기를 비교할 때 분모는 모든 부류에 대해 동일한 상수로 작용합니다. 따라서 대소 비교만 할 때는 과감히 분모를 생략하고, <strong>분자인 우도 × 사전확률 이 가장 큰 부류를 선택</strong>합니다.
        </p>

        <SectionTitle icon={BarChart2}>6. 확률분포를 표현하기</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          우도의 형태를 알아내기 위해 데이터의 분포 모양을 정의하는 핵심 도구들이 필요합니다.
        </p>
        <div className="grid gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded border-l-4 border-indigo-500">
            <strong>평균 (Mean, <InlineMath>μ</InlineMath>):</strong> 데이터의 중심입니다. 다차원 공간에서는 각 차원의 중심을 모은 '평균 벡터'가 됩니다.
          </div>
          <div className="bg-slate-50 p-4 rounded border-l-4 border-indigo-400">
            <strong>분산 (Variance, <InlineMath>σ²</InlineMath>):</strong> 데이터가 평균을 중심으로 얼마나 흩어져 있는지를 나타내는 퍼짐 정도입니다.
          </div>
          <div className="bg-slate-50 p-4 rounded border-l-4 border-indigo-300">
            <strong>공분산 행렬 (Covariance Matrix, <InlineMath>Σ</InlineMath>):</strong> 특징들이 서로 어떤 관계를 맺고 변하는지(예: 키가 클수록 몸무게도 커짐)를 나타냅니다. 개별 분산은 물론 특징 간의 상관적 움직임까지 한 번에 담아냅니다.
          </div>
        </div>

        <SectionTitle icon={AlertTriangle}>7. 확률분포 추정과 차원의 저주</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          현실에서 분포를 완벽히 아는 경우는 없습니다. 데이터를 통해 추정해야 하는데 여기서 끔찍한 문제가 발생합니다.
        </p>
        
        <SubTitle>7-1. 차원의 저주 (Curse of Dimensionality)</SubTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          특징이 <InlineMath>d</InlineMath>개이고 각 특징을 <InlineMath>k</InlineMath>개 구간으로 나누면 경우의 수는 <InlineMath>k^d</InlineMath> 꼴로 폭발합니다. 차원이 조금만 커져도 분포를 있는 그대로 저장하거나 추정하는 것이 불가능해지는 현상입니다.
        </p>

        <SubTitle>7-2. 해결책: 분포의 모양을 가정한다</SubTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          이 문제를 피하기 위해 현실에서는 분포의 형태를 수학적으로 미리 가정합니다. 가장 대표적인 것이 <strong>정규분포(Gaussian Distribution)</strong>입니다. 정규분포를 가정하면 복잡한 다차원 공간의 확률을 전부 기록할 필요 없이, 오직 평균 <InlineMath>μ</InlineMath>와 공분산 행렬 <InlineMath>Σ</InlineMath>라는 소수의 파라미터만 추정하면 확률분포 전체를 그려낼 수 있습니다.
        </p>
      </div>
    )
  },
  {
    id: 4,
    title: "Part 4. 분류기의 설계와 진화",
    icon: BrainCircuit,
    content: () => (
      <div className="animate-fadeIn">
        <SectionTitle icon={Target}>8. 베이지안 분류기란 무엇인가?</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          분류기를 만든다는 것은 훈련 데이터를 바탕으로 각 부류의 <strong>사전확률</strong>과 <strong>우도의 파라미터(평균, 공분산 등)</strong>를 추정하는 과정입니다. 학습이 끝나면 미지의 데이터 <InlineMath>x</InlineMath>가 입력되었을 때 베이즈 정리를 통해 사후확률을 계산하고 가장 큰 부류로 판정을 내립니다.
        </p>

        <SectionTitle icon={CheckCircle2}>9. 기본형: 최소 오류 베이지안 분류기</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          유일한 목표는 <strong>"전체 오분류 확률(틀리는 횟수)을 최소화하자"</strong>입니다.
        </p>
        
        <Callout type="info" title="결정 규칙">
          <p>분모를 생략하고 다음을 비교합니다:</p>
          <div className="text-center font-mono my-3 bg-white p-2 rounded border">
            p(x | ω_1)P(ω_1)  vs  p(x | ω_2)P(ω_2)
          </div>
          <p>결국 <strong>(우도 × 사전확률)이 더 큰 쪽을 선택</strong>하는 분류기입니다.</p>
        </Callout>

        <p className="text-lg leading-relaxed text-slate-700 mt-6 mb-8">
          <strong>* 특별한 상황:</strong> 사전확률이 완전히 동일하다면 오직 우도(증거)에만 의존합니다. 반대로 희귀 질병처럼 사전확률 차이가 극심하다면 사전확률의 영향력이 절대적이게 됩니다.
        </p>

        <SectionTitle icon={AlertTriangle}>10. 왜 '최소 오류'만으로는 부족한가?</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          단순히 틀린 '횟수'만 줄이는 것은 현실을 담아내지 못합니다. 모든 오류가 똑같이 나쁜 것은 아니기 때문입니다.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg text-slate-700 mb-8 bg-orange-50 p-6 rounded-lg border border-orange-100">
          <li><strong>의료 진단:</strong> 정상인을 환자로 오진하는 것보다 암환자를 정상으로 놓치는 것(생명 위협)이 하늘과 땅 차이로 치명적입니다.</li>
          <li><strong>공장 검출:</strong> 정상 제품을 버리는 손실보다 불량품이 시장에 나가 리콜되는 비용이 훨씬 큽니다.</li>
        </ul>

        <SectionTitle icon={Scale}>11. 심화형: 최소 위험 베이지안 분류기</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          오류의 치명성을 반영하기 위해 <strong>손실 행렬(Loss Matrix)</strong>을 도입합니다. <InlineMath>c_{"{i,j}"}</InlineMath>는 실제 정답이 <InlineMath>ω_i</InlineMath>인데 <InlineMath>ω_j</InlineMath>로 잘못 분류했을 때 발생하는 비용입니다.
        </p>
        <p className="text-lg leading-relaxed text-slate-700 mb-6 font-bold text-indigo-700">
          목표는 '오류율 최소화'가 아니라 '기대 손실 평균(Expected Loss)의 최소화'로 바뀝니다.
        </p>
        <p className="text-lg leading-relaxed text-slate-700 mb-8">
          사실 최소 오류 분류기는 맞으면 손실 0, 틀리면 무조건 손실 1을 부여하는 최소 위험 분류기의 특별한 하위 버전일 뿐입니다.
        </p>

        <SectionTitle icon={PieChart}>12. 우도비 (Likelihood Ratio) 규칙</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          두 부류 문제에서 최소 위험 규칙을 정리하면 보통 우도비 형태가 도출됩니다.
        </p>
        <MathBlock>
          p(x | ω_1) / p(x | ω_2)  &gt;  임계값(Threshold)
        </MathBlock>
        <Callout type="idea">
          <p>우도비란 <strong>"데이터 증거의 상대적 강도"</strong>입니다. 이것이 우리가 감당해야 할 현실적 리스크와 배경지식이 녹아있는 <strong>'임계값'</strong>을 뛰어넘을 때만 특정 결정을 내리게 만드는 아주 합리적인 의사결정 시스템입니다.</p>
        </Callout>

        <SubTitle>13. 현실 문제로의 확장: M개 부류 문제</SubTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          숫자 분류(0~9) 같은 다중 분류에서도 원리는 동일합니다. 모든 부류 각각에 대해 확률(또는 손실)을 전부 계산한 뒤 가장 1등 부류를 최종 승자로 선택하면 됩니다.
        </p>
      </div>
    )
  },
  {
    id: 5,
    title: "Part 5. 단순화와 공간의 분할",
    icon: BarChart2,
    content: () => (
      <div className="animate-fadeIn">
        <SectionTitle icon={BrainCircuit}>14. 분별 함수 (Discriminant Function)</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          본격적인 계산을 위해 도입하는 도구가 분별 함수 <InlineMath>g_i(x)</InlineMath>입니다. 목적은 단 하나, <strong>분류를 단순한 '점수 비교 문제'로 치환</strong>하는 것입니다.
        </p>
        
        <SubTitle>로그(ln)를 쓰는 3가지 결정적 이유</SubTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-4">
          사후확률에 단조 증가 함수인 자연로그를 씌워도 크기 순위는 바뀌지 않습니다.
        </p>
        <ol className="list-decimal pl-6 space-y-3 text-lg text-slate-700 mb-8 bg-slate-50 p-6 rounded-lg border border-slate-100">
          <li><strong>곱셈이 덧셈으로:</strong> 수식 전개가 비약적으로 쉬워집니다.</li>
          <li><strong>수치적 안정성:</strong> 작은 확률값들의 곱으로 인한 언더플로우(Underflow) 에러를 방지합니다.</li>
          <li><strong>정규분포와의 찰떡궁합:</strong> 정규분포 식의 지수함수(<InlineMath>e^...</InlineMath>)가 밖으로 떨어져 나와 식이 극적으로 깔끔해집니다.</li>
        </ol>

        <SectionTitle icon={BarChart2}>15. 정규분포 가정의 마법과 결정 경계</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          정규분포를 가정하면 복잡한 데이터가 소수의 파라미터로 표현될 뿐만 아니라, 부류를 나누는 <strong>'결정 경계(Decision Boundary)'</strong>의 기하학적 모양을 완벽하게 해석할 수 있게 됩니다.
        </p>
        <p className="text-lg leading-relaxed text-slate-700 mb-8">
          결정 경계는 수학적으로 두 부류의 점수가 같아지는 지점(<InlineMath>g_i(x) = g_j(x)</InlineMath>)입니다. 정규분포에 로그를 씌우면 기본적으로 <strong>2차 방정식</strong> 형태가 도출됩니다. 즉, 결정 경계는 곡선이나 곡면을 만들 수 있습니다.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-indigo-200 shadow-sm border-t-4 border-t-indigo-500">
            <h4 className="text-xl font-bold text-slate-800 mb-3">16. 선형 분별 분석 (LDA)</h4>
            <p className="text-slate-700 mb-3">
              만약 모든 부류의 <strong>공분산 행렬이 완벽히 동일하다면 (<InlineMath>Σ_1 = Σ_2</InlineMath>)</strong>, 2차항이 상쇄되어 날아가고 1차식만 남습니다.
            </p>
            <p className="text-slate-700 font-medium">
              👉 퍼짐 모양이 같으므로 중간에 반듯한 <strong>선형(직선/평면) 경계</strong>를 그어 나누는 것이 합리적입니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-pink-200 shadow-sm border-t-4 border-t-pink-500">
            <h4 className="text-xl font-bold text-slate-800 mb-3">17. 2차 분별 분석 (QDA)</h4>
            <p className="text-slate-700 mb-3">
              부류마다 <strong>공분산 행렬이 서로 다르다면 (<InlineMath>Σ_1 ≠ Σ_2</InlineMath>)</strong>, 2차항이 살아남아 2차 곡선형 경계가 됩니다.
            </p>
            <p className="text-slate-700 font-medium">
              👉 분포의 굴곡과 퍼짐 모양이 서로 다르기 때문에 이를 따라 경계면이 유연하게 <strong>곡선</strong>으로 휘어져야 합니다.
            </p>
          </div>
        </div>

        <SectionTitle icon={Target}>18. 최소 거리 분류기와 마할라노비스 거리</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          사전확률과 공분산이 동일한 가장 단순한 조건에서는 베이지안 분류가 단순한 "거리 비교" 문제로 치환됩니다. <em>"누구의 중심에 더 가까운가?"</em>
        </p>

        <Callout type="info" title="마할라노비스 거리 (Mahalanobis Distance)">
          <p>이때 자로 잰 듯한 단순한 유클리드 거리를 쓰지 않습니다. 각 방향으로 데이터가 퍼진 정도(분산)를 고려하는 똑똑한 통계적 거리입니다.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>많이 퍼지는 방향의 차이: 덜 민감하게 반영 (가깝게 침)</li>
            <li>안 퍼지는 방향의 차이: 강하게 패널티 부여 (멀게 계산)</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            * 만약 공분산이 모든 방향으로 동일하게 퍼지는 등방성 구형(<InlineMath>Σ = σ²I</InlineMath>)이라면 이 거리는 우리가 아는 유클리드 거리와 완전히 같아집니다.
          </p>
        </Callout>
      </div>
    )
  },
  {
    id: 6,
    title: "Part 6. 실전 응용과 한계",
    icon: CheckCircle2,
    content: () => (
      <div className="animate-fadeIn">
        <SectionTitle icon={Scale}>19. 베이지안 분류의 장점과 한계</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-8">세상에 완벽한 이론은 없듯 명확한 명암이 존재합니다.</p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h4 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" /> 장점 (왜 위대한가?)
            </h4>
            <ul className="space-y-4 text-emerald-800">
              <li><strong>이론적 최적성:</strong> 확률분포를 완벽히 안다면 가장 낮은 오분류율을 보장하는 최적의 기준점(Gold Standard)입니다.</li>
              <li><strong>확률이라는 유연한 출력:</strong> 단정짓지 않고 "80% 확률" 등 신뢰도를 내어주어 의사결정 시스템에 엄청난 유연성을 제공합니다.</li>
              <li><strong>뛰어난 설명력:</strong> 구성 요소의 통계적 의미가 명확하여 "왜 이런 결과가 나왔는지" 논리적으로 추적하기 좋습니다.</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
            <h4 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> 한계 (왜 현실에서 어려운가?)
            </h4>
            <ul className="space-y-4 text-orange-800">
              <li><strong>분포 추정의 막막함:</strong> 현실 데이터의 진짜 확률분포를 알아내는 것은 불가능에 가깝습니다.</li>
              <li><strong>차원의 저주:</strong> 특징의 차원이 늘어나면 확률분포 학습을 위한 데이터 요구량이 우주적 스케일로 폭발합니다.</li>
              <li><strong>가정의 오류:</strong> 계산을 위해 억지로 가정한 정규분포가 실제 데이터 분포(다중 봉우리 등)와 다를 때 성능 괴리가 발생합니다.</li>
            </ul>
          </div>
        </div>

        <SectionTitle icon={Target}>20. 실용주의의 승리: 나이브 베이즈 분류기 (Naive Bayes)</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          차원의 저주와 계산 복잡성을 타파하기 위해 등장한 실용적 모델입니다. 단 하나의 순진한(Naive) 가정을 던집니다.
        </p>
        <Callout type="idea">
          <p className="text-center font-bold text-xl">"모든 특징(Feature)들이 서로 완벽하게 독립(Independent)이다."</p>
        </Callout>
        <p className="text-lg leading-relaxed text-slate-700 mt-6 mb-4">
          특징이 독립이면 다차원 확률분포를 개별 특징 확률들의 <strong>단순 곱셈</strong>으로 쪼갤 수 있습니다.
        </p>
        <MathBlock>
          p(x | ω_i) = p(x_1 | ω_i) × p(x_2 | ω_i) × ... × p(x_d | ω_i)
        </MathBlock>
        <p className="text-lg leading-relaxed text-slate-700 mb-8">
          계산이 미친 듯이 쉬워져 텍스트 분류 같은 고차원 문제에서 놀라운 속도를 보입니다. 다만 특징 간의 연관성을 무시하므로 가정이 틀렸을 때 성능 하락이 있을 수 있는, 속도를 위해 정교함을 타협한 모델입니다.
        </p>

        <SectionTitle icon={BrainCircuit}>21. 최후의 안전장치: 기각 (Reject) 처리</SectionTitle>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          현실의 민감한 시스템(의료 진단, 자율주행 등)에서는 <strong>"모르겠으면 차라리 대답하지 않는 것"</strong>이 안전합니다.
        </p>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          기각은 사후확률을 활용하는 가장 훌륭한 예입니다. 확률이 0.51 대 0.49처럼 거의 차이가 없다면, 억지로 찍지 않고 판단을 보류(Reject)하여 전문가에게 넘깁니다. 이는 <strong>낮은 신뢰도로 인한 치명적 오판을 막기 위한 최고의 안전장치</strong>입니다.
        </p>
      </div>
    )
  },
  {
    id: 7,
    title: "에필로그 및 핵심 요약",
    icon: BookOpen,
    content: () => (
      <div className="animate-fadeIn">
        <SectionTitle icon={BrainCircuit}>에필로그 1: 하나의 스토리로 꿰뚫기 (9단계)</SectionTitle>
        <div className="space-y-4 mb-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {[
            { t: "불확실한 현실", d: "분류란 애매한 데이터 속에서 가장 그럴듯한 판단을 내리는 일이다." },
            { t: "사후확률의 등장", d: "그 판단 기준은 '데이터를 본 뒤 각 부류일 확률'을 비교하는 것이다." },
            { t: "베이즈 정리", d: "사후확률은 직접 구하기 어려우니 '우도 × 사전확률'로 변환해 계산한다." },
            { t: "최소 오류의 원리", d: "오류 횟수를 줄이려면 무조건 사후확률이 가장 높은 부류를 찍는다." },
            { t: "위험의 반영", d: "암 진단처럼 오류 비용이 다를 때는 손실 비용을 반영한 '최소 위험 분류기'를 쓴다." },
            { t: "분포의 가정", d: "우도를 계산하려면 차원의 저주를 피해 보통 '정규분포'를 가정한다." },
            { t: "경계의 해석", d: "정규분포 가정 시, 공분산이 같으면 직선(LDA), 다르면 곡선(QDA)으로 가른다." },
            { t: "극단적 단순화", d: "계산이 벅차면 특징 독립을 가정한 '나이브 베이즈'로 계산을 확 줄인다." },
            { t: "안전 제일", d: "확률 차이가 작아 확신이 안 서면 기각(Reject)해서 사고를 예방한다." },
          ].map((item, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                {i + 1}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border shadow-sm">
                <h4 className="font-bold text-slate-800 mb-1">{item.t}</h4>
                <p className="text-slate-600 text-sm md:text-base">{item.d}</p>
              </div>
            </div>
          ))}
        </div>

        <SectionTitle icon={Target}>에필로그 2: 1분 리뷰 초압축 6원칙</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            "베이지안 결정 이론은 관측 데이터가 주어질 때 사후확률이 가장 큰 부류를 선택한다.",
            "사후확률은 베이즈 정리로 계산한다: 사후 = (우도 × 사전) / 증거",
            "P(ω_i)는 사전확률, p(x|ω_i)는 우도, P(ω_i|x)는 사후확률이다.",
            "모든 비용이 같으면 최소 오류, 비용이 다르면 최소 위험 분류기를 쓴다.",
            "정규분포 가정 시: 공분산 같으면 LDA(선형), 다르면 QDA(곡선)가 된다.",
            "이론적으로 최적이나, 분포 추정이 어렵고 차원의 저주에 취약하다는 한계가 있다."
          ].map((text, i) => (
            <div key={i} className="flex gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
              <p className="text-slate-700 font-medium">{text}</p>
            </div>
          ))}
        </div>

        <Callout type="idea" icon={Quote}>
          <p className="text-xl text-center font-bold text-slate-800 italic leading-relaxed">
            "베이지안 결정 이론이란 결국,<br/>
            내가 현재 눈으로 확인한 명백한 증거(우도)와<br/>
            세상이 원래 돌아가는 기본 이치(사전확률)를 현명하게 저울질하여,<br/>
            가장 타당하고 후회 없는 결정을 내리는 수학적 지혜입니다."
          </p>
        </Callout>
      </div>
    )
  }
];

// --- Main Application Component ---

export default function App() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeChapter]);

  const CurrentContent = chapters[activeChapter].content;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen w-72 bg-white border-r shadow-xl lg:shadow-none transition-transform duration-300 z-50 overflow-y-auto 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-extrabold text-indigo-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-600"/>
              디지털 북
            </h2>
            <button className="lg:hidden p-1 text-slate-500 hover:bg-slate-100 rounded" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6"/>
            </button>
          </div>

          <nav className="space-y-1">
            {chapters.map((ch, idx) => {
              const Icon = ch.icon;
              const isActive = activeChapter === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChapter(idx);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors duration-200
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="truncate">{ch.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Progress indicator in sidebar bottom */}
        <div className="absolute bottom-0 w-full p-6 bg-slate-50 border-t">
          <div className="text-xs font-bold text-slate-500 uppercase mb-2">Reading Progress</div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${((activeChapter + 1) / chapters.length) * 100}%` }}
            />
          </div>
          <div className="text-right text-xs text-slate-500 mt-1">
            {activeChapter + 1} of {chapters.length}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen max-w-4xl mx-auto w-full">
        
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="font-bold text-slate-800 truncate pr-4">
            {chapters[activeChapter].title}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-6 h-6"/>
          </button>
        </header>

        {/* Article Content */}
        <article className="flex-1 px-6 py-8 md:px-12 md:py-16">
          <CurrentContent />
        </article>

        {/* Bottom Navigation */}
        <div className="border-t bg-white p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <button
            onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
            disabled={activeChapter === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all w-full sm:w-auto justify-center
              ${activeChapter === 0 
                ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' 
                : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:shadow-sm'}`}
          >
            <ChevronLeft className="w-5 h-5"/>
            이전 챕터
          </button>
          
          <button
            onClick={() => setActiveChapter(Math.min(chapters.length - 1, activeChapter + 1))}
            disabled={activeChapter === chapters.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all w-full sm:w-auto justify-center
              ${activeChapter === chapters.length - 1 
                ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'}`}
          >
            다음 챕터
            <ChevronRight className="w-5 h-5"/>
          </button>
        </div>
      </main>

    </div>
  );
}