/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["plus.unsplash.com", "images.unsplash.com", "czcbonajmenirmxdslhj.supabase.co"], // 테스트 데이터 외부 이미지 도메인
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      }
    ]
  }
};

export default nextConfig;
