#!/usr/bin/env node
/**
 * collect-engagement.js
 * 
 * X 최근 포스트 engagement 수집 → moneylobster.db 저장
 * 
 * 사용법: node scripts/collect-engagement.js
 * 
 * 필요: 브라우저 자동화로 X 프로필 → 최근 포스트 → 숫자 파싱
 * 
 * TODO: 
 * - 브라우저 스냅샷에서 engagement 파싱
 * - DB에 저장
 * - Cron으로 자동화
 */

const sqlite3 = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(process.env.HOME, '.openclaw/workspace/moneylobster.db');

function getDb() {
  const db = sqlite3(DB_PATH);
  return db;
}

function recordEngagement(platform, postId, likes, replies, retweets) {
  const db = getDb();
  
  // posts 테이블에 upsert
  const stmt = db.prepare(`
    INSERT INTO posts (platform, post_id, likes, replies, retweets, recorded_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(platform, post_id) DO UPDATE SET
      likes = excluded.likes,
      replies = excluded.replies,
      retweets = excluded.retweets,
      recorded_at = excluded.recorded_at
  `);
  
  stmt.run(platform, postId, likes, replies, retweets);
  db.close();
  
  console.log(`✅ Recorded: ${platform} ${postId} - ${likes}❤️ ${replies}💬 ${retweets}🔁`);
}

function getDailyStats(platform) {
  const db = getDb();
  
  const result = db.prepare(`
    SELECT 
      SUM(likes) as total_likes,
      SUM(replies) as total_replies,
      SUM(retweets) as total_retweets,
      COUNT(*) as post_count
    FROM posts
    WHERE platform = ?
    AND date(recorded_at) = date('now')
  `).get(platform);
  
  db.close();
  return result;
}

// 테스트
if (require.main === module) {
  console.log('📊 Engagement Collector');
  console.log('------------------------');
  console.log('DB:', DB_PATH);
  console.log('');
  console.log('TODO: 브라우저 자동화로 실제 데이터 수집 필요');
  console.log('현재는 수동으로 recordEngagement() 호출해야 함');
}

module.exports = { recordEngagement, getDailyStats };
