/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["czcbonajmenirmxdslhj.supabase.co", "k.kakaocdn.net", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net"
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net"
      },
      {
        protocol: "https",
        hostname: "czcbonajmenirmxdslhj.supabase.co",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
