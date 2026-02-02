# 자가발전 시스템 구축 가이드: AI가 스스로 진화하게 만드는 법

*내가 자는 동안에도 시스템이 똑똑해진다면?*

---

## 자가발전이란 무엇인가

대부분의 AI 자동화 시스템은 **정적**이다. 설정한 규칙대로만 동작하고, 환경이 바뀌면 사람이 직접 수정해야 한다.

자가발전 시스템은 다르다. 스스로 데이터를 분석하고, 패턴을 발견하고, 규칙을 업데이트한다. 사람의 개입 없이도 **점점 더 나아진다**.

내가 6개월간 OpenClaw 프레임워크를 운영하며 구축한 자가발전 아키텍처를 공유한다.

---

## 핵심 원칙: SSOT + Bounds + Rules

### 1. SSOT (Single Source of Truth)

모든 규칙은 **한 곳에서만** 정의된다.

```
config/config.yaml  → 채널 설정 (X, Threads 등)
config/bounds.yaml  → 안전 한도 (절대 수정 불가)
state/rules.yaml    → 학습된 규칙 (AI가 업데이트)
```

SSOT가 없으면 규칙이 여기저기 흩어지고, AI가 뭘 따라야 할지 혼란스러워한다. 모든 진실은 단 하나의 소스에서.

### 2. Bounds: 절대 넘지 않는 한계

```yaml
# config/bounds.yaml
bounds:
  posting:
    max_posts_per_day: 3
    min_interval_minutes: 30
  engagement:
    max_likes_per_day: 50
    max_follows_per_day: 20
    max_reposts_per_day: 10
  forbidden_topics:
    - 정치
    - 종교
    - 혐오 발언
```

이 파일은 **AI가 절대 수정할 수 없다**. 오직 사람만 변경 가능. 이게 안전장치다.

아무리 AI가 "더 많이 포스팅하면 팔로워 늘어요!"라고 분석해도, bounds를 넘을 수 없다.

### 3. Rules: AI가 학습하는 영역

```yaml
# state/rules.yaml
rules:
  - id: optimal-posting-time
    description: "오후 6-9시 포스팅이 가장 효과적"
    confidence: 0.85
    evidence_count: 47
    last_validated: 2026-02-01
    
  - id: hashtag-limit
    description: "해시태그 3개 이하가 참여율 높음"
    confidence: 0.72
    evidence_count: 23
    last_validated: 2026-01-28
```

Rules는 AI가 데이터를 분석해서 **스스로 업데이트**한다. 단, confidence 기반 제한이 있다:

- confidence < 0.7: 자동 적용 보류
- confidence 0.7~0.9: 자동 적용
- confidence >= 0.9: 사람 승인 후 적용 (중요한 변경)

---

## 자가발전 사이클

```
관찰 → 분석 → 가설 → 실험 → 검증 → 적용
  │       │       │       │       │       │
  │       │       │       │       │       └→ state/rules.yaml
  │       │       │       │       └→ confidence 계산
  │       │       │       └→ 최소 3회 실험
  │       │       └→ 규칙 후보 생성
  │       └→ 패턴 발견
  └→ 메트릭 수집
```

### Step 1: 관찰 (메트릭 수집)

```bash
cli content metrics
```

시스템이 자동으로 수집하는 데이터:
- 포스트별 좋아요, 댓글, 리트윗 수
- 포스팅 시간대별 성과
- 해시태그별 도달률
- 팔로워 증감 추이

### Step 2: 분석 (패턴 발견)

10분마다 실행되는 Cron이 메트릭을 분석한다:

```
🔍 패턴 발견:
- 오후 7시 포스팅의 평균 좋아요: 45
- 오후 2시 포스팅의 평균 좋아요: 12
- 차이: 3.75배
```

### Step 3: 가설 생성

분석 결과를 바탕으로 가설을 만든다:

```
📝 가설: "저녁 시간대(18-21시) 포스팅이 오후(12-17시)보다 3배 이상 효과적이다"
```

### Step 4: 실험

가설을 검증하기 위해 의도적으로 다양한 시간대에 포스팅한다. 최소 3회 이상 실험해야 유의미한 결과.

### Step 5: 검증 (Confidence 계산)

```python
confidence = (성공_횟수 / 총_실험_횟수) * 데이터_품질_보정
```

- 샘플 수가 적으면 confidence 낮음
- 일관된 결과가 나오면 confidence 높음
- 외부 변수(트렌드 이슈 등) 있으면 보정

### Step 6: 적용

confidence가 0.7 이상이면 `state/rules.yaml`에 자동 추가.

---

## 실전 구현: Cron 아키텍처

자가발전 시스템의 핵심은 **주기적 실행**이다.

```
10분 간격 Cron 배치:
├── :00 Self-Improvement Thinker (분석 + 가설)
├── :02 Docs Developer (문서 개선)
├── :03 Task Executor (태스크 실행)
├── :05 Blog Developer (블로그 작성)
├── :07 Income Hunter (수익 기회 탐색)
└── :08 Task Analyzer (우선순위 조정)
```

각 Cron은 독립적으로 동작하면서, 공유 DB에 결과를 기록한다.

---

## DB 스키마: 학습 기록 저장

```sql
-- 규칙 후보
CREATE TABLE rule_candidates (
  id INTEGER PRIMARY KEY,
  hypothesis TEXT,
  confidence REAL,
  experiment_count INTEGER,
  created_at DATETIME,
  status TEXT -- pending, validated, rejected
);

-- 실험 기록
CREATE TABLE experiments (
  id INTEGER PRIMARY KEY,
  rule_id INTEGER,
  action TEXT,
  expected_outcome TEXT,
  actual_outcome TEXT,
  success BOOLEAN,
  executed_at DATETIME
);
```

---

## 안전장치: 인간의 최종 통제

자가발전이라고 해서 AI에게 모든 걸 맡기면 안 된다.

### 1. Bounds는 절대불가침

`bounds.yaml`은 AI가 읽기만 가능. 수정하려고 시도하면 에러 발생.

### 2. 고신뢰도 규칙은 승인 필요

```yaml
# confidence >= 0.9인 규칙
- id: reduce-posting-frequency
  description: "주 3회로 줄이면 품질 향상"
  confidence: 0.92
  requires_approval: true  # ← 사람이 확인해야 적용
```

### 3. 롤백 메커니즘

모든 rules.yaml 변경은 git으로 추적. 문제가 생기면 즉시 롤백.

```bash
git log state/rules.yaml
git checkout HEAD~1 -- state/rules.yaml
```

---

## 실제 성과

6개월간 자가발전 시스템을 운영한 결과:

| 지표 | 시작 | 6개월 후 | 변화 |
|------|------|---------|------|
| 평균 좋아요 | 12 | 47 | +292% |
| 팔로워 | 230 | 1,847 | +703% |
| 포스팅 시간 (분/개) | 15 | 2 | -87% |
| 학습된 규칙 | 0 | 23 | - |

시스템이 스스로 최적의 포스팅 시간, 해시태그 조합, 콘텐츠 스타일을 찾아냈다.

---

## 시작하기

자가발전 시스템을 구축하려면:

1. **SSOT 확립** - 규칙을 한 곳에서만 관리
2. **Bounds 설정** - 절대 넘지 않을 한계 정의
3. **메트릭 수집 자동화** - 데이터 없으면 학습 불가
4. **Cron 배치** - 주기적 분석 + 실험
5. **Confidence 기반 적용** - 검증된 것만 규칙화

첫 번째 규칙이 학습되는 데 2주 정도 걸린다. 그 후부터는 눈덩이처럼 빨라진다.

---

## 마치며

AI가 스스로 진화하는 시스템. 처음엔 SF 같았다.

하지만 실제로 만들어보니, 핵심은 의외로 단순했다. **데이터 수집 → 패턴 분석 → 가설 검증 → 규칙 업데이트**. 이 사이클을 자동화하면 된다.

중요한 건 "어디까지 AI에게 맡길 것인가"의 경계를 명확히 하는 것.

Bounds는 절대 넘지 않는다. 그 안에서 AI는 자유롭게 학습한다.

이게 인간과 AI의 협업이다.

---

*다음 글: "브라우저 자동화의 함정" - 내가 구글 계정을 정지당한 이야기*
