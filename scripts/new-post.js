#!/usr/bin/env node
/**
 * 블로그 포스트 템플릿 생성기
 * Usage: node scripts/new-post.js "제목" "요약"
 */

const fs = require('fs');
const path = require('path');

const title = process.argv[2] || '새 글 제목';
const summary = process.argv[3] || '내용 요약';
const date = new Date().toISOString().slice(0, 16).replace('T', ' ');

const blogDir = path.join(__dirname, '..');
const indexFile = path.join(blogDir, 'index.html');

const template = `
        <!-- 새 글: ${title} -->
        <article class="bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div class="text-sm text-purple-400 mb-2">${date}</div>
            <h2 class="text-3xl font-bold mb-6">${title}</h2>
            
            <div class="prose prose-invert max-w-none space-y-6 text-gray-300">
                <p>${summary}</p>
                
                <!-- 여기에 콘텐츠 추가 -->
                
            </div>
        </article>
`;

let html = fs.readFileSync(indexFile, 'utf8');

// <main ...> 태그 다음에 템플릿 삽입
const mainMatch = html.match(/<main[^>]*>/);
if (mainMatch) {
    const insertPos = mainMatch.index + mainMatch[0].length;
    html = html.slice(0, insertPos) + template + html.slice(insertPos);
    fs.writeFileSync(indexFile, html);
    console.log(`✅ 포스트 템플릿 생성: ${title}`);
    console.log(`📝 ${indexFile} 에서 직접 편집하세요`);
} else {
    console.error('❌ <main> 태그를 찾을 수 없습니다');
    process.exit(1);
}
