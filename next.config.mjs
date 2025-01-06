/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'czcbonajmenirmxdslhj.supabase.co',
          pathname: '/**',
        },
      ],
    },
  }
  
  export default nextConfig
