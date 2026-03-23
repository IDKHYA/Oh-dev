# 💾 React Archive 데이터 백업 및 복구 가이드

본 프로젝트는 **SQLite**를 기반으로 데이터를 관리하므로, 파일 복사만으로도 간편하게 백업과 복구가 가능합니다.

## 1. 백업 방법 (Backup)
데이터베이스 파일인 `react-archive.db`를 안전한 장소(외부 드라이브, 클라우드 등)에 복사해 두는 것만으로 충분합니다.

### 수동 백업 (Recommended)
프로젝트 루트 디렉토리에 있는 다음 파일을 복사하세요:
- `react-archive.db`

### 자동 백업 스크립트 (CLI)
주기적으로 백업을 수행하려면 다음 명령어를 사용하세요 (Windows PowerShell 기준):
```powershell
Copy-Item "react-archive.db" "backup/react-archive_$(Get-Date -f 'yyyyMMdd_HHmm').db"
```

## 2. 복구 방법 (Recovery)
시스템 장애나 데이터 유실 시, 백업해둔 파일을 다시 프로젝트 루트로 가져오면 복구됩니다.

1. 서버를 중단합니다 (`Ctrl + C`).
2. 기존의 `react-archive.db` 파일을 삭제하거나 이름을 변경합니다.
3. 백업된 `.db` 파일의 이름을 `react-archive.db`로 변경하여 루트 디렉토리에 배치합니다.
4. 서버를 다시 시작합니다 (`npm run dev`).

## 3. 주의사항
- **서버 가동 중 복사:** SQLite는 쓰기 작업 중인 파일을 복사할 경우 데이터가 깨질 수 있습니다. 가급적 서버를 중지한 상태에서 백업하거나, [SQLite Online Backup API]를 사용하는 것이 안전합니다.
- **주기:** 최소 일주일에 한 번은 백업을 수행하는 것을 권장합니다.
