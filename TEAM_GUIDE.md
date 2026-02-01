# RWAI Website Maintenance Guide

Complete guide for team members to update and maintain all website content.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Content Overview](#content-overview)
3. [Homepage Updates](#homepage-updates)
4. [Arena & Blueprint Management](#arena--blueprint-management)
5. [Static Page Updates](#static-page-updates)
6. [Navigation & Footer](#navigation--footer-updates)
7. [Translation Management](#translation-management)
8. [Testing Checklist](#testing-checklist)
9. [Deployment Workflow](#deployment-workflow)
10. [Common Tasks](#common-tasks)

---

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Git installed and configured
- Editor with Markdown support (VS Code recommended)
- Basic knowledge of Markdown syntax

### First-Time Setup

```bash
# Clone repository (if not already done)
git clone https://github.com/howang/rwai-website.git
cd rwai-website

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Daily Workflow

```bash
# Pull latest changes
git pull origin main

# Create/update content
# (See sections below for specific tasks)

# Test changes
npm run dev

# Build to verify
npm run build

# Commit and push
git add .
git commit -m "description of changes"
git push origin main
```

---

## Content Overview

### Content Locations

```
rwai-website/
├── lib/
│   └── data.ts                    # All blueprint/arena data
├── app/[locale]/
│   ├── page.tsx                   # Homepage (hero, stats)
│   ├── arena/
│   │   └── page.tsx               # Arena leaderboard page
│   ├── blueprint/[id]/
│   │   ├── page.tsx               # Blueprint overview page
│   │   └── [type]/
│   │       └── page.tsx           # Blueprint subpages
│   ├── framework/
│   │   └── page.tsx               # Framework page
│   ├── faq/
│   │   └── page.tsx               # FAQ page
│   └── contact/
│       └── page.tsx               # Contact page
├── locales/
│   ├── en.json                    # English translations
│   └── zh.json                    # Chinese translations
├── public/content/
│   └── blueprints/                # Blueprint markdown content
│       ├── blueprint-id-v1/
│       │   ├── index.en.md
│       │   ├── index.zh.md
│       │   └── ...
└── components/
    ├── layout/
    │   ├── Header.tsx             # Site navigation
    │   └── Footer.tsx             # Site footer
    └── ui/                        # Reusable UI components
```

### Content Types

| Content Type | Location | Edit Difficulty | Update Frequency |
|-------------|----------|----------------|------------------|
| Hero text/stats | `app/[locale]/page.tsx` | Medium | Low |
| Arena data | `lib/data.ts` | Easy | High |
| Blueprint content | `public/content/blueprints/*/` | Easy | High |
| Framework/FAQ/Contact | Component files | Medium | Low |
| Translations | `locales/*.json` | Easy | Medium |
| Navigation/Footer | `components/layout/*` | Medium | Low |

---

## Homepage Updates

### What Can Be Updated

The homepage (`app/[locale]/page.tsx`) contains:

1. **Hero Section**
   - Main headline and subheadline
   - Description text
   - Key statistics (50+, 12, 95%+)
   - CTA button text

2. **Featured Blueprints**
   - Automatically displays first 6 arenas from `lib/data.ts`
   - No manual updates needed

3. **Industry Section**
   - Automatically displays all industries from `lib/data.ts`
   - Counts update automatically

4. **Success Stories**
   - Hardcoded case studies
   - Can be updated directly in the component

### Updating Hero Content

**File:** `app/[locale]/page.tsx`

```typescript
// Find the hero section (lines 36-105)
// Update the following variables:

const isChina = locale === 'zh';

// Update headline
{isChina ? '哪个AI方案真正有效？' : 'Which AI Solution Actually Works?'}

// Update subheadline
{isChina ? '我们测试过，只推荐最好的' : 'We Test Them. Recommend Only the Best.'}

// Update description
{isChina ? '在真实业务场景中测试...' : 'Test AI solutions in real business scenarios...'}

// Update stats
{ value: '50+', label: isChina ? '经过验证方案' : 'Verified Blueprints' },
{ value: '12', label: isChina ? '个行业' : 'Industries' },
{ value: '95%+', label: isChina ? '平均准确率' : 'Avg. Accuracy' },
```

### Updating Success Stories

**File:** `app/[locale]/page.tsx` (lines 335-388)

```typescript
{[
  {
    company: isChina ? '某大型银行' : 'Major Bank',
    case: isChina ? 'NL2SQL财报生成' : 'NL2SQL Financial Reports',
    before: isChina ? '人工处理需要2小时' : 'Manual: 2 hours',
    after: isChina ? 'AI生成只需5分钟' : 'AI: 5 minutes',
    metric: '24x',
    label: isChina ? '效率提升' : 'Efficiency',
    accuracy: isChina ? '准确率95%' : '95% Accuracy',
  },
  // Add more case studies here
].map((study, idx) => (
  // ... rest of component
))}
```

**To add a new case study:**
1. Copy the existing object structure
2. Update all fields (both English and Chinese)
3. Ensure both languages are present

---

## Arena & Blueprint Management

### Understanding the Data Structure

**File:** `lib/data.ts`

There are two main data structures:

1. **`arenas` array** - Appears on Arena page and Homepage
2. **`blueprints` object** - Detailed blueprint information

### Adding a New Arena/Blueprint

**Step 1: Update `lib/data.ts`**

Add to the `arenas` array:

```typescript
{
  id: 'your-blueprint-id',
  title: {
    en: 'Your Blueprint Title (English)',
    zh: '您的蓝图标题（中文）'
  },
  description: {
    en: 'Brief English description',
    zh: '中文简要描述'
  },
  storyAchievement: {
    en: 'Key achievement in English',
    zh: '中文关键成就'
  },
  category: 'risk-control', // Choose from existing categories
  industry: 'finance',      // finance, retail, education, healthcare, energy, manufacturing
  status: 'verified',       // 'verified' or 'in-arena'
  metrics: {
    quality: 95,      // 0-100
    efficiency: 88,   // 0-100
    cost: 92,         // 0-100
    trust: 90         // 0-100
  },
  github: {
    stars: 1234,
    forks: 56,
    url: 'https://github.com/your-repo'
  },
  blueprintId: 'your-blueprint-id-v1', // Must match blueprint object key
  tags: ['tag1', 'tag2']
}
```

Add to the `blueprints` object:

```typescript
'your-blueprint-id-v1': {
  id: 'your-blueprint-id-v1',
  arenaId: 'your-blueprint-id',
  title: { en: '...', zh: '...' },
  description: { en: '...', zh: '...' },
  status: 'verified',
  demo: {
    type: 'video', // or 'interactive'
    url: 'https://...'
  },
  businessCase: {
    roi: { en: '...', zh: '...' },
    metrics: [...]
  },
  gapAnalysis: {
    standard: { ... },
    expert: { ... }
  },
  technical: {
    repo: 'https://...',
    docs: 'https://...',
    techStack: ['Python', 'FastAPI'],
    team: 'RWAI Core Team'
  },
  publishedAt: '2025-01-26',
  updatedAt: '2025-01-26'
}
```

**Step 2: Create Blueprint Content**

See [CONTENT.md](./CONTENT.md) for detailed instructions.

Quick version:

```bash
cd public/content/blueprints
mkdir your-blueprint-id-v1
cd your-blueprint-id-v1

# Create overview files
echo "# Title..." > index.en.md
echo "# 标题..." > index.zh.md

# Create subpage files (can be "Coming Soon" placeholders)
echo "# Implementation..." > implementation.en.md
echo "# 实现..." > implementation.zh.md
# ... repeat for requirements, validation-report, project-report
```

**Step 3: Verify**

```bash
# Run dev server
npm run dev

# Test in browser:
# - http://localhost:3000/en/arena (should see new arena)
# - http://localhost:3000/en/blueprint/your-blueprint-id-v1 (should see blueprint)
# - http://localhost:3000/zh/blueprint/your-blueprint-id-v1 (Chinese version)

# Build to check for errors
npm run build
```

### Updating an Existing Arena

**To update stats/metadata:**

Edit `lib/data.ts`, find the arena object, and update:

```typescript
{
  id: 'existing-id',
  // Update these fields as needed:
  github: {
    stars: 9999,  // Update with latest GitHub stats
    forks: 123,
    url: 'https://...' // Update if repo moved
  },
  metrics: {
    quality: 98,    // Update if new benchmarks available
    efficiency: 92,
    cost: 95,
    trust: 93
  },
  status: 'verified' // Change to 'verified' if promoted from 'in-arena'
}
```

**To update content:**

Edit markdown files in `public/content/blueprints/blueprint-id-v1/`:
- `index.en.md` / `index.zh.md` - Overview
- `implementation.en.md` / `implementation.zh.md` - Implementation guide
- `requirements.en.md` / `requirements.zh.md` - Requirements
- `validation-report.en.md` / `validation-report.zh.md` - Validation results
- `project-report.en.md` / `project-report.zh.md` - Project report

See [CONTENT.md](./CONTENT.md) for markdown guidelines.

---

## Static Page Updates

### Framework Page

**File:** `app/[locale]/framework/page.tsx`

Contains the RWAI framework explanation. To update:

1. Find the content sections you want to modify
2. Update both English and Chinese versions
3. Maintain the same structure for both languages

### FAQ Page

**File:** `app/[locale]/faq/page.tsx`

FAQs are typically rendered from an array. To add/edit FAQs:

```typescript
const faqs = [
  {
    question: {
      en: 'Your question here?',
      zh: '您的问题在这里？'
    },
    answer: {
      en: 'Your answer here.',
      zh: '您的答案在这里。'
    }
  },
  // Add more FAQs
];
```

### Contact Page

**File:** `app/[locale]/contact/page.tsx`

Contains contact information and form. To update:

- Contact email addresses
- Community links (Discord, GitHub, etc.)
- Form fields (if using a form service)

---

## Navigation & Footer Updates

### Header Navigation

**File:** `components/layout/Header.tsx`

Navigation items are defined in the component. To add/update links:

```typescript
const navItems = [
  { href: '/arena', label: { en: 'Arena', zh: '擂台' } },
  { href: '/framework', label: { en: 'Framework', zh: '框架' } },
  { href: '/faq', label: { en: 'FAQ', zh: '常见问题' } },
  // Add more navigation items here
];
```

### Footer Links

**File:** `components/layout/Footer.tsx`

Footer contains:
- Product links
- Company links
- Social media links
- Copyright text

To update:

```typescript
const productLinks = [
  { href: '/arena', label: { en: 'Arena', zh: '擂台' } },
  // Add more product links
];

const companyLinks = [
  { href: '/about', label: { en: 'About', zh: '关于我们' } },
  // Add more company links
];
```

---

## Translation Management

### Translation Files

**Locations:**
- English: `locales/en.json`
- Chinese: `locales/zh.json`

### Adding a New Translation Key

**Step 1: Add to both files**

`locales/en.json`:
```json
{
  "newKey": "English text here",
  "anotherKey": "More English text"
}
```

`locales/zh.json`:
```json
{
  "newKey": "中文文本在这里",
  "anotherKey": "更多中文文本"
}
```

**Step 2: Use in components**

```typescript
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t('newKey')}</h1>
      <p>{t('anotherKey')}</p>
    </div>
  );
}
```

### Translation Best Practices

1. **Keep keys consistent** across both languages
2. **Use descriptive keys** (e.g., `hero.ctaButton` not `button1`)
3. **Group related translations** with dot notation
4. **Maintain parallel structure** in both files
5. **Update both files simultaneously** to avoid missing translations

### Adding a New Language (Future)

To add a new language (e.g., Japanese):

1. Create `locales/ja.json`
2. Add Japanese translations
3. Update `next-intl` configuration in `app/[locale]/config.ts`
4. Update language selector in Header

---

## Testing Checklist

### Before Committing Changes

Always complete these checks:

#### 1. Visual Testing

- [ ] Homepage displays correctly
- [ ] Arena page loads with all blueprints
- [ ] Blueprint detail pages work
- [ ] All subpages (implementation, requirements, etc.) load
- [ ] Navigation links work
- [ ] Footer links work

#### 2. Bilingual Testing

- [ ] English version displays correctly
- [ ] Chinese version displays correctly
- [ ] Language toggle works
- [ ] No missing translations
- [ ] No mixed languages on same page

#### 3. Content Testing

- [ ] All markdown files render properly
- [ ] Tables are formatted correctly
- [ ] Code blocks display with syntax highlighting
- [ ] Links work (both internal and external)
- [ ] Images load (if any)
- [ ] Spelling and grammar are correct

#### 4. Functionality Testing

- [ ] Arena filtering works (by industry, category)
- [ ] Blueprint cards link to correct pages
- [ ] Subpage navigation tabs work
- [ ] "Back to Blueprint" button works
- [ ] Forms (if any) submit correctly

#### 5. Build Verification

```bash
# Always run before committing
npm run build
```

Ensure:
- [ ] No TypeScript errors
- [ ] No build warnings
- [ ] All routes generate successfully
- [ ] No console errors in browser

### Browser Testing

Test in multiple browsers:
- [ ] Chrome (Desktop & Mobile)
- [ ] Safari (Desktop & iOS)
- [ ] Firefox (Desktop)
- [ ] Edge (Desktop)

### Responsive Testing

Test at different screen sizes:
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)

---

## Deployment Workflow

### Development Workflow

```bash
# 1. Start with latest main branch
git checkout main
git pull origin main

# 2. Create feature branch (for significant changes)
git checkout -b feature/update-blueprint-x

# 3. Make your changes
# Edit files as needed

# 4. Test locally
npm run dev
# Open http://localhost:3000
# Test all changes

# 5. Build to verify
npm run build

# 6. Commit changes
git add .
git commit -m "feat: update blueprint X with new metrics

- Quality score updated to 98
- Added implementation guide
- Updated Chinese translation

Co-Authored-By: Your Name <you@example.com>"

# 7. Push to GitHub
git push origin feature/update-blueprint-x

# 8. Create Pull Request (if using feature branches)
# Go to GitHub and create PR
# Wait for review and merge

# OR (for simple updates, commit directly to main)
git push origin main
```

### Automatic Deployment

- **Vercel** automatically deploys when you push to `main`
- Deployment typically takes 2-3 minutes
- Check deployment status at: https://vercel.com/dashboard

### Manual Deployment (if needed)

```bash
npm run build
vercel --prod
```

### Post-Deployment Verification

After deployment completes:

1. **Visit production URL**
   - https://rwai.org (or your domain)

2. **Test critical paths**
   - Homepage loads
   - Arena page displays correctly
   - Blueprint pages work
   - Language toggle works

3. **Check both languages**
   - /en/* pages
   - /zh/* pages

4. **Verify recent changes**
   - Confirm your updates are visible
   - Check for any broken links
   - Test any new features

### Rollback Procedure

If something goes wrong:

```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>

# Push the rollback
git push origin main --force

# Vercel will automatically redeploy
```

---

## Common Tasks

### Task 1: Add a New Blueprint

**Time:** 30-60 minutes
**Difficulty:** Easy

```bash
# 1. Update data.ts
vim lib/data.ts
# Add arena object and blueprint object

# 2. Create content directory
cd public/content/blueprints
mkdir blueprint-id-v1
cd blueprint-id-v1

# 3. Create markdown files
# Copy from _templates/ or create placeholders

# 4. Test
npm run dev
# Visit /en/blueprint/blueprint-id-v1

# 5. Build and commit
npm run build
git add .
git commit -m "feat: add new blueprint-id-v1"
git push origin main
```

### Task 2: Update Blueprint Metrics

**Time:** 5-10 minutes
**Difficulty:** Easy

```bash
# 1. Edit data.ts
vim lib/data.ts
# Find the arena and update metrics object

# 2. Test
npm run dev
# Visit /en/arena to verify

# 3. Commit
git add lib/data.ts
git commit -m "feat: update blueprint-id metrics to Q/E/C/T"
git push origin main
```

### Task 3: Update Blueprint Content

**Time:** 15-30 minutes
**Difficulty:** Easy

```bash
# 1. Edit markdown files
cd public/content/blueprints/blueprint-id-v1
vim index.en.md index.zh.md

# 2. Test
npm run dev
# Visit /en/blueprint/blueprint-id-v1

# 3. Commit
git add public/content/blueprints/blueprint-id-v1/
git commit -m "docs: update blueprint-id-v1 overview with new results"
git push origin main
```

### Task 4: Update Homepage Hero

**Time:** 10-15 minutes
**Difficulty:** Medium

```bash
# 1. Edit page.tsx
vim app/[locale]/page.tsx
# Update hero section content

# 2. Test both languages
npm run dev
# Visit /en and /zh

# 3. Commit
git add "app/[locale]/page.tsx"
git commit -m "feat: update homepage hero with new messaging"
git push origin main
```

### Task 5: Add Translation

**Time:** 10-20 minutes
**Difficulty:** Easy

```bash
# 1. Add to both locale files
vim locales/en.json
vim locales/zh.json
# Add new key to both

# 2. Use in component
vim components/YourComponent.tsx
# Add t('newKey')

# 3. Test
npm run dev
# Test both languages

# 4. Commit
git add locales/ components/
git commit -m "feat: add translations for new feature"
git push origin main
```

### Task 6: Update Success Stories

**Time:** 15-20 minutes
**Difficulty:** Easy

```bash
# 1. Edit homepage
vim app/[locale]/page.tsx
# Find success stories section
# Add or update case study object

# 2. Test
npm run dev
# Visit homepage

# 3. Commit
git add "app/[locale]/page.tsx"
git commit -m "feat: add new success story from Company X"
git push origin main
```

### Task 7: Bulk Update Multiple Blueprints

**Time:** 1-2 hours
**Difficulty:** Medium

```bash
# 1. Update data.ts for all blueprints
vim lib/data.ts
# Update multiple arena objects

# 2. Update content files
cd public/content/blueprints
# Loop through each blueprint and update

# 3. Test thoroughly
npm run dev
# Test multiple blueprint pages

# 4. Commit
git add .
git commit -m "feat: bulk update all blueprint metrics from Q1 2025 benchmarks

- Updated 12 blueprints with new test results
- Improved quality scores across the board
- Added missing GitHub stats

Co-Authored-By: Your Name <you@example.com>"
git push origin main
```

---

## Best Practices

### Content Creation

1. **Start Simple**: Use "Coming Soon" placeholders, fill in details later
2. **Be Bilingual**: Always create both English and Chinese versions
3. **Be Consistent**: Follow existing patterns and structure
4. **Be Specific**: Use real metrics and data, not vague claims
5. **Be Honest**: If something is incomplete, mark it clearly

### Code Editing

1. **Read Before Editing**: Always read the file first to understand structure
2. **Preserve Patterns**: Follow existing code patterns and formatting
3. **Test Locally**: Never push without running `npm run dev` first
4. **Build Before Commit**: Always run `npm run build` before committing
5. **Small Commits**: Make frequent, small commits with clear messages

### Git Workflow

1. **Pull Before Push**: Always `git pull` before starting work
2. **Clear Commit Messages**: Use conventional commit format
   - `feat:` - New features
   - `docs:` - Documentation updates
   - `fix:` - Bug fixes
   - `refactor:` - Code refactoring
   - `style:` - Formatting changes
3. **Co-Authored-By**: Add co-author attribution for collaborative work
4. **Branch for Big Changes**: Use feature branches for significant updates

### Quality Assurance

1. **Test Both Languages**: Always check EN and ZH versions
2. **Test Multiple Pages**: Don't just test the page you edited
3. **Check Links**: Click every link to ensure it works
4. **Mobile Test**: Check responsive design on mobile viewport
5. **Peer Review**: For important updates, have someone else review

---

## Troubleshooting

### Issue: Changes Not Appearing

**Possible Causes:**
1. Browser cache
2. Next.js build cache
3. Wrong file edited
4. File not saved

**Solutions:**
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev

# Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

# Verify you edited the right file
git status
```

### Issue: Build Errors

**Common Causes:**
1. TypeScript type errors
2. Missing imports
3. Syntax errors in JSX
4. Invalid markdown

**Solutions:**
```bash
# Read the error message carefully
npm run build

# Fix the reported error
# Common fixes:
# - Add missing imports
# - Fix type mismatches
# - Correct JSX syntax
# - Validate markdown tables

# Build again
npm run build
```

### Issue: Images Not Loading

**Possible Causes:**
1. Wrong file path
2. File not in public/ directory
3. Case sensitivity (Linux is case-sensitive)

**Solutions:**
```bash
# Verify image exists
ls -la public/images/your-image.png

# Use correct path in component
<Image src="/images/your-image.png" />

# Restart dev server
npm run dev
```

### Issue: Missing Translations

**Possible Causes:**
1. Key exists in en.json but not zh.json (or vice versa)
2. Key typo in component
3. File not saved

**Solutions:**
```bash
# Search for the key in both files
grep "yourKey" locales/en.json
grep "yourKey" locales/zh.json

# Add missing translation
# Verify spelling matches exactly

# Restart dev server
npm run dev
```

### Issue: 404 on Blueprint Page

**Possible Causes:**
1. Folder name doesn't match blueprintId
2. Missing index.en.md or index.zh.md
3. File not saved

**Solutions:**
```bash
# Check blueprintId in data.ts
grep "blueprintId: 'your-id'" lib/data.ts

# Check folder name
ls -la public/content/blueprints/

# Ensure names match exactly
# Folder must be: public/content/blueprints/your-id-v1/

# Check index files exist
ls public/content/blueprints/your-id-v1/index.*
```

---

## Additional Resources

### Documentation

- [CONTENT.md](./CONTENT.md) - Detailed blueprint content guide
- [README.md](./README.md) - Project overview and setup
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [next-intl Docs](https://next-intl-docs.vercel.app/) - Internationalization
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# Git
git pull origin main     # Get latest changes
git status               # Check modified files
git log --oneline -10     # View recent commits
git diff                  # View unstaged changes

# Content
ls public/content/blueprints/     # List all blueprints
grep -r "search-term" public/content/  # Search in content

# Testing
npm run build            # Must pass before committing
# Open http://localhost:3000 in browser
```

### Team Contacts

- **Technical Issues**: Development team
- **Content Questions**: Content lead
- **Translation Help**: Localization team
- **Deployment Issues**: DevOps team

---

## Quick Reference Card

### Daily Maintenance

```bash
# Start work
git pull origin main
npm run dev

# Make changes...

# Test
npm run build

# Commit
git add .
git commit -m "description"
git push origin main
```

### Add Blueprint

```bash
# 1. Update lib/data.ts (add to arenas array and blueprints object)
# 2. Create public/content/blueprints/id-v1/ with markdown files
# 3. Test: npm run dev
# 4. Build: npm run build
# 5. Commit and push
```

### Update Content

```bash
# 1. Edit markdown files in public/content/blueprints/id-v1/
# 2. Test: npm run dev
# 3. Commit and push
```

### Emergency Rollback

```bash
git revert HEAD
git push origin main
# Vercel will auto-redeploy
```

---

*Last updated: 2025-01-26*

*For questions, contact the RWAI development team or open a GitHub issue.*
