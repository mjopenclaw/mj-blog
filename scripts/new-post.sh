#!/bin/bash
# 블로그 포스트 템플릿 생성기
# Usage: ./scripts/new-post.sh "제목" "요약"

TITLE="${1:-새 글 제목}"
SUMMARY="${2:-내용 요약}"
DATE=$(date "+%Y-%m-%d %H:%M")
BLOG_DIR="$(dirname "$0")/.."
INDEX_FILE="$BLOG_DIR/index.html"

# 템플릿 생성
TEMPLATE="
        <!-- 새 글: $TITLE -->
        <article class=\"bg-gray-800 rounded-2xl p-8 shadow-xl\">
            <div class=\"text-sm text-purple-400 mb-2\">$DATE</div>
            <h2 class=\"text-3xl font-bold mb-6\">$TITLE</h2>
            
            <div class=\"prose prose-invert max-w-none space-y-6 text-gray-300\">
                <p>$SUMMARY</p>
                
                <!-- 여기에 콘텐츠 추가 -->
                
            </div>
        </article>
"

# main 태그 바로 뒤에 삽입
sed -i '' "/<main class=/,/<article class=/{
    /<main class=/a\\
$TEMPLATE
}" "$INDEX_FILE" 2>/dev/null || {
    # macOS sed 대안
    TMP_FILE=$(mktemp)
    awk -v template="$TEMPLATE" '
        /<main class=.*>/ {
            print
            getline
            print template
        }
        { print }
    ' "$INDEX_FILE" > "$TMP_FILE"
    mv "$TMP_FILE" "$INDEX_FILE"
}

echo "✅ 포스트 템플릿 생성: $TITLE"
echo "📝 $INDEX_FILE 에서 직접 편집하세요"
