# Blueprint Content Management Guide

**Last Updated**: 2025-01-26
**Version**: 1.0

---

## 📋 Overview

This guide explains how to create, update, and manage blueprint documentation content for the RWAI website.

---

## 📁 File Structure

Blueprints are stored in: `/public/content/blueprints/{blueprint-id}/`

### Required Files

Each blueprint should have these documentation files:

```
public/content/blueprints/{blueprint-id}/
├── index.en.md              # English overview (merged into main page)
├── index.zh.md              # Chinese overview (merged into main page)
├── implementation.en.md     # English implementation details
├── implementation.zh.md     # Chinese implementation details
├── requirements.en.md       # English validation requirements
├── requirements.zh.md       # Chinese validation requirements
├── validation-report.en.md  # English validation report
├── validation-report.zh.md  # Chinese validation report
├── project-report.en.md     # English project report
└── project-report.zh.md     # Chinese project report
```

---

## ⚠️ CRITICAL: Content Formatting Rules

### ❌ NEVER Include YAML Frontmatter

**DO NOT** add frontmatter like this:
\`\`\`
---
blueprint_id: "xxx"
locale: "en"
last_updated: "2025-01-26"
---

# Title
\`\`\`

**Why**: ReactMarkdown cannot parse YAML frontmatter (\`---\` sections). This causes client-side errors and page crashes.

**✅ CORRECT** - Start directly with markdown:
\`\`\`
# Title

**Case Number**: Case251120Y01
**Last Updated**: 2025-01-26
\`\`\`

---

## 📝 Markdown Formatting Guidelines

### 1. File Headers

Each file should start with a clear title:

\`\`\`
# Page Title

**Blueprint ID**: blueprint-name
**Case Number**: CaseNumber
**Last Updated**: YYYY-MM-DD

---
\`\`\`

### 2. Section Headers

Use emoji prefixes for major sections:
- 📋 Overview / Requirements Overview
- 🎯 Objectives / Core Objectives
- 🚀 Implementation / Phase 1
- 🔧 Setup / Environment Setup
- 💻 Development / Core Implementation
- 🧪 Testing / Validation
- 📊 Results / Test Results
- ✅ Conclusion / Acceptance Criteria

### 3. Bilingual Content

**For Chinese files** (index.zh.md, implementation.zh.md, etc.):
- Use Chinese as primary language
- Add English translations in parentheses where helpful
- Format: \`# 中文标题 | English Title\`

**For English files** (index.en.md, implementation.en.md, etc.):
- Use English only (no Chinese)
- Keep it clean and professional

### 4. Tables

Use standard markdown table syntax:

\`\`\`
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
\`\`\`

### 5. Checkboxes

\`\`\`
- [ ] Task not completed
- [x] Task completed
\`\`\`

### 6. Code Blocks

\`\`\`
\`\`\`bash
npm install
\`\`\`
\`\`\`

---

## 🚫 Content Restrictions

### DO NOT Include:

1. ❌ **YAML frontmatter** - Never use \`---\` sections at file start
2. ❌ **HTML tags** - Raw HTML is not supported (no \`<div>\`, \`<span>\`, etc.)
3. ❌ **Complex nested formatting** - Keep it simple and readable
4. ❌ **Links to legacy sites** - Use internal links only
5. ❌ **JavaScript or interactive elements** - Static markdown only

### CAN Include:

1. ✅ **Standard markdown** - Headers, lists, tables, code blocks
2. ✅ **Links** - \`[text](url)\` format
3. ✅ **Bold/Italic** - \`**bold**\` or \`*italic*\`
4. ✅ **Horizontal rules** - \`---\`
5. ✅ **Emojis** - Use emoji for visual appeal

---

## 🔄 Content Update Workflow

### Adding a New Blueprint

1. Create directory: \`/public/content/blueprints/{blueprint-id}/\`
2. Create all required markdown files (see File Structure above)
3. Follow formatting rules strictly (NO YAML frontmatter)
4. Test locally: \`npm run build\`
5. Commit and push to GitHub
6. Verify on Vercel deployment

### Updating Existing Content

1. Edit the relevant \`.md\` file(s)
2. Verify formatting rules are followed
3. Test locally: \`npm run build\`
4. Commit and push to GitHub
5. Verify on Vercel deployment

---

## 🧪 Testing Before Deployment

### Local Build Test

Always run before pushing:

\`\`\`bash
npm run build
\`\`\`

If build succeeds, content is valid.

### Common Build Errors

**Error**: "Failed to parse" or "Client-side exception"
- **Cause**: YAML frontmatter or invalid markdown
- **Fix**: Remove \`---\` sections and any HTML tags

**Error**: File not found
- **Cause**: Incorrect file name or missing file
- **Fix**: Verify file exists and name matches expected pattern

---

## 📖 File Naming Conventions

### Overview Files
- \`index.en.md\` - English overview
- \`index.zh.md\` - Chinese overview

### Documentation Files
- \`{type}.en.md\` - English documentation
- \`{type}.zh.md\` - Chinese documentation

Where \`{type}\` is one of:
- \`implementation\`
- \`requirements\`
- \`validation-report\`
- \`project-report\`

---

## 🎨 Content Style Guide

### Tone
- Professional and informative
- Clear and concise
- Action-oriented where applicable

### Structure
1. Start with title and metadata
2. Use sections with emoji headers
3. Include tables for data presentation
4. Add checklists for actionable items
5. End with summary or next steps

### Example Structure

\`\`\`
# Section Title

**Key**: Value

## 📋 Subsection

Description of what this section covers.

| Metric | Value | Status |
|--------|-------|--------|
| Item 1 | 100   | ✅     |

### Tasks

- [ ] Task 1
- [x] Task 2

---

*Last updated: YYYY-MM-DD*
\`\`\`

---

## 📞 Support

For content-related issues:
- Check build logs: \`npm run build\`
- Verify formatting rules above
- Check existing files as examples
- Contact: support@rwai.org

---

## 📝 Quick Checklist

Before committing content changes:

- [ ] No YAML frontmatter (\`---\` sections)
- [ ] File name follows naming convention
- [ ] File starts with markdown header (\`# Title\`)
- [ ] No HTML tags included
- [ ] Local build succeeds (\`npm run build\`)
- [ ] Bilingual files follow language rules
- [ ] Tables use proper markdown syntax

---

*Remember: When in doubt, keep it simple. Standard markdown only, no frontmatter, no HTML.*
