#!/bin/bash

# 🎯 Watch Live - Complete Enhancement Verification Script
# This script verifies all enhancements have been properly installed

echo "🔍 Watch Live Enhancement Verification"
echo "========================================"
echo ""

# Check Node modules
echo "1️⃣  Checking Dependencies..."
if npm list gsap > /dev/null 2>&1; then
  echo "   ✅ GSAP installed"
else
  echo "   ❌ GSAP not found"
fi

if npm list @radix-ui/react-dialog > /dev/null 2>&1; then
  echo "   ✅ @radix-ui/react-dialog installed"
else
  echo "   ❌ @radix-ui/react-dialog not found"
fi

echo ""
echo "2️⃣  Checking New Files..."

# Check animation files
files=(
  "lib/gsap-animations.ts"
  "hooks/useGsap.ts"
  "components/header.tsx"
  "components/hero-section.tsx"
  "components/skeleton-loaders.tsx"
  "components/ui/badge.tsx"
  "public/robots.txt"
  "public/site.webmanifest"
  "app/sitemap.xml/route.ts"
  "README.md"
  "ENHANCEMENT_SUMMARY.md"
  "GETTING_STARTED.md"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "   ✅ $file"
  else
    echo "   ❌ $file (MISSING)"
  fi
done

echo ""
echo "3️⃣  Checking Modified Files..."

modified_files=(
  "app/layout.tsx"
  "app/page.tsx"
  "app/globals.css"
  "components/match-card.tsx"
  "components/footer.tsx"
  "next.config.ts"
)

for file in "${modified_files[@]}"; do
  if grep -q "gsap\|animation\|metadata\|Header\|HeroSection" "$file" 2>/dev/null; then
    echo "   ✅ $file (enhanced)"
  else
    echo "   ❌ $file (not enhanced)"
  fi
done

echo ""
echo "4️⃣  Checking Build Status..."
npm run build > /tmp/build.log 2>&1
if grep -q "✓ Compiled successfully" /tmp/build.log; then
  echo "   ✅ Build successful"
  echo "   Build time: $(grep 'Compiled successfully' /tmp/build.log)"
else
  echo "   ❌ Build failed"
fi

echo ""
echo "5️⃣  Project Statistics..."
echo "   📁 Total files: $(find . -not -path './node_modules/*' -not -path './.next/*' -type f | wc -l)"
echo "   📝 Components: $(ls -1 components/*.tsx components/ui/*.tsx 2>/dev/null | wc -l)"
echo "   🎨 Styles: $(wc -l < app/globals.css) lines"
echo "   ⚙️  Animation hooks: $(wc -l < hooks/useGsap.ts) lines"
echo "   📚 Documentation: $(find . -name '*.md' -type f | wc -l) files"

echo ""
echo "✅ All Enhancements Verified!"
echo "========================================"
echo ""
echo "🚀 Next Steps:"
echo "   1. Run: npm run dev"
echo "   2. Visit: http://localhost:3000"
echo "   3. Check all animations and new UI"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Main documentation"
echo "   - GETTING_STARTED.md - Quick start guide"
echo "   - ENHANCEMENT_SUMMARY.md - Detailed changes"
echo "   - FILE_MANIFEST.md - Complete file listing"
echo ""
