#!/usr/bin/env node
/**
 * Sitemap 자동 생성 스크립트
 */
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../data/posts.json');
const sitemapPath = path.join(__dirname, '../sitemap.xml');

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mj-molt-lover.vercel.app/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${posts.map(post => `  <url>
    <loc>https://mj-molt-lover.vercel.app/posts/${post.slug}.html</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(sitemapPath, sitemap);
console.log(`✅ sitemap.xml 생성 완료 (${posts.length + 1}개 URL)`);
