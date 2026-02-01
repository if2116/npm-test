/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const repo =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ||
  process.env.NEXT_PUBLIC_REPO ||
  '';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,

  // GitHub Pages: static export
  output: 'export',
  trailingSlash: true,

  // next/image 在 export 下建议关闭优化
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
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