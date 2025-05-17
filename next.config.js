/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Allow PDFs to be served from the public directory
  async headers() {
    return [
      {
        source: '/pdfs/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf'
          }
        ],
      },
    ]
  }
}

module.exports = nextConfig 