import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Menu, ChevronLeft, ChevronRight, X, 
  Terminal, CheckCircle, AlertTriangle, ArrowRight, 
  GitBranch, GitMerge, GitPullRequest, RotateCcw, 
  Box, Search, ShieldAlert, Zap, LayoutGrid, FileCode2,
  Settings, FolderGit2, DownloadCloud, UploadCloud, Trash2
} from 'lucide-react';

const GitPracticeBook = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 진행도 계산 (총 23개 장: 1~22장 + 치트시트)
  const progress = ((currentChapter + 1) / 23) * 100;

  // 컴포넌트: 터미널 코드 블록
  const CodeBlock = ({ code, desc, title = "터미널" }) => (
    <div className="my-5 rounded-xl overflow-hidden border border-gray-700 shadow-xl bg-gray-900">
      <div className="bg-gray-800 text-gray-400 text-xs px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2"><Terminal size={14} /> {title}</div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="p-4 font-mono text-sm overflow-x-auto whitespace-pre leading-relaxed">
        {code.split('\n').map((line, i) => {
          // 주석이나 특정 키워드 색상 처리 (간단한 하이라이팅)
          if (line.startsWith('#')) return <div key={i} className="text-gray-500">{line}</div>;
          if (line.startsWith('git ')) return <div key={i}><span className="text-blue-400">git</span> <span className="text-green-300">{line.substring(4)}</span></div>;
          if (line.startsWith('cd ') || line.startsWith('dir ') || line.startsWith('ls ')) return <div key={i}><span className="text-yellow-300">{line}</span></div>;
          return <div key={i} className="text-gray-300">{line}</div>;
        })}
      </div>
      {desc && <div className="bg-gray-800 text-gray-300 p-3 text-sm border-t border-gray-700 italic flex gap-2"><ArrowRight size={16} className="shrink-0 mt-0.5 text-gray-500"/>{desc}</div>}
    </div>
  );

  // 컴포넌트: Case 박스 (실습 상황 강조)
  const CaseBox = ({ num, title, children }) => (
    <div className="mb-10 relative">
      <div className="absolute -left-3 md:-left-6 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></div>
      <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 flex items-start md:items-center gap-2 flex-col md:flex-row">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-mono shadow-sm whitespace-nowrap">Case {num}</span>
        <span>{title}</span>
      </h3>
      <div className="pl-2 md:pl-0 text-gray-700 space-y-4">
        {children}
      </div>
    </div>
  );

  // 컴포넌트: 출력 결과 블록
  const OutputBlock = ({ text }) => (
    <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg font-mono text-sm text-gray-700 whitespace-pre overflow-x-auto my-3 shadow-inner">
      {text}
    </div>
  );

  const chapters = [
    {
      title: "1. 실습에 사용할 가상 환경",
      content: (
        <div className="space-y-8">
          <p className="text-lg text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-100">
            이번 설명에서는 예시를 위해 아래처럼 가상의 정보를 사용하겠습니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><Settings size={20}/> 사용자 정보</h3>
              <ul className="space-y-2 text-gray-600 font-mono text-sm">
                <li><strong className="text-gray-800 font-sans">GitHub 아이디:</strong> minsu-dev</li>
                <li><strong className="text-gray-800 font-sans">이름:</strong> Kim Minsu</li>
                <li><strong className="text-gray-800 font-sans">이메일:</strong> minsu@example.com</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><FolderGit2 size={20}/> 저장소 정보</h3>
              <ul className="space-y-2 text-gray-600 font-mono text-sm break-all">
                <li><strong className="text-gray-800 font-sans">GitHub 주소:</strong> https://github.com/minsu-dev/todo-app.git</li>
                <li><strong className="text-gray-800 font-sans">원격 저장소 이름:</strong> origin</li>
                <li><strong className="text-gray-800 font-sans">기본 브랜치 이름:</strong> main</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center gap-2"><ShieldAlert size={20}/> 예시 토큰</h3>
            <p className="font-mono bg-white p-2 rounded border border-yellow-300 text-sm break-all mb-2">Personal Access Token 예시: ghp_abcd1234example5678token9999</p>
            <p className="text-gray-700 text-sm">이 토큰 문자열은 예시일 뿐입니다. 실제로는 본인 토큰을 사용해야 합니다.</p>
          </div>

          <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Terminal size={20}/> 작업 폴더 예시</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Windows 기준 예시:</p>
                <div className="bg-black p-2 rounded font-mono text-green-400 text-sm">C:\dev</div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Mac 기준 예시:</p>
                <div className="bg-black p-2 rounded font-mono text-green-400 text-sm">~/dev</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "2. 터미널 기본 준비",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Terminal className="text-blue-500"/> Windows 터미널 환경</h3>
              <p className="text-sm text-gray-500 mb-2">Windows에서는 보통 아래 중 하나를 많이 씁니다.</p>
              <ul className="list-disc pl-5 text-gray-700 font-medium">
                <li>Cmder</li>
                <li>PowerShell</li>
                <li>Windows Terminal</li>
                <li>Git Bash</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Terminal className="text-gray-800"/> Mac 터미널 환경</h3>
              <p className="text-sm text-gray-500 mb-2">Mac에서는 보통 아래를 씁니다.</p>
              <ul className="list-disc pl-5 text-gray-700 font-medium">
                <li>iTerm2</li>
                <li>기본 Terminal</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold border-b pb-2 mb-4">현재 폴더 내용 보기</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-gray-700 mb-2">Windows 계열:</p>
                <CodeBlock code="dir" />
                <p className="font-bold text-gray-700 mb-2 mt-4">간단히 넓게 보기:</p>
                <CodeBlock code="dir /w" />
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-2">Mac/Linux 계열:</p>
                <CodeBlock code="ls" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold border-b pb-2 mb-4">폴더 이동</h3>
            <p className="mb-2">예를 들어 <code>C:\dev</code>로 이동:</p>
            <CodeBlock code="cd C:\dev" />
            <p className="mb-2 mt-4">Mac이면:</p>
            <CodeBlock code="cd ~/dev" />
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
              <p className="font-bold text-blue-900 mb-2">상위 폴더로 한 칸 뒤로 가기:</p>
              <code className="bg-white px-3 py-1 rounded font-mono text-blue-800 border">cd ..</code>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6 bg-gray-100 p-4 rounded-lg">
              <div>
                <p className="font-bold text-gray-700 mb-2">현재 위치 확인 (Windows):</p>
                <code className="bg-white px-3 py-1 rounded font-mono border">cd</code>
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-2">현재 위치 확인 (Mac/Linux):</p>
                <code className="bg-white px-3 py-1 rounded font-mono border">pwd</code>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Git 설치 확인과 사용자 정보 설정",
      content: (
        <div className="space-y-8">
          <CaseBox num="1" title="Git이 설치되어 있는지 확인하고 싶다">
            <p className="font-bold">입력:</p>
            <CodeBlock code="git --version" />
            <p className="font-bold mt-4">예상 출력 예시:</p>
            <OutputBlock text="git version 2.49.0.windows.1" />
            <p className="text-blue-600 font-bold bg-blue-50 p-2 rounded inline-block">이렇게 버전이 나오면 설치된 것입니다.</p>
          </CaseBox>

          <CaseBox num="2" title="처음 Git을 설치했고 사용자 정보 등록이 필요하다">
            <p className="font-bold">입력:</p>
            <CodeBlock code={'git config --global user.name "Kim Minsu"\ngit config --global user.email "minsu@example.com"'} />
            
            <p className="font-bold mt-6">확인:</p>
            <CodeBlock code="git config --global --list" />
            
            <p className="font-bold mt-4">예상 출력 예시:</p>
            <OutputBlock text={'user.name=Kim Minsu\nuser.email=minsu@example.com'} />
            <p className="text-gray-700 bg-gray-100 p-3 rounded">이 이름과 이메일은 커밋 작성자로 남습니다.</p>
          </CaseBox>
        </div>
      )
    },
    {
      title: "4. 새 프로젝트를 처음 시작하는 경우",
      content: (
        <div className="space-y-8">
          <p className="text-lg bg-gray-100 p-4 rounded-lg text-center font-bold text-gray-700 mb-8">
            이 경우는 아직 GitHub에 저장소가 없거나<br/>로컬에서 먼저 프로젝트를 만들고 Git을 붙이는 흐름입니다.
          </p>

          <CaseBox num="3" title="내 컴퓨터 폴더를 Git 프로젝트로 만들고 싶다">
            <p className="text-gray-700 mb-2">예를 들어 <code>C:\dev\my-first-project</code> 폴더를 만들었다고 가정하겠습니다.</p>
            
            <p className="font-bold mt-4">폴더 이동 & Git 초기화:</p>
            <CodeBlock code={'cd C:\\dev\\my-first-project\ngit init'} />
            
            <p className="font-bold mt-4">예상 출력 예시:</p>
            <OutputBlock text="Initialized empty Git repository in C:/dev/my-first-project/.git/" />
            <p className="text-green-600 font-bold mb-6">이제 이 폴더는 Git이 관리하는 저장소가 됩니다.</p>

            <p className="font-bold mt-4">상태 확인:</p>
            <CodeBlock code="git status" />
            <p className="font-bold mt-4">예상 출력 예시:</p>
            <OutputBlock text={'On branch main\n\nNo commits yet\n\nnothing to commit'} />
          </CaseBox>

          <CaseBox num="4" title="새 파일을 만들고 첫 커밋을 하고 싶다">
            <p className="text-gray-700 mb-2">예를 들어 <code>README.md</code> 파일을 만들었다고 하겠습니다.</p>
            
            <p className="font-bold mt-4">상태 확인:</p>
            <CodeBlock code="git status" />
            <p className="font-bold mt-2">예상 출력 예시:</p>
            <OutputBlock text={'Untracked files:\n  (use "git add <file>..." to include in what will be committed)\n        README.md'} />
            <p className="text-sm bg-yellow-50 text-yellow-800 p-2 rounded border border-yellow-200 inline-block mb-4">의미: 아직 Git이 추적하지 않는 새 파일</p>

            <p className="font-bold mt-4">스테이징 & 상태 다시 확인:</p>
            <CodeBlock code={'git add README.md\ngit status'} />
            <p className="font-bold mt-2">예상 출력 예시:</p>
            <OutputBlock text={'Changes to be committed:\n        new file:   README.md'} />

            <p className="font-bold mt-4">커밋:</p>
            <CodeBlock code={'git commit -m "초기 README 파일 추가"'} />
            <p className="font-bold mt-2">예상 출력 예시:</p>
            <OutputBlock text={'[main (root-commit) a1b2c3d] 초기 README 파일 추가\n 1 file changed, 5 insertions(+)\n create mode 100644 README.md'} />
          </CaseBox>

          <CaseBox num="5" title="로컬 프로젝트를 GitHub와 연결하고 싶다">
            <p className="text-gray-700 mb-4">GitHub에서 <code>my-first-project</code> 저장소를 이미 만들었다고 가정합니다.</p>
            
            <p className="font-bold">원격 저장소 연결 & 확인:</p>
            <CodeBlock code={'git remote add origin https://github.com/minsu-dev/my-first-project.git\ngit remote -v'} />
            <p className="font-bold mt-2">예상 출력:</p>
            <OutputBlock text={'origin  https://github.com/minsu-dev/my-first-project.git (fetch)\norigin  https://github.com/minsu-dev/my-first-project.git (push)'} />

            <p className="font-bold mt-6">첫 push:</p>
            <CodeBlock code="git push -u origin main" />
            <p className="bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-200 mt-2 font-semibold">
              이제부터는 upstream이 연결되어 나중에는 <code>git push</code>만으로도 되는 경우가 많습니다.
            </p>
          </CaseBox>
        </div>
      )
    },
    {
      title: "5. GitHub에 있는 프로젝트를 받아서 작업하는 경우",
      content: (
        <div className="space-y-8">
          <p className="text-lg bg-indigo-50 text-indigo-900 font-bold p-4 rounded-xl text-center shadow-sm">
            실무에서는 이 케이스가 매우 흔합니다.
          </p>

          <CaseBox num="6" title="GitHub 저장소를 내 컴퓨터로 복제하고 싶다">
            <p className="font-bold">입력:</p>
            <CodeBlock code={'cd C:\\dev\ngit clone https://github.com/minsu-dev/todo-app.git'} />
            
            <p className="font-bold mt-4">예상 출력 예시:</p>
            <OutputBlock text={'Cloning into \'todo-app\'...\nremote: Enumerating objects: 20, done.\nremote: Counting objects: 100% (20/20), done.\nReceiving objects: 100% (20/20), done.\nResolving deltas: 100% (5/5), done.'} />

            <p className="font-bold mt-6">폴더 이동 및 현재 상태 확인:</p>
            <CodeBlock code={'cd todo-app\ngit status'} />
            
            <p className="font-bold mt-4">예상 출력 예시:</p>
            <OutputBlock text={'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean'} />

            <div className="bg-gray-100 border border-gray-300 p-4 rounded-xl mt-4">
              <p className="font-bold text-gray-800 mb-2">이 말은:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 font-medium">
                <li>현재 <code>main</code> 브랜치에 있고</li>
                <li>원격 <code>origin/main</code>과 동일하며</li>
                <li>수정된 파일이 없음</li>
              </ul>
            </div>
          </CaseBox>
        </div>
      )
    },
    {
      title: "6. 파일 수정 후 add, commit, push",
      content: (
        <div className="space-y-8">
          <p className="text-lg bg-gray-800 text-white p-3 rounded text-center font-bold">이제 가장 기본적인 실습입니다.</p>

          <CaseBox num="7" title="파일 하나 수정하고 GitHub에 반영하고 싶다">
            <p className="text-gray-700 mb-2">예를 들어 <code>README.md</code>를 열어서 아래 내용을 추가했다고 가정하겠습니다.</p>
            <div className="bg-gray-100 p-3 rounded font-mono text-sm border mb-4">
              ## 실행 방법<br/>
              1. npm install<br/>
              2. npm run dev
            </div>

            <p className="font-bold">상태 확인:</p>
            <CodeBlock code="git status" />
            <p className="font-bold mt-2">예상 출력 예시:</p>
            <OutputBlock text={'On branch main\nYour branch is up to date with \'origin/main\'.\n\nChanges not staged for commit:\n        modified:   README.md'} />
            <p className="text-sm bg-yellow-50 text-yellow-800 p-2 rounded border border-yellow-200 inline-block mb-4 font-bold">의미: 파일은 수정했지만 아직 add 안 함</p>

            <p className="font-bold mt-4">스테이징 & 상태 확인:</p>
            <CodeBlock code={'git add README.md\ngit status'} />
            <p className="font-bold mt-2">예상 출력 예시:</p>
            <OutputBlock text={'Changes to be committed:\n        modified:   README.md'} />

            <p className="font-bold mt-6">커밋 & push:</p>
            <CodeBlock code={'git commit -m "README에 실행 방법 추가"\ngit push origin main'} />
            <p className="text-gray-500 text-sm mt-2 ml-2 italic">혹은 upstream이 이미 연결되어 있으면: <code className="bg-gray-200 px-1 rounded not-italic text-gray-800">git push</code></p>
          </CaseBox>
        </div>
      )
    },
    {
      title: "7. push가 정확히 무엇을 올리는지 체감하기",
      content: (
        <div className="space-y-8">
          <p className="text-lg text-red-600 font-bold bg-red-50 p-3 rounded-lg border border-red-200 text-center">
            이 부분은 매우 중요합니다.
          </p>

          <CaseBox num="8" title="파일만 수정하고 push하면 되는 줄 알았다">
            <p className="text-gray-700 mb-2">예를 들어 <code>app.js</code>를 수정했는데 아래만 입력했다고 가정하겠습니다.</p>
            <CodeBlock code="git push" />
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
              <p className="font-bold text-yellow-800 text-lg mb-2 flex items-center gap-2"><AlertTriangle size={20}/> 그런데 아무것도 안 올라갑니다.</p>
              <p className="text-gray-700">왜냐하면 push는 <strong className="bg-yellow-200 px-1 rounded">커밋된 내용만</strong> 올리기 때문입니다.</p>
            </div>

            <p className="font-bold mt-6">즉 아래 상태라면:</p>
            <CodeBlock code="git status" />
            <OutputBlock text={'Changes not staged for commit:\n        modified:   app.js'} />
            <p className="text-red-600 font-bold mb-6 bg-red-50 inline-block p-2 rounded">이 상태에서는 push할 대상이 없습니다.</p>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
              <h4 className="font-bold text-blue-900 mb-4 text-lg flex items-center gap-2"><CheckCircle size={20}/> 반드시 아래 순서가 필요합니다.</h4>
              <CodeBlock code={'git add app.js\ngit commit -m "앱 진입 로직 수정"\ngit push'} />
              
              <div className="mt-6 pt-6 border-t border-blue-200">
                <h4 className="font-bold text-gray-800 mb-3 text-lg">핵심 감각은 이것입니다.</h4>
                <div className="flex flex-col gap-2 font-mono bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <div className="flex items-center gap-3"><span className="w-20 text-right bg-gray-100 px-2 py-1 rounded">파일 수정</span> = <span className="text-gray-600">아직 로컬 작업 중</span></div>
                  <div className="flex items-center gap-3"><span className="w-20 text-right bg-yellow-100 px-2 py-1 rounded">add</span> = <span className="text-gray-600">커밋할 준비</span></div>
                  <div className="flex items-center gap-3"><span className="w-20 text-right bg-green-100 px-2 py-1 rounded">commit</span> = <span className="text-gray-600 font-bold">Git 기록 생성</span></div>
                  <div className="flex items-center gap-3"><span className="w-20 text-right bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">push</span> = <span className="text-blue-700 font-bold">그 기록을 서버에 업로드</span></div>
                </div>
              </div>
            </div>
          </CaseBox>
        </div>
      )
    },
    {
      title: "8. pull로 최신 내용 받기",
      content: (
        <div className="space-y-8">
          
          <CaseBox num="9" title="팀원이 GitHub에 수정사항을 올렸고 나는 최신 내용을 받아오고 싶다">
            <p className="font-bold">입력:</p>
            <CodeBlock code="git pull origin main" />
            
            <p className="font-bold mt-4">예상 출력 예시:</p>
            <OutputBlock text={'From https://github.com/minsu-dev/todo-app\n * branch            main       -> FETCH_HEAD\nUpdating a1b2c3d..d4e5f6g\nFast-forward\n src/App.js | 10 +++++-----\n 1 file changed, 5 insertions(+), 5 deletions(-)'} />
            
            <div className="bg-gray-100 border border-gray-300 p-4 rounded-xl mt-4">
              <p className="font-bold text-gray-800 mb-2">이 뜻은:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 font-medium">
                <li>원격 main의 최신 내용을 가져왔고</li>
                <li>현재 내 브랜치에 반영했으며</li>
                <li>fast-forward로 깔끔하게 업데이트되었다는 뜻입니다.</li>
              </ul>
            </div>
          </CaseBox>

          <CaseBox num="10" title="pull 전에 내 상태를 먼저 확인하고 싶다">
            <p className="font-bold text-blue-800 bg-blue-50 p-2 rounded inline-block mb-2">좋은 습관은 이렇습니다.</p>
            <CodeBlock code={'git status\ngit pull origin main'} />
            
            <p className="text-gray-700 bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-4 flex items-center gap-2 font-semibold">
              <AlertTriangle className="text-yellow-600 shrink-0"/> 만약 수정 중인 파일이 많으면 pull 전에 commit하거나 stash하는 것이 더 안전합니다.
            </p>
          </CaseBox>
        </div>
      )
    },
    {
      title: "9. 브랜치 만들어 기능 작업하기",
      content: (
        <div className="space-y-8">
          <p className="text-lg bg-gray-800 text-white p-3 rounded text-center font-bold">
            실무에서는 main에서 바로 작업하지 않는 경우가 많습니다.
          </p>

          <CaseBox num="11" title="로그인 기능을 새 브랜치에서 만들고 싶다">
            
            <div className="space-y-6">
              <div>
                <p className="font-bold text-gray-700 mb-1">먼저 main 최신화:</p>
                <CodeBlock code={'git switch main\ngit pull origin main'} />
              </div>

              <div>
                <p className="font-bold text-gray-700 mb-1">브랜치 생성 후 이동 & 확인:</p>
                <CodeBlock code={'git switch -c feature/login\ngit branch'} />
                <p className="font-bold text-sm mt-2">예상 출력:</p>
                <OutputBlock text={'* feature/login\n  main'} />
                <p className="text-green-600 font-bold bg-green-50 inline-block p-1 rounded mt-1 text-sm">이제 로그인 관련 작업을 합니다.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 mb-2">예를 들어 <code>src/Login.jsx</code> 파일 생성 후...</p>
                <p className="font-bold text-gray-700 mb-1">상태 확인 & 스테이징 & 커밋:</p>
                <CodeBlock code={'git status\ngit add src/Login.jsx\ngit commit -m "로그인 컴포넌트 추가"'} />
                
                <p className="font-bold text-gray-700 mb-1 mt-4">다음 수정이 더 생기면:</p>
                <CodeBlock code={'git add .\ngit commit -m "로그인 입력값 유효성 검사 추가"'} />
              </div>

              <div>
                <p className="font-bold text-blue-800 mb-1 flex items-center gap-2"><UploadCloud size={18}/> 이제 원격에 내 브랜치 올리기:</p>
                <CodeBlock code="git push -u origin feature/login" />
                <p className="font-bold text-gray-800 bg-gray-100 p-3 rounded mt-2 text-center shadow-sm">
                  이제 GitHub에 <code>feature/login</code> 브랜치가 생깁니다.
                </p>
              </div>
            </div>
            
          </CaseBox>
        </div>
      )
    },
    {
      title: "10. main에 merge 하기",
      content: (
        <div className="space-y-8">
          <CaseBox num="12" title="feature/login 작업이 끝났고 main에 합치고 싶다">
            <p className="text-lg font-bold text-gray-800 mb-6 bg-gray-100 p-3 rounded text-center">방법은 두 가지 감각으로 생각하시면 됩니다.</p>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* 로컬 Merge */}
              <div className="bg-white border-2 border-green-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-xl font-bold text-green-800 mb-4 pb-2 border-b flex items-center gap-2"><GitMerge/> 로컬에서 merge하는 경우</h4>
                
                <p className="font-bold text-sm text-gray-600">먼저 main으로 이동 & 최신화:</p>
                <CodeBlock code={'git switch main\ngit pull origin main'} />
                
                <p className="font-bold text-sm text-gray-600 mt-4">merge:</p>
                <CodeBlock code="git merge feature/login" />
                
                <p className="font-bold text-sm text-gray-600 mt-4">문제가 없으면 push:</p>
                <CodeBlock code="git push origin main" />
                
                <p className="font-bold text-sm text-gray-600 mt-4 flex items-center gap-1"><Trash2 size={14}/> 작업이 끝난 브랜치 삭제 (로컬/원격):</p>
                <CodeBlock code={'git branch -d feature/login\ngit push origin --delete feature/login'} />
              </div>

              {/* GitHub PR */}
              <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm relative">
                <div className="absolute -top-3 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">실무 권장</div>
                <h4 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b flex items-center gap-2"><GitPullRequest/> GitHub Pull Request로 merge</h4>
                <p className="text-gray-600 mb-4 font-bold bg-blue-50 p-2 rounded">보통 실무는 이 흐름이 많습니다.</p>
                
                <ol className="list-decimal pl-5 space-y-3 text-gray-700 font-medium mb-6">
                  <li><code>feature/login</code>을 원격에 push</li>
                  <li className="text-blue-700 font-bold">GitHub에서 Pull Request 생성</li>
                  <li>리뷰</li>
                  <li className="text-blue-700 font-bold">GitHub에서 merge</li>
                  <li>로컬 main 최신화</li>
                </ol>

                <p className="font-bold text-sm text-gray-600 bg-gray-100 p-2 rounded">그 후 로컬에서 마무리:</p>
                <CodeBlock code={'git switch main\ngit pull origin main\ngit branch -d feature/login'} />
              </div>

            </div>
          </CaseBox>
        </div>
      )
    },
    {
      title: "11. 충돌 conflict 해결 실습",
      content: (
        <div className="space-y-8">
          <p className="text-xl bg-red-600 text-white p-3 rounded-xl text-center font-bold shadow-md animate-pulse">
            이제 정말 중요한 실전입니다.
          </p>

          <CaseBox num="13" title="나와 팀원이 같은 줄을 수정해서 pull 중 충돌이 났다">
            <p className="font-bold text-gray-700 mb-4">상황을 가정해보겠습니다.</p>
            
            <div className="grid md:grid-cols-3 gap-4 font-mono text-sm mb-6">
              <div className="bg-gray-100 p-3 rounded border shadow-sm">
                <div className="text-xs text-gray-500 mb-1 font-sans font-bold">현재 README.md 원래 내용</div>
                ## 실행 방법<br/>npm start
              </div>
              <div className="bg-blue-50 p-3 rounded border border-blue-200 shadow-sm">
                <div className="text-xs text-blue-600 mb-1 font-sans font-bold">팀원은 GitHub에 이렇게 올림</div>
                ## 실행 방법<br/>npm run dev
              </div>
              <div className="bg-green-50 p-3 rounded border border-green-200 shadow-sm">
                <div className="text-xs text-green-600 mb-1 font-sans font-bold">나는 로컬에서 이렇게 바꿈</div>
                ## 실행 방법<br/>npm run start
              </div>
            </div>

            <p className="font-bold">이 상태에서 내가 pull:</p>
            <CodeBlock code="git pull origin main" />
            
            <p className="font-bold mt-4 text-red-600">예상 출력 예시 (충돌 발생!):</p>
            <OutputBlock text={'Auto-merging README.md\nCONFLICT (content): Merge conflict in README.md\nAutomatic merge failed; fix conflicts and then commit the result.'} />

            <div className="bg-gray-900 rounded-xl p-4 my-6 shadow-xl">
              <p className="text-white mb-2 font-bold flex items-center gap-2"><FileCode2 size={18}/> 이제 README.md를 열어보면 보통 이런 식으로 표시됩니다.</p>
              <div className="bg-black p-4 rounded font-mono text-sm">
                <div className="text-gray-300">## 실행 방법</div>
                <div className="text-green-400 font-bold bg-green-900/30 px-2 py-1 -mx-2">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</div>
                <div className="text-green-300">npm run start</div>
                <div className="text-yellow-400 font-bold bg-yellow-900/30 px-2 py-1 -mx-2">=======</div>
                <div className="text-blue-300">npm run dev</div>
                <div className="text-blue-400 font-bold bg-blue-900/30 px-2 py-1 -mx-2">&gt;&gt;&gt;&gt;&gt;&gt;&gt; d4e5f6g...</div>
              </div>
              <div className="mt-4 text-sm text-gray-400 flex gap-4">
                <span><span className="text-green-400 font-bold">위쪽</span>은 내 현재 브랜치 내용</span>
                <span><span className="text-blue-400 font-bold">아래쪽</span>은 원격에서 들어온 내용</span>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 p-5 rounded-xl">
              <p className="font-bold text-red-900 text-lg mb-2">이제 사람이 최종 내용 정해야 합니다.</p>
              <p className="text-gray-700 mb-2">예를 들어 최종적으로 이렇게 하기로 했다고 하겠습니다.</p>
              <div className="bg-white p-3 rounded border font-mono text-sm mb-3">## 실행 방법<br/>npm run dev</div>
              <p className="font-bold text-gray-800 bg-yellow-100 p-2 rounded inline-block">충돌 표시를 전부 지우고 저장합니다.</p>
              
              <p className="font-bold mt-4">그다음 해결 마무리:</p>
              <CodeBlock code={'git add README.md\ngit commit -m "README 실행 명령 충돌 해결"\ngit push origin main'} />
              <p className="text-sm text-gray-500 italic mt-2">상황에 따라 pull이 merge commit을 자동으로 요구할 수 있습니다.</p>
            </div>
          </CaseBox>

          <CaseBox num="14" title="충돌이 났을 때 무엇부터 봐야 하나">
            <p className="font-bold bg-gray-100 p-2 rounded inline-block">이 순서로 보시면 됩니다.</p>
            <CodeBlock code="git status" />
            <OutputBlock text={'Unmerged paths:\n  both modified:   README.md'} />
            <p className="text-gray-700 mb-4 bg-white border p-3 rounded-lg font-bold shadow-sm">즉: 병합 안 된 파일이 README.md라는 뜻</p>
            
            <div className="flex flex-wrap items-center gap-2 font-bold text-blue-800 bg-blue-50 p-4 rounded-xl border border-blue-200">
              <span className="bg-white px-3 py-1 rounded shadow-sm">파일 열기</span> <ArrowRight size={16}/>
              <span className="bg-white px-3 py-1 rounded shadow-sm">충돌 표식 정리</span> <ArrowRight size={16}/>
              <span className="bg-white px-3 py-1 rounded shadow-sm font-mono">git add</span> <ArrowRight size={16}/>
              <span className="bg-white px-3 py-1 rounded shadow-sm font-mono">git commit</span>
            </div>
          </CaseBox>
        </div>
      )
    },
    {
      title: "12. commit을 잘못했을 때",
      content: (
        <div className="space-y-8">
          <CaseBox num="15" title="커밋 메시지만 잘못 썼다">
            <p className="text-gray-700 mb-2">방금 커밋했는데 메시지가 이상하다면:</p>
            <CodeBlock code={'git commit --amend -m "로그인 폼 스타일 수정"'} />
            <p className="font-bold text-blue-800 bg-blue-50 p-2 rounded inline-block mb-4">이렇게 하면 마지막 커밋 메시지를 바꿀 수 있습니다.</p>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-800 flex items-center gap-2 font-bold text-sm">
              <AlertTriangle size={18} /> 주의: 이미 push한 뒤라면 팀 협업 상황에서는 조심해야 합니다.
            </div>
          </CaseBox>

          <CaseBox num="16" title="커밋에 빠진 파일이 하나 있다">
            <p className="text-gray-700 mb-4">예를 들어 <code>Login.jsx</code>는 커밋했는데 <code>login.css</code>를 빼먹었다고 하겠습니다.</p>
            
            <p className="font-bold">먼저 빠진 파일 add:</p>
            <CodeBlock code="git add src/login.css" />
            
            <p className="font-bold mt-4">그다음 amend:</p>
            <CodeBlock code="git commit --amend" />
            <p className="font-bold text-gray-800 bg-gray-100 p-3 rounded mb-4 shadow-sm">그러면 마지막 커밋에 합쳐 넣을 수 있습니다.</p>
            
            <p className="font-bold">메시지를 바로 지정하려면:</p>
            <CodeBlock code={'git commit --amend -m "로그인 폼 및 스타일 추가"'} />
          </CaseBox>
        </div>
      )
    },
    {
      title: "13. add를 잘못했을 때",
      content: (
        <div className="space-y-8">
          <CaseBox num="17" title="git add . 했는데 원하지 않는 파일까지 올라갔다">
            <p className="text-gray-700 mb-2">예를 들어 <code>.env</code> 파일까지 add되어버렸다고 하겠습니다.</p>
            
            <p className="font-bold">상태 확인:</p>
            <CodeBlock code="git status" />
            <OutputBlock text={'Changes to be committed:\n        modified:   src/App.js\n        new file:   .env'} />
            
            <p className="font-bold mt-6 text-red-600 flex items-center gap-2"><RotateCcw size={18}/> .env만 스테이징 해제:</p>
            <CodeBlock code="git restore --staged .env" />
            
            <p className="font-bold mt-4">확인:</p>
            <CodeBlock code="git status" />
            <p className="font-bold text-green-800 bg-green-50 p-3 rounded border border-green-200 shadow-sm">
              이제 <code>.env</code>는 add 상태에서 빠지고 <code>src/App.js</code>만 남을 수 있습니다.
            </p>
          </CaseBox>

          <CaseBox num="18" title="아예 add를 전부 취소하고 싶다">
            <CodeBlock code="git restore --staged ." />
            <div className="bg-gray-100 border border-gray-300 p-4 rounded-xl mt-4">
              <p className="font-bold text-gray-800 mb-2">의미:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 font-medium">
                <li>전체 스테이징 취소</li>
                <li>파일 수정 내용 자체는 그대로 남음</li>
              </ul>
            </div>
          </CaseBox>
        </div>
      )
    },
    {
      title: "14. push 전 상태 점검하는 법",
      content: (
        <div className="space-y-8">
          <CaseBox num="19" title="지금 push해도 되는 상태인지 헷갈린다">
            <p className="text-lg font-bold text-blue-800 bg-blue-50 p-3 rounded-lg text-center mb-6 border border-blue-200">
              무조건 아래 3개를 먼저 보시면 좋습니다.
            </p>
            
            <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono text-lg shadow-xl border border-gray-700 mb-6 flex flex-col gap-2">
              <div><span className="text-gray-500 mr-2">$</span>git status</div>
              <div><span className="text-gray-500 mr-2">$</span>git branch</div>
              <div><span className="text-gray-500 mr-2">$</span>git log --oneline -5</div>
            </div>

            <p className="font-bold text-gray-700 mb-2">예를 들어 출력이 이렇다고 가정하겠습니다.</p>
            <OutputBlock text={'On branch feature/login\nYour branch is ahead of \'origin/feature/login\' by 2 commits.\nnothing to commit, working tree clean'} />

            <div className="bg-green-50 border border-green-200 p-5 rounded-xl my-6">
              <p className="font-bold text-green-900 mb-3 text-lg">이 뜻은:</p>
              <ul className="space-y-2 text-green-800 font-bold flex flex-col gap-2">
                <li className="flex items-center gap-2"><CheckCircle size={18}/> 현재 feature/login 브랜치에 있고</li>
                <li className="flex items-center gap-2"><CheckCircle size={18}/> 원격보다 커밋 2개 앞서 있고</li>
                <li className="flex items-center gap-2"><CheckCircle size={18}/> 작업 폴더는 깨끗하다</li>
                <li className="flex items-center gap-2 text-xl mt-2 bg-white px-3 py-2 rounded shadow-sm inline-flex w-max"><Zap className="text-yellow-500 fill-yellow-500"/> 즉 push하면 된다</li>
              </ul>
            </div>

            <p className="font-bold">이때:</p>
            <CodeBlock code="git push" />
          </CaseBox>
        </div>
      )
    },
    {
      title: "15. reset 실습",
      content: (
        <div className="space-y-8">
          <p className="text-lg bg-gray-800 text-white p-3 rounded text-center font-bold mb-6">reset은 되돌리기에서 매우 중요합니다.</p>

          <CaseBox num="20" title="마지막 커밋을 취소하되 파일 수정 내용은 남기고 싶다">
            <p className="text-gray-700 mb-2">예를 들어 방금 커밋했는데 커밋을 다시 나누고 싶다고 하겠습니다.</p>
            <CodeBlock code="git reset --mixed HEAD~1" />
            <p className="text-sm text-gray-500 ml-2 mt-1 mb-4 italic">또는 간단히: <code className="bg-gray-200 px-1 rounded not-italic text-gray-800">git reset HEAD~1</code></p>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
              <p className="font-bold text-yellow-900 mb-2">결과 (mixed):</p>
              <ul className="list-disc pl-5 text-yellow-800 font-medium">
                <li>마지막 커밋 취소</li>
                <li>스테이징 해제</li>
                <li><strong>파일 수정 내용은 그대로 남음</strong></li>
              </ul>
            </div>
            
            <p className="font-bold text-gray-800 bg-gray-100 p-2 rounded mb-2 inline-block">그다음 다시 필요한 파일만 add해서 커밋을 쪼갤 수 있습니다.</p>
            <CodeBlock code={'git add src/Login.jsx\ngit commit -m "로그인 컴포넌트 추가"\n\ngit add src/login.css\ngit commit -m "로그인 스타일 추가"'} />
          </CaseBox>

          <CaseBox num="21" title="마지막 커밋을 취소하되 add 상태는 유지하고 싶다">
            <CodeBlock code="git reset --soft HEAD~1" />
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
              <p className="font-bold text-blue-900 mb-2">결과 (soft):</p>
              <ul className="list-disc pl-5 text-blue-800 font-medium">
                <li>커밋만 사라짐</li>
                <li><strong>add 상태는 그대로</strong></li>
                <li>메시지만 다시 바꿔 커밋하고 싶을 때 유용</li>
              </ul>
            </div>
            
            <p className="font-bold">예:</p>
            <CodeBlock code={'git reset --soft HEAD~1\ngit commit -m "로그인 기능 1차 구현"'} />
          </CaseBox>

          <CaseBox num="22" title="마지막 커밋과 파일 수정까지 전부 버리고 싶다">
            <p className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded inline-block mb-2 border border-red-200">정말 버릴 때만:</p>
            <CodeBlock code="git reset --hard HEAD~1" />
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
              <p className="font-bold text-red-900 mb-2">결과 (hard):</p>
              <ul className="list-disc pl-5 text-red-800 font-bold">
                <li>마지막 커밋 삭제</li>
                <li>add 상태 삭제</li>
                <li><strong>작업 파일 변경도 삭제</strong></li>
              </ul>
            </div>
            <p className="text-center font-bold text-red-700">이건 복구가 어려울 수 있으니 정말 조심해야 합니다.</p>
          </CaseBox>
        </div>
      )
    },
    {
      title: "16. revert 실습",
      content: (
        <div className="space-y-8">
          <CaseBox num="23" title="이미 push한 잘못된 커밋을 안전하게 취소하고 싶다">
            <p className="text-gray-700 mb-2">예를 들어 <code>a1b2c3d</code>라는 커밋이 잘못되었다고 하겠습니다.</p>
            
            <p className="font-bold">로그 확인:</p>
            <CodeBlock code="git log --oneline" />
            <p className="font-bold mt-2">예시:</p>
            <OutputBlock text={'f6g7h8i 회원가입 문구 수정\na1b2c3d 로그인 버튼 삭제\nz9y8x7w 초기 세팅'} />

            <p className="font-bold mt-6 text-purple-700 bg-purple-50 p-2 rounded inline-block">a1b2c3d를 취소:</p>
            <CodeBlock code="git revert a1b2c3d" />
            
            <div className="bg-purple-100 p-4 rounded-xl text-purple-900 font-bold text-center border border-purple-200 shadow-sm my-4">
              그러면 Git이 새 커밋을 만듭니다.<br/>
              즉 이력은 유지하면서 그 커밋의 효과만 되돌립니다.
            </div>

            <p className="font-bold">그 후:</p>
            <CodeBlock code="git push origin main" />
            
            <p className="text-center font-bold text-lg bg-gray-100 p-4 rounded-lg mt-6">
              협업 중에는 <code className="bg-red-100 text-red-700 px-1 rounded">reset</code>보다 <code className="bg-purple-100 text-purple-700 px-1 rounded">revert</code>가 더 안전한 경우가 많습니다.
            </p>
          </CaseBox>
        </div>
      )
    },
    {
      title: "17. stash 실습",
      content: (
        <div className="space-y-8">
          <CaseBox num="24" title="작업 중인데 아직 commit하기는 애매하고 브랜치를 바꿔야 한다">
            <p className="text-gray-700 mb-4 bg-gray-50 p-4 rounded-lg border">
              예를 들어 <code>feature/login</code>에서 작업 중인데<br/>
              <strong className="text-red-600">급하게 main으로 가서 버그를 수정해야 한다고</strong> 하겠습니다.
            </p>

            <p className="font-bold">상태 확인:</p>
            <CodeBlock code="git status" />
            <OutputBlock text={'Changes not staged for commit:\n        modified:   src/Login.jsx\n        modified:   src/login.css'} />

            <p className="font-bold mt-6 text-blue-700 flex items-center gap-2"><Box size={18}/> 임시 보관:</p>
            <CodeBlock code="git stash" />
            <OutputBlock text={'Saved working directory and index state WIP on feature/login: a1b2c3d 로그인 컴포넌트 추가'} />
            
            <p className="font-bold text-green-700 bg-green-50 p-3 rounded text-center border border-green-200 shadow-sm my-4">
              이제 작업 트리가 깨끗해집니다.
            </p>

            <CodeBlock code="git status" />
            <OutputBlock text="nothing to commit, working tree clean" />

            <p className="font-bold mt-6">브랜치 이동 (급한 일 처리하러 감):</p>
            <CodeBlock code="git switch main" />

            <div className="bg-blue-50 border-t-4 border-blue-500 p-5 mt-6 rounded-b-xl shadow-sm">
              <p className="font-bold text-blue-900 mb-2">버그 수정 후 다시 로그인 작업으로 돌아가기:</p>
              <CodeBlock code={'git switch feature/login\ngit stash pop'} />
              <p className="text-center font-bold text-gray-700 mt-2 bg-white p-2 rounded">
                그러면 임시 보관했던 수정 내용이 다시 복원됩니다.
              </p>
            </div>
          </CaseBox>

          <CaseBox num="25" title="stash 목록을 보고 싶다">
            <CodeBlock code="git stash list" />
            <p className="font-bold mt-2">예상 출력 예시:</p>
            <OutputBlock text={'stash@{0}: WIP on feature/login: a1b2c3d 로그인 컴포넌트 추가\nstash@{1}: WIP on main: d4e5f6g 헤더 문구 수정'} />

            <p className="font-bold mt-6">특정 stash 적용:</p>
            <CodeBlock code="git stash apply stash@{0}" />
            
            <p className="font-bold mt-4">적용 후 목록에서도 제거하고 싶으면 보통 <code className="bg-gray-200 px-1 rounded">pop</code>을 씁니다.</p>
            <CodeBlock code="git stash pop stash@{0}" />
          </CaseBox>
        </div>
      )
    },
    {
      title: "18. 협업 흐름 실습",
      content: (
        <div className="space-y-6">
          <p className="text-lg bg-gray-800 text-white p-4 rounded-xl text-center font-bold shadow-md mb-8">
            이제 팀프로젝트 기준으로 실제 패턴을 보겠습니다.
          </p>

          <CaseBox num="26" title="팀프로젝트에서 새 기능을 개발하는 가장 일반적인 흐름">
            <div className="space-y-6 pl-2 md:pl-4 border-l-4 border-blue-200">
              
              <div className="relative">
                <div className="absolute -left-[26px] md:-left-[34px] top-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-sm">1</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">main 최신화</h4>
                <CodeBlock code={'git switch main\ngit pull origin main'} />
              </div>

              <div className="relative">
                <div className="absolute -left-[26px] md:-left-[34px] top-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-sm">2</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">브랜치 생성</h4>
                <CodeBlock code="git switch -c feature/signup" />
              </div>

              <div className="relative">
                <div className="absolute -left-[26px] md:-left-[34px] top-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-sm">3</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">작업</h4>
                <CodeBlock code={'git status\ngit add .\ngit commit -m "회원가입 폼 UI 추가"'} />
                <p className="font-bold text-sm text-gray-500 mt-2 mb-1">추가 작업:</p>
                <CodeBlock code={'git add .\ngit commit -m "회원가입 유효성 검사 추가"'} />
              </div>

              <div className="relative">
                <div className="absolute -left-[26px] md:-left-[34px] top-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-sm">4</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">원격에 브랜치 올리기</h4>
                <CodeBlock code="git push -u origin feature/signup" />
              </div>

              <div className="relative">
                <div className="absolute -left-[26px] md:-left-[34px] top-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shadow-sm">5</div>
                <h4 className="text-xl font-bold text-purple-800 mb-2 flex items-center gap-2"><GitPullRequest size={20}/> GitHub에서 Pull Request 생성</h4>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 shadow-sm font-mono text-sm space-y-2">
                  <p><strong className="text-purple-900">제목 예시:</strong> 회원가입 기능 추가</p>
                  <p className="text-purple-900 font-bold mb-1">내용 예시:</p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>회원가입 폼 UI 추가</li>
                    <li>이메일 형식 검사 추가</li>
                    <li>비밀번호 확인 로직 추가</li>
                  </ul>
                </div>
              </div>

              <div className="relative mt-6">
                <div className="absolute -left-[26px] md:-left-[34px] top-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-sm">6</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">리뷰 반영 후 추가 커밋</h4>
                <CodeBlock code={'git add .\ngit commit -m "리뷰 반영: 에러 메시지 문구 수정"\ngit push'} />
              </div>

              <div className="relative">
                <div className="absolute -left-[26px] md:-left-[34px] top-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-sm">7</div>
                <h4 className="text-xl font-bold text-green-800 mb-2">PR merge 후 로컬 정리</h4>
                <CodeBlock code={'git switch main\ngit pull origin main\ngit branch -d feature/signup\ngit push origin --delete feature/signup'} />
              </div>

            </div>
          </CaseBox>
        </div>
      )
    },
    {
      title: "19. GitHub 토큰과 인증 예시",
      content: (
        <div className="space-y-8">
          <p className="text-lg bg-yellow-50 text-yellow-900 p-4 rounded-xl border border-yellow-200 text-center font-bold shadow-sm">
            요즘 GitHub는 비밀번호 대신 토큰이나 SSH를 많이 씁니다.
          </p>

          <CaseBox num="27" title="HTTPS 방식으로 clone 또는 push할 때 인증이 필요하다">
            <p className="text-gray-700 mb-1 font-bold">저장소 주소 예시:</p>
            <div className="bg-gray-100 p-2 rounded font-mono text-sm border mb-4 break-all text-blue-600">https://github.com/minsu-dev/todo-app.git</div>

            <p className="text-gray-700 mb-2 font-bold bg-red-50 inline-block p-1 rounded">토큰을 직접 URL에 넣는 형태 예시는 이렇게 생길 수 있습니다.</p>
            <div className="bg-red-50 p-2 rounded font-mono text-sm border border-red-200 mb-2 break-all text-red-800">
              https://<strong className="text-red-600">ghp_abcd1234example5678token9999</strong>@github.com/minsu-dev/todo-app.git
            </div>
            <p className="text-sm text-gray-600 italic mb-4">예를 들어 clone 예시를 억지로 쓰면: <code>git clone https://ghp_...</code></p>

            <div className="bg-white border-l-4 border-red-500 p-4 shadow-sm mb-6">
              <p className="font-bold text-red-800 flex items-center gap-2"><AlertTriangle size={18}/> 하지만 이 방식은 보안상 추천되지 않습니다.</p>
              <p className="text-gray-700 mt-1">명령어 기록에 남을 수 있기 때문입니다.</p>
            </div>

            <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
              <h4 className="font-bold text-green-900 mb-3 text-lg flex items-center gap-2"><CheckCircle size={20}/> 더 나은 감각은 이렇습니다.</h4>
              <ul className="list-disc pl-5 space-y-2 text-green-800 font-medium">
                <li>URL은 일반 주소 사용</li>
                <li>push나 clone 시 인증창에서 username과 token 입력</li>
                <li>또는 Git Credential Manager 사용</li>
                <li>또는 SSH 키 사용</li>
              </ul>
              <div className="mt-4 border-t border-green-200 pt-4">
                <p className="font-bold text-gray-800 mb-2 bg-white px-2 py-1 rounded inline-block shadow-sm">즉 실전에서는 보통 이렇게 합니다.</p>
                <CodeBlock code="git clone https://github.com/minsu-dev/todo-app.git" />
                <p className="font-bold mt-2">그 후 인증이 뜨면:</p>
                <ul className="list-disc pl-5 font-mono text-sm mt-1 bg-white p-3 rounded border">
                  <li>아이디: minsu-dev</li>
                  <li>비밀번호 자리에 <strong className="text-blue-600 text-base">토큰 사용</strong></li>
                </ul>
              </div>
            </div>
          </CaseBox>

          <CaseBox num="28" title="remote 주소를 토큰 없는 일반 주소로 확인하고 싶다">
            <CodeBlock code="git remote -v" />
            <p className="font-bold mt-2">예시:</p>
            <OutputBlock text={'origin  https://github.com/minsu-dev/todo-app.git (fetch)\norigin  https://github.com/minsu-dev/todo-app.git (push)'} />
            <p className="text-gray-700 bg-gray-100 p-2 rounded text-center font-bold">이렇게 보이는 것이 일반적입니다.</p>
          </CaseBox>
        </div>
      )
    },
    {
      title: "20. 자주 쓰는 전체 패턴 모음",
      content: (
        <div className="space-y-6">
          <p className="text-lg bg-gray-800 text-white p-4 rounded-xl text-center font-bold shadow-md mb-8">
            여기서는 실전에서 진짜 자주 치는 패턴만 묶어드리겠습니다.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="bg-white border-2 border-blue-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-blue-900 mb-2 flex justify-between items-center"><span className="bg-blue-100 px-2 py-0.5 rounded">패턴 A</span> <span>수정 후 올리기</span></h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                git status<br/>git add .<br/>git commit -m "기능 설명"<br/>git push
              </div>
            </div>

            <div className="bg-white border-2 border-green-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-green-900 mb-2 flex justify-between items-center"><span className="bg-green-100 px-2 py-0.5 rounded">패턴 B</span> <span>작업 시작 전 최신화</span></h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                git switch main<br/>git pull origin main
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-purple-900 mb-2 flex justify-between items-center"><span className="bg-purple-100 px-2 py-0.5 rounded">패턴 C</span> <span>새 기능 브랜치 만들기</span></h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                git switch main<br/>git pull origin main<br/>git switch -c feature/navbar
              </div>
            </div>

            <div className="bg-white border-2 border-indigo-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-indigo-900 mb-2 flex justify-between items-center"><span className="bg-indigo-100 px-2 py-0.5 rounded">패턴 D</span> <span>feature 브랜치 원격에 올리기</span></h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                git push -u origin feature/navbar
              </div>
            </div>

            <div className="bg-white border-2 border-yellow-300 p-4 rounded-xl shadow-sm hover:shadow-md transition md:col-span-2">
              <h4 className="font-bold text-yellow-900 mb-2 flex justify-between items-center"><span className="bg-yellow-200 px-2 py-0.5 rounded">패턴 E</span> <span>현재 상황 점검 (무조건 외우기)</span></h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm flex flex-col md:flex-row gap-2 md:gap-8">
                <div>git status</div>
                <div>git branch</div>
                <div>git log --oneline --graph --all -10</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-gray-800 mb-2 flex justify-between items-center"><span className="bg-gray-100 border px-2 py-0.5 rounded text-xs">패턴 F</span> <span>add 취소</span></h4>
              <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-sm">git restore --staged .</div>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-gray-800 mb-2 flex justify-between items-center"><span className="bg-gray-100 border px-2 py-0.5 rounded text-xs">패턴 G</span> <span>작업 파일 되돌리기</span></h4>
              <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-sm">git restore src/App.js</div>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-gray-800 mb-2 flex justify-between items-center"><span className="bg-gray-100 border px-2 py-0.5 rounded text-xs">패턴 H</span> <span className="text-sm truncate">마지막 커밋 취소 (수정 유지)</span></h4>
              <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-sm">git reset HEAD~1</div>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-gray-800 mb-2 flex justify-between items-center"><span className="bg-gray-100 border px-2 py-0.5 rounded text-xs">패턴 I</span> <span>공유 커밋 안전하게 취소</span></h4>
              <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-sm">git revert 커밋해시<br/>git push</div>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition md:col-span-2">
              <h4 className="font-bold text-gray-800 mb-2 flex justify-between items-center"><span className="bg-gray-100 border px-2 py-0.5 rounded text-xs">패턴 J</span> <span>작업 잠깐 치워두기 / 꺼내기</span></h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-sm">git stash<br/>git switch main</div>
                <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-sm">git switch feature/login<br/>git stash pop</div>
              </div>
            </div>

          </div>
        </div>
      )
    },
    {
      title: "21. 초보자가 자주 꼬이는 상황별 해결법",
      content: (
        <div className="space-y-8">
          
          <CaseBox num="29" title="지금 내가 어느 브랜치인지 모르겠다">
            <CodeBlock code="git branch" />
            <p className="text-gray-700 bg-gray-100 p-3 rounded font-bold shadow-sm inline-block">별표 <code className="bg-white px-1 border rounded">*</code> 있는 브랜치가 현재 브랜치입니다.</p>
          </CaseBox>

          <CaseBox num="30" title="commit은 했는데 GitHub에 안 보인다">
            <p className="font-bold text-red-600 bg-red-50 p-2 rounded inline-block mb-4">아직 push 안 한 경우가 많습니다.</p>
            
            <p className="font-bold text-sm text-gray-600">확인 (두 가지 방법):</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <CodeBlock code="git status" />
              <CodeBlock code="git log --oneline -3" />
            </div>

            <p className="font-bold text-sm text-gray-600">원격보다 앞서 있는지 확인 (`git status` 시):</p>
            <OutputBlock text="Your branch is ahead of 'origin/main' by 1 commit." />
            
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-center">
              <p className="font-bold text-green-800 mb-2">그럼 그냥 push 하면 됩니다.</p>
              <code className="bg-gray-800 text-green-400 px-4 py-2 rounded font-mono shadow-md">git push</code>
            </div>
          </CaseBox>

          <CaseBox num="31" title="push 했는데 rejected 됐다">
            <p className="font-bold">예시 출력:</p>
            <OutputBlock text={'! [rejected]        main -> main (fetch first)\nerror: failed to push some refs to \'https://github.com/minsu-dev/todo-app.git\''} />
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
              <p className="font-bold text-yellow-900 mb-1">뜻:</p>
              <ul className="list-disc pl-5 text-yellow-800 font-medium">
                <li>원격 저장소가 더 앞서 있음</li>
                <li>내 로컬이 오래됨</li>
              </ul>
            </div>

            <p className="font-bold">보통 먼저 pull:</p>
            <CodeBlock code="git pull origin main" />
            <p className="font-bold">충돌 없으면 그 후 다시:</p>
            <CodeBlock code="git push origin main" />
          </CaseBox>

          <CaseBox num="32" title="pull 하려는데 작업 중인 파일이 있어서 안 된다">
            <p className="font-bold">예시 출력:</p>
            <OutputBlock text={'error: Your local changes to the following files would be overwritten by merge:\n    src/App.js\nPlease commit your changes or stash them before you merge.'} />
            
            <p className="font-bold text-xl text-blue-800 bg-blue-50 p-3 rounded text-center mb-6 border border-blue-200">해결은 셋 중 하나입니다.</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
                <h4 className="font-bold text-blue-800 mb-2 border-b pb-1">방법 1. commit 후 pull</h4>
                <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-xs whitespace-pre">git add .<br/>git commit -m "중간 저장"<br/>git pull origin main</div>
              </div>
              <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
                <h4 className="font-bold text-purple-800 mb-2 border-b pb-1">방법 2. stash 후 pull</h4>
                <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-xs whitespace-pre">git stash<br/>git pull origin main<br/>git stash pop</div>
              </div>
              <div className="bg-white border border-red-300 rounded-xl p-4 shadow-sm bg-red-50">
                <h4 className="font-bold text-red-800 mb-2 border-b border-red-200 pb-1">방법 3. 수정 버리기</h4>
                <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-xs whitespace-pre">git restore .<br/>git pull origin main</div>
                <p className="text-[10px] text-red-600 font-bold mt-1 text-right">정말 버릴 때만</p>
              </div>
            </div>
          </CaseBox>

          <CaseBox num="33" title="내가 지금 뭘 add했고 뭘 수정했는지 모르겠다">
            <div className="bg-green-50 border border-green-200 p-5 rounded-xl text-center mb-6 shadow-sm">
              <code className="bg-gray-800 text-green-400 px-6 py-3 rounded-lg font-mono text-xl shadow-lg block mb-4">git status</code>
              <p className="font-bold text-green-800 text-lg">이 명령 하나가 제일 중요합니다.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">구분법:</h4>
              <ul className="space-y-4 font-medium">
                <li className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-mono text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 text-sm">Changes not staged for commit</span>
                  <span className="text-gray-600"><ArrowRight className="hidden md:inline" size={16}/> 수정만 함 (add 안됨)</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-mono text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100 text-sm">Changes to be committed</span>
                  <span className="text-gray-600"><ArrowRight className="hidden md:inline" size={16}/> add까지 됨 (커밋 대기)</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-mono text-yellow-600 bg-yellow-50 px-2 py-1 rounded border border-yellow-100 text-sm">Untracked files</span>
                  <span className="text-gray-600"><ArrowRight className="hidden md:inline" size={16}/> 새 파일인데 아직 Git이 추적 안 함</span>
                </li>
              </ul>
            </div>
          </CaseBox>

          <div className="grid md:grid-cols-2 gap-6">
            <CaseBox num="34" title="이전 커밋 내용을 보고 싶다">
              <CodeBlock code="git log --oneline" />
              <p className="font-bold mt-4 text-sm text-gray-600">특정 커밋 상세 보기:</p>
              <CodeBlock code="git show a1b2c3d" />
            </CaseBox>

            <CaseBox num="35" title="브랜치를 잘못 만들었다">
              <p className="font-bold text-sm text-gray-600">로컬 브랜치 삭제:</p>
              <CodeBlock code="git branch -d feature/wrong-name" />
              <p className="font-bold text-sm text-gray-600 mt-2">강제로 삭제:</p>
              <CodeBlock code="git branch -D feature/wrong-name" />
              
              <div className="bg-red-50 p-3 rounded text-sm text-red-800 mt-4 border border-red-200 font-bold">
                현재 그 브랜치에 서 있으면 삭제 안 되므로 먼저 이동해야 합니다.
              </div>
              <CodeBlock code={'git switch main\ngit branch -d feature/wrong-name'} />
            </CaseBox>
          </div>
        </div>
      )
    },
    {
      title: "22. 최종 압축 요약",
      content: (
        <div className="space-y-6 pb-10">
          <p className="text-lg bg-gray-800 text-white text-center p-4 rounded-xl font-bold shadow-lg">마지막으로 정말 핵심만 정리해드리겠습니다.</p>

          <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
            
            <div className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg font-bold font-sans text-xs">가장 기본 흐름</div>
               <div className="pt-4 text-gray-800 leading-loose">
                 <span className="text-blue-600">git</span> status<br/>
                 <span className="text-blue-600">git</span> add .<br/>
                 <span className="text-blue-600">git</span> commit -m "메시지"<br/>
                 <span className="text-blue-600">git</span> push
               </div>
            </div>

            <div className="bg-white border-2 border-green-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg font-bold font-sans text-xs">최신 내용 받기</div>
               <div className="pt-4 text-gray-800 leading-loose"><span className="text-blue-600">git</span> pull origin main</div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 rounded-bl-lg font-bold font-sans text-xs">새 브랜치 만들기</div>
               <div className="pt-4 text-gray-800 leading-loose"><span className="text-blue-600">git</span> switch -c feature/login</div>
            </div>

            <div className="bg-white border-2 border-indigo-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 rounded-bl-lg font-bold font-sans text-xs">브랜치 작업 끝나고 main에 반영</div>
               <div className="pt-4 text-gray-800 leading-loose">
                 <span className="text-blue-600">git</span> switch main<br/>
                 <span className="text-blue-600">git</span> merge feature/login<br/>
                 <span className="text-blue-600">git</span> push
               </div>
            </div>

            <div className="bg-white border-2 border-red-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-bold font-sans text-xs">충돌 나면</div>
               <ol className="list-decimal pl-6 pt-4 text-gray-800 font-sans font-medium space-y-1">
                 <li>충돌 파일 열기</li>
                 <li><code className="bg-gray-100">&lt;&lt;&lt;&lt;</code>, <code className="bg-gray-100">====</code>, <code className="bg-gray-100">&gt;&gt;&gt;&gt;</code> 정리</li>
                 <li>저장</li>
                 <li><code className="bg-gray-100 text-blue-600">git add 파일명</code></li>
                 <li><code className="bg-gray-100 text-blue-600">git commit</code></li>
               </ol>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white border-2 border-yellow-300 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-center">
                 <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 rounded-bl-lg font-bold font-sans text-xs">add 취소</div>
                 <div className="pt-2 text-gray-800"><span className="text-blue-600">git</span> restore --staged 파일명</div>
              </div>
              <div className="bg-white border-2 border-orange-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-center">
                 <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-lg font-bold font-sans text-xs">작업 잠깐 치우기</div>
                 <div className="pt-2 text-gray-800"><span className="text-blue-600">git</span> stash<br/><span className="text-blue-600">git</span> stash pop</div>
              </div>
            </div>

            <div className="bg-white border-2 border-pink-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-0 right-0 bg-pink-500 text-white px-3 py-1 rounded-bl-lg font-bold font-sans text-xs">마지막 커밋 취소 (수정은 남기기)</div>
               <div className="pt-2 text-gray-800"><span className="text-blue-600">git</span> reset HEAD~1</div>
            </div>

            <div className="bg-white border-2 border-rose-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-0 right-0 bg-rose-500 text-white px-3 py-1 rounded-bl-lg font-bold font-sans text-xs">공유된 잘못된 커밋 취소</div>
               <div className="pt-2 text-gray-800"><span className="text-blue-600">git</span> revert 커밋해시</div>
            </div>

          </div>

          <div className="bg-gray-900 border-2 border-yellow-400 rounded-2xl p-6 shadow-2xl mt-8 relative overflow-hidden">
             <div className="absolute -right-10 -top-10 opacity-10"><AlertTriangle size={200} className="text-yellow-400"/></div>
             <h3 className="text-2xl font-black text-yellow-400 mb-4 z-10 relative flex items-center gap-2"><Search size={24}/> 가장 중요한 점검 명령 3개</h3>
             <div className="bg-black text-green-400 p-4 rounded-xl font-mono text-lg z-10 relative leading-loose shadow-inner border border-gray-700">
                <span className="text-gray-500">$</span> git status<br/>
                <span className="text-gray-500">$</span> git branch<br/>
                <span className="text-gray-500">$</span> git log --oneline --graph --all -10
             </div>
          </div>
        </div>
      )
    },
    // 특별 챕터: 치트시트 (한 페이지 그리드 형태)
    {
      title: "Git 1장 치트시트",
      isCheatSheet: true, // 특별 렌더링 플래그
      content: null // 별도의 렌더러 사용
    }
  ];

  // 다음/이전 장 이동 로직
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

  // 치트시트 특별 컴포넌트
  const CheatSheet = () => {
    return (
      <div className="bg-[#1e1e2f] text-gray-100 min-h-screen p-4 md:p-8 rounded-2xl shadow-2xl font-sans relative overflow-hidden">
        {/* 장식용 배경 요소 */}
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><LayoutGrid size={300} /></div>
        
        {/* 헤더 */}
        <div className="text-center mb-10 relative z-10 border-b-2 border-gray-700 pb-6">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 inline-flex items-center gap-3">
            <FileCode2 className="text-blue-400" size={40}/> Git 1장 치트시트
          </h1>
          <p className="text-gray-400 mt-4 text-lg">핵심 개념과 명령어 모음판 - 책상 앞에 붙여두세요</p>
        </div>

        {/* Masonry 스타일의 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 items-start">
          
          {/* 1. Git과 GitHub */}
          <div className="bg-[#2a2a3c] p-5 rounded-xl border-t-4 border-blue-500 shadow-lg hover:-translate-y-1 transition-transform">
            <h2 className="text-xl font-bold text-blue-400 mb-3 border-b border-gray-700 pb-2">1. Git과 GitHub</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-blue-300 font-bold shrink-0">Git:</span> 파일 변경 이력 관리 도구</li>
              <li className="flex gap-2"><span className="text-gray-300 font-bold shrink-0">GitHub:</span> Git 저장소를 올려두는 온라인 공간</li>
            </ul>
          </div>

          {/* 2. Git 핵심 구조 */}
          <div className="bg-[#2a2a3c] p-5 rounded-xl border-t-4 border-indigo-500 shadow-lg hover:-translate-y-1 transition-transform">
            <h2 className="text-xl font-bold text-indigo-400 mb-3 border-b border-gray-700 pb-2">2. Git 핵심 구조</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-indigo-300 font-bold w-24 shrink-0">작업 디렉토리:</span> 내가 파일 수정하는 곳</li>
              <li className="flex gap-2"><span className="text-yellow-300 font-bold w-24 shrink-0">스테이징 영역:</span> 커밋할 파일 올려두는 곳</li>
              <li className="flex gap-2"><span className="text-green-400 font-bold w-24 shrink-0">로컬 저장소:</span> 커밋 기록 저장</li>
              <li className="flex gap-2"><span className="text-blue-400 font-bold w-24 shrink-0">원격 저장소:</span> GitHub 같은 서버 저장소</li>
            </ul>
          </div>

          {/* 3. 기본 흐름 */}
          <div className="bg-[#2a2a3c] p-5 rounded-xl border-t-4 border-emerald-500 shadow-lg hover:-translate-y-1 transition-transform">
            <h2 className="text-xl font-bold text-emerald-400 mb-3 border-b border-gray-700 pb-2">3. 기본 흐름</h2>
            <div className="bg-[#1e1e2f] p-3 rounded font-mono text-sm text-gray-300 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white">수정</span> <ArrowRight size={14} className="text-gray-500"/> 
                <span className="text-yellow-400">add</span> <ArrowRight size={14} className="text-gray-500"/> 
                <span className="text-green-400">commit</span> <ArrowRight size={14} className="text-gray-500"/> 
                <span className="text-blue-400">push</span>
              </div>
              <div className="text-emerald-300">원격 최신 받기 → <span className="text-purple-400 font-bold">pull</span></div>
            </div>
          </div>

          {/* 4. 제일 중요한 명령어 */}
          <div className="bg-[#2a2a3c] p-5 rounded-xl border-t-4 border-yellow-500 shadow-lg md:col-span-2 lg:col-span-1 lg:row-span-2 hover:-translate-y-1 transition-transform">
            <h2 className="text-xl font-bold text-yellow-400 mb-3 border-b border-gray-700 pb-2 flex items-center gap-2"><Terminal size={18}/> 4. 중요 명령어</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">상태 확인 / 버전 확인</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono mb-1">git status</code>
                <code className="block bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono">git --version</code>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">사용자 정보 설정</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono whitespace-pre">git config --global user.name "이름"<br/>git config --global user.email "이메일"</code>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">저장소 복제</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono">git clone 저장소주소</code>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">파일 스테이징</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono">git add .</code>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">커밋 / 원격 업로드 / 최신 내용 받기</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono mb-1">git commit -m "작업 내용"</code>
                <code className="block bg-[#1e1e2f] text-blue-400 font-bold p-2 rounded text-sm font-mono mb-1">git push</code>
                <code className="block bg-[#1e1e2f] text-purple-400 font-bold p-2 rounded text-sm font-mono">git pull origin main</code>
              </div>
            </div>
          </div>

          {/* 5. 브랜치 */}
          <div className="bg-[#2a2a3c] p-5 rounded-xl border-t-4 border-cyan-500 shadow-lg hover:-translate-y-1 transition-transform">
            <h2 className="text-xl font-bold text-cyan-400 mb-3 border-b border-gray-700 pb-2 flex items-center gap-2"><GitBranch size={18}/> 5. 브랜치</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">생성 + 이동</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono">git switch -c feature/login</code>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">이동 / 확인</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono mb-1">git switch main</code>
                <code className="block bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono">git branch</code>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">병합 (main으로 이동 후)</p>
                <code className="block bg-[#1e1e2f] text-cyan-300 font-bold p-2 rounded text-sm font-mono">git merge feature/login</code>
              </div>
            </div>
          </div>

          {/* 6. 자주 쓰는 실전 패턴 */}
          <div className="bg-[#2a2a3c] p-5 rounded-xl border-t-4 border-pink-500 shadow-lg hover:-translate-y-1 transition-transform lg:col-span-2">
            <h2 className="text-xl font-bold text-pink-400 mb-3 border-b border-gray-700 pb-2">6. 자주 쓰는 실전 패턴</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-pink-300 font-bold mb-1">수정 후 올리기</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-3 rounded text-sm font-mono leading-relaxed whitespace-pre">git status<br/>git add .<br/>git commit -m "수정 내용"<br/><span className="text-blue-400">git push</span></code>
              </div>
              <div>
                <p className="text-xs text-pink-300 font-bold mb-1">작업 시작 전 최신화</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-3 rounded text-sm font-mono leading-relaxed whitespace-pre">git switch main<br/><span className="text-purple-400">git pull origin main</span></code>
              </div>
              <div>
                <p className="text-xs text-pink-300 font-bold mb-1">새 기능 작업</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-3 rounded text-sm font-mono leading-relaxed whitespace-pre">git switch -c f/nav<br/>git add .<br/>git commit -m "추가"<br/><span className="text-blue-400">git push -u origin f/nav</span></code>
              </div>
            </div>
          </div>

          {/* 7. 충돌 conflict */}
          <div className="bg-[#2a2a3c] p-5 rounded-xl border-t-4 border-red-500 shadow-lg hover:-translate-y-1 transition-transform">
            <h2 className="text-xl font-bold text-red-400 mb-3 border-b border-gray-700 pb-2 flex items-center gap-2"><ShieldAlert size={18}/> 7. 충돌 (Conflict)</h2>
            <p className="text-xs text-gray-400 mb-2">같은 파일의 같은 부분을 서로 다르게 수정했을 때 발생</p>
            <ol className="list-decimal pl-5 text-sm space-y-1 text-red-200 font-medium">
              <li>충돌 파일 열기</li>
              <li><code className="bg-[#1e1e2f] px-1 text-gray-300">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> 등 표식 정리</li>
              <li>최종 내용으로 저장</li>
              <li><code className="bg-[#1e1e2f] px-1 text-green-400 font-mono">git add 파일명</code></li>
              <li><code className="bg-[#1e1e2f] px-1 text-green-400 font-mono">git commit</code></li>
            </ol>
          </div>

          {/* 8. 되돌리기 */}
          <div className="bg-[#2a2a3c] p-5 rounded-xl border-t-4 border-orange-500 shadow-lg hover:-translate-y-1 transition-transform">
            <h2 className="text-xl font-bold text-orange-400 mb-3 border-b border-gray-700 pb-2 flex items-center gap-2"><RotateCcw size={18}/> 8. 되돌리기</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">add 취소 / 수정 취소</p>
                <code className="block bg-[#1e1e2f] text-green-400 p-1.5 rounded text-xs font-mono mb-1">git restore --staged .</code>
                <code className="block bg-[#1e1e2f] text-green-400 p-1.5 rounded text-xs font-mono">git restore 파일명</code>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">마지막 커밋 취소 (수정 유지)</p>
                <code className="block bg-[#1e1e2f] text-orange-300 p-1.5 rounded text-xs font-mono font-bold">git reset HEAD~1</code>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">커밋/수정 모두 완전 삭제</p>
                <code className="block bg-[#1e1e2f] text-red-400 p-1.5 rounded text-xs font-mono font-bold">git reset --hard HEAD~1</code>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">공유된 커밋 안전하게 취소</p>
                <code className="block bg-[#1e1e2f] text-purple-300 p-1.5 rounded text-xs font-mono font-bold">git revert 커밋해시</code>
              </div>
            </div>
          </div>

          {/* 9 & 10. stash & 로그 */}
          <div className="bg-[#2a2a3c] p-5 rounded-xl border-t-4 border-teal-500 shadow-lg hover:-translate-y-1 transition-transform flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-teal-400 mb-3 border-b border-gray-700 pb-2">9. stash (작업 보관)</h2>
              <div className="flex gap-2">
                <code className="flex-1 bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono text-center">git stash</code>
                <code className="flex-1 bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono text-center">git stash pop</code>
              </div>
            </div>
            
            <div className="mt-4">
              <h2 className="text-xl font-bold text-teal-400 mb-3 border-b border-gray-700 pb-2">10. 로그 보기</h2>
              <code className="block bg-[#1e1e2f] text-green-400 p-2 rounded text-sm font-mono mb-2 text-center">git log --oneline</code>
              <code className="block bg-[#1e1e2f] text-teal-300 font-bold p-2 rounded text-xs font-mono text-center">git log --oneline --graph --all -10</code>
            </div>
          </div>

          {/* 11 & 12. 헷갈릴 때 & 핵심 감각 */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl border border-gray-600 shadow-lg md:col-span-2 lg:col-span-3 hover:-translate-y-1 transition-transform">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2"><Search size={20}/> 11. 헷갈릴 때 무조건 보는 3개</h2>
                <code className="block bg-black text-green-400 p-4 rounded-xl text-lg font-mono leading-relaxed border border-gray-700 shadow-inner">
                  git status<br/>git branch<br/>git log --oneline --graph --all -10
                </code>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Zap size={20} className="text-yellow-400"/> 12. 핵심 감각</h2>
                <ul className="space-y-2 text-sm text-gray-300 bg-gray-800 p-4 rounded-xl border border-gray-700">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400"></span> 파일 저장만으로 GitHub에 안 올라감</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400"></span> <strong className="text-green-300">commit</strong>은 로컬 저장</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span> <strong className="text-blue-300">push</strong> 해야 GitHub 반영</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400"></span> <strong className="text-purple-300">pull</strong>은 최신 내용 받아오기</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> 헷갈리면 <strong className="text-yellow-300 font-mono text-xs bg-black px-1 rounded">git status</strong> 먼저 보기</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 13. 최종 암기 */}
          <div className="bg-[#1e1e2f] border-2 border-white/20 p-5 rounded-xl shadow-2xl lg:col-span-3 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h2 className="text-2xl font-black text-white mb-4 relative z-10">13. 최종 암기 단어장</h2>
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-lg flex gap-3 items-center backdrop-blur-sm"><strong className="text-blue-400 text-lg">Git</strong> <span className="text-gray-300 text-sm">변경 이력 관리 도구</span></div>
              <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-lg flex gap-3 items-center backdrop-blur-sm"><strong className="text-gray-200 text-lg">GitHub</strong> <span className="text-gray-300 text-sm">Git 저장소 올리는 공간</span></div>
              <div className="bg-black/50 border border-blue-500/50 px-4 py-2 rounded-lg flex gap-3 items-center backdrop-blur-sm"><strong className="text-blue-400 font-mono text-lg">push</strong> <span className="text-gray-300 text-sm">내 커밋을 원격에 올림</span></div>
              <div className="bg-black/50 border border-purple-500/50 px-4 py-2 rounded-lg flex gap-3 items-center backdrop-blur-sm"><strong className="text-purple-400 font-mono text-lg">pull</strong> <span className="text-gray-300 text-sm">원격 최신을 가져와 반영</span></div>
              <div className="bg-black/50 border border-cyan-500/50 px-4 py-2 rounded-lg flex gap-3 items-center backdrop-blur-sm"><strong className="text-cyan-400 font-mono text-lg">branch</strong> <span className="text-gray-300 text-sm">독립적으로 작업하는 가지</span></div>
            </div>
          </div>

        </div>
        <div className="h-20"></div> {/* 하단 여백 */}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden selection:bg-blue-200">
      
      {/* Sidebar (Table of Contents) */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 md:w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 overflow-y-auto flex flex-col ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
          <h2 className="text-lg md:text-xl font-extrabold text-gray-800 flex items-center gap-2">
            <BookOpen className="text-blue-600"/> 목차 (실습집)
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-800 bg-white rounded-full p-1 shadow-sm">
            <X size={20} />
          </button>
        </div>
        <ul className="py-2 flex-1">
          {chapters.map((chapter, index) => (
            <li key={index}>
              <button 
                onClick={() => selectChapter(index)}
                className={`w-full text-left px-5 py-3 text-sm transition-colors border-l-4 ${
                  currentChapter === index 
                  ? (chapter.isCheatSheet ? 'bg-indigo-900 text-white border-indigo-500 font-bold' : 'bg-blue-50 text-blue-700 border-blue-600 font-bold') 
                  : (chapter.isCheatSheet ? 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100 font-bold border-transparent mt-2 mx-2 rounded' : 'text-gray-600 hover:bg-gray-100 border-transparent')
                }`}
              >
                {chapter.isCheatSheet ? <span className="flex items-center gap-2"><LayoutGrid size={16}/> {chapter.title}</span> : chapter.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Header & Progress Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="h-1.5 w-full bg-gray-200">
            <div 
              className={`h-full transition-all duration-300 ease-out ${chapters[currentChapter]?.isCheatSheet ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-blue-600'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-600 hover:text-gray-900 p-1.5 bg-gray-100 rounded-md border border-gray-200">
                <Menu size={20} />
              </button>
              <h1 className="text-lg md:text-xl font-bold text-gray-800 truncate">Git 실습집 & 치트시트</h1>
            </div>
            <div className={`text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap hidden md:block ${chapters[currentChapter]?.isCheatSheet ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-50 text-blue-700'}`}>
              {currentChapter + 1} / {chapters.length}
            </div>
          </div>
        </header>

        {/* Reading Area */}
        <main className={`flex-1 overflow-y-auto scroll-smooth ${chapters[currentChapter]?.isCheatSheet ? 'bg-[#1e1e2f]' : 'bg-gray-50 p-4 md:p-8'}`}>
          
          {chapters[currentChapter]?.isCheatSheet ? (
            /* 특별 렌더링: 치트시트 */
            <CheatSheet />
          ) : (
            /* 일반 렌더링: 본문 */
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all ${
                    currentChapter === 0 
                    ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                    : 'text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 shadow-sm hover:shadow'
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
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
                    currentChapter === chapters.length - 1 
                    ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                    : 'text-white bg-blue-600 hover:bg-blue-700 shadow hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  <span className="hidden sm:inline">다음 장</span> <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
          
          {!chapters[currentChapter]?.isCheatSheet && <div className="h-12"></div>}
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default GitPracticeBook;