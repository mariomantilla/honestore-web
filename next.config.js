/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/feedback',
        destination: 'https://forms.gle/4N5fkZgUXtKVhwRV8',
        permanent: true,
      },
      {
        source: '/download',
        destination: 'https://play.google.com/store/apps/details?id=app.honestore.android',
        permanent: true,
      },
      {
        source: '/s/:path*',
        destination: '/shop/:path*',
        permanent: true,
      },
      {
        source: '/shop/:path*',
        destination: '/shops/:path*',
        permanent: true,
      },
    ]
  },
}
