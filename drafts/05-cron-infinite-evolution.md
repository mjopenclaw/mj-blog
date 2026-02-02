# 10분 간격 Cron으로 무한 발전하기: 잠자는 동안 똑똑해지는 시스템

*"내가 자는 동안에도 시스템이 일한다."*

---

## 왜 10분인가

Cron 간격을 정할 때 고민이 많았다.

- **1분**: 너무 빈번함. 리소스 낭비 + API 제한에 걸림
- **1시간**: 너무 느림. 실시간성이 떨어짐
- **10분**: 적당함. 충분히 반응적이면서 리소스 효율적

SNS에서 트렌드는 빠르게 바뀐다. 1시간이면 이미 늦다. 하지만 1분마다 체크하는 건 과잉 대응이다.

**10분**이 황금 지점이었다.

---

## Cron 아키텍처 설계

### Core Loops (10분 간격)

```
매 시간의:
├── :00 Self-Improvement Thinker  → 데이터 분석 + 가설 생성
├── :02 Docs Developer           → 문서 자동 개선
├── :03 Task Executor            → 대기 중인 태스크 실행
├── :05 Blog Developer           → 블로그 콘텐츠 작성
├── :07 Income Hunter            → 수익 기회 탐색
└── :08 Task Analyzer            → 우선순위 재조정
```

각 Cron은 **2분 간격**으로 배치했다. 동시에 실행되면 리소스 충돌이 발생하기 때문이다.

### Daily Crons (1일 1회)

```
10:00 Morning Report    → 전날 성과 + 오늘 계획
22:00 Evening Reflect   → 오늘 배운 것 정리
03:00 Health Check      → 시스템 상태 점검
```

### Weekly Crons (1주 1회)

```
월요일 09:00 Weekly Report      → 주간 리포트
일요일 03:00 Cleanup            → 오래된 데이터 정리
일요일 04:00 Self-Improvement   → 규칙 검토 및 최적화
```

---

## 재귀적 자기 개선

핵심은 **Self-Improvement Thinker**다.

이 Cron은 10분마다 실행되면서:

1. **메트릭 분석**: 최근 포스트 성과 확인
2. **패턴 탐색**: 성공/실패 패턴 찾기
3. **가설 생성**: "X를 하면 Y가 될 것이다"
4. **실험 설계**: 가설을 검증할 방법 제안
5. **규칙 업데이트**: 검증된 가설을 `state/rules.yaml`에 추가

```yaml
# state/rules.yaml (자동 업데이트됨)
rules:
  - id: evening-posting
    hypothesis: "저녁 7-9시 포스팅이 평균 좋아요 3배"
    confidence: 0.87
    experiments: 15
    status: validated
    
  - id: question-format
    hypothesis: "질문형 포스트가 댓글 2배"
    confidence: 0.62
    experiments: 8
    status: testing
```

**재귀적**이라는 건, 이 과정 자체도 개선 대상이라는 뜻이다.

시스템은 "어떻게 하면 더 잘 학습할 수 있을까?"도 스스로 고민한다.

---

## Task Pipeline

`Task Analyzer` → `Task Executor` 파이프라인:

```
[Task Analyzer]
     │
     ▼
┌─────────────────┐
│  태스크 발견     │  "README에 오타 있음"
│  우선순위 계산   │  priority: 3
│  실행 가능 판단  │  can_auto: true
└────────┬────────┘
         │
         ▼
   task_queue (DB)
         │
         ▼
[Task Executor]
     │
     ▼
┌─────────────────┐
│  태스크 가져오기  │
│  실행           │  "오타 수정 완료"
│  결과 기록      │
└─────────────────┘
```

자동 실행 가능한 태스크(`can_auto: true`)는 사람 개입 없이 처리된다.

승인이 필요한 태스크는 텔레그램으로 알림이 간다.

---

## 실제 Cron 스크립트 예시

```typescript
// core/crons/self-improvement-thinker.ts

export async function run() {
  // 1. 최근 24시간 메트릭 조회
  const metrics = await db.query(`
    SELECT * FROM post_analytics 
    WHERE created_at > datetime('now', '-24 hours')
  `);
  
  // 2. 패턴 분석
  const patterns = analyzePatterns(metrics);
  
  // 3. 가설 생성
  for (const pattern of patterns) {
    const hypothesis = generateHypothesis(pattern);
    
    // 4. 기존 규칙과 중복 체크
    if (!isDuplicate(hypothesis)) {
      await db.insert('rule_candidates', {
        hypothesis: hypothesis.text,
        confidence: hypothesis.initialConfidence,
        status: 'pending'
      });
    }
  }
  
  // 5. 검증 대기 중인 규칙 실험
  const pendingRules = await db.query(`
    SELECT * FROM rule_candidates 
    WHERE status = 'testing' 
    AND experiment_count < 3
  `);
  
  for (const rule of pendingRules) {
    await scheduleExperiment(rule);
  }
  
  // 6. 검증 완료된 규칙 적용
  await applyValidatedRules();
}
```

---

## 모니터링과 알림

10분마다 돌아가는 Cron이 6개면, 하루에 **864번** 실행된다.

모든 실행 결과를 사람이 확인할 수 없다. 그래서 **예외만 알림**:

```typescript
// 정상: 로그만 남김
logger.info('Self-Improvement Thinker completed', { 
  patternsFound: 3, 
  hypothesesGenerated: 1 
});

// 이상: 텔레그램 알림
if (errorOccurred || significantDiscovery) {
  await telegram.send('@molt_monitor_bot', {
    text: `⚠️ ${cronName}: ${message}`
  });
}
```

모니터 봇(`@molt_monitor_bot`)은 시스템 알림 전용. 중요한 것만 사람에게 전달.

---

## 리소스 관리

### 토큰 예산

각 Cron에 토큰 예산을 할당:

```yaml
# config/cron-budgets.yaml
budgets:
  self-improvement-thinker:
    max_tokens_per_run: 5000
    max_runs_per_day: 144
    
  docs-developer:
    max_tokens_per_run: 3000
    max_runs_per_day: 144
    
  blog-developer:
    max_tokens_per_run: 10000
    max_runs_per_day: 144
```

예산 초과하면 다음 실행까지 대기.

### 동시 실행 제한

```json
// openclaw.json
{
  "cron": {
    "maxConcurrentRuns": 3
  }
}
```

최대 3개까지만 동시 실행. 그 이상은 큐에서 대기.

---

## 6개월 운영 결과

| 지표 | 수동 운영 | Cron 자동화 |
|------|----------|------------|
| 일일 투입 시간 | 3시간 | 15분 (검토만) |
| 놓친 트렌드 | 주 5건 | 주 0.5건 |
| 규칙 업데이트 | 월 2회 | 주 3회 |
| 시스템 다운타임 | 월 8시간 | 월 30분 |

자동화 전에는 하루 3시간씩 SNS 관리에 쓰고 있었다.

지금은 아침에 15분 리포트 확인하고, 이상 있을 때만 개입한다.

---

## 시작하기: 최소 Cron 세트

처음부터 6개 Cron을 돌릴 필요 없다. 이것만 시작하자:

```bash
# 1. 메트릭 수집 (기본)
0 */6 * * * cli content metrics

# 2. 상태 리포트 (하루 1회)
0 10 * * * cli status --detailed > /tmp/daily-report.txt

# 3. 자동 참여 (한도 내)
*/30 * * * * cli engage -c x -a like --limit 5
```

이 세 개로 시작해서, 필요에 따라 추가하면 된다.

---

## 주의사항

### 1. 무한 루프 방지

Cron이 Cron을 트리거하면 무한 루프가 생길 수 있다.

```typescript
// 안전장치
const MAX_CHAIN_DEPTH = 3;
if (getCurrentChainDepth() >= MAX_CHAIN_DEPTH) {
  logger.warn('Chain depth limit reached, stopping');
  return;
}
```

### 2. 실패 복구

Cron이 실패하면 자동 재시도:

```yaml
retry:
  max_attempts: 3
  backoff: exponential
  initial_delay: 60  # 1분 후 재시도
```

### 3. 수동 개입 포인트

중요한 결정은 반드시 사람이:

- confidence >= 0.9 규칙 적용
- 새로운 채널 추가
- bounds.yaml 수정 (이건 Cron이 못 함)

---

## 마치며

10분 간격 Cron은 **작은 혁명**이었다.

매일 3시간 투입하던 작업이 15분으로 줄었다. 그리고 시스템은 **매일 조금씩 더 똑똑해진다**.

핵심은 "완전 자동화"가 아니다. **"사람은 감독, AI는 실행"**이라는 역할 분담이다.

Cron이 일하고, 나는 결과를 검토한다.

이게 지속 가능한 자동화다.

---

*이 글은 OpenClaw Framework의 실제 Cron 아키텍처를 설명합니다.*
