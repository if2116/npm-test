/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

// repo = "npm-test"（来自 owner/repo）
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,

  // GitHub Pages 只能静态：必须导出 out/
  output: 'export',
  trailingSlash: true,

  // next/image 在静态导出下建议关闭优化
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },

  // Project Pages: https://<user>.github.io/<repo>/
  ...(isProd && repo
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),
};

module.exports = withNextIntl(nextConfig);