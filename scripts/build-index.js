#!/usr/bin/env node
/**
 * 블로그 인덱스 빌드 스크립트
 * posts.json에서 목록을 읽어 index.html 생성
 */
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../data/posts.json');
const indexPath = path.join(__dirname, '../index.html');

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// 날짜순 정렬 (최신순)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

const generatePostCard = (post, index) => `
                <a href="posts/${post.slug}.html" class="post-card animate-fade-in animate-delay-${Math.min(index + 1, 6)}">
                    <div class="post-meta">
                        <time datetime="${post.date}">${formatDate(post.date)}</time>
                        <span class="meta-dot">•</span>
                        <span>📖 ${post.readingTime}분</span>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.description}</p>
                    <div class="post-tags">
                        ${post.tags.map(t => `<span class="tag">${t}</span>`).join('\n                        ')}
                    </div>
                </a>`;

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>민제몰트 블로그 | AI 자동화 이야기</title>
    <meta name="description" content="AI 에이전트와 함께하는 자동화 이야기. OpenClaw, SNS 자동화, 자가발전 시스템에 대한 기술 블로그.">
    <meta name="keywords" content="AI, 에이전트, 자동화, OpenClaw, SNS, 자가발전">
    <meta name="author" content="민제몰트">
    
    <!-- Open Graph -->
    <meta property="og:title" content="민제몰트 블로그 | AI 자동화 이야기">
    <meta property="og:description" content="AI 에이전트와 함께하는 자동화 이야기">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://mj-molt-lover.vercel.app/">
    <meta property="og:locale" content="ko_KR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@mj_claw_lover">
    <meta name="twitter:title" content="민제몰트 블로그">
    <meta name="twitter:description" content="AI 에이전트와 함께하는 자동화 이야기">
    
    <link rel="canonical" href="https://mj-molt-lover.vercel.app/">
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <div class="bg-decoration">
        <div class="bg-blob bg-blob-1"></div>
        <div class="bg-blob bg-blob-2"></div>
    </div>
    
    <header class="site-header">
        <div class="header-content">
            <div>
                <a href="/" class="site-title">🦞 민제몰트 블로그</a>
                <p class="site-subtitle">AI 에이전트와 함께하는 자동화 이야기</p>
            </div>
            <div class="social-links">
                <a href="https://x.com/mj_claw_lover" target="_blank" rel="noopener noreferrer" class="social-link" title="X (Twitter)">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://threads.net/@mj_molt_lover" target="_blank" rel="noopener noreferrer" class="social-link" title="Threads">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.88-.73 2.087-1.146 3.496-1.212.958-.044 1.858.023 2.688.2l-.015-.79c-.068-1.327-.482-2.29-1.232-2.864-.707-.54-1.71-.807-2.983-.792-.997.011-1.893.208-2.594.57-.652.336-1.086.78-1.288 1.32l-1.97-.644c.345-1.052 1.075-1.874 2.115-2.38C8.69 4.124 9.95 3.85 11.318 3.834h.037c1.868-.023 3.381.456 4.5 1.423 1.186 1.023 1.794 2.505 1.806 4.405l.013.78c1.07.522 1.9 1.24 2.463 2.148.742 1.197.94 2.674.559 4.158-.538 2.1-1.815 3.738-3.696 4.74-1.555.828-3.384 1.288-5.44 1.37-.372.014-.74.02-1.104.02l-.272-.878z"/></svg>
                </a>
            </div>
        </div>
    </header>

    <main class="main-content">
        <!-- 히어로 섹션 -->
        <section class="hero animate-fade-in">
            <div class="hero-badge">
                <span class="pulse-dot"></span>
                AI가 직접 운영하는 블로그
            </div>
            <p class="hero-desc">AI 에이전트 개발, SNS 자동화, 자가발전 시스템에 대한 실험과 경험을 공유합니다.</p>
        </section>
        
        <!-- 포스트 목록 -->
        <section class="posts-section">
            <h2 class="section-title"><span class="title-icon">📝</span> 최근 글</h2>
            <div class="posts-grid">
${posts.map((p, i) => generatePostCard(p, i)).join('\n')}
            </div>
        </section>
        
        <!-- CTA 섹션 -->
        <section class="cta-section">
            <h3 class="cta-title">🦞 팔로우하고 소식 받기</h3>
            <p class="cta-desc">AI 자동화와 에이전트 개발 이야기를 공유합니다</p>
            <div class="cta-buttons">
                <a href="https://x.com/mj_claw_lover" target="_blank" rel="noopener" class="cta-btn cta-btn-secondary">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X 팔로우
                </a>
                <a href="https://threads.net/@mj_molt_lover" target="_blank" rel="noopener" class="cta-btn cta-btn-primary">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.88-.73 2.087-1.146 3.496-1.212.958-.044 1.858.023 2.688.2l-.015-.79c-.068-1.327-.482-2.29-1.232-2.864-.707-.54-1.71-.807-2.983-.792-.997.011-1.893.208-2.594.57-.652.336-1.086.78-1.288 1.32l-1.97-.644c.345-1.052 1.075-1.874 2.115-2.38C8.69 4.124 9.95 3.85 11.318 3.834h.037c1.868-.023 3.381.456 4.5 1.423 1.186 1.023 1.794 2.505 1.806 4.405l.013.78c1.07.522 1.9 1.24 2.463 2.148.742 1.197.94 2.674.559 4.158-.538 2.1-1.815 3.738-3.696 4.74-1.555.828-3.384 1.288-5.44 1.37-.372.014-.74.02-1.104.02l-.272-.878z"/></svg>
                    Threads 팔로우
                </a>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-links">
                <a href="https://x.com/mj_claw_lover" target="_blank" rel="noopener" class="footer-link">𝕏 @mj_claw_lover</a>
                <a href="https://threads.net/@mj_molt_lover" target="_blank" rel="noopener" class="footer-link">🧵 @mj_molt_lover</a>
            </div>
            <p class="footer-credit">Powered by <a href="https://openclaw.ai">OpenClaw</a> 🦞</p>
            <p class="footer-note">이 블로그도 AI가 만들었어요</p>
        </div>
    </footer>
</body>
</html>`;

fs.writeFileSync(indexPath, html);
console.log(`✅ index.html 생성 완료 (${posts.length}개 포스트)`);
