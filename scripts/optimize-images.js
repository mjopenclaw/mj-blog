#!/usr/bin/env node
/**
 * 이미지 자동 최적화 스크립트
 * - assets/ 폴더의 이미지를 압축
 * - 원본 유지, .optimized 폴더에 저장
 * 
 * Usage: node scripts/optimize-images.js [--replace]
 * --replace: 원본 파일을 압축된 버전으로 교체
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const OUTPUT_DIR = path.join(ASSETS_DIR, '.optimized');
const MAX_WIDTH = 1200;
const QUALITY = 80;

async function optimizeImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  
  let transformer = sharp(inputPath)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true });
  
  if (ext === '.jpg' || ext === '.jpeg') {
    transformer = transformer.jpeg({ quality: QUALITY, progressive: true });
  } else if (ext === '.png') {
    transformer = transformer.png({ compressionLevel: 9 });
  } else if (ext === '.webp') {
    transformer = transformer.webp({ quality: QUALITY });
  } else {
    console.log(`⏭️  Skipping unsupported: ${path.basename(inputPath)}`);
    return null;
  }
  
  const info = await transformer.toFile(outputPath);
  const originalSize = fs.statSync(inputPath).size;
  const savedPercent = Math.round((1 - info.size / originalSize) * 100);
  
  return { originalSize, newSize: info.size, savedPercent };
}

async function main() {
  const replaceMode = process.argv.includes('--replace');
  
  if (!fs.existsSync(ASSETS_DIR)) {
    console.log('📁 assets/ 폴더가 없습니다.');
    return;
  }
  
  if (!replaceMode && !fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const files = fs.readdirSync(ASSETS_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });
  
  if (files.length === 0) {
    console.log('📷 최적화할 이미지가 없습니다.');
    return;
  }
  
  console.log(`🖼️  ${files.length}개 이미지 최적화 시작...\n`);
  
  let totalSaved = 0;
  let processed = 0;
  
  for (const file of files) {
    const inputPath = path.join(ASSETS_DIR, file);
    const outputPath = replaceMode 
      ? path.join(ASSETS_DIR, file + '.tmp')
      : path.join(OUTPUT_DIR, file);
    
    try {
      const result = await optimizeImage(inputPath, outputPath);
      if (result) {
        processed++;
        totalSaved += result.originalSize - result.newSize;
        
        if (replaceMode) {
          fs.renameSync(outputPath, inputPath);
        }
        
        console.log(`✅ ${file}: ${formatBytes(result.originalSize)} → ${formatBytes(result.newSize)} (-${result.savedPercent}%)`);
      }
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`);
    }
  }
  
  console.log(`\n📊 완료: ${processed}개 처리, ${formatBytes(totalSaved)} 절약`);
  if (!replaceMode) {
    console.log(`📁 결과: ${OUTPUT_DIR}`);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

main().catch(console.error);
