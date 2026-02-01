# Vercel Deployment Guide

This guide explains how to deploy the RWAI website to Vercel.

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (sign up at https://vercel.com)

## Deployment Steps

### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import Project in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js configuration

### 3. Configure Project Settings

#### Framework Preset
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### Environment Variables (Optional)
Add these in Project Settings → Environment Variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_GA_ID` | Your Google Analytics ID | Production |
| `NEXT_PUBLIC_SITE_URL` | https://rwai.org | Production |

### 4. Deploy

Click "Deploy" and wait for the build to complete (~2-3 minutes).

### 5. Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain (e.g., rwai.org)
3. Update DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Checklist

- [ ] Site loads correctly at the Vercel URL
- [ ] All pages are accessible (/, /arena, /blueprint/*, etc.)
- [ ] Language switching works (en/zh)
- [ ] All links are functional
- [ ] Custom domain is configured (if applicable)
- [ ] Analytics are working (if configured)

## Continuous Deployment

Vercel automatically deploys when you push to the configured branch (default: main).

### Preview Deployments

Every pull request gets a unique preview URL for testing before merging.

## Troubleshooting

### Build Fails

1. Check the build logs in Vercel Dashboard
2. Ensure all dependencies are in package.json
3. Try running `npm run build` locally first

### Environment Variables Not Working

1. Ensure variables are set for the correct environment (Production/Preview/Development)
2. Variables must start with `NEXT_PUBLIC_` to be exposed to the browser
3. Redeploy after adding new variables

### Performance Issues

1. Enable Vercel Analytics
2. Check Vercel Speed Insights
3. Optimize images and use Next.js Image component
4. Enable Vercel Edge Functions for dynamic routes

## Monitoring

### Vercel Analytics

Enable in Project Settings → Analytics:

```bash
npm install @vercel/analytics
```

Then add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Speed Insights

Enable in Project Settings → Speed Insights to monitor Core Web Vitals.

## Rollback

If a deployment has issues:

1. Go to Deployments tab
2. Find the previous successful deployment
3. Click "Promote to Production"

## Cost

- **Hobby Plan**: Free (sufficient for most projects)
  - 100GB bandwidth/month
  - Unlimited deployments
  - Automatic HTTPS
  - Edge functions

- **Pro Plan**: $20/month
  - 1TB bandwidth/month
  - Team collaboration
  - Priority support

---

For more information, visit [Vercel Documentation](https://vercel.com/docs).
