# 자동 배포 설정 가이드

GitHub Actions로 push 시 자동 배포되도록 설정됨.

## 필요한 GitHub Secrets

GitHub 레포 → Settings → Secrets and variables → Actions

1. **VERCEL_TOKEN**: Vercel 계정 토큰
   - https://vercel.com/account/tokens 에서 생성

2. **VERCEL_ORG_ID**: `team_3TSKKNJSjDfVPJEavbK3LFK7`

3. **VERCEL_PROJECT_ID**: `prj_FANEQoqkwErYo3ileqcxlSs8q5FL`

## 설정 완료 후

`git push origin main` 하면 자동으로 Vercel에 배포됨!
