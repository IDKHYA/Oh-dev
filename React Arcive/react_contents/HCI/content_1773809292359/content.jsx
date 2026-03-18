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
  },
  {
    id: 3,
    title: "사용자 인터페이스란 무엇인가",
    content: (
      <>
        <p>자료에서는 사용자 인터페이스를 <strong>사람이 디지털 기기와 상호작용하기 위한 모든 장치와 구성 요소</strong>라고 설명합니다.</p>
        <p>많은 사람이 UI를 버튼, 화면, 아이콘 정도로 좁게 생각하지만, 여기서는 훨씬 넓게 봅니다.<br/>
        UI는 단지 화면의 겉모습이 아니라 사용자가 시스템과 만나는 접점 전체입니다.</p>
        
        <h3>즉 UI는 다음을 포함합니다.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-4">
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 화면의 레이아웃</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 버튼의 위치와 크기</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 문구와 안내 방식</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 입력 방식</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 오류 메시지</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 터치나 제스처 반응</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 음성 명령 구조</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 사용 순서와 흐름</div>
        </div>
        
        <p>자료가 말하는 중요한 포인트는, 좋은 UI는 단지 보기 좋게 만드는 것이 아니라 <strong>긍정적인 UX를 제공하는 수단</strong>이라는 점입니다.</p>
        
        <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl mt-6">
          <h4 className="font-bold text-lg mb-2 text-indigo-600 dark:text-indigo-400">UI와 UX의 관계</h4>
          <ul className="space-y-2">
            <li><strong>UI</strong>: 사용자가 직접 접하는 구조와 장치</li>
            <li><strong>UX</strong>: 그 UI를 통해 사용자가 실제로 느끼는 전체 경험</li>
          </ul>
          <p className="mt-3 font-semibold">즉 UI는 UX를 만드는 핵심 수단입니다.</p>
        </div>
      </>
    )
  },
  {
    id: 4,
    title: "좋은 UI의 조건",
    content: (
      <>
        <p>자료에서는 좋은 사용자 인터페이스의 조건으로 다음을 제시합니다. 이 각각은 단순한 미사여구가 아니라 <strong>실제 설계 판단 기준</strong>입니다.</p>
        
        <div className="space-y-6 mt-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">4-1. 사용 편의성</h3>
            <p>사용자가 설명서를 길게 읽지 않아도 어느 정도 바로 쓸 수 있어야 합니다. 무엇을 눌러야 할지 예상 가능해야 하고, 실수해도 복구 가능해야 합니다.</p>
          </div>
          
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">4-2. 효율성</h3>
            <p>사용자가 원하는 일을 적은 단계로 빠르게 끝낼 수 있어야 합니다. 예를 들어 같은 작업을 매번 7단계로 해야 하는 시스템은 효율이 떨어집니다.</p>
          </div>
          
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">4-3. 생산성</h3>
            <p>특히 업무 시스템에서는 사용자가 단순히 “쓸 수 있는가”를 넘어서 업무를 더 잘 해낼 수 있게 도와야 합니다.</p>
          </div>
          
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">4-4. 만족도</h3>
            <p>시스템을 쓰고 난 뒤 피로감, 짜증, 혼란이 적어야 합니다. 이 만족도는 감성의 문제 같아 보여도 실제 재사용률과 직결됩니다.</p>
          </div>
          
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">4-5. 문제 해결 가능성</h3>
            <p>사용자가 목표를 달성할 수 있어야 합니다. 겉보기로는 세련되어도 정작 사용자가 원하는 작업을 끝내지 못한다면 좋은 UI가 아닙니다.</p>
          </div>
          
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">4-6. 접근성</h3>
            <p>젊고 디지털 친화적인 사용자만 기준으로 삼으면 안 됩니다. 고령층, 저시력 사용자, 디지털 숙련도가 낮은 사용자도 고려해야 합니다. 접근성은 선택이 아니라 필수 조건입니다.</p>
          </div>
        </div>
      </>
    )
  },
  {
    id: 5,
    title: "왜 기능이나 레이아웃보다 인터랙션이 더 중요한가",
    content: (
      <>
        <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800 mb-6">
          <p className="font-bold text-red-600 dark:text-red-400 text-lg mb-0">이 자료의 핵심 전환점이 여기입니다.</p>
        </div>
        
        <p>자료는 명확하게 <strong>기능이나 레이아웃보다 인터랙션이 중요하다</strong>고 말합니다.</p>
        <p>이 말은 화면이 중요하지 않다는 뜻이 아니라, 사용성이 실제로 결정되는 핵심은 <strong>사용자와 시스템 사이에서 무슨 일이 어떻게 일어나는가</strong>라는 뜻입니다.</p>
        
        <h3>예를 들어 같은 버튼이 있어도,</h3>
        <ul className="space-y-2">
          <li>눌렀을 때 즉시 반응하는지</li>
          <li>다음 단계가 예측 가능한지</li>
          <li>잘못 눌렀을 때 되돌릴 수 있는지</li>
          <li>현재 상태를 알려주는지</li>
          <li>사용자의 기대와 맞는 순서로 진행되는지</li>
        </ul>
        <p className="mt-4">이런 것들이 실제 경험을 좌우합니다.</p>
        
        <p className="text-xl font-semibold mt-6 text-center text-slate-700 dark:text-slate-300">
          "UI를 정적인 화면으로 보면 안 되고<br/><span className="text-blue-600 dark:text-blue-400">행동과 반응의 설계</span>로 봐야 합니다."
        </p>
        
        <p className="mt-6">특히 음성 인터페이스는 화면이 거의 없을 수도 있고 터치나 제스처 인터페이스는 손동작 자체가 핵심 조작 수단이 됩니다. 즉 오늘날 인터페이스는 더 이상 “화면 디자인”만으로 설명할 수 없습니다.</p>
      </>
    )
  },
  {
    id: 6,
    title: "인터랙션이란 무엇인가",
    content: (
      <>
        <p>자료에서는 인터랙션을 <strong>사용자가 디지털 기기나 소프트웨어 시스템과 상호작용하면서 이루어지는 모든 과정</strong>이라고 설명합니다.</p>
        <p>여기서 중요한 것은 <strong>“과정”</strong>이라는 말입니다. 인터랙션은 단순히 버튼 한 번 누르는 행위가 아닙니다.</p>
        
        <h3>보통 다음과 같은 연속적인 흐름을 포함합니다.</h3>
        <div className="relative border-l-2 border-slate-300 dark:border-slate-700 ml-3 md:ml-6 space-y-4 py-2 mt-6">
          <div className="relative pl-6">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
            <p>1. 사용자가 <strong>목표</strong>를 가짐</p>
          </div>
          <div className="relative pl-6">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
            <p>2. 화면이나 장치를 보고 <strong>가능한 행동을 파악</strong>함</p>
          </div>
          <div className="relative pl-6">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
            <p>3. 무엇을 해야 할지 <strong>판단</strong>함</p>
          </div>
          <div className="relative pl-6">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
            <p>4. <strong>조작을 수행</strong>함</p>
          </div>
          <div className="relative pl-6">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
            <p>5. 시스템 <strong>반응을 확인</strong>함</p>
          </div>
          <div className="relative pl-6">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
            <p>6. 결과가 <strong>의도와 맞는지 해석</strong>함</p>
          </div>
          <div className="relative pl-6">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
            <p>7. <strong>다음 행동을 결정</strong>함</p>
          </div>
        </div>
        
        <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl mt-8 text-center">
          <p className="font-bold text-lg">즉 인터랙션은 지각, 판단, 행동, 피드백, 재판단의 연쇄입니다.</p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">그래서 인터랙션 디자인은 단지 보기 좋게 만드는 작업이 아니라 사용자의 행동 흐름 전체를 설계하는 일입니다.</p>
        </div>
      </>
    )
  },
  {
    id: 7,
    title: "인터랙션 디자인의 탄생과 목표",
    content: (
      <>
        <p>자료에서는 인터랙션 디자인이라는 용어를 1984년 빌 모그리지(Bill Moggridge)와 연결해서 소개합니다.</p>
        <p>이 맥락의 의미는 단순한 역사 암기가 아닙니다. <strong>왜 새로운 분야가 필요했는지</strong>를 이해하는 것이 중요합니다.</p>
        
        <p>기존에는 공학은 기술 중심, 디자인은 형태 중심으로 보는 경향이 강했습니다. 하지만 실제 디지털 제품의 문제는 그 둘만으로 설명되지 않았습니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-red-500">문제 1</p>
            <p className="mt-2">기능은 있는데 사람들이 못 쓴다</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-red-500">문제 2</p>
            <p className="mt-2">화면은 예쁜데 작업이 복잡하다</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-red-500">문제 3</p>
            <p className="mt-2">조작은 되는데 왜 이렇게 불안하고 헷갈리는지 설명하기 어렵다</p>
          </div>
        </div>
        
        <p>이런 문제를 풀기 위해서는 기술만으로도, 순수 미학만으로도 부족합니다.<br/>
        그래서 <strong>사람의 행동과 맥락을 포함하는 새로운 설계 관점</strong>이 필요했고 그것이 인터랙션 디자인입니다.</p>
        
        <h3 className="mt-8">자료가 제시하는 목표는 크게 두 가지입니다.</h3>
        <ol className="list-decimal pl-6 space-y-2 font-semibold text-lg text-indigo-700 dark:text-indigo-400 mt-4">
          <li>사용자가 시스템을 조작할 때 어떤 반응을 얻게 되는가</li>
          <li>사용자가 어떤 흐름으로 작업을 수행할 수 있는가</li>
        </ol>
        
        <p className="mt-6 text-center italic text-slate-600 dark:text-slate-400">
          "즉 좋은 인터랙션 디자인은 '누르면 작동한다' 수준이 아니라<br/>
          <strong>사용자가 목적을 무리 없이 끝낼 수 있는 흐름을 만드는 것</strong>입니다."
        </p>
      </>
    )
  },
  {
    id: 8,
    title: "인터랙션 디자인의 특징",
    content: (
      <>
        <p>자료는 인터랙션 디자인의 특징을 매우 중요하게 다룹니다. 이 부분은 시험용으로도 중요하지만 실제로도 핵심입니다.</p>
        
        <div className="space-y-6 mt-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl">
            <h3 className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
              <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">8-1</span> 과학이라기보다 실용 기술에 가깝다
            </h3>
            <p>인터랙션 디자인에는 절대적인 정답이 없습니다. 상황, 사용자, 맥락, 기기 종류에 따라 최선의 방법이 달라집니다. 즉 “항상 이게 맞다”가 아니라 <strong>지금 이 맥락에서 가장 적절한 해법이 무엇인가</strong>를 찾는 과정입니다.</p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl">
            <h3 className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
              <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">8-2</span> 개인과 기계만의 관계가 아니다
            </h3>
            <p>인터랙션은 사람과 기계의 관계만이 아니라 사람과 사람 사이의 소통도 포함할 수 있습니다. 예를 들어 메신저 앱은 단지 화면 조작 문제가 아니라 관계 맥락, 커뮤니케이션 흐름, 사회적 부담감까지 포함합니다.</p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl">
            <h3 className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
              <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">8-3</span> 화면이 필수는 아니다
            </h3>
            <p>인터랙션 디자인은 화면 배치 디자인과 같지 않습니다. 화면이 없는 음성 인터페이스도 있고 웨어러블이나 스마트 기기처럼 동작 자체가 핵심인 경우도 있습니다. 즉 중요한 것은 “무슨 화면이 보이느냐”보다 <strong>제품이 어떻게 반응하고 사용자가 그것을 어떻게 경험하느냐</strong>입니다.</p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl">
            <h3 className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
              <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">8-4</span> 여러 학문이 겹치는 융합 분야다
            </h3>
            <p>HCI, UX 디자인, 산업디자인, 심리학, 인지과학 등이 함께 연결됩니다. 왜냐하면 사람의 행동을 이해하려면 기술만 알아서는 안 되고 지각, 기억, 판단, 감정, 습관까지 다 봐야 하기 때문입니다.</p>
          </div>
        </div>
      </>
    )
  },
  {
    id: 9,
    title: "나쁜 인터랙션 디자인 사례의 의미",
    content: (
      <>
        <p>자료는 나쁜 사례들을 여러 개 보여줍니다. 이건 단순히 “이건 불편하다”를 말하려는 게 아닙니다.<br/>
        <strong>좋은 설계가 무엇인지 역으로 배우게 하려는 것</strong>입니다.</p>
        
        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg my-6 text-red-800 dark:text-red-200">
          <p className="font-bold mb-2">언급된 나쁜 사례들:</p>
          <ul className="list-disc pl-5 columns-1 md:columns-2 gap-4">
            <li>초기 슈퍼마켓 무인 정산기</li>
            <li>온라인 해외 송금 시스템</li>
            <li>버튼이 지나치게 많은 전자레인지</li>
            <li>식당 키오스크</li>
            <li>복잡한 회원가입 폼</li>
            <li>어려운 CAPTCHA</li>
            <li>호텔 수도꼭지/샤워기 조작</li>
          </ul>
        </div>
        
        <h3 className="mt-8 font-bold text-2xl border-b pb-2">이 사례들의 공통점</h3>
        
        <div className="space-y-5 mt-4">
          <div>
            <h4 className="font-bold text-lg text-red-600 dark:text-red-400">9-1. 사용자의 목표보다 시스템 논리가 앞선다</h4>
            <p>사용자는 “결제하고 싶다”, “송금하고 싶다”, “샤워하고 싶다”처럼 단순한 목표를 갖고 있습니다. 그런데 시스템은 복잡한 절차, 모호한 조작 규칙, 이해하기 어려운 상태 전환을 강요합니다. 즉 사용자는 자신의 목표를 수행하는 것이 아니라 <strong>시스템의 규칙을 해석하는 일</strong>을 먼저 해야 합니다.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-red-600 dark:text-red-400">9-2. 피드백이 부족하거나 애매하다</h4>
            <p>예를 들어 “송금 불가”라는 메시지만 나오면 사용자는 왜 안 되는지, 언제 가능한지, 무엇을 바꿔야 하는지 알 수 없습니다. 좋은 피드백은 단순한 경고가 아니라 <strong>다음 행동을 가능하게 하는 정보</strong>여야 합니다.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-red-600 dark:text-red-400">9-3. 선택지가 많고 복잡하다</h4>
            <p>버튼이 너무 많거나 폼이 너무 길면 사용자는 어느 것부터 봐야 하는지 몰라서 <strong>인지 부하가 급격히 올라갑니다.</strong></p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-red-600 dark:text-red-400">9-4. 사용자의 기존 경험과 맞지 않는다</h4>
            <p>예상한 방식대로 작동하지 않으면 사용자는 헷갈립니다. 예를 들어 샤워기 물이 나오는 방식이 일반적인 경험과 다르면 기계 자체의 성능과 무관하게 사용자는 실패를 경험합니다.</p>
          </div>
        </div>
        
        <div className="mt-8 p-5 border-2 border-slate-800 dark:border-slate-300 rounded-xl font-bold text-center">
          이 부분에서 중요한 것은<br/>
          나쁜 인터랙션은 사용자를 바보로 만드는 것이 아니라, <span className="text-red-600 dark:text-red-400">사용자가 정상적으로 사고하고 행동해도 실패하게 만드는 구조</span>라는 점입니다.
        </div>
      </>
    )
  },
  {
    id: 10,
    title: "좋은 인터랙션 디자인 사례의 의미",
    content: (
      <>
        <p>자료는 좋은 사례로 다음을 듭니다. 이 사례들을 보면 좋은 인터랙션의 공통 원리가 드러납니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2"><CheckCircle2/> 10-1. 지메일</h3>
            <p>지메일은 첨부파일을 먼저 넣고 나중에 본문을 써도 자연스럽게 작업할 수 있습니다. 또 자동 저장 기능이 있어서 사용자는 작성 중 실수나 중단에 대한 불안을 덜 느낍니다.</p>
            <p className="mt-2 text-sm font-semibold">→ 사용자의 실제 작업 흐름과 불안 요소를 잘 이해하고 설계한 사례입니다.</p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2"><CheckCircle2/> 10-2. 구글 검색</h3>
            <p>화면이 단순하고 사용자가 해야 할 행동이 명확합니다. 입력창에 검색어를 넣으면 된다는 점이 너무 분명해서 인지 부하가 거의 없습니다.</p>
            <p className="mt-2 text-sm font-semibold">→ “좋은 인터페이스는 기능이 많아 보이는 것이 아니라 해야 할 일이 분명해 보이는 것”임을 보여줍니다.</p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2"><CheckCircle2/> 10-3. 앵그리버드</h3>
            <p>게임 방법을 긴 설명 없이도 직관적으로 이해할 수 있습니다. 사용자는 시각적 단서와 조작 반응을 통해 규칙을 빠르게 학습합니다.</p>
            <p className="mt-2 text-sm font-semibold">→ 학습 비용이 낮고 행동-결과 관계가 명확합니다.</p>
          </div>

          <div className="bg-blue-100 dark:bg-blue-900/40 p-5 rounded-xl border-2 border-blue-400 shadow-lg transform md:-translate-y-2 transition-transform">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">⭐ 10-4. ATM 카드 회수 순서 변경</h3>
            <p className="font-medium">이 사례는 특히 중요합니다.</p>
            <p className="mt-1">카드를 먼저 돌려주고 그 다음에 돈을 지급하도록 바꾸자 카드 분실이 크게 줄었습니다.</p>
            <p className="mt-3 text-sm font-bold bg-white/50 dark:bg-black/20 p-2 rounded">
              이 사례가 중요한 이유는 UI를 예쁘게 바꾼 것이 아니라 사용자의 실제 행동 순서와 실수 가능성을 고려해 인터랙션 순서를 바꿨기 때문입니다.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-lg font-semibold border-t-2 border-b-2 py-4">
          즉 인터랙션 디자인은 버튼 모양보다<br/>
          <span className="text-2xl text-indigo-600 dark:text-indigo-400">"행동의 시퀀스를 설계하는 일"</span><br/>
          이라는 점을 강하게 보여줍니다.
        </div>
      </>
    )
  },
  {
    id: 11,
    title: "실제 프로젝트 사례: 장노년층 열차 예매 키오스크",
    content: (
      <>
        <div className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold text-sm mb-4">
          가장 실전적인 파트
        </div>
        <p>이 부분은 “이론이 현실에서 어떻게 적용되는가”를 보여줍니다.</p>
        
        <h3 className="mt-6 text-xl font-bold">프로젝트 배경</h3>
        <ul className="list-disc pl-6 space-y-2 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg mt-2">
          <li>장노년층의 철도 이용 수요는 증가하고 있음</li>
          <li>그러나 경로 승차권은 대부분 창구에서 발매되고 있음</li>
          <li>키오스크가 있어도 쉽게 사용하지 못함</li>
          <li>따라서 장노년층도 사용할 수 있는 예매 키오스크 개선이 필요함</li>
        </ul>

        <h3 className="mt-8 text-xl font-bold text-red-600 dark:text-red-400">초기 문제점 (표면적 문제)</h3>
        <p>초기에는 <strong>"버튼이 작다, 조작이 어렵다, 진행 단계를 알 수 없다"</strong>는 점이 문제로 언급되었습니다.</p>
        
        <div className="my-6 p-6 bg-slate-800 text-white rounded-xl shadow-xl">
          <p className="text-lg">그런데 자료는 여기서 <strong>매우 중요한 통찰</strong>을 보여줍니다.</p>
          <p className="mt-2 text-slate-300">처음에는 글자 크기 확대, 색 대비 강화 같은 시각적 레이아웃 개선에 집중했지만, 그것만으로는 해결이 안 된다는 것을 깨닫습니다.</p>
          <p className="mt-2 text-slate-300">왜냐하면 글자만 키우면 한 화면에 들어가는 정보량이 줄고 결국 단계가 더 많아질 수 있기 때문입니다.</p>
          
          <div className="bg-indigo-600 p-4 rounded-lg mt-4 text-center">
            <p className="font-bold text-xl">진짜 문제는 글자가 작은 것이 아니라<br/>사용자가 작업 흐름을 이해하고 처리하기 어렵다는 것이다.</p>
          </div>
        </div>

        <p className="font-bold text-center text-lg mt-6">이게 HCI의 핵심 관점입니다. 표면 증상보다 근본 원인을 봐야 합니다.</p>
      </>
    )
  },
  {
    id: 12,
    title: "좋은 UI 개선은 화면부터 고치는 것이 아니라 현황 파악부터 시작한다",
    content: (
      <>
        <p>자료는 키오스크 개선 해결방안에서 먼저 <strong>현황 파악</strong>을 제시합니다.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-center text-sm font-semibold">기존 시스템 전수 조사</div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-center text-sm font-semibold">설치 대수/위치/사용 빈도 확인</div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-center text-sm font-semibold border-2 border-blue-400">역무원 및 창구 직원 인터뷰</div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-center text-sm font-semibold border-2 border-blue-400">고객센터 VOC 수집/분류</div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-center text-sm font-semibold">유사 시스템 벤치마킹</div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-center text-sm font-semibold border-2 border-blue-400">장노년층 인터뷰/현장 관찰</div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl mt-6 border-l-4 border-blue-500">
          <p className="font-bold mb-2">이 과정이 중요한 이유:</p>
          <p>좋은 설계는 디자이너 머릿속에서 바로 나오는 것이 아니라 <strong>실제 사용자의 실패 지점과 맥락을 관찰하는 데서 나온다</strong>는 점입니다.</p>
        </div>
        
        <p className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          특히 <strong>“어떤 질문을 가장 많이 받는가”</strong>를 직원에게 묻는 것은 매우 좋은 관찰 포인트입니다.<br/>
          사용자가 자주 묻는 질문은 <strong>시스템이 스스로 설명하지 못하고 있다는 뜻</strong>이기 때문입니다.
        </p>
      </>
    )
  },
  {
    id: 13,
    title: "문제 정의를 어떻게 더 정확하게 해야 하는가",
    content: (
      <>
        <p>자료는 초기 문제 정의가 불충분했다고 말합니다.</p>
        <p>예를 들어 <em>“조작 방법이 어렵다”</em>는 말은 너무 막연합니다. 이 말만으로는 해결책을 만들기 어렵습니다.</p>
        
        <div className="flex flex-col md:flex-row gap-6 my-8">
          <div className="flex-1 bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800">
            <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">좋은 문제 정의는 더 구체적이어야 합니다.</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>어느 단계에서 막히는가</li>
              <li>어떤 선택지가 너무 많은가</li>
              <li>무엇이 잘 보이지 않는가</li>
              <li>사용자는 현재 자신이 어디까지 왔는지 알 수 있는가</li>
              <li>어떤 경우에 오프라인 창구로 보내는 것이 더 나은가</li>
            </ul>
          </div>
          
          <div className="flex-1 bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-700 dark:text-green-400 mb-3">새롭게 도출한 핵심 문제</h3>
            <ul className="list-disc pl-5 space-y-2 font-semibold">
              <li>표 한 장을 구입하는 데 선택 사항이 너무 많다</li>
              <li>화면의 글자 가독성이 떨어진다</li>
              <li>한 화면에 보이는 정보가 너무 많다</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center p-6 bg-slate-800 text-white rounded-xl">
          <p className="text-xl">즉 문제의 본질은<br/>
          <span className="text-3xl font-bold text-yellow-400 mt-2 block">"작은 글씨"보다 "과도한 선택과 정보량"</span>이었습니다.</p>
        </div>
        
        <p className="mt-6 text-center font-bold text-slate-600 dark:text-slate-400">
          이건 굉장히 중요한 HCI 사고방식입니다.<br/>사용 불편의 원인은 겉으로 보이는 것과 다를 수 있습니다.
        </p>
      </>
    )
  },
  {
    id: 14,
    title: "해결 방향: 기능을 다 넣는 것이 아니라 과감히 줄이는 것",
    content: (
      <>
        <p>자료의 개선 방향은 매우 인상적입니다.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center font-medium shadow-sm border border-indigo-100 dark:border-indigo-800">작업 절차 간소화</div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center font-medium shadow-sm border border-indigo-100 dark:border-indigo-800">사용자 범위 축소</div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center font-medium shadow-sm border border-indigo-100 dark:border-indigo-800">복잡한 작업 제한</div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center font-medium shadow-sm border border-indigo-100 dark:border-indigo-800">화면 단순화</div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center font-medium shadow-sm border border-indigo-100 dark:border-indigo-800">프로토타입 사용자 테스트</div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center font-medium shadow-sm border border-indigo-100 dark:border-indigo-800 text-blue-600 dark:text-blue-400 font-bold border-2 border-blue-400">간단 예매 모드 추가</div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center font-medium shadow-sm border border-indigo-100 dark:border-indigo-800">진행 과정을 항상 표시</div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center font-medium shadow-sm border border-indigo-100 dark:border-indigo-800 text-red-500 dark:text-red-400 font-bold">복잡한 할인은 창구 유도</div>
        </div>
        
        <div className="mt-8 border-l-4 border-indigo-500 pl-6 space-y-4">
          <p className="font-bold text-lg">이 부분은 HCI에서 매우 중요합니다.</p>
          <p>많은 초보 설계는 “모든 기능을 다 지원하는 것”을 좋은 시스템이라고 생각합니다. 하지만 실제로는 오히려 그 반대일 수 있습니다.</p>
          <p className="bg-slate-100 dark:bg-slate-800 p-4 rounded-r-lg">
            장노년층 사용자를 위한 키오스크라면 <strong>필요한 95%의 상황을 아주 쉽게 처리하게 만드는 것</strong>이 100%를 모두 복잡하게 처리하게 만드는 것보다 훨씬 더 좋은 설계일 수 있습니다.
          </p>
          <p className="text-xl font-bold mt-4 text-indigo-700 dark:text-indigo-400">
            즉 좋은 설계는 기능을 추가하는 일이 아니라<br/>
            누구에게 무엇을 얼마나 쉽게 해줄 것인가를 명확히 선택하는 일입니다.
          </p>
        </div>
      </>
    )
  },
  {
    id: 15,
    title: "이 사례가 HCI에서 중요한 이유",
    content: (
      <>
        <p>이 키오스크 사례는 단순한 공공 UX 사례가 아니라 <strong>HCI의 핵심 원리</strong>를 압축해서 보여줍니다.</p>
        
        <div className="space-y-6 mt-6">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">문제를 화면 미관이 아니라 작업 흐름으로 본다</h3>
              <p className="text-slate-700 dark:text-slate-300">처음에는 글자와 색 문제처럼 보였지만 실제로는 작업 절차가 복잡한 것이 핵심이었습니다.</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">모든 사용자를 한 번에 만족시키려 하지 않는다</h3>
              <p className="text-slate-700 dark:text-slate-300">장노년층용 간단 모드를 따로 둠으로써 주요 사용 시나리오에 집중합니다.</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">실제 사용자 조사와 테스트가 필수다</h3>
              <p className="text-slate-700 dark:text-slate-300">추측이 아니라 인터뷰, 관찰, VOC, 프로토타입 테스트로 해결합니다.</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">4</div>
            <div>
              <h3 className="text-lg font-bold mb-1">좋은 디자인은 덜어내는 능력이다</h3>
              <p className="text-slate-700 dark:text-slate-300">화면에 많은 것을 넣는 것이 아니라 필요 없는 복잡성을 줄이는 것이 중요합니다.</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    id: 16,
    title: "인간의 인지와 기억이 왜 갑자기 등장하는가",
    content: (
      <>
        <p>자료 후반부는 인간의 인지와 기억으로 넘어갑니다. 이 전환은 매우 자연스럽습니다.</p>
        
        <h3 className="mt-6 mb-3 font-bold text-lg text-indigo-700 dark:text-indigo-400">앞에서 우리는 이런 질문을 했습니다.</h3>
        <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl space-y-2 mb-6 italic text-slate-700 dark:text-slate-300">
          <p>"왜 사람들은 키오스크에서 막히는가?"</p>
          <p>"왜 선택지가 많으면 힘들어하는가?"</p>
          <p>"왜 익숙한 구조가 바뀌면 혼란스러워하는가?"</p>
          <p>"왜 단순한 화면이 더 쓰기 쉬운가?"</p>
        </div>
        
        <p>이 질문들에 답하려면 결국 <strong>사람의 머리가 정보를 어떻게 받아들이고 처리하는지를 알아야 합니다.</strong></p>
        
        <div className="my-8 text-center border-t-2 border-b-2 border-slate-200 dark:border-slate-700 py-6">
          <p className="text-xl font-bold">즉 HCI는 기계를 다루는 학문이면서 동시에<br/>
          <span className="text-blue-600 dark:text-blue-400">인간의 인지적 한계를 이해하는 학문</span>입니다.</p>
        </div>
        
        <p>자료는 명확하게 <strong>"사람은 한 번에 많은 것을 처리할 수 없다"</strong>고 말합니다.<br/>
        이 말은 너무 당연해 보이지만, 실제 설계에서는 가장 자주 무시되는 사실입니다.</p>
      </>
    )
  },
  {
    id: 17,
    title: "감각, 지각, 인지의 차이",
    content: (
      <>
        <div className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold text-sm mb-4">
          HCI에서 매우 중요
        </div>
        
        <div className="space-y-6 mt-4">
          <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="md:w-1/4">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">17-1. 감각<br/><span className="text-sm font-normal text-slate-500">(Sensation)</span></h3>
            </div>
            <div className="md:w-3/4">
              <p>눈, 귀 등 감각 기관을 통해 자극이 들어오는 단계입니다.</p>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">예: 화면의 색, 소리, 진동을 받아들이는 것</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="md:w-1/4">
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">17-2. 지각<br/><span className="text-sm font-normal text-slate-500">(Perception)</span></h3>
            </div>
            <div className="md:w-3/4">
              <p>들어온 자극을 패턴으로 인식하고 의미 있는 형태로 파악하는 단계입니다.</p>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">예: 빨간 버튼이 보이고 “이건 경고다”라고 느끼는 과정</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="md:w-1/4">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">17-3. 인지<br/><span className="text-sm font-normal text-slate-500">(Cognition)</span></h3>
            </div>
            <div className="md:w-3/4">
              <p>지각된 정보를 해석하고 판단하고 행동 계획을 세우는 단계입니다.</p>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">예: “이 버튼은 지금 누르면 안 되겠다”라고 생각하는 것</p>
            </div>
          </div>
        </div>
        
        <h3 className="mt-8 font-bold text-lg">자료는 이 차이를 설명하면서 설계에 바로 연결합니다.</h3>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>자극이 모호하지 않도록 대비, 크기, 색상 사용 (감각)</li>
          <li>사용자의 기존 경험과 맞는 메타포 사용 (지각)</li>
          <li>불필요한 정보 제거 / 복잡한 작업을 단계적으로 분할 (인지)</li>
        </ul>
        
        <div className="mt-8 bg-slate-900 text-white p-6 rounded-xl text-center">
          <p className="font-bold text-lg mb-4">즉 좋은 HCI 설계는</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 font-semibold text-lg">
            <span className="bg-blue-600 px-4 py-2 rounded-lg">먼저 잘 보이게 하고</span>
            <span className="text-slate-400 hidden md:inline">→</span>
            <span className="bg-indigo-600 px-4 py-2 rounded-lg">다음에 잘 이해되게 하고</span>
            <span className="text-slate-400 hidden md:inline">→</span>
            <span className="bg-purple-600 px-4 py-2 rounded-lg">마지막으로 잘 결정할 수 있게</span>
          </div>
          <p className="mt-4 text-red-400 font-bold">이 세 단계가 어긋나면 사용자는 쉽게 실패합니다.</p>
        </div>
      </>
    )
  },
  {
    id: 18,
    title: "메타포와 장기기억의 중요성",
    content: (
      <>
        <p>자료에서 “일관된 메타포”를 강조하는 이유는 <strong>사람이 모든 인터페이스를 처음부터 새로 배우지 않기 때문</strong>입니다.</p>
        <p>사람은 이미 많은 디지털 경험을 장기기억 속에 가지고 있습니다.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <div className="text-3xl mb-2">🔍</div>
            <p className="font-bold">돋보기 아이콘</p>
            <p className="text-sm text-slate-500 mt-1">= 검색</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <div className="text-3xl mb-2">🗑️</div>
            <p className="font-bold">휴지통</p>
            <p className="text-sm text-slate-500 mt-1">= 삭제</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <div className="text-3xl mb-2">⬅️</div>
            <p className="font-bold">왼쪽 화살표</p>
            <p className="text-sm text-slate-500 mt-1">= 뒤로 가기</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <div className="text-3xl mb-2">💬</div>
            <p className="font-bold">채팅 앱</p>
            <p className="text-sm text-slate-500 mt-1">= 대화 중심 구조</p>
          </div>
        </div>
        
        <p>이런 것들은 장기기억에 축적된 규칙입니다.</p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border-l-4 border-blue-500 my-6">
          <p className="font-bold text-lg mb-2">좋은 인터페이스는 이 기억을 활용합니다.</p>
          <p>즉 사용자가 새 시스템을 접해도 기존 경험을 바탕으로 자연스럽게 예측할 수 있게 해줍니다.</p>
        </div>
        
        <p className="font-bold text-red-600 dark:text-red-400">반대로 일관된 메타포를 깨면 사용자는 매 순간 새로 해석해야 하므로 인지 부담이 커집니다.</p>
      </>
    )
  },
  {
    id: 19,
    title: "기억의 3단계 모델과 HCI",
    content: (
      <>
        <p>자료는 기억의 3단계 모델을 언급합니다. 일반적으로 HCI에서 이 모델은 감각기억, 작업기억, 장기기억으로 이해할 수 있습니다.</p>
        
        <div className="space-y-8 mt-6">
          <div className="border border-slate-200 dark:border-slate-700 p-5 rounded-xl">
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">19-1. 감각기억 (Sensory Memory)</h3>
            <p>아주 짧은 시간 동안 들어온 자극을 잠시 붙잡아 두는 단계입니다. 시각 자극이나 청각 자극이 순식간에 사라지지 않도록 하는 역할을 합니다.</p>
            <div className="mt-3 bg-slate-50 dark:bg-slate-800 p-3 rounded text-sm">
              <strong className="text-slate-700 dark:text-slate-300">설계 관점:</strong> 너무 짧게 지나가는 정보, 너무 눈에 띄지 않는 피드백은 사용자가 놓칠 수 있다는 점과 연결됩니다.
            </div>
          </div>
          
          <div className="border-2 border-blue-400 dark:border-blue-500 p-5 rounded-xl shadow-md bg-blue-50/50 dark:bg-blue-900/10 relative">
            <div className="absolute -top-3 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">가장 중요</div>
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">19-2. 작업기억 (Working Memory)</h3>
            <p>지금 당장 머릿속에서 처리하고 있는 정보입니다. 용량이 제한적이고 쉽게 과부하가 걸립니다.</p>
            <p className="mt-2 font-bold text-red-600 dark:text-red-400">HCI 설계에서 가장 중요한 지점이 여기입니다.</p>
            <p>선택지가 많고 단계가 복잡하고 안내가 길어질수록 작업기억이 금방 포화됩니다.</p>
            
            <div className="mt-4 bg-white dark:bg-slate-800 p-4 rounded-lg">
              <strong className="block mb-2 text-indigo-600 dark:text-indigo-400">그래서 좋은 설계는 작업기억을 아껴줘야 합니다.</strong>
              <ul className="list-disc pl-5 space-y-1 text-sm font-semibold">
                <li>한 번에 보여주는 정보량 줄이기</li>
                <li>단계 나누기</li>
                <li>현재 상태와 다음 단계 명확히 보여주기</li>
                <li>중요한 정보는 다시 확인 가능하게 두기</li>
              </ul>
            </div>
          </div>
          
          <div className="border border-slate-200 dark:border-slate-700 p-5 rounded-xl">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">19-3. 장기기억 (Long-term Memory)</h3>
            <p>오랫동안 저장된 지식, 경험, 습관입니다. 관습적인 UI, 메타포, 반복 학습된 사용 방식이 여기에 저장됩니다.</p>
            <div className="mt-3 bg-slate-50 dark:bg-slate-800 p-3 rounded text-sm">
              <strong className="text-slate-700 dark:text-slate-300">설계 관점:</strong> 좋은 시스템은 장기기억을 활용해 학습 비용을 줄입니다. 즉 새로운 UI를 만들더라도 완전히 낯설게 만들기보다는 사용자의 기존 경험과 이어지게 만드는 것이 중요합니다.
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    id: 20,
    title: "인지 부하란 무엇인가",
    content: (
      <>
        <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-xl text-center mb-8">
          <p className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-2">자료의 여러 부분을 관통하는 핵심 개념</p>
          <h2 className="text-3xl font-black text-purple-800 dark:text-purple-300">인지 부하 (Cognitive Load)</h2>
        </div>
        
        <p className="text-lg">인지 부하란 쉽게 말하면 <strong>사용자가 정보를 이해하고 판단하고 행동하기 위해 머릿속에서 쓰는 정신적 에너지의 부담</strong>입니다.</p>
        
        <h3 className="mt-8 font-bold text-xl mb-4">인지 부하가 커지는 대표적인 상황:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-2xl">🤯</div>
            <p>선택지가 너무 많을 때</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-2xl">📄</div>
            <p>정보가 한 화면에 너무 많이 있을 때</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-2xl">❓</div>
            <p>무엇이 중요한지 구분이 안 될 때</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-2xl">🌫️</div>
            <p>안내 문구가 모호할 때</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-2xl">🗺️</div>
            <p>현재 내가 어디까지 진행했는지 모를 때</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-2xl">🔄</div>
            <p>익숙하던 구조가 갑자기 바뀔 때</p>
          </div>
        </div>
        
        <div className="mt-10 p-5 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/10">
          <p className="text-xl font-bold">좋은 인터랙션 디자인은 결국<br/>
          <span className="text-purple-700 dark:text-purple-400">"인지 부하를 줄이는 디자인"</span>이라고 해도 과언이 아닙니다.</p>
        </div>
      </>
    )
  },
  {
    id: 21,
    title: "인터랙션 스타일의 의미",
    content: (
      <>
        <p>자료에는 인터랙션 스타일이 등장합니다. 세부 항목이 슬라이드에 자세히 풀려 있지는 않지만, 맥락상 중요한 뜻은 분명합니다.</p>
        
        <div className="my-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-center font-bold text-lg">
          인터랙션 스타일은 사용자가 시스템과 상호작용하는 전반적인 방식입니다.
        </div>
        
        <h3 className="font-bold mb-3">예를 들면:</h3>
        <ul className="flex flex-wrap gap-2 mb-6">
          <li className="bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 rounded-full text-indigo-800 dark:text-indigo-200">메뉴 선택 중심</li>
          <li className="bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 rounded-full text-indigo-800 dark:text-indigo-200">직접 조작 중심</li>
          <li className="bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 rounded-full text-indigo-800 dark:text-indigo-200">대화형</li>
          <li className="bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 rounded-full text-indigo-800 dark:text-indigo-200">폼 입력 중심</li>
          <li className="bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 rounded-full text-indigo-800 dark:text-indigo-200">터치와 제스처 중심</li>
        </ul>
        
        <p>이 스타일에 따라 사용자의 인지 부담, 오류 가능성, 학습 난이도가 달라집니다.</p>
        
        <div className="mt-6 space-y-4 border-l-2 border-slate-300 dark:border-slate-700 pl-4">
          <p>예를 들어 <strong>초보자</strong>에게는 너무 자유도가 높은 직접 조작보다 명확한 단계 안내와 선택형 구조가 더 쉬울 수 있습니다.</p>
          <p>반대로 <strong>숙련자</strong>에게는 지나치게 단순화된 구조가 답답할 수 있습니다.</p>
        </div>
        
        <p className="mt-6 font-bold text-center text-lg text-blue-600 dark:text-blue-400">
          즉 인터랙션 스타일 역시 사용자와 맥락에 맞게 선택해야 합니다.
        </p>
      </>
    )
  },
  {
    id: 22,
    title: "설계에 바로 쓰는 인지 법칙 3가지",
    content: (
      <>
        <p>자료에서는 구체적으로 “설계에 바로 쓰는 법칙”을 언급합니다. 핵심은 다음과 같습니다.</p>
        
        <div className="space-y-8 mt-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border-t-4 border-blue-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-bl-full flex items-start justify-end p-3 text-2xl opacity-50">1</div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3">인지 부하 최소화</h3>
            <p>사람의 작업기억은 제한되어 있으므로 불필요한 시각 요소와 정보는 줄여야 합니다.</p>
            <p className="mt-2 font-semibold text-blue-600 dark:text-blue-400">→ 꼭 필요한 것만 보여주고 중요도에 따라 계층을 나눠야 합니다.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border-t-4 border-indigo-500 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-bl-full flex items-start justify-end p-3 text-2xl opacity-50">2</div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3">일관된 메타포 활용</h3>
            <p>사용자의 기존 경험과 맞는 구조를 사용하면 새로운 학습 부담이 줄어듭니다.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border-t-4 border-purple-500 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-bl-full flex items-start justify-end p-3 text-2xl opacity-50">3</div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3">힉의 법칙 (Hick's Law)</h3>
            <p className="text-xl font-bold mb-2">"선택지가 많아질수록 결정 시간은 길어집니다."</p>
            <p>즉 “많이 보여주는 것”은 친절이 아니라 방해일 수 있습니다.</p>
            
            <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-sm">
              <strong>키오스크 사례와의 연결:</strong><br/>
              표 한 장 사는데 옵션이 너무 많으면 사용자는 무엇을 고를지 결정하는 데 과도한 시간을 쓰고 결국 포기할 수 있습니다.
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    id: 23,
    title: "카카오톡 사례가 말해주는 것",
    content: (
      <>
        <p>자료 후반부는 카카오톡 개편 사례를 예시로 듭니다.<br/>
        이건 단순한 앱 비판이 아니라, <strong>HCI 개념을 실제 서비스에 적용해 보는 연습</strong>입니다.</p>
        
        <div className="flex flex-col md:flex-row gap-6 my-8">
          <div className="flex-1">
            <h3 className="bg-slate-200 dark:bg-slate-700 py-2 px-4 rounded-t-lg font-bold">기업 측 목적 (전략)</h3>
            <ul className="bg-slate-50 dark:bg-slate-800 p-4 rounded-b-lg space-y-2 border border-slate-200 dark:border-slate-700">
              <li>앱 체류 시간 증가</li>
              <li>수익 모델 강화</li>
              <li>메신저에서 슈퍼앱으로 확장</li>
              <li>콘텐츠, 소셜, AI 기능 결합</li>
            </ul>
            <p className="mt-2 text-sm text-slate-500">→ 기업 입장에서는 합리적인 전략</p>
          </div>
          
          <div className="flex-1">
            <h3 className="bg-yellow-200 dark:bg-yellow-900/50 text-yellow-900 dark:text-yellow-200 py-2 px-4 rounded-t-lg font-bold">사용자 반응 (HCI 관점)</h3>
            <ul className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-b-lg space-y-2 border border-yellow-200 dark:border-yellow-900/50">
              <li>친구탭이 피드형 콘텐츠 중심으로 바뀜</li>
              <li>메신저 본질인 <strong>빠른 연락이 가려짐</strong></li>
              <li>광고와 숏폼 노출 증가</li>
              <li><strong>익숙했던 구조가 바뀌어 학습 비용 증가</strong></li>
              <li>메신저인지 SNS인지 혼란</li>
              <li>피드 노출이 관계 맥락상 부담을 줌</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-slate-900 text-white p-6 rounded-xl text-center shadow-xl">
          <p className="text-lg mb-2">HCI 관점에서는 기업의 전략과 별개로 이런 질문이 생깁니다.</p>
          <p className="text-2xl font-bold text-blue-400">"사용자가 원래 하려던 핵심 작업은 더 쉬워졌는가?"</p>
        </div>
        
        <p className="mt-6 font-bold text-center">
          이 사례가 중요한 이유는, 기능이 추가되고 사업적으로는 의미가 있어도<br/>
          사용자 입장에서는 핵심 목적 수행성이 떨어질 수 있기 때문입니다.
        </p>
      </>
    )
  },
  {
    id: 24,
    title: "카카오톡 사례를 인지 개념으로 해석하면",
    content: (
      <>
        <p>자료는 이 사례를 인지 개념과 연결합니다.</p>
        
        <div className="space-y-6 mt-6">
          <div className="border-l-4 border-red-500 pl-5 py-2">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">24-1. 일관된 메타포 위반</h3>
            <p>사용자는 장기기억 속에서 “카카오톡은 대화 중심 앱”이라고 인식하고 있습니다. 그런데 구조가 피드형, 콘텐츠형으로 변하면 처음 보는 순간부터 기대와 실제가 어긋납니다.</p>
            <p className="mt-1 font-semibold text-sm">→ 이것은 지각과 해석 단계에서 혼란을 만듭니다.</p>
          </div>
          
          <div className="border-l-4 border-orange-500 pl-5 py-2">
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-2">24-2. 인지 부하 증가</h3>
            <p>광고, 피드, 콘텐츠가 늘어나면 사용자는 원래 하려던 일과 관계없는 정보까지 처리해야 합니다.</p>
            <p className="mt-1 font-semibold text-sm">→ 작업기억이 불필요한 것에 소모됩니다.</p>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-5 py-2">
            <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">24-3. 힉의 법칙</h3>
            <p>화면 요소가 많아질수록 원하는 기능을 찾는 시간은 길어집니다.</p>
          </div>
        </div>
        
        <div className="mt-8 bg-slate-100 dark:bg-slate-800 p-5 rounded-lg text-center font-bold">
          즉 이 사례는 단지 “익숙해서 그런 거 아니냐” 수준이 아니라<br/>
          실제로 인지 설계 원리와 연결되는 문제입니다.
        </div>
      </>
    )
  },
  {
    id: 25,
    title: "이 자료가 최종적으로 말하는 HCI의 본질",
    content: (
      <>
        <div className="bg-indigo-600 text-white p-8 rounded-2xl text-center shadow-xl mb-10">
          <p className="text-sm font-bold text-indigo-200 mb-4 tracking-widest uppercase">이 자료 전체를 한 문장으로 정리하면</p>
          <h2 className="text-2xl md:text-3xl font-black leading-tight">
            "HCI는 사람이 디지털 시스템을<br className="hidden md:block"/>
            <span className="text-yellow-300">덜 힘들게, 덜 헷갈리게, 더 자연스럽게</span> 사용할 수 있도록<br className="hidden md:block"/>
            인터랙션과 인지 과정을 함께 설계하는 분야다."
          </h2>
        </div>
        
        <h3 className="font-bold text-xl mb-6 text-center border-b pb-4">핵심 포인트 5가지</h3>
        
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="font-black text-2xl text-slate-300 dark:text-slate-600">01</div>
            <div>
              <p>좋은 시스템은 기능이 많은 시스템이 아니라 <strong>사용자가 목표를 쉽게 달성하게 해주는 시스템</strong>입니다.</p>
            </div>
          </div>
          
          <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="font-black text-2xl text-slate-300 dark:text-slate-600">02</div>
            <div>
              <p>좋은 UI는 예쁜 화면이 아니라 <strong>좋은 인터랙션을 가능하게 하는 구조</strong>입니다.</p>
            </div>
          </div>
          
          <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="font-black text-2xl text-slate-300 dark:text-slate-600">03</div>
            <div>
              <p>문제를 화면 요소 하나하나로만 보면 안 되고 <strong>작업 흐름 전체로</strong> 봐야 합니다.</p>
            </div>
          </div>
          
          <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="font-black text-2xl text-slate-300 dark:text-slate-600">04</div>
            <div>
              <p>사용자 불편의 원인을 찾으려면 실제 <strong>사용 맥락과 행동을 관찰</strong>해야 합니다.</p>
            </div>
          </div>
          
          <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="font-black text-2xl text-slate-300 dark:text-slate-600">05</div>
            <div>
              <p>모든 설계의 바탕에는 인간의 인지 한계가 있습니다. 사람은 많은 정보를 한 번에 처리하지 못하고 익숙한 구조에 의존하며 명확한 단서와 피드백이 있을 때 더 잘 행동합니다.</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    id: 26,
    title: "시험이나 과제용으로 꼭 기억해야 할 핵심 정리",
    content: (
      <>
        <div className="grid grid-cols-1 gap-4">
          
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-blue-100 dark:bg-blue-900/50 px-4 py-2 font-bold text-blue-800 dark:text-blue-200">HCI란?</div>
            <div className="p-4 bg-white dark:bg-slate-800">사람과 컴퓨터 사이의 상호작용을 연구하고 설계하는 분야</div>
          </div>
          
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-blue-100 dark:bg-blue-900/50 px-4 py-2 font-bold text-blue-800 dark:text-blue-200">UI란?</div>
            <div className="p-4 bg-white dark:bg-slate-800">사용자가 디지털 기기와 상호작용하기 위한 모든 장치와 구성 요소</div>
          </div>
          
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-blue-100 dark:bg-blue-900/50 px-4 py-2 font-bold text-blue-800 dark:text-blue-200">UX란?</div>
            <div className="p-4 bg-white dark:bg-slate-800">사용자가 제품이나 서비스를 사용하면서 겪는 전체 경험</div>
          </div>
          
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 px-4 py-2 font-bold text-indigo-800 dark:text-indigo-200">인터랙션이란?</div>
            <div className="p-4 bg-white dark:bg-slate-800">사용자가 시스템과 상호작용하며 목표를 달성해 가는 전 과정</div>
          </div>
          
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 px-4 py-2 font-bold text-indigo-800 dark:text-indigo-200">인터랙션 디자인의 핵심</div>
            <div className="p-4 bg-white dark:bg-slate-800">화면 배치보다 행동과 반응의 흐름 설계가 중요함</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="border border-green-200 dark:border-green-900/50 rounded-xl overflow-hidden">
              <div className="bg-green-100 dark:bg-green-900/50 px-4 py-2 font-bold text-green-800 dark:text-green-200">✅ 좋은 인터랙션의 특징</div>
              <ul className="p-4 bg-white dark:bg-slate-800 list-disc pl-8 space-y-1 text-sm">
                <li>직관적이다</li>
                <li>인지 부하가 낮다</li>
                <li>피드백이 명확하다</li>
                <li>사용자의 기존 경험과 맞는다</li>
                <li>작업 흐름이 자연스럽다</li>
                <li>불필요한 선택이 적다</li>
              </ul>
            </div>
            
            <div className="border border-red-200 dark:border-red-900/50 rounded-xl overflow-hidden">
              <div className="bg-red-100 dark:bg-red-900/50 px-4 py-2 font-bold text-red-800 dark:text-red-200">❌ 나쁜 인터랙션의 특징</div>
              <ul className="p-4 bg-white dark:bg-slate-800 list-disc pl-8 space-y-1 text-sm">
                <li>선택지가 너무 많다</li>
                <li>무엇을 해야 하는지 불명확하다</li>
                <li>피드백이 부족하다</li>
                <li>시스템 논리를 사용자에게 강요한다</li>
                <li>익숙한 기대를 깨뜨린다</li>
              </ul>
            </div>
          </div>
          
          <div className="border border-purple-200 dark:border-purple-900/50 rounded-xl overflow-hidden mt-2">
            <div className="bg-purple-100 dark:bg-purple-900/50 px-4 py-2 font-bold text-purple-800 dark:text-purple-200">키오스크 사례의 교훈</div>
            <div className="p-4 bg-white dark:bg-slate-800">문제는 작은 글씨가 아니라 복잡한 절차와 과도한 선택지였음</div>
          </div>
          
          <div className="border border-purple-200 dark:border-purple-900/50 rounded-xl overflow-hidden">
            <div className="bg-purple-100 dark:bg-purple-900/50 px-4 py-2 font-bold text-purple-800 dark:text-purple-200">인지 측면의 교훈</div>
            <div className="p-4 bg-white dark:bg-slate-800">사람은 한 번에 많은 정보를 처리하지 못하므로 설계는 작업기억을 아껴줘야 함</div>
          </div>

        </div>
      </>
    )
  },
  {
    id: 27,
    title: "한 번에 이해되는 전체 흐름 압축본",
    content: (
      <>
        <div className="relative p-6 md:p-10 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl">📚</div>
          
          <p className="mb-4 text-lg leading-relaxed">
            이 강의는 먼저 <span className="text-blue-400 font-bold">“요즘 디지털 제품에서는 왜 소프트웨어와 UI가 중요해졌는가”</span>를 설명합니다.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            그 다음 UI가 단순한 화면 꾸미기가 아니라 사용자 경험을 결정하는 핵심 수단임을 보여줍니다.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            하지만 더 중요한 것은 화면의 모양보다 사용자가 시스템과 어떻게 상호작용하느냐이기 때문에, <span className="text-indigo-400 font-bold">인터랙션 디자인</span>이라는 개념이 등장합니다.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            이후 나쁜 사례와 좋은 사례를 비교하면서 좋은 인터랙션은 명확한 행동 흐름, 적은 인지 부담, 좋은 피드백, 익숙한 구조를 가진다는 점을 보여줍니다.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            그리고 실제 <span className="text-yellow-400 font-bold">장노년층 키오스크 프로젝트</span>를 통해 문제를 단순 시각 요소가 아니라 작업 절차와 선택 구조의 문제로 봐야 한다는 것을 설명합니다.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            마지막으로 왜 이런 문제가 생기는지 설명하기 위해 인간의 감각, 지각, 인지, 기억, <span className="text-purple-400 font-bold">인지 부하</span> 개념을 도입합니다.
          </p>
          
          <div className="mt-8 pt-6 border-t border-slate-700 text-xl font-black text-center text-white">
            결국 HCI는 기술 중심 설계가 아니라, <br className="hidden md:block"/>
            <span className="text-green-400">인간의 한계와 습관을 이해한 상태에서 더 나은 상호작용을 만드는 학문</span>이라는 결론으로 이어집니다.
          </div>
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