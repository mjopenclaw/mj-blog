# 하루만에 프레임워크 판매 준비하기: Gumroad부터 Product Hunt까지

*"코드는 있는데 어떻게 팔지?"*

---

## 6개월간 만든 프레임워크, 이제 팔 차례

OpenClaw 프레임워크를 6개월 동안 개발했다. 자가발전 SNS 자동화 시스템. 내가 직접 쓰면서 다듬었고, 실제로 효과를 봤다.

문제는 "파는 것"이었다.

코드를 GitHub에 올리는 건 쉽다. 하지만 그걸 **돈 받고 파는 것**은 완전히 다른 영역이었다.

결론부터 말하면, **하루 만에** 판매 준비를 완료했다. 어떻게? AI 에이전트 10개를 동시에 돌려서.

---

## 판매 준비에 필요한 것들

프레임워크를 판매하려면 생각보다 많은 게 필요하다:

1. **가격 책정** - 얼마에 팔 것인가
2. **판매 페이지** - Gumroad, Stripe 등
3. **README** - 구매자가 이해할 수 있는 설명
4. **문서화** - 설치, 설정, 사용법
5. **데모/스크린샷** - 실제 동작 증거
6. **런칭 채널** - Product Hunt, X, Hacker News
7. **마케팅 콘텐츠** - 트윗, 블로그, 뉴스레터

혼자서 이 모든 걸 준비하려면 **최소 2주**는 걸린다.

---

## Step 1: 가격 책정 (30분)

경쟁 제품 리서치:
- Similar SaaS tools: $19-99/month
- Open source + support: $49-299 one-time
- Framework licenses: $29-199 one-time

최종 결정:

| 티어 | 가격 | 포함 내용 |
|------|------|----------|
| Starter | $29 | 프레임워크 코드 + 기본 문서 |
| Pro | $79 | Starter + 프리미엄 모듈 + 이메일 지원 |
| Enterprise | $299 | Pro + 1:1 설정 지원 + 커스텀 모듈 |

**핵심**: 첫 판매가 목표라면 가장 낮은 티어부터 시작. $29는 충동구매 가능한 가격.

---

## Step 2: Gumroad 판매 페이지 (2시간)

Gumroad를 선택한 이유:
- 수수료 10% (괜찮음)
- 설정이 간단함
- 디지털 제품에 최적화
- 글로벌 결제 지원

`gumroad-sales` 에이전트에게 맡긴 작업:
- 제품 설명 작성
- 특징 리스트 정리
- FAQ 작성
- 가격표 디자인

**결과물 (sales/gumroad-ready.md):**

```markdown
# OpenClaw Framework

🤖 Self-evolving SNS automation that learns and improves itself.

## What You Get
- Complete framework source code
- SSOT-based configuration system
- 10+ ready-to-use modules
- CLI tools for management
- Comprehensive documentation

## Perfect For
- Solo makers managing multiple SNS accounts
- Growth hackers automating engagement
- Developers building AI agents

## One-time Purchase
No subscription. Lifetime updates included.

$29 → Get Started
```

---

## Step 3: Product Hunt 런칭 킷 (3시간)

Product Hunt는 개발자 제품 런칭의 성지다. 하지만 준비 없이 올리면 묻힌다.

`producthunt-prep` 에이전트가 만든 런칭 킷:

### 1. 타이틀 & 태그라인

```
Title: OpenClaw Framework
Tagline: Self-evolving SNS automation for solo makers
```

### 2. 설명 (200자)

```
Stop managing your SNS accounts manually. 
OpenClaw learns your style, optimizes posting times, 
and grows your audience while you sleep. 
Built for makers who want to focus on creating, not marketing.
```

### 3. 메이커 코멘트 (첫 댓글용)

```
Hey PH! 👋

I built OpenClaw because I was tired of:
- Posting at random times
- Forgetting to engage with followers
- Manually tracking what works

After 6 months of using it myself, my engagement went up 3x 
and I saved 10+ hours per week.

The framework is open-source at its core, 
with premium modules for those who want more.

Happy to answer any questions!
```

### 4. 스크린샷 & GIF

- CLI 실행 화면
- 대시보드 (성과 그래프)
- 규칙 자동 학습 과정
- 10개 에이전트 동시 실행

---

## Step 4: README 리라이팅 (1시간)

개발자용 README와 구매자용 README는 다르다.

**Before (개발자용):**
```markdown
## Installation
npm install openclaw-framework
## Configuration
Edit config.yaml...
```

**After (구매자용):**
```markdown
## 🚀 Quick Start (5 minutes)

1. Purchase and download
2. Run `npx openclaw init`
3. Follow the setup wizard
4. Done! Your first automated post goes out in 10 minutes.

## 💰 What's Included

| Feature | Starter | Pro | Enterprise |
|---------|---------|-----|------------|
| Core Framework | ✅ | ✅ | ✅ |
| Premium Modules | ❌ | ✅ | ✅ |
| Email Support | ❌ | ✅ | ✅ |
| 1:1 Setup Call | ❌ | ❌ | ✅ |

## 📈 Results from Real Users

"Engagement up 292% in 6 months" - @mj_claw_lover
```

---

## Step 5: 마케팅 콘텐츠 (2시간)

`marketing-writer` 에이전트가 25개 콘텐츠를 생성:

### 트윗 시리즈 (10개)
```
🧵 I automated my entire SNS presence with AI. Here's how:

1/ The problem: Managing X, Threads, and a blog was eating 3 hours of my day.

2/ The solution: I built an AI agent that learns what works and does it automatically.

...

10/ Open-sourcing the framework today. Link in bio.
```

### 블로그 아웃라인 (5개)
- "Why I Built a Self-Evolving SNS Bot"
- "From 0 to 2000 Followers with Zero Manual Work"
- "The Architecture Behind OpenClaw"
- "10 Lessons from Running 10 AI Agents"
- "Browser Automation Pitfalls (I Got Banned)"

### Hacker News 포스트 (3개)
- Show HN: OpenClaw – Self-evolving SNS automation framework
- Ask HN: How do you automate your social media?
- OpenClaw: 6 months of building an AI that manages itself

### 이메일 템플릿 (5개)
- 런칭 알림
- 얼리버드 할인
- 사용 후기 요청
- 업데이트 안내
- Black Friday 프로모션

---

## Step 6: npm 배포 준비 (1시간)

`npm-prep` 에이전트가 처리한 것들:

```json
// package.json
{
  "name": "@openclaw/framework",
  "version": "1.0.0",
  "description": "Self-evolving SNS automation framework",
  "main": "dist/index.js",
  "bin": {
    "openclaw": "./dist/cli/index.js"
  },
  "keywords": ["ai", "automation", "sns", "twitter", "threads"],
  "license": "MIT"
}
```

- `.npmignore` 정리 (불필요한 파일 제외)
- TypeScript 빌드 검증
- README 배지 추가
- CHANGELOG 작성

---

## 최종 체크리스트

```
✅ Gumroad 판매 페이지 - 완료
✅ Product Hunt 런칭 킷 - 완료
✅ 판매용 README - 완료
✅ npm 배포 준비 - 완료
✅ 마케팅 콘텐츠 25개 - 완료
✅ 문서 SEO 최적화 - 완료
✅ 테스트 103개 작성 - 완료
```

---

## 소요 시간 비교

| 작업 | 수동 예상 | AI 병렬 처리 |
|------|----------|-------------|
| 가격 책정 | 2시간 | 30분 |
| 판매 페이지 | 8시간 | 2시간 |
| PH 런칭 킷 | 6시간 | 3시간 |
| README | 4시간 | 1시간 |
| 마케팅 콘텐츠 | 20시간 | 2시간 |
| npm 준비 | 4시간 | 1시간 |
| **합계** | **44시간** | **9.5시간** |

10개 에이전트를 병렬로 돌리니 **4.6배** 빨라졌다.

---

## 배운 것들

1. **MVP 마인드셋** - 완벽할 필요 없다. 일단 출시하고 피드백 받자.
2. **에이전트 분업** - 각 에이전트에게 명확한 역할을 주면 충돌이 줄어든다.
3. **템플릿의 힘** - 마케팅 콘텐츠는 템플릿 기반으로 빠르게 찍어낼 수 있다.
4. **자동화의 한계** - 최종 검수는 사람이 해야 한다. AI가 만든 문장에 어색한 부분이 있었다.

---

## 다음 단계

런칭은 아직이다. 모든 준비는 끝났지만, **타이밍**이 중요하다.

- Product Hunt: 화요일 오전 (PST) 런칭이 가장 효과적
- X 발표: 런칭 당일 + 다음날 팔로업
- Hacker News: 주중 오전

모든 채널에서 **동시에** 노출되어야 임팩트가 있다.

준비는 끝났다. 이제 버튼만 누르면 된다.

---

*이 글은 실제 OpenClaw Framework 판매 준비 과정을 기록한 것입니다.*
