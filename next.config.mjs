/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Security Headers — HTTPS-ready configuration
   * These headers enhance security when deployed behind an SSL-terminating proxy.
   * 
   * OAuth + RBAC Scaffolding:
   * To add admin authentication in the future:
   * 1. Install next-auth: npm install next-auth
   * 2. Create src/app/api/auth/[...nextauth]/route.js
   * 3. Configure OAuth providers (Google, GitHub, etc.)
   * 4. Add middleware.js for route protection with role checks
   * 5. Create admin/ routes protected by RBAC middleware
   */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
