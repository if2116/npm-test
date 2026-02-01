# RWAI Content Management Guide

This guide provides detailed instructions for managing blueprint and arena content on the RWAI website.

---

## Table of Contents

1. [Content Structure](#content-structure)
2. [Adding a New Blueprint](#adding-a-new-blueprint)
3. [Updating Existing Blueprints](#updating-existing-blueprints)
4. [Creating "Coming Soon" Placeholders](#creating-coming-soon-placeholders)
5. [Markdown Content Guidelines](#markdown-content-guidelines)
6. [Bilingual Content Requirements](#bilingual-content-requirements)
7. [Linking Between Pages](#linking-between-pages)
8. [Testing and Verification](#testing-and-verification)
9. [Deployment Workflow](#deployment-workflow)
10. [Common Issues and Solutions](#common-issues-and-solutions)

---

## Content Structure

### Directory Layout

```
public/content/blueprints/
├── _templates/
│   ├── index-template.md       # Template for new blueprint overviews
│   └── implementation-template.md
├── blueprint-id-v1/            # Blueprint folder (use v1, v2, etc. for versions)
│   ├── index.en.md             # Overview page (English)
│   ├── index.zh.md             # Overview page (Chinese)
│   ├── implementation.en.md    # Implementation details (English)
│   ├── implementation.zh.md    # Implementation details (Chinese)
│   ├── requirements.en.md      # Requirements (English)
│   ├── requirements.zh.md      # Requirements (Chinese)
│   ├── validation-report.en.md # Validation report (English)
│   ├── validation-report.zh.md # Validation report (Chinese)
│   ├── project-report.en.md    # Project report (English)
│   └── project-report.zh.md    # Project report (Chinese)
```

### File Naming Conventions

**Blueprint ID Format:**
- Use lowercase with hyphens: `nl2sql-financial-v1`, `customer-support-qa-v1`
- Include version suffix: `-v1`, `-v2`, etc.
- Keep it descriptive but concise

**Content Files:**
- English files: `<page>.en.md`
- Chinese files: `<page>.zh.md`
- Page names: `index`, `implementation`, `requirements`, `validation-report`, `project-report`

**Example:**
```
nl2sql-sota-v1/
├── index.en.md
├── index.zh.md
├── implementation.en.md
├── implementation.zh.md
└── ...
```

---

## How Blueprints Appear on the Website

### Homepage Display

Blueprints added to `lib/data.ts` automatically appear on the homepage:

1. **Featured Blueprints Section** (Top section)
   - Shows the first 6 blueprints from the `arenas` array
   - Displays: category badge, title, industry icon, SOTA status, quality/efficiency scores, GitHub stats
   - Links directly to blueprint detail pages

2. **Explore by Industry Section** (Lower section)
   - Groups blueprints by industry
   - Shows count of blueprints per industry
   - Links to filtered Arena page

3. **Homepage Card Display Requirements**
   For a blueprint to appear properly on the homepage:
   - Must be in the `arenas` array in `lib/data.ts`
   - Must have all required fields: `id`, `title`, `description`, `category`, `industry`, `status`, `metrics`
   - `title` and `description` must have both `en` and `zh` translations
   - `blueprintId` must match the corresponding key in the `blueprints` object
   - `github` object with `stars` and `forks` (optional, defaults to 0)

### Arena Leaderboard Page

All blueprints in the `arenas` array appear on the `/arena` page, which can be filtered by:
- Industry (finance, healthcare, education, etc.)
- Category (risk-control, service, management, etc.)
- Status (verified, in-arena)

---

## Adding a New Blueprint

### Step 1: Update Data Structure

Edit `lib/data.ts` and add your blueprint to BOTH the `arenas` array and the `blueprints` object.

**Add to `arenas` array:**

```typescript
export const arenas: Arena[] = [
  // ... existing arenas
  {
    id: 'your-blueprint-id',
    title: {
      en: 'Your Blueprint Title',
      zh: '您的蓝图标题'
    },
    description: {
      en: 'Brief description in English',
      zh: '中文简要描述'
    },
    storyAchievement: {
      en: 'Key achievement or metric',
      zh: '关键成就或指标'
    },
    category: 'risk-control', // or: service, management, marketing, operations
    industry: 'finance',      // or: retail, education, healthcare, energy, manufacturing
    status: 'verified',       // or: 'in-arena'
    metrics: {
      quality: 95,
      efficiency: 88,
      cost: 92,
      trust: 90
    },
    detailedMetrics: {
      metric1: {
        label: { en: 'Metric Name', zh: '指标名称' },
        value: 95
      }
    },
    github: {
      stars: 1234,
      forks: 56,
      url: 'https://github.com/your-repo'
    },
    blueprintId: 'your-blueprint-id-v1', // Must match blueprint object key
    tags: ['tag1', 'tag2']
  }
];
```

**Add to `blueprints` object:**

```typescript
export const blueprints: Record<string, Blueprint> = {
  // ... existing blueprints
  'your-blueprint-id-v1': {
    id: 'your-blueprint-id-v1',
    arenaId: 'your-blueprint-id',
    title: {
      en: 'Your Blueprint Title',
      zh: '您的蓝图标题'
    },
    description: {
      en: 'Full description of the blueprint',
      zh: '蓝图的完整描述'
    },
    status: 'verified',
    demo: {
      type: 'video', // or: 'interactive'
      url: 'https://example.com/demo'
    },
    businessCase: {
      roi: {
        en: 'Reduce cost by 90%',
        zh: '降低90%成本'
      },
      metrics: [
        {
          label: { en: 'Accuracy', zh: '准确率' },
          value: '95%',
          description: { en: 'On test set', zh: '测试集表现' }
        }
      ]
    },
    gapAnalysis: {
      standard: {
        accuracy: '85%',
        deployment: 'Public Cloud',
        support: 'Community',
        customization: 'Requires development'
      },
      expert: {
        accuracy: '95%+',
        deployment: 'On-Premise',
        support: '24/7 Dedicated',
        customization: 'Low-code configuration',
        sla: '99.9% Uptime'
      }
    },
    technical: {
      repo: 'https://github.com/your-repo',
      docs: 'https://docs.example.com',
      techStack: ['Python', 'FastAPI', 'React'],
      team: 'RWAI Core Team'
    },
    publishedAt: '2025-01-26',
    updatedAt: '2025-01-26'
  }
};
```

### Step 2: Create Blueprint Content Directory

```bash
cd public/content/blueprints
mkdir your-blueprint-id-v1
cd your-blueprint-id-v1
```

### Step 3: Create Content Files

You have two options:

**Option A: Full Documentation** (if you have complete content)
Create all 10 markdown files with detailed content.

**Option B: "Coming Soon" Placeholder** (recommended for initial launch)
Copy the placeholder template:

```bash
# Copy template files
cp ../../_templates/index-template.md index.en.md
# Create all other files with "Coming Soon" content
```

See [Creating "Coming Soon" Placeholders](#creating-coming-soon-placeholders) for details.

---

## Updating Existing Blueprints

### Updating Overview Page

1. Navigate to blueprint directory:
   ```bash
   cd public/content/blueprints/blueprint-id-v1
   ```

2. Edit the overview file:
   ```bash
   # Edit English version
   vim index.en.md

   # Edit Chinese version
   vim index.zh.md
   ```

3. Update the `updatedAt` date at the bottom of both files

### Adding Detailed Documentation to a Placeholder

When you're ready to replace "Coming Soon" with full content:

1. **Update the index page** with proper content:
   - Replace the placeholder text with actual overview
   - Add key metrics, tech stack, and quick start
   - Keep the documentation links at the bottom

2. **Fill in each subpage** (implementation, requirements, etc.):
   - Remove the "Coming Soon" section
   - Add detailed content following the structure
   - See `intelligent-research-system-v1` as a reference

3. **Update data.ts** if metrics or tech stack changed

---

## Creating "Coming Soon" Placeholders

Use this approach for blueprints that are verified but don't have full documentation yet.

### Template Structure

**index.en.md:**

```markdown
# Blueprint Title

**Case Number**: Case25126XXX
**Status**: ✅ Verified

---

## 📋 Overview

Brief 2-3 sentence overview of what this blueprint does.

---

## 🎯 Key Metrics

| Metric | Value | Benchmark |
|--------|-------|-----------|
| **Metric 1** | XX | Context |
| **Metric 2** | XX | Context |

---

## 📊 Technical Architecture

### System Workflow

```
[Simple workflow diagram]
```

### Tech Stack

- **Component 1**: Description
- **Component 2**: Description

---

## ⚡ Quick Start

### Prerequisites

- Requirement 1
- Requirement 2

### N-Step Setup

1. **Step 1**: Description
2. **Step 2**: Description
3. **Step 3**: Description

---

*Last updated: YYYY-MM-DD* | *Version: 1.0* | *Status: ✅ Verified*

**📚 Full Documentation**

- **[Implementation Details](./implementation)**: Deployment guide, technical steps
- **[Validation Requirements](./requirements)**: Functional specs, performance metrics
- **[Validation Report](./validation-report)**: Test results, benchmark analysis
- **[Project Report](./project-report)**: User stories, ROI analysis
```

**Subpage Template (implementation/en.md, requirements.en.md, etc.):**

```markdown
# Page Title

**Blueprint ID**: blueprint-id-v1

---

## 🚧 Coming Soon

Detailed documentation is being prepared. This section will include comprehensive information about [page topic].

---

**In the meantime**, please refer to the [Overview](./index.en.md) for quick information.

---

*Expected completion: Q2 2025*
```

**Chinese Version (index.zh.md):**

Replace "Coming Soon" with "即将推出" and adjust the language accordingly.

---

## Markdown Content Guidelines

### Headings

- Use H1 (`#`) for the main title only
- Use H2 (`##`) for major sections
- Use H3 (`###`) for subsections
- Use H4 (`####`) for detailed subsections

### Tables

Format tables with aligned columns:

```markdown
| Metric | Value | Benchmark |
|--------|-------|-----------|
| **Accuracy** | 95% | Top 3% |
| **Speed** | <2s | Industry leading |
```

### Code Blocks

For inline code: `` `code` ``

For code blocks:

````markdown
```python
def example():
    return "Hello"
```
````

### Callouts and Highlights

Use emojis for visual emphasis:
- ✅ Verified/Complete
- 🚧 Coming Soon/In Progress
- ⚠️ Important note
- 💡 Tip/Best practice
- 📊 Metric/Data
- 🎯 Goal/Target

### Links

**Internal links to subpages:**
```markdown
- **[Implementation Details](./implementation)**: Description
```

**External links:**
```markdown
[GitHub Repository](https://github.com/user/repo)
```

---

## Bilingual Content Requirements

### Mandatory Bilingual Support

ALL content must have both English (`.en.md`) and Chinese (`.zh.md`) versions.

### Translation Guidelines

1. **Maintain Structure**: Chinese files must have the exact same structure as English
2. **Date Format**: Use YYYY-MM-DD (ISO 8601) for both languages
3. **Technical Terms**: Keep technical terms in English where appropriate
   - Example: "使用vLLM部署" (not "使用非常大型语言模型部署")
4. **Metric Numbers**: Keep numbers identical
   - English: "95% accuracy"
   - Chinese: "95%准确率"
5. **Links**: Update links to point to the correct language file
   - English: `./implementation` → links to implementation.en.md
   - Chinese: `./implementation` → links to implementation.zh.md

### Quick Translation Template

Copy the English file and translate:

```bash
# Create Chinese version from English
cp index.en.md index.zh.md
# Then edit index.zh.md to translate content
```

---

## Linking Between Pages

### Internal Subpage Links

When linking from the overview page to subpages:

```markdown
**📚 Full Documentation**

- **[Implementation Details](./implementation)**: Deployment guide, technical steps
- **[Validation Requirements](./requirements)**: Functional specs, performance metrics
- **[Validation Report](./validation-report)**: Test results, benchmark analysis
- **[Project Report](./project-report)**: User stories, ROI analysis
```

**Important:** Use relative links without the `.en.md` or `.zh.md` suffix:
- ✅ Correct: `./implementation`
- ❌ Wrong: `./implementation.en.md`
- ❌ Wrong: `../implementation`

The system automatically routes to the correct language file.

### Back to Blueprint Links

In subpages, add a link back to the overview:

```markdown
**In the meantime**, please refer to the [Overview](./index.en.md) for quick information.
```

---

## Testing and Verification

### Local Testing

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Test blueprint pages:**
   - Overview: `http://localhost:3000/en/blueprint/blueprint-id-v1`
   - Implementation: `http://localhost:3000/en/blueprint/blueprint-id-v1/implementation`
   - Requirements: `http://localhost:3000/en/blueprint/blueprint-id-v1/requirements`
   - Validation: `http://localhost:3000/en/blueprint/blueprint-id-v1/validation`
   - Project: `http://localhost:3000/en/blueprint/blueprint-id-v1/project`

3. **Test both languages:**
   - English: `/en/blueprint/...`
   - Chinese: `/zh/blueprint/...`

4. **Test navigation:**
   - Click all links in the overview page
   - Click "Back to Blueprint" button in subpages
   - Verify tab navigation works

### Build Verification

Before committing, always run:

```bash
npm run build
```

Ensure:
- ✅ No TypeScript errors
- ✅ No build warnings
- ✅ All routes generate successfully

### Content Checklist

Before marking a blueprint as complete:

- [ ] Both English and Chinese versions exist
- [ ] All 5 pages have content (index + 4 subpages)
- [ ] Internal links work correctly
- [ ] Tables are properly formatted
- [ ] Code blocks render correctly
- [ ] Dates are in YYYY-MM-DD format
- [ ] Status badges are correct (✅ Verified or 🛡️ In-Arena)
- [ ] Blueprint ID in data.ts matches folder name
- [ ] `last updated` date is current

---

## Deployment Workflow

### Step 1: Make Changes

Edit content files in your local environment.

### Step 2: Verify Changes

```bash
# Test locally
npm run dev

# Build to check for errors
npm run build
```

### Step 3: Commit Changes

```bash
git add public/content/blueprints/your-blueprint-id/
git add lib/data.ts
git commit -m "docs: update blueprint-name-v1 content

- Add full implementation documentation
- Update metrics from latest benchmarks
- Add Chinese translation for all pages

Co-Authored-By: Your Name <your.email@example.com>"
```

### Step 4: Push to GitHub

```bash
git push origin main
```

### Step 5: Deploy

Vercel will automatically deploy when changes are pushed to `main`.

To deploy manually:
```bash
npm run build
vercel --prod
```

### Step 6: Verify Deployment

1. Wait for Vercel deployment to complete (~2-3 minutes)
2. Visit the production URL
3. Test all blueprint pages
4. Check both English and Chinese versions

---

## Common Issues and Solutions

### Issue: 404 Error on Blueprint Page

**Cause**: Blueprint folder name doesn't match `blueprintId` in data.ts

**Solution**: Ensure the folder name exactly matches the blueprint ID:
```typescript
// In data.ts
blueprintId: 'nl2sql-sota-v1'

// Folder name must be
public/content/blueprints/nl2sql-sota-v1/
```

### Issue: Links Return 404

**Cause**: Using absolute paths or wrong relative paths

**Solution**: Use relative links without file extension:
```markdown
✅ [Implementation](./implementation)
❌ [Implementation](../implementation)
❌ [Implementation](./implementation.en.md)
```

### Issue: Content Not Updating

**Cause**: Browser cache or Next.js build cache

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Issue: Build Fails with "Module Not Found"

**Cause**: Syntax error in markdown or invalid characters

**Solution**:
1. Check for special characters in markdown (especially in code blocks)
2. Validate table syntax (all rows must have same number of columns)
3. Check for unclosed brackets or quotes
4. Use markdown linter: `npx markdownlint **/*.md`

### Issue: Chinese Characters Display as Garbled

**Cause**: File not saved as UTF-8

**Solution**:
1. Ensure your editor saves files as UTF-8
2. Add UTF-8 BOM if needed (most editors handle this automatically)
3. Check file encoding: `file -I index.zh.md`

### Issue: Missing Subpage Tabs

**Cause**: Missing markdown files or incorrect file names

**Solution**: Ensure all files exist with exact names:
```
blueprint-id-v1/
├── index.en.md
├── index.zh.md
├── implementation.en.md    # Must be exact spelling
├── implementation.zh.md
├── requirements.en.md
├── requirements.zh.md
├── validation-report.en.md # Note: hyphenated, not underscore
├── validation-report.zh.md
├── project-report.en.md
└── project-report.zh.md
```

---

## Best Practices

### Content Organization

1. **Start Simple**: Begin with "Coming Soon" placeholders, add details later
2. **Be Consistent**: Use the same structure across all blueprints
3. **Keep Updated**: Update the `last updated` date when making changes
4. **Version Control**: Use version suffixes (v1, v2) for major updates

### Writing Style

1. **Be Concise**: Use bullet points and tables instead of long paragraphs
2. **Be Specific**: Include actual metrics, not vague claims
3. **Be Honest**: If a feature is coming soon, say so explicitly
4. **Be Visual**: Use emojis, tables, and code blocks to break up text

### Maintenance Schedule

- **Weekly**: Review and update "Coming Soon" pages
- **Monthly**: Update metrics and benchmarks from latest tests
- **Quarterly**: Full content review and translation sync

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Content
cd public/content/blueprints  # Navigate to content directory
ls -la                    # List blueprint folders

# Git
git status               # Check changes
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push                # Push to remote
```

### File Templates

Located in `public/content/blueprints/_templates/`:
- `index-template.md` - Blueprint overview template
- `implementation-template.md` - Implementation details template

### Reference Examples

Located in `public/content/blueprints/`:
- `intelligent-research-system-v1/` - Example with full documentation
- All other blueprints - Example with "Coming Soon" placeholders

---

## Support

### Getting Help

- **Content Issues**: Create a GitHub issue with the "content" label
- **Technical Problems**: Contact the development team
- **Documentation Updates**: Submit a pull request

### Useful Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Project README](./README.md)
- [Data Structure Reference](./lib/data.ts)

---

*Last updated: 2025-01-26 (Homepage display section added)*

*For questions or suggestions, please open an issue or contact the content team.*
