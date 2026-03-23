# 🌐 React Archive 외부 접속 가이드 (Cloudflare Tunnel)

본 가이드는 로컬 서버(localhost:3000)를 전 세계 어디서나 안전하게 접속 할 수 있도록 Cloudflare Tunnel을 설정하는 방법을 안내합니다.

## 1. 사전 준비물
- [Cloudflare 계정](https://dash.cloudflare.com/) (무료)
- 본인 소유의 도메인 (Cloudflare에 연결되어 있어야 함)
- 로컬 PC에 `cloudflared` 설치

## 2. cloudflared 설치 (Windows 프리미엄 가이드)
전용 터미널(PowerShell)에서 다음 명령어를 실행하여 설치하거나, [다운로드 페이지](https://github.com/cloudflare/cloudflared/releases)에서 .msi 파일을 받으세요.

```powershell
# winget 사용 시
winget install cloudflare.cloudflared
```

## 3. 터널 생성 및 설정 단계

### Step 1: 로그인
```bash
cloudflared tunnel login
```
- 브라우저가 열리면 사용할 도메인을 선택하여 인증합니다.

### Step 2: 터널 생성
```bash
cloudflared tunnel create react-archive-tunnel
```
- 생성 후 출력되는 `ID` (UUID 형태)를 복사해두세요.

### Step 3: 설정 파일 작성 (`config.yml`)
프로젝트 루트 디렉토리에 다음 내용으로 `config.yml`을 만드세요 (아래 템플릿 참조).

```yaml
tunnel: <복사한_터널_ID>
credentials-file: C:\Users\<사용자명>\.cloudflared\<터널_ID>.json

ingress:
  - hostname: archive.your-domain.com
    service: http://localhost:3000
  - service: http_status:404
```

### Step 4: DNS 레코드 등록
```bash
cloudflared tunnel route dns react-archive-tunnel archive.your-domain.com
```

### Step 5: 터널 실행
```bash
cloudflared tunnel run react-archive-tunnel
```

## 4. 보안 강화 (권장)
외부 노출 시 누구나 코드를 수정할 수 있으므로, **Cloudflare Zero Trust**의 `Access` 기능을 활용하여 이메일 인증(OTP) 등을 추가하는 것을 강력히 권장합니다.
- Cloudflare Dash > Zero Trust > Access > Applications에서 설정 가능합니다.

---
**주의:** 이 설정은 로컬 서버가 켜져 있을 때만 외부에서 접속 가능합니다. 24시간 운영을 원하시면 저전력 미니 PC나 서버 장비에서 실행하세요.
